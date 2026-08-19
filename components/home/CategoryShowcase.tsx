import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Running",
    tagline: "Speed & comfort",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Lifestyle",
    tagline: "Everyday essentials",
    image:
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=880&auto=format&fit=crop",
  },
  {
    name: "Retro",
    tagline: "Timeless classics",
    image:
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=1176&auto=format&fit=crop",
  },
  {
    name: "Performance",
    tagline: "Built to push limits",
    image:
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=735&auto=format&fit=crop",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Shop by category
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Find Your Perfect Fit
            </h2>
          </div>
          <Button variant="link" className="hidden sm:inline-flex" asChild>
            <Link href="/shop">
              View all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${category.name}`}
              className="group relative rounded-2xl overflow-hidden border border-border aspect-[3/4]"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={400}
                height={533}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs text-muted-foreground mb-1">
                  {category.tagline}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <div className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}