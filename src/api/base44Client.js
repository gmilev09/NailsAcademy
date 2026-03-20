import { createClient } from '@supabase/supabase-js'

// --- ТВОИТЕ ДАННИ ЗА SUPABASE ---
const supabaseUrl = 'https://pfrwymbonfuidwshaxny.supabase.co'
const supabaseKey = 'sb_publishable_lzlvr8MNZyHiT4xY53oy4Q_wPh856J_' 
const supabase = createClient(supabaseUrl, supabaseKey)

const CART_STORAGE_KEY = "nails_academy_cart";
const ORDERS_STORAGE_KEY = "nails_academy_orders";

function getStoredItems(key) {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
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
      const guestUser = { email: "guest@nailsacademy.bg", full_name: "Guest" };
      localStorage.setItem("nails_academy_user", JSON.stringify(guestUser));
      window.location.href = returnUrl || "/";
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
        // ТОВА ЩЕ НИ ПОКАЖЕ В КОНЗОЛАТА КАКВО ТОЧНО ИЗПРАЩА САЙТЪТ
        console.log("Данни от формата:", data);

        const { data: apiOrder, error } = await supabase
          .from('orders')
          .insert([{ 
            // Пробваме всички възможни имена на полетата
            customer_name: data.full_name || data.name || 'Guest', 
            course_name: data.course_title || data.items?.[0]?.title || 'Курс', 
            amount: Number(data.total_price || data.total || 0),
            status: 'new'
          }])
          .select()
          .single();

        if (error) {
          // Ако има грешка, тя ще се изпише в червено в браузъра
          console.error("API Error:", error.message);
        }

        const orders = getStoredItems(ORDERS_STORAGE_KEY);
        const newOrder = { 
          ...data, 
          id: apiOrder ? String(apiOrder.id) : String(Date.now()), 
          createdAt: new Date().toISOString() 
        };
        orders.push(newOrder);
        setStoredItems(ORDERS_STORAGE_KEY, orders);
        return Promise.resolve(newOrder);
      },
    },
  },

  integrations: { Core: { SendEmail: (p) => Promise.resolve({ success: true }) } },
  analytics: { track: (e) => console.log("Event:", e) },
};
