import { Headphones, RotateCcw, Truck } from "lucide-react";

const perks = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over NPR 5,000",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "eSewa & cards accepted",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help you",
  },
];

function ShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8">
          {perks.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}