"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { cart, clearCart } = useCart();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [refId, setRefId] = useState("");
  const handled = useRef(false);

  const dataParam = searchParams.get("data");

  useEffect(() => {
    async function verify() {
      try {
        const query = new URLSearchParams();
        if (dataParam) query.set("data", dataParam);

        const res = await fetch(`/api/esewa/verify?${query.toString()}`);
        const data = await res.json();
        const isVerified = data.verified === true;
        setVerified(isVerified);
        setRefId(data.refId || "");

        if (isVerified && !handled.current) {
          handled.current = true;

          try {
            const pending = JSON.parse(
              sessionStorage.getItem("esewa_pending") || "null"
            );

            if (pending) {
              const subtotal = cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );
              const shipping = subtotal > 50 ? 0 : 9.99;
              const tax = subtotal * 0.08;

              await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  transactionUuid: pending.transactionUuid,
                  refId: data.refId || "",
                  status: "COMPLETE",
                  customer: pending.customer,
                  items: cart.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                  })),
                  subtotal,
                  shipping,
                  tax,
                  total: pending.totalAmount,
                }),
              });
              sessionStorage.removeItem("esewa_pending");
            }
          } catch (err) {
            console.error("Failed to save order:", err);
          }

          clearCart();
        }
      } catch {
        setVerified(false);
      } finally {
        setVerifying(false);
      }
    }
    verify();
  }, [dataParam, clearCart, cart]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-2xl">
      <Card>
        <CardContent className="pt-10 pb-10 text-center space-y-4">
          <div className="flex justify-center">
            {verifying ? (
              <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
            ) : verified ? (
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive text-4xl font-bold">
                !
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold">
            {verifying
              ? "Verifying your payment..."
              : verified
                ? "Payment Successful"
                : "Payment Verification Failed"}
          </h1>

          <p className="text-muted-foreground">
            {verifying
              ? "Please wait while we confirm your payment with eSewa."
              : verified
                ? "Thank you for your order! Your payment has been confirmed and your order is being processed."
                : "We could not verify your payment. If you were charged, please contact support."}
          </p>

          {verified && refId && (
            <p className="text-sm text-muted-foreground">
              Transaction Reference: {refId}
            </p>
          )}

          <Button asChild className="mt-4">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}