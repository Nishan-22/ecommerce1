import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16 sm:py-20 lg:py-24">
          <div className="space-y-6 text-center lg:text-left">
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-xs uppercase tracking-widest"
            >
              <Star className="h-3.5 w-3.5 mr-1.5 fill-current text-amber-400" />
              New Season Drop 2026
            </Badge>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-semibold tracking-tight text-balance leading-[1.05]">
              Step Into <span className="text-gradient">Style</span> With
              Every Pair
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0 text-balance">
              Discover our latest collection of premium sneakers — comfort,
              design, and performance in every pair. Crafted for those who
              never stop moving.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button size="lg" className="w-full sm:w-auto px-8" asChild>
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8"
                asChild
              >
                <Link href="/shop">Explore Collection</Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((char) => (
                    <div
                      key={char}
                      className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/70 to-accent/70 border-2 border-background flex items-center justify-center text-[10px] font-bold text-background"
                    >
                      {char}
                    </div>
                  ))}
                </div>
                <span>
                  <strong className="text-foreground">50K+</strong> happy
                  customers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span>
                  <strong className="text-foreground">4.9/5</strong> from 12K
                  reviews
                </span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
              <Image
                src={HERO_IMAGE}
                alt="Featured sneaker"
                width={600}
                height={600}
                priority
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            <div className="glass absolute top-5 left-5 flex items-center gap-3 rounded-xl px-4 py-3 animate-blob-float">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Free Shipping
                </p>
                <p className="text-[11px] text-muted-foreground">
                  On orders over NPR 5,000
                </p>
              </div>
            </div>

            <div className="glass absolute bottom-5 right-5 flex items-center gap-3 rounded-xl px-4 py-3 animate-blob-drift">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  30-Day Returns
                </p>
                <p className="text-[11px] text-muted-foreground">
                  No questions asked
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}