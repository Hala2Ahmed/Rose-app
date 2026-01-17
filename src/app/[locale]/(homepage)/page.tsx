import BestSellingIndex from "./_features/best-selling";
import MostPopularIndex from "./_features/most-popular";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
      <BestSellingIndex />
      <MostPopularIndex searchParams={searchParams as { occasion?: string }} />
    </>
  );
}
