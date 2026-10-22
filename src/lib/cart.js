import { base44 } from "@/api/base44Client";

// Събитие, излъчвано при всяка промяна на количката — плаващият бутон
// за количката и други слушатели опресняват броя артикули в реално време.
export const CART_UPDATED_EVENT = "nails-academy-cart-updated";

export function notifyCartUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
  }
}

export async function ensureCartUser() {
  return base44.auth.me();
}

export async function getCartItems() {
  const user = await ensureCartUser();
  return base44.entities.CartItem.filter({ user_email: user.email });
}

export async function addProductToCart(product) {
  const user = await ensureCartUser();
  const items = await base44.entities.CartItem.filter({ user_email: user.email });
  const existingItem = items.find((item) => String(item.product_id) === String(product.id));

  if (existingItem) {
    const updated = await base44.entities.CartItem.update(existingItem.id, {
      quantity: existingItem.quantity + 1,
    });
    notifyCartUpdated();
    return updated;
  }

  const created = await base44.entities.CartItem.create({
    user_email: user.email,
    product_id: String(product.id),
    product_name: product.name,
    product_price: Number(product.price),
    quantity: 1,
    product_image: product.image_url || "",
  });
  notifyCartUpdated();
  return created;
}

export async function updateCartItemQuantity(id, quantity) {
  if (quantity <= 0) {
    await base44.entities.CartItem.delete(id);
    notifyCartUpdated();
    return null;
  }

  const updated = await base44.entities.CartItem.update(id, { quantity });
  notifyCartUpdated();
  return updated;
}

export async function removeCartItem(id) {
  const result = await base44.entities.CartItem.delete(id);
  notifyCartUpdated();
  return result;
}
