import OccasionCard from "./occasion-card";
import { occasionsData } from "@/lib/constants/homepage.constant";

export default function OccasionsSection() {

    return (
        <section className='flex gap-6'>
            {/* occasions */}
            {occasionsData.map((occasion, index) => (
                // occasion card
                <OccasionCard key={index} occasion={occasion} height={270} />
            ))}
        </section>
    )
}
