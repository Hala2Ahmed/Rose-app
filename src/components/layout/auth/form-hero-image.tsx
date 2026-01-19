import Image from "next/image";

import React from "react";

//variables
const HERO_IMAGE = "/assets/images/image4.png";

export default function FormHeroImage() {
  return (
    <div className="w-full max-w-3.5xl relative min-h-screen">
      <Image
        src={HERO_IMAGE}
        alt="chocolate box"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
