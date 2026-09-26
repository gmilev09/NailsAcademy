// LOCAL PREVIEW SHIM — replaces `@netlify/identity` so the app works fully offline.
// User session is persisted in localStorage (see src/lib/AuthContext.jsx).
async function getUser() {
  try {
    return JSON.parse(localStorage.getItem("na_mock_user") || "null");
  } catch {
    return null;
  }
}

const CART_STORAGE_KEY = "nails_academy_cart";

function getStoredItems(key) {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}

function setStoredItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

let idCounter = Date.now();

export const base44 = {
  auth: {
    me: async () => {
      const currentUser = await getUser();
      if (!currentUser) throw new Error("AUTH_REQUIRED");
      return currentUser;
    },
    redirectToLogin: (returnUrl) => {
      window.location.href = returnUrl || "/auth";
    },
  },

  entities: {
    CartItem: {
      filter: (query) => {
        const items = getStoredItems(CART_STORAGE_KEY);
        if (query?.user_email) return Promise.resolve(items.filter((i) => i.user_email === query.user_email));
        return Promise.resolve(items);
      },
      create: (data) => {
        const items = getStoredItems(CART_STORAGE_KEY);
        const newItem = { ...data, id: String(++idCounter) };
        items.push(newItem);
        setStoredItems(CART_STORAGE_KEY, items);
        return Promise.resolve(newItem);
      },
      update: (id, data) => {
        const items = getStoredItems(CART_STORAGE_KEY);
        const nextItems = items.map((item) => (item.id === id ? { ...item, ...data } : item));
        setStoredItems(CART_STORAGE_KEY, nextItems);
        return Promise.resolve(nextItems.find((item) => item.id === id) || null);
      },
      delete: (id) => {
        const items = getStoredItems(CART_STORAGE_KEY).filter((i) => i.id !== id);
        setStoredItems(CART_STORAGE_KEY, items);
        return Promise.resolve();
      },
    },
    Order: {
      create: async (data) => {
        // Hybrid: на Netlify пращаме към реалната функция /api/orders,
        // а при локално превю записваме поръчката в localStorage.
        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            const result = await response.json().catch(() => ({}));
            if (result?.order) return result.order;
          }
          throw new Error("orders api unavailable");
        } catch (err) {
          const orders = getStoredItems("nails_academy_orders");
          const order = { ...data, id: String(++idCounter), created_at: new Date().toISOString() };
          orders.push(order);
          setStoredItems("nails_academy_orders", orders);
          return order;
        }
      },
    },
  },

  integrations: { Core: { SendEmail: (p) => Promise.resolve({ success: true }) } },
  analytics: { track: (e) => console.log("Event:", e) },
};
