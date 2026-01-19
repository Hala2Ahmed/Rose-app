type MainTitleProps = {
  title: string;
};
const titleClasses =
  "relative inline-block pb-2 text-4xl font-bold text-maroon-700 " +
  "before:absolute before:top-6 before:rounded-r-2xl before:max-h-4 before:max-w-[72%] before:left-0 before:right-0 before:min-h-5 before:bg-softPink-100 before:-z-10 " +
  "after:absolute after:top-10 after:left-0 after:right-0 after:h-0.5 after:max-w-[28%] after:bg-softPink-600 after:content-['']";
export default function MainTitle({ title }: MainTitleProps) {
  return <h1 className={titleClasses}>{title}</h1>;
}
