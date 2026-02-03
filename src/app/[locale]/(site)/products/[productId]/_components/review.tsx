import { renderStars } from '@/lib/utils/render-stars';
import { Review as ReviewType } from '../../../../../../lib/types/reviews.js';
import { useFormatter } from 'next-intl';

type ReviewProps = {
    review: ReviewType;
};

export default function Review({ review }: ReviewProps) {
    //translation
    const format = useFormatter();

    return (
        <div className='flex flex-col gap-2.5 pb-4 border-b border-zinc-100 px-2 pt-2'>
            {/*User Info */}
            <div className='flex gap-2.5'>
                <div className="w-11 h-11 rounded-full bg-maroon-600 flex flex-col items-center justify-center font-semibold text-xl leading-100 text-white">
                    {review.user.firstName.charAt(0)}
                </div>
                <div className="flex flex-col">
                    <span className='dark:text-zinc-50 text-zinc-800 font-semibold text-base'>{review.user.firstName}</span>
                    <span className='dark:text-zinc-500 text-zinc-400 font-medium text-sm'>{format.dateTime(new Date(review.createdAt), "short-date")}</span>
                </div>
            </div>

            {/*Rating */}
            <div className="flex items-center gap-1">
                <span className="flex gap-1">{renderStars(review.rating)}</span>
                <span className='text-black dark:text-white font-semibold text-base leading-100'>({review.rating})</span>
            </div>

            {/*Review */}
            <div className='flex flex-col gap-1.5'>
                <span className='font-semibold text-base leading-100 text-black dark:text-zinc-50'>{review.title}!</span>
                <span className="font-normal text-base text-zinc-600 dark:text-zinc-300leading-125">{review.comment}!</span>
            </div>
        </div>
    )
}
