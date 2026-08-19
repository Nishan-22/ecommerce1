import ShopClient from "@/components/shop/ShopClient";
import { Suspense } from "react";

export default function ShopPage() {
  return (
    <div className="relative">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="h-8 w-48 bg-muted animate-pulse rounded-lg mb-8" />
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>
        }
      >
        <ShopClient />
      </Suspense>
    </div>
  );
}