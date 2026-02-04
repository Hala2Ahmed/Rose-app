export type SimilarProduct = {
    _id: string,
    title: string,
    imgCover: string,
    price: number,
    priceAfterDiscount: number,
    discount: number,
    rateAvg: number,
    rateCount: number,
    similarityScore: number
}

export type SimilarProducts = {
    count: number,
    similarProducts: SimilarProduct[],
}