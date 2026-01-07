import Image from "next/image";
import React from "react";
// import MainTitle from "@/components/shared/shard-title";
import SubTitle from "@/components/shared/sub-title";

export default function Gallery() {
  const galleryImages = [
    { src: "/assets/images/image11.png", height: "38.563rem" },
    { src: "/assets/images/image12.png", height: "25.3rem" },
    { src: "/assets/images/image5.png", height: "25.688rem" },
    { src: "/assets/images/image10.png", height: "38.188rem" },
    { src: "/assets/images/image10.png", height: "25.688rem" },
    { src: "/assets/images/image7.png", height: "38.188rem" },
  ];

  return (
    <section>
      {/* Section Header */}
      <SubTitle className="text-center" title="Gallery" />
      <header className="text-center mt-2 mb-10">
        {/* <MainTitle title="Check Out our Wonderful Gallery" />  This code is based on someone else's code, so I will add it later. */}
      </header>

      {/* Masonry Gallery */}
      <section className="columns-3 gap-3 space-y-3.5">
        {galleryImages.map((image, index) => (
          <div
            key={index}
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
      </section>
    </section>
  );
}
