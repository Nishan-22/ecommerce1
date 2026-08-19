import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <Image
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1170&auto=format&fit=crop"
            alt="Limited time sale"
            width={1200}
            height={600}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />

          <div className="relative px-8 py-16 sm:px-14 sm:py-20 max-w-xl">
            <Badge variant="destructive" className="mb-5 px-4 py-1.5">
              <Flame className="h-3.5 w-3.5 mr-1.5" />
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-balance mb-4">
              Summer Sale — Up to{" "}
              <span className="text-gradient">40% Off</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-md">
              Refresh your rotation before the season ends. Best-selling styles,
              unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="px-8" asChild>
                <Link href="/shop">
                  Shop the Sale
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 bg-background/40 backdrop-blur-sm"
                asChild
              >
                <Link href="/shop">New Arrivals</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}