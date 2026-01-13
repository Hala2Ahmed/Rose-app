import SubTitle from "@/components/shared/sub-title";
import { Button } from "@/components/ui/button";
import { ABOUT_FEATURES } from "@/lib/constants/homepage.constant";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="flex gap-20 mb-24 justify-center items-center">
      {/* Images */}
      <div className="flex gap-2">
        {/* Main Image with Decorative Border */}
        <div
          className="relative max-h-[22.6875rem] before:absolute before:-top-4 before:-left-4 before:-z-10 before:w-full before:rounded-tl-[3.125rem] before:rounded-tr-[7.5rem] before:rounded-br-[7.5rem] before:rounded-bl-[7.5rem]
 before:h-full before:border-4 before:border-maroon-600 before:rotate-3 dark:before:border-softPink-400"
        >
          <Image
            className="rounded-tl-[3.125rem] rounded-tr-[7.5rem] rounded-br-[7.5rem] rounded-bl-[7.5rem] w-full h-full object-cover"
            src="/assets/images/image8.png"
            alt="about"
            width={302}
            height={344}
          />
        </div>

        {/* Side Images */}
        <div className="flex flex-col gap-2 py-4">
          <Image
            className="rounded-full object-cover w-[12.063rem] h-[12.063rem]"
            src="/assets/images/image14.png"
            alt="about"
            width={193}
            height={193}
          />
          <Image
            className="rounded-tl-[3.125rem] rounded-tr-[6.25rem] rounded-br-[6.25rem] rounded-bl-[3.125rem] object-cover w-[12.063rem] h-36"
            src="/assets/images/image3.png"
            alt="about"
            width={193}
            height={144}
          />
        </div>
      </div>

      {/* Text */}
      <div className="py-5 max-w-2xl">
        <SubTitle title="About" />

        <h2 className="font-bold text-3xl pb-2 pt-6 text-maroon-700 dark:text-softPink-200">
          Delivering the{" "}
          <span className="text-softPink-500 dark:text-maroon-400">Finest</span>{" "}
          Gift Boxes for Your{" "}
          <span className="text-softPink-500 dark:text-maroon-400">
            Special
          </span>{" "}
          Moments
        </h2>

        <p className="text-zinc-500 dark:text-zinc-400">
          Make every moment memorable with our premium gift boxes. Carefully
          curated and beautifully packaged, each box is filled with handpicked
          items designed to impress. Whether it's for a birthday, wedding, or a
          simple “thank you,” our gift boxes are crafted to leave a lasting
          impression — because thoughtful gifting starts here.
        </p>

        <Link href="/products">
          <Button className="my-6 bg-maroon-600 dark:bg-softPink-200 dark:text-zinc-800">
            Discover
            <ArrowRight size={16} />
          </Button>
        </Link>

        <ul className="grid grid-cols-2 gap-6">
          {ABOUT_FEATURES.map((feature) => (
            <li
              key={feature.id}
              className="flex items-center gap-2 text-sm dark:bg-zinc-50"
            >
              <Check
                className="text-maroon-700 dark:text-softPink-400"
                size={20}
              />
              {feature.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
