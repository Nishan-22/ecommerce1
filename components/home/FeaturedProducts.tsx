import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductList from "./ProductList";

export default function FeaturedProducts() {
  return (
    <section className="py-16 sm:py-20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Fresh from the shelf
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-base">
              Handpicked bestsellers our customers love right now.
            </p>
          </div>
          <Button variant="outline" className="shrink-0" asChild>
            <Link href="/shop">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <ProductList />
      </div>
    </section>
  );
}