import Image from "next/image";
import { cn } from "@/lib/utils/tailwind-merge";
import { IOccasionCardProps } from "@/lib/types";

const OccasionCard = ({ occasion, height, children }: IOccasionCardProps) => {
    return (
        <div
            className={cn("rounded-lg overflow-hidden relative w-full",height === 440 ? "h-[440px]" : "h-[270px]" )}
        >
            {/* image */}
            <Image src={occasion.image} alt={occasion.title} fill
                className="object-cover" />
            {/* text overlay */}
            <div className='bg-black/20 absolute bottom-0 left-0 right-0 h-full'>
                <div className='absolute bottom-0 left-0 p-6'>
                    {/* badge */}
                    {occasion.badge && <p className="bg-maroon-200 text-white mb-2 rounded-full text-sm px-1 w-fit">{occasion.badge}</p>}
                    {/* title */}
                    <p className='text-white font-semibold text-2xl leading-6'>{occasion.title}</p>
                    {/* description */}
                    {occasion.description && <p className='text-white '>{occasion.description}</p>}
                    {/* children */}
                    {children && <div className="mt-4">{children}</div>}
                </div>
            </div>
        </div>
    );
};

export default OccasionCard;