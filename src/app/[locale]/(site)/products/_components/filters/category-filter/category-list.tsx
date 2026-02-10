import InfiniteScroll from "react-infinite-scroll-component";
import { Category } from "@/lib/types/categories";
import CategoryItem from "./category-item";

type Props = {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (id: string) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  loadingLabel: string;
  endLabel: string;
};

export default function CategoryList({
  categories,
  selectedCategory,
  onSelect,
  fetchNextPage,
  hasNextPage,
  loadingLabel,
  endLabel,
}: Props) {
  return (
    <InfiniteScroll
      height={199}
      dataLength={categories.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<p className="text-xs text-center">{loadingLabel}</p>}
      endMessage={<p className="text-xs text-center">{endLabel}</p>}
      className="scrollbar-hide"
    >
      <div className="space-y-1">
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            isActive={selectedCategory === category._id}
            onClick={() => onSelect(category._id)}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}