import { cn } from "@/lib/utils/tailwind-merge";

type SubTitleProps = {
  title: string;
  className?: string;
};

export default function SubTitle({ title, className }: SubTitleProps) {
  return (
    <p
      className={cn(
        "uppercase font-bold text-softPink-600 tracking-widest dark:text-maroon-400",
        className,
      )}
    >
      {title}
    </p>
  );
}
