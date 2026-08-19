"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 sm:py-20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border p-10 sm:p-16 text-center">
          <div className="absolute inset-0 bg-scene" />
          <div className="relative mx-auto max-w-2xl space-y-6">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
              <Mail className="h-7 w-7" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Get Exclusive Drops First
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Subscribe for early access to new arrivals, members-only sales,
              and style tips. No spam, unsubscribe anytime.
            </p>

            {subscribed ? (
              <div className="mx-auto max-w-md rounded-xl bg-green-600/15 border border-green-600/30 px-6 py-4 text-sm text-green-300">
                You&rsquo;re in! Check your inbox for a welcome gift. 🎉
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="flex-1 px-4 py-3 text-sm rounded-lg border border-border bg-background/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button type="submit" size="lg" className="px-8">
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}