"use client";

import { useState } from "react";
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
  //State
  const [quantity, setQuantity] = useState(initialQty);

  //Hooks
  const { data: session } = useSession();
  const updateCart = useUpdateCart(productId, !!session?.user);

  //Functions
  const handleChange = (val: number) => {
    if (val < 1 || val > stock) return;

    const previousQty = quantity;
    setQuantity(val);

    updateCart.mutate(val, {
      onError: () => {
        setQuantity(previousQty);
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Decrement button */}
      <Button
        variant="secondary"
        disabled={quantity <= 1 || updateCart.isPending}
        onClick={() => handleChange(quantity - 1)}
      >
        <Minus className="size-4" />
      </Button>

      {/* Quantity input */}
      <Input
        type="number"
        className="w-24 text-center border rounded-md py-1 focus:outline-none focus:ring-1 focus:ring-maroon-500"
        value={quantity}
        onChange={(e) => {
          const newVal = parseInt(e.target.value) || 1;
          if (newVal >= 1 && newVal <= stock) {
            const previousQty = quantity;
            setQuantity(newVal);

            updateCart.mutate(newVal, {
              onError: () => {
                setQuantity(previousQty);
              },
            });
          }
        }}
        min={1}
        max={stock}
      />

      {/* Increment button */}
      <Button
        variant="secondary"
        disabled={quantity >= stock || updateCart.isPending}
        onClick={() => handleChange(quantity + 1)}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
