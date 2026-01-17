export type Occasion = {
  _id: string;
  name: string;
  slug: string;
  image: string;

  productsCount: number;
};

export type OccasionResponse = {
  occasions: Occasion[];
};
