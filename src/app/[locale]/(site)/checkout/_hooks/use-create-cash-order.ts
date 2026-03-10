"use client";

import { useMutation } from "@tanstack/react-query";
import { createCashOrder } from "../_actions/cash-order.action";
import { CreateCashOrderPayload } from "@/lib/types/address";

export const useCreateCashOrder = () => {
  return useMutation({
    mutationFn: async (payload: CreateCashOrderPayload) =>
      await createCashOrder(payload),
  });
};