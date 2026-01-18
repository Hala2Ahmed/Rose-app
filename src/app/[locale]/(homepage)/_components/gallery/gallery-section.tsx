import Image from "next/image";
import React from "react";
import SubTitle from "@/components/shared/sub-title";
import { GALLERY_FEATURES } from "@/lib/constants/homepage.constant";
import MainTitle from "@/components/shared/main-title";
import { useTranslations } from "next-intl";

export default function Gallery() {
  // Translation
  const t = useTranslations("gallery");

  return (
    <section>
      {/* Section Header */}
      <SubTitle className="text-center" title={t("title")} />
      <header className="text-center mt-2 mb-10">
        <MainTitle title={t("header")} />
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
