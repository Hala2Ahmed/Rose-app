import BestSellingIndex from "./_components/best-selling";
import MostPopularIndex from "./_components/most-popular";
import Testimonials from "./_components/testimonials/testimonials";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
      <BestSellingIndex />
      <MostPopularIndex searchParams={searchParams as { occasion?: string }} />
      <Testimonials />
    </>
  );
}
