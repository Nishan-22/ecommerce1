"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RelatedProductsProps {
  product: Product;
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]));
  }, []);

  const related = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  if (related.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
        <Button variant="ghost" asChild>
          <Link href="/" className="text-primary hover:text-primary/80">
            View All
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((relatedProduct) => (
          <Card
            key={relatedProduct.id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <Link href={`/product/${relatedProduct.id}`}>
              <div className="aspect-square overflow-hidden bg-muted">
                {relatedProduct.image ? (
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      Image not available
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-1 mb-2">
                  {relatedProduct.name}
                </h3>
                <p className="text-lg font-bold text-primary">
                  ${relatedProduct.price.toFixed(2)}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}