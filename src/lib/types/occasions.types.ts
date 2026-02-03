export type Occasion = {
  _id: string;
  name: string;
  slug: string;
  image: string;

  productsCount: number;
};
export type OccasionResponse = {
  message: string;
  metadata: {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
  occasions: Occasion[];
};
