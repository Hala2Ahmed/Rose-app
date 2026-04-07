import CartContent from "./cart-content";
import ContinueShopping from "./continue-shopping-btn";

export default function Cart() {
  return (
    <div className="max-w-[49rem] w-full mb-12">
      <CartContent />
      <ContinueShopping />
    </div>
  );
}
