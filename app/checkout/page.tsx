"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { generateTransactionUuid } from "@/lib/esewa";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 199;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const transactionUuid = generateTransactionUuid();

      const res = await fetch("/api/esewa/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: subtotal,
          taxAmount: tax,
          totalAmount: total,
          transactionUuid,
          productServiceCharge: 0,
          productDeliveryCharge: shipping,
          productName: `ShoeShop Order ${transactionUuid.slice(0, 8)}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment initiation failed");

      sessionStorage.setItem(
        "esewa_pending",
        JSON.stringify({
          transactionUuid,
          totalAmount: total,
          customer: form,
        })
      );

      const formEl = document.createElement("form");
      formEl.method = "POST";
      formEl.action = data.paymentUrl;
      formEl.style.display = "none";

      for (const [key, value] of Object.entries(data.formData)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        formEl.appendChild(input);
      }

      document.body.appendChild(formEl);
      formEl.submit();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to initiate payment."
      );
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        asChild
        className="text-muted-foreground hover:text-foreground mb-8"
      >
        <Link href="/cart" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Email *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Phone *
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="98XXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    City
                  </label>
                  <Input
                    name="city"
                    placeholder="Kathmandu"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Address *
                </label>
                <Input
                  name="address"
                  placeholder="Street, ward, tole"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-accent/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-bold text-sm">
                  eS
                </div>
                <div>
                  <p className="font-semibold">eSewa</p>
                  <p className="text-xs text-muted-foreground">
                    Pay with your eSewa wallet. You&apos;ll be redirected to
                    eSewa to complete the payment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm gap-4"
                >
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    NPR {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">NPR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? "Free" : `NPR ${shipping.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">NPR {tax.toLocaleString()}</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-primary">
                  NPR {total.toLocaleString()}
                </span>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </p>
              )}

              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handlePay}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Redirecting to eSewa...
                  </>
                ) : (
                  "Pay with eSewa"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}