import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";

const DEFAULT_ADMIN_EMAIL = "bozhinova.nails.academy@gmail.com";
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

function formatOrderItems(items = []) {
  return items
    .map((item) => {
      const name = item?.name || "Unknown product";
      const quantity = Number(item?.quantity) || 0;
      const price = Number(item?.price) || 0;
      const lineTotal = price * quantity;
      return `- ${name} x${quantity} = ${lineTotal.toFixed(2)} EUR`;
    })
    .join("\n");
}

function normalizeOrderItems(items) {
  if (Array.isArray(items)) return items;

  if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

async function sendAdminOrderNotification(order) {
  const resendApiKey = Netlify.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.warn("Order email notification skipped: RESEND_API_KEY is not set.");
    return;
  }

  const toEmail = Netlify.env.get("ORDER_NOTIFICATION_TO") || DEFAULT_ADMIN_EMAIL;
  const fromEmail = Netlify.env.get("ORDER_NOTIFICATION_FROM") || DEFAULT_FROM_EMAIL;
  const itemsList = formatOrderItems(order.items);

  const payload = {
    from: fromEmail,
    to: [toEmail],
    subject: `Нова поръчка #${order.id}`,
    text: [
      "Нова поръчка е направена.",
      "",
      `Номер: ${order.id}`,
      `Клиент: ${order.customer_name}`,
      `Имейл: ${order.customer_email || "няма"}`,
      `Телефон: ${order.customer_phone}`,
      "",
      "Доставка:",
      `Град: ${order.city || "няма"}`,
      `Тип: ${order.delivery_type === "office" ? "До офис" : "До адрес"}`,
      `Адрес/Офис: ${order.delivery_address || "няма"}`,
      `Куриер: ${order.courier === "econt" ? "Еконт" : "Спиди"}`,
      "",
      "Продукти:",
      itemsList || "- няма",
      "",
      `Междинна сума: ${order.subtotal.toFixed(2)} EUR`,
      `Доставка: ${order.shipping_cost.toFixed(2)} EUR`,
      `ОБЩО: ${order.total.toFixed(2)} EUR`,
      "",
      `Плащане: ${order.payment_method || "cod"}`,
      `Създадена: ${order.created_at}`,
    ].join("\n"),
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error (${response.status}): ${errorText}`);
  }
}

export default async (req, context) => {
  const store = getStore({ name: "orders", consistency: "strong" });
  const user = await getUser();

  if (req.method === "POST") {
    const body = await req.json();

    const {
      customer_name,
      customer_email,
      customer_phone,
      city,
      delivery_type,
      delivery_address,
      courier,
      items,
      subtotal,
      shipping_cost,
      total,
      payment_method,
    } = body;
    const normalizedItems = normalizeOrderItems(items);

    if (!customer_name || !customer_phone || !normalizedItems.length) {
      return Response.json(
        { error: "Missing required fields: customer_name, customer_phone, items" },
        { status: 400 }
      );
    }

    const id = `ord_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const order = {
      id,
      user_id: user?.id || null,
      customer_name,
      customer_email: user?.email || customer_email || "",
      customer_phone,
      city: city || "",
      delivery_type: delivery_type || "office",
      delivery_address: delivery_address || "",
      courier: courier || "econt",
      items: normalizedItems,
      subtotal: Number(subtotal) || 0,
      shipping_cost: Number(shipping_cost) || 0,
      total: Number(total) || 0,
      payment_method: payment_method || "cod",
      status: "new",
      created_at: new Date().toISOString(),
    };

    await store.setJSON(id, order);
    context.waitUntil(
      sendAdminOrderNotification(order).catch((error) => {
        console.error("Failed to send order notification email:", error);
      })
    );

    return Response.json({ success: true, order }, { status: 201 });
  }

  if (req.method === "GET") {
    if (!user || !user.confirmedAt) {
      return Response.json({ error: "Authentication required" }, { status: 401 });
    }

    const { blobs } = await store.list();
    const orders = await Promise.all(blobs.map((blob) => store.get(blob.key, { type: "json" })));
    const currentUserOrders = orders.filter((order) => order?.user_id === user.id);

    return Response.json({ orders: currentUserOrders });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
};

export const config = {
  path: "/api/orders",
};
