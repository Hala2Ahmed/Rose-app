import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProductBySlug } from "../../(homepage)/_services/products.service";
import { renderStars } from "@/lib/utils/render-stars";
import { ShoppingCart, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const price = product.priceAfterDiscount ?? product.price;
  const hasDiscount =
    product.priceAfterDiscount != null &&
    product.priceAfterDiscount < product.price;

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-maroon-600 dark:text-maroon-400 hover:underline mb-6 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>

      <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-700">
          <Image
            src={product.imgCover}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="font-primary font-bold text-2xl md:text-3xl text-zinc-900 dark:text-white">
            {product.title}
          </h1>

          {product.rateAvg != null && (
            <div className="flex items-center gap-2 mt-2">
              {renderStars(product.rateAvg)}
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {product.rateAvg.toFixed(1)} ({product.rateCount ?? 0} ratings)
              </span>
            </div>
          )}

          {product.description && (
            <p className="mt-4 text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <span className="font-primary font-bold text-2xl text-zinc-900 dark:text-white">
              {typeof price === "number" ? price.toFixed(2) : price}
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">EGP</span>
            {hasDiscount && (
              <span className="text-zinc-400 dark:text-zinc-500 line-through text-lg">
                {product.price.toFixed(2)} EGP
              </span>
            )}
          </div>

          {product.quantity != null && product.quantity <= 0 && (
            <p className="mt-2 text-red-600 dark:text-red-400 font-medium text-sm">
              Out of stock
            </p>
          )}

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              disabled={product.quantity != null && product.quantity <= 0}
              className="inline-flex items-center gap-2 bg-maroon-600 hover:bg-maroon-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to cart
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
