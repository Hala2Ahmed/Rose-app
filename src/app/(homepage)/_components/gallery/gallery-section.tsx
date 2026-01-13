import Image from "next/image";
import React from "react";
// import MainTitle from "@/components/shared/shard-title";
import SubTitle from "@/components/shared/sub-title";
import { GALLERY_FEATURES } from "@/lib/constants/homepage.constant";

export default function Gallery() {
  return (
    <section>
      {/* Section Header */}
      <SubTitle className="text-center" title="Gallery" />
      <header className="text-center mt-2 mb-10">
        {/* <MainTitle title="Check Out our Wonderful Gallery" />  This code is based on someone else's code, so I will add it later. */}
      </header>

      {/* Masonry Gallery */}
      <div className="columns-3 gap-3 space-y-3.5">
        {GALLERY_FEATURES.map((image) => (
          <div
            key={image.id}
            className="relative w-full break-inside-avoid"
            style={{ height: image.height }}
          >
            <Image
              src={image.src}
              alt="Gallery image"
              fill
              sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
