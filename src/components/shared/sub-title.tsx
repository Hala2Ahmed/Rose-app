type SubTitleProps = {
  title: string;
  className?: string;
};

const subTitleClasses =
  "uppercase font-bold text-softPink-600 tracking-widest dark:text-maroon-400";
  
export default function SubTitle({ title, className }: SubTitleProps) {
  return <p className={`${subTitleClasses} ${className}`}>{title}</p>;
}
