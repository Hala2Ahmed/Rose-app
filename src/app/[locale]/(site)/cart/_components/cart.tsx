import { Suspense } from "react";
import CartSkeleton from "@/components/skeletons/cart.skeleton";
import ContinueShopping from "./continue-shopping-btn";
import CartContent from "./cart-content";

export default function CartPage() {
  return (
    <div className="max-w-[782px] mb-12">
      <Suspense fallback={<CartSkeleton />}>
        <CartContent />
      </Suspense>

      {/* Continue Shopping btn */}
      <ContinueShopping />
    </div>
  );
}
