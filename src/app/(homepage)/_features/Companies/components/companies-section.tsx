import Image from "next/image";
import React from "react";

export default function Companies() {
  const companies = [
    { id: 1, name: "Brand 1", logo: "/assets/brands/1.png" },
    { id: 2, name: "Brand 2", logo: "/assets/brands/2.png" },
    { id: 3, name: "Brand 3", logo: "/assets/brands/3.png" },
    { id: 4, name: "Brand 4", logo: "/assets/brands/4.png" },
    { id: 5, name: "Brand 5", logo: "/assets/brands/5.png" },
    { id: 6, name: "Brand 6", logo: "/assets/brands/6.png" },
  ];

  return (
    <section className="bg-maroon-50 rounded-2xl py-10 text-center mb-80 dark:bg-zinc-700">
      {/* Section Title */}
      <h2 className="text-4xl text-maroon-700 font-bold dark:text-softPink-200">
        Trusted by over 
        <span className="text-softPink-500 dark:text-maroon-400">4.5k+</span>
         companies
      </h2>

      {/* Company Logos */}
      <div className="flex gap-11 justify-center items-center mt-10">
        {companies.map((company) => (
          <Image
            key={company.id}
            src={company.logo}
            alt={company.name}
            width={146}
            height={51}
          />
        ))}
      </div>
    </section>
  );
}
