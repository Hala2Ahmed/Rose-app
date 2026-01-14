import { BellOffIcon } from "lucide-react";
import React from "react";

export default function EmptyNotifications() {
  return (
    <div className="text-center text-[#71717A] py-[4.5rem] space-y-2.5 dark:bg-[#3F3F46] dark:text-[#A1A1AA]">
      <BellOffIcon strokeWidth={1} size={50} className="mx-auto" />
      <p className="text-sm">No notifications to display.</p>
    </div>
  );
}
