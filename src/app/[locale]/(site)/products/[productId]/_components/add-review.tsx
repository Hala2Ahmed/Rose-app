'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import SubmissionFeedback from '@/components/shared/submission-feedback';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { AddReviewFields } from '@/lib/types/reviews';
import { addReviewSchema } from '@/lib/schemes/reviews.schema';
import useAddReview from '../_hooks/use-add-review';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from './star-rating';

type AddReviewProps = {
    productId: string;
};

export default function AddReview({ productId }: AddReviewProps) {
    //Translation
    const t = useTranslations("review");

    // Mutation
    const { addReview, isPending, error } = useAddReview();

    // Form
    const form = useForm<AddReviewFields>({
        defaultValues: {
            title: '',
            comment: '',
            rating: 0,
        },
        resolver: zodResolver(addReviewSchema(t)),
        mode: 'onSubmit',
    });

    //Functions
    const onSubmit: SubmitHandler<AddReviewFields> = async (values) => {
        addReview({ fields: values, product: productId }, {
            onSuccess: () => {
                form.reset({ title: "", comment: "", rating: 0 });
            },
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2.5 text-zinc-800 dark:text-zinc-50"
            >
                {/* Rating */}
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem className=''>
                            <div className='flex items-center gap-2.5'>
                                {/* label */}
                                <FormLabel>{t("your-rating")}:</FormLabel>
                                {/* field */}
                                <FormControl>
                                    <StarRating value={field.value} onChange={field.onChange} />
                                </FormControl>
                            </div>
                            {/* feedback */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            {/* label */}
                            <FormLabel>{t("title-label")}</FormLabel>
                            {/* field */}
                            <FormControl>
                                <Input {...field} placeholder={t("title-placeholder")} />
                            </FormControl>
                            {/* feedback */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Review */}
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            {/* label */}
                            <FormLabel>{t("review-label")}</FormLabel>
                            {/* field */}
                            <FormControl>
                                <Textarea {...field} placeholder={t("review-placeholder")} />
                            </FormControl>
                            {/* feedback */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* API Error */}
                {error && <SubmissionFeedback>{error.message}</SubmissionFeedback>}

                {/* Submit */}
                <Button
                    type="submit"
                    loading={isPending}
                    variant={"primary"}
                    className="w-full mt-10 dark:text-zinc-800 dark:bg-softPink-300 dark:hover:bg-softPink-400"
                    disabled={!form.formState.isValid && form.formState.isSubmitted}
                >
                    {t('add-review')}
                </Button>
            </form>
        </Form>
    )
}