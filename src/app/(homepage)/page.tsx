import About from "./_components/about/about-section";
import Companies from "./_components/companies/companies-section";
import Gallery from "./_components/gallery/gallery-section";

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
