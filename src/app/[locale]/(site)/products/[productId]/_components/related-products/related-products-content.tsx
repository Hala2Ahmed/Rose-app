import React from 'react';
import { getSimilarProductService } from '../../_services/similar-products/similar-products.service';
import Content from './carousel-content';

type RelatedProductsContentProps = {
    productId: string,
}

export default async function RelatedProductsContent({productId}: RelatedProductsContentProps) {
    // services
    const data = await getSimilarProductService(productId);

    return (
        <Content items={data.similarProducts} />
    )
}