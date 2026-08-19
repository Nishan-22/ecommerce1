import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Anisha Gurung",
    role: "Verified Buyer",
    quote:
      "The quality is unreal for the price. My AirFlex Runners arrived in two days and fit perfectly. Definitely my new go-to shoe store.",
  },
  {
    name: "Rohit Shrestha",
    role: "Verified Buyer",
    quote:
      "Ordered a pair of Urban Street Pros and I'm blown away. Stylish, comfortable, and the checkout was smooth with eSewa.",
  },
  {
    name: "Sneha Maharjan",
    role: "Verified Buyer",
    quote:
      "Great customer support and hassle-free returns. The Zenith Flow sneakers are the most comfortable shoes I've owned.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto max-w-2xl mb-12 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Customer stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Loved by Thousands
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, quote }) => (
            <figure
              key={name}
              className="glass rounded-2xl p-8 flex flex-col gap-5"
            >
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-sm text-foreground/90 leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/70 to-accent/70 flex items-center justify-center text-sm font-bold text-background">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {name}
                  </p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}