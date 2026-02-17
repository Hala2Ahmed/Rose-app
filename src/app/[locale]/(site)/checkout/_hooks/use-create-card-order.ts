"use client";

import { useMutation } from "@tanstack/react-query";
import { createCardOrder } from "../_actions/card-order.action";
import { createCardOrderPayload } from "@/lib/types/address";

export const useCreateCardOrder = () => {
  return useMutation({
    mutationFn: async (payload: createCardOrderPayload) =>
      await createCardOrder(payload),
  });
};