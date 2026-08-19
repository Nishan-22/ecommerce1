"use client";

import ProductCard from "@/components/home/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { LayoutGrid, Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const categories = [
  "All",
  "Running",
  "Lifestyle",
  "Retro",
  "Performance",
  "Casual",
  "High-Tops",
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesQuery = product.name
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  const setCategoryParam = (value: string) => {
    const url = new URL(window.location.href);
    if (value === "All") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", value);
    }
    window.history.replaceState({}, "", url.toString());
    setCategory(value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="space-y-2 mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          The Collection
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {category === "All" ? "All Products" : category}
        </h1>
        <p className="text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "style" : "styles"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-1 px-1">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryParam(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                category === cat
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative lg:ml-auto w-full lg:w-72">
          <input
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-sm border border-border rounded-full bg-background/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            aria-label="Search products"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <LayoutGrid className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground mb-4">
            Try a different category or search term
          </p>
          <button
            onClick={() => {
              setCategory("All");
              setQuery("");
              const url = new URL(window.location.href);
              url.searchParams.delete("category");
              window.history.replaceState({}, "", url.toString());
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}