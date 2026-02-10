import Image from "next/image";
import { Category } from "@/lib/types/categories";
import { cn } from "@/lib/utils/tailwind-merge";

type Props = {
  category: Category;
  isActive: boolean;
  onClick: () => void;
};

export default function CategoryItem({ category, isActive, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(`w-full flex items-center gap-2.5 rounded-sm transition cursor-pointer
        ${
          isActive
            ? "bg-maroon-50 dark:bg-softpink-100 dark:text-zinc-800"
            : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600"
        }
      `)}
    >
      <div
        className={cn(`relative w-9 h-7 rounded-l-sm overflow-hidden
          ${isActive ? "bg-maroon-600 dark:bg-softPink-300" : "bg-zinc-500"}
        `)}
      >
        <Image
          src={category?.image || ""}
          alt={category?.name}
          fill
          className="object-contain"
        />
      </div>

      <span className="text-sm capitalize">{category?.name}</span>
    </div>
  );
}
