import About from "./_components/about/about-section";
import BestSellingIndex from "./_components/best-selling";
import Companies from "./_components/companies/companies-section";
import Gallery from "./_components/gallery/gallery-section";
import MostPopularIndex from "./_components/most-popular";
import Testimonials from "./_components/testimonials/testimonials";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
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
