type Statistics = {
  overall: {
    totalProducts: number;
    totalOrders: number;
    totalCategories: number;
    totalRevenue: number;
  };
};

export type StatisticsResponse = {
  message: string;
  statistics: Statistics;
};

type CategoiresStats = {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
};

export type CategoiresStatisticsResponse = {
  message: string;
  statistics: CategoiresStats[];
};
