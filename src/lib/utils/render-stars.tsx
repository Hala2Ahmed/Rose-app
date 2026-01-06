import { Star } from "lucide-react";

export const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className="w-4 h-4 fill-[#FBA707] text-[#FBA707]"
      />
    );
  }

  // Half star
  if (hasHalfStar && fullStars < 5) {
    stars.push(
      <div key="half" className="relative w-4 h-4">
        <Star className="w-4 h-4 text-[#FBA707]" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="w-4 h-4 fill-[#FBA707] text-[#FBA707]" />
        </div>
      </div>
    );
  }

  // Empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-[#FBA707]" />);
  }

  return stars;
};
