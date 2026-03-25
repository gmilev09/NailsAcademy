import { getUser } from "@netlify/identity";

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
      window.location.href = returnUrl || "/Auth";
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
        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "Неуспешна поръчка");
          }
          return result.order;
        } catch (err) {
          console.error("Error saving order to backend:", err);
          throw err;
        }
      },
    },
  },

  integrations: { Core: { SendEmail: (p) => Promise.resolve({ success: true }) } },
  analytics: { track: (e) => console.log("Event:", e) },
};
