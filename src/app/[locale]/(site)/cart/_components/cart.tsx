import CartContent from "./cart-content";
import ContinueShopping from "./continue-shopping-btn";

export default function Cart() {
  return (
    <div className="w-[49rem] mb-12">
      <CartContent />
      <ContinueShopping />
    </div>
  );
}
