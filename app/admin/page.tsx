"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminUser {
  name: string;
  email: string;
  role: string;
}

interface Order {
  id: number;
  transactionUuid: string;
  refId: string;
  status: string;
  customer: { name: string; email: string; phone: string; city: string };
  items: { name: string; quantity: number; price: number }[];
  total: number;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();
        if (!meData.user || meData.user.role !== "admin") {
          router.replace("/login");
          return;
        }
        setUser(meData.user);

        const ordersRes = await fetch("/api/orders");
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          image: form.image,
          description: form.description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add product");

      setMessage("Product added successfully!");
      setForm({ name: "", price: "", image: "", description: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-24 text-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Welcome, {user.name} — manage products and view orders.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Product Name *
                </label>
                <Input
                  name="name"
                  placeholder="e.g. AirMax Classic"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Price (NPR) *
                </label>
                <Input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 5999"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Image URL
                </label>
                <Input
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Description
                </label>
                <Textarea
                  name="description"
                  placeholder="Short product description..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {message && (
                <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
                  {message}
                </p>
              )}
              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Adding..." : "Add Product"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No orders yet. Orders appear here after customers pay via
                eSewa.
              </p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-lg border border-border space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Order #{order.id}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.customer.name} • {order.customer.email} •{" "}
                    {order.customer.phone} • {order.customer.city || "—"}
                  </p>
                  <p className="text-sm">
                    {order.items
                      .map((i) => `${i.name} × ${i.quantity}`)
                      .join(", ")}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Ref: {order.refId}
                    </span>
                    <span className="font-bold">
                      NPR {order.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}