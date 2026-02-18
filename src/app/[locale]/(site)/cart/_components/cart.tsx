import CartContent from "./cart-content";
import ContinueShopping from "./continue-shopping-btn";

export default function Cart() {
  return (
    <div className="max-w-[782px] mb-12">
      <CartContent />
      <ContinueShopping />
    </div>
  );
}
