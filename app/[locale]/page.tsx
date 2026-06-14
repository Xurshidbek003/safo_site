import HeroSection from "@/components/sections/home/hero-section";
import StillWaterSection from "@/components/sections/home/still-water-section";
import FeaturedProductsSection from "@/components/sections/home/featured-products-section";
import BrandValuesSection from "@/components/sections/home/brand-values-section";
import AboutSection from "@/components/sections/home/about-section";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-[#06131d]">
      
      <section>
        <HeroSection />
      </section>

      <section>
        <FeaturedProductsSection />
      </section>

      <section>
        <BrandValuesSection />
      </section>

      <section>
        <StillWaterSection />
      </section>

      <section>
        <AboutSection />
      </section>

    </main>
  );
}