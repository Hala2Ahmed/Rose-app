"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useUpdateCart } from "../hooks/use-update-count";
import { Input } from "@/components/ui/input";
import { UpdaterProps } from "@/lib/types/cart";

export default function CartQuantityControl({
  productId,
  stock,
  initialQty,
}: UpdaterProps) {
  const { data: session } = useSession();
  const {
    quantity,
    setQuantity,
    increment,
    decrement,
    isUpdating,
    canIncrement,
    canDecrement,
  } = useUpdateCart(productId, !!session?.user, initialQty, stock);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        disabled={!canDecrement || isUpdating}
        onClick={decrement}
      >
        <Minus className="size-4" />
      </Button>

      <Input
        type="number"
        className="w-24 text-center border rounded-md py-1 focus:outline-none focus:ring-1 focus:ring-maroon-500"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        min={1}
        max={stock}
        disabled={isUpdating}
        readOnly={isUpdating}
      />

      <Button
        variant="secondary"
        disabled={!canIncrement || isUpdating}
        onClick={increment}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
