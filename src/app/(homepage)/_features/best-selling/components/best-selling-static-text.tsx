import { ArrowRight } from "lucide-react";

import Link from "next/link";

import React from "react";

export default function BestSellingStaticText() {
  return (
    <section className="max-w-72">
      <h4 className="uppercase text-softPink-500 font-medium mb-3 tracking-extra-wide">
        Best Selling
      </h4>

      <h2 className="font-bold text-3xl text-maroon-700 capitalize">
        <span className="text-softPink-500"> check Out </span> what everyone’s
        <span className="text-softPink-500"> buying</span> right Now
      </h2>

      <p className="mt-2 text-zinc-500">
        Not sure what to choose? Start with our best sellers, these are the
        gifts our customers keep coming back for. Whether you&apos;re
        celebrating a birthday, anniversary or wedding, our top picks are
        guaranteed to leave a lasting impression.
      </p>

      <Link
        className="bg-maroon-600 mt-16 text-white py-2 px-6 pr-10 rounded-xl relative inline-flex items-center gap-2 w-fit hover:bg-maroon-700 transition-colors"
        href={"/products"}>
        Explore Gifts
        <ArrowRight className="w-5 h-5" />
      </Link>
    </section>
  );
}
