export type Category = {
  id: string;
  name: string;
  image?: string;
  productsCount?: number;
};

export type CategoriesResponse = {
  message: string;
  categories: Category[];
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
};