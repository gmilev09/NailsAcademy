import { base44 } from "@/api/base44Client";

const GUEST_USER = {
  email: "guest@nailsacademy.bg",
  full_name: "Guest",
};

function getStoredGuestUser() {
  try {
    return JSON.parse(localStorage.getItem("nails_academy_user") || "null");
  } catch {
    return null;
  }
}

export async function ensureCartUser() {
  try {
    return await base44.auth.me();
  } catch {
    const storedUser = getStoredGuestUser();
    if (storedUser?.email) {
      return storedUser;
    }
    localStorage.setItem("nails_academy_user", JSON.stringify(GUEST_USER));
    return GUEST_USER;
  }
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
    return base44.entities.CartItem.update(existingItem.id, {
      quantity: existingItem.quantity + 1,
    });
  }

  return base44.entities.CartItem.create({
    user_email: user.email,
    product_id: String(product.id),
    product_name: product.name,
    product_price: Number(product.price),
    quantity: 1,
    product_image: product.image_url || "",
  });
}

export async function updateCartItemQuantity(id, quantity) {
  if (quantity <= 0) {
    await base44.entities.CartItem.delete(id);
    return null;
  }

  return base44.entities.CartItem.update(id, { quantity });
}

export async function removeCartItem(id) {
  return base44.entities.CartItem.delete(id);
}
