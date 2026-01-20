import About from "./_components/about/about-section";
import BenefitsSection from "./_components/benefits-section/benefits-section";
import BestSellingIndex from "./_components/best-selling";
import Companies from "./_components/companies/companies-section";
import Gallery from "./_components/gallery/gallery-section";
import HeroSection from "./_components/hero-section/hero-section";
import MostPopularIndex from "./_components/most-popular";
import OccasionsSection from "./_components/occasions-section/occasions-section";
import Testimonials from "./_components/testimonials/testimonials";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Hero section */}
        <HeroSection />

        {/* Occasion section */}
        <OccasionsSection />

        {/* Benefits section */}
        <BenefitsSection />
      </div>

      {/* Best Selling Section */}
      <BestSellingIndex />

      {/* Most Popular Section */}
      <MostPopularIndex searchParams={searchParams as { occasion?: string }} />

      {/* Testimonials Section */}
      <Testimonials />

      {/* About Section */}
      <About />

      {/* Gallery Section */}
      <Gallery />

      {/* Companies Section */}
      <Companies />
    </>
  );
}
