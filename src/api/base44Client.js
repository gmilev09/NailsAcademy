// Local base44 client stub — replaces the Base44 platform SDK with local implementations.
// Cart and order data are stored in localStorage.

const CART_STORAGE_KEY = "nails_academy_cart";
const ORDERS_STORAGE_KEY = "nails_academy_orders";

function getStoredItems(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function setStoredItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

let idCounter = Date.now();

export const base44 = {
  auth: {
    me: () => {
      const stored = localStorage.getItem("nails_academy_user");
      if (stored) return Promise.resolve(JSON.parse(stored));
      return Promise.reject(new Error("Not logged in"));
    },
    redirectToLogin: (returnUrl) => {
      // For now, create a simple guest user flow
      const guestUser = {
        email: "guest@nailsacademy.bg",
        full_name: "Guest",
      };
      localStorage.setItem("nails_academy_user", JSON.stringify(guestUser));
      window.location.href = returnUrl || "/";
    },
  },

  entities: {
    CartItem: {
      filter: (query) => {
        const items = getStoredItems(CART_STORAGE_KEY);
        if (query?.user_email) {
          return Promise.resolve(items.filter((i) => i.user_email === query.user_email));
        }
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
      create: (data) => {
        const orders = getStoredItems(ORDERS_STORAGE_KEY);
        const newOrder = { ...data, id: String(++idCounter), createdAt: new Date().toISOString() };
        orders.push(newOrder);
        setStoredItems(ORDERS_STORAGE_KEY, orders);
        return Promise.resolve(newOrder);
      },
    },
  },

  integrations: {
    Core: {
      SendEmail: (params) => {
        console.log("Email would be sent:", params);
        return Promise.resolve({ success: true });
      },
    },
  },

  analytics: {
    track: (event) => {
      console.log("Analytics event:", event);
    },
  },
};
