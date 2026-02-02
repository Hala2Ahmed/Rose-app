import Image from "next/image";

import React from "react";

const HERO_IMAGE = "/assets/images/image4.png";

export default function FormHeroImage() {
  return (
    <div className="max-w-3.5xl w-full relative flex-shrink-0">
      <Image
        src={HERO_IMAGE}
        alt="chocolate box"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
