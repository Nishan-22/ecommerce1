"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-2xl">
      <Card>
        <CardContent className="pt-10 pb-10 text-center space-y-4">
          <div className="flex justify-center">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>

          <h1 className="text-2xl font-bold">Payment Cancelled</h1>

          <p className="text-muted-foreground">
            Your payment was cancelled or did not complete. No charges were
            made. You can try again whenever you are ready.
          </p>

          <div className="flex justify-center gap-4 mt-4">
            <Button asChild variant="outline">
              <Link href="/checkout">Try Again</Link>
            </Button>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}