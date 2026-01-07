import About from "./_features/about/components/about-section";
import Companies from "./_features/companies/components/companies-section";
import Gallery from "./_features/gallery/components/gallery-section";

export default function Home() {
  return (
    <>
      {/* About Section */}
      <About />

      {/* Gallery Section */}
      <Gallery />

      {/* Companies Section */}
      <Companies />
    </>
  );
}
