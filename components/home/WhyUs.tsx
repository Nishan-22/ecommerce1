import { Button } from "@/components/ui/button";
import { Feather, Gem, Recycle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Gem,
    title: "Premium Craftsmanship",
    description:
      "Every pair is built with quality materials and meticulous attention to detail, designed to last.",
  },
  {
    icon: Feather,
    title: "All-Day Comfort",
    description:
      "Responsive cushioning and breathable construction keep you comfortable from morning to night.",
  },
  {
    icon: Recycle,
    title: "Sustainable Choices",
    description:
      "We're committed to responsible sourcing and eco-friendly packaging on every order.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-20 border-t border-border bg-background/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto max-w-2xl mb-12 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why ShoeShop
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Built Different, Worn Better
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            More than sneakers — a commitment to quality, comfort, and the
            planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="glass rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-5">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Learn more about us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}