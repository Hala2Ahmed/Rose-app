import React from "react";

import BestSellingStaticText from "./components/best-selling-static-text";
import { BestSellingCarousel } from "./components/best-selling-carousel";

export default function BestSellingIndex() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      <div className="lg:flex-shrink-0">
        <BestSellingStaticText />
      </div>
      <div className="flex-1 w-full min-w-0">
        <BestSellingCarousel />
      </div>
    </div>
  );
}
