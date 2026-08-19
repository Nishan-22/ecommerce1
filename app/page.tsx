import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";
import TrustBar from "@/components/home/TrustBar";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <TrustBar />
      <CategoryShowcase />
      <FeaturedProducts />
      <PromoBanner />
      <WhyUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}