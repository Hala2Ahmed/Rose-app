import React from "react";
import { Package } from "lucide-react";

export default function EmptyProductState() {
  return (
    <div className="min-h-96 bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <Package className="w-10 h-10 text-gray-400" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No Products Found
        </h2>
      </div>
    </div>
  );
}
