import React from 'react';
import { getSimilarProductService } from '../../../lib/services/similar-products/similar-products.service';
import ContentCarousel from './carousel-content';
import { getTranslations } from 'next-intl/server';

type RelatedProductsContentProps = {
    categoryId: string,
}

export default async function RelatedProductsContent({ categoryId }: RelatedProductsContentProps) {
    // Transitions
    const t = await getTranslations("related-products");

    // services
    const data = await getSimilarProductService(categoryId);

    if (!data.products || data.products.length === 0) {
        return (
            <p className="text-center py-8">
                {t('related-products-empty')}
            </p>
        );
    }
    return (
        <ContentCarousel items={data.products} />
    )
}