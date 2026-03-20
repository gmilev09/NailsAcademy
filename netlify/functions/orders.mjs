import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore({ name: "orders", consistency: "strong" });

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

    if (!customer_name || !customer_email || !customer_phone || !items?.length) {
      return Response.json(
        { error: "Missing required fields: customer_name, customer_email, customer_phone, items" },
        { status: 400 }
      );
    }

    const id = `ord_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const order = {
      id,
      customer_name,
      customer_email,
      customer_phone,
      city: city || "",
      delivery_type: delivery_type || "office",
      delivery_address: delivery_address || "",
      courier: courier || "econt",
      items,
      subtotal: Number(subtotal) || 0,
      shipping_cost: Number(shipping_cost) || 0,
      total: Number(total) || 0,
      payment_method: payment_method || "cod",
      status: "new",
      created_at: new Date().toISOString(),
    };

    await store.setJSON(id, order);

    return Response.json({ success: true, order }, { status: 201 });
  }

  if (req.method === "GET") {
    const { blobs } = await store.list();
    const orders = await Promise.all(
      blobs.map((blob) => store.get(blob.key, { type: "json" }))
    );

    return Response.json({ orders });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
};

export const config = {
  path: "/api/orders",
};
