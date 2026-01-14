"use client";

import React, { useState } from "react";
import {
  BellIcon,
  BrushCleaning,
  CheckCheck,
  EllipsisVertical,
  Check,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { Notification, NotificationsResponse } from "@/lib/types/notifications";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyNotifications from "./empty-notifications";

// Props type
interface NotificationsProps {
  notificationCount?: number;
}

// Mock API Response
const MOCK_RESPONSE: NotificationsResponse = {
  data: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: "Your Order Has Been Shipped",
    description:
      "Your order #12345 has been shipped and will arrive in 2-3 business days.",
    read: i % 3 === 0,
  })),
};

export default function Notifications({
  notificationCount = 0,
}: NotificationsProps) {
  // notifications per page
  const PAGE_SIZE = 5;

  // current notifications state
  const [notifications, setNotifications] = useState<Notification[]>(
    MOCK_RESPONSE.data.slice(0, PAGE_SIZE)
  );

  // whether there are more notifications to load
  const [hasMore, setHasMore] = useState(true);

  // Simulates API fetching more items
  const fetchMoreNotifications = () => {
    const currentLength = notifications.length;
    const nextItems = MOCK_RESPONSE.data.slice(
      currentLength,
      currentLength + PAGE_SIZE
    );

    // simulate API delay
    setTimeout(() => {
      setNotifications((prev) => [...prev, ...nextItems]);

      if (currentLength + nextItems.length >= MOCK_RESPONSE.data.length) {
        setHasMore(false);
      }
    }, 500);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-full"
        >
          <BellIcon size={30} className="h-4 w-4 text-[#3F3F46]" />

          {notificationCount > 0 && (
            <Badge
              className="absolute -top-0.5 right-0.5 h-4 w-4 p-0 text-xs flex items-center justify-center rounded-full"
              variant="destructive"
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-[21rem] rounded-xl p-0 border-none"
      >
        {/* notification */}
        <DropdownMenuLabel className=" text-white bg-[#741C21] text-xl px-4 py-3 dark:bg-[#FFC2D0] dark:text-[#27272A]">
          Notifications <span> ({notificationCount})</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="flex justify-between px-2.5 py-0 border-b border-[#D4D4D8] dark:border-[#52525B] dark:bg-[#3F3F46]">
          <Button
            disabled={notifications.length === 0}
            className="bg-transparent text-[#000000] hover:bg-transparent border-none shadow-none p-0 text-xs font-semibold dark:text-[#FAFAFA]"
          >
            <BrushCleaning className="text-[#71717A] dark:text-[#A1A1AA]" />
            Clear all notifications
          </Button>
          <Button
            disabled={notifications.length === 0}
            className="bg-transparent text-[#000000] hover:bg-transparent border-none shadow-none p-0 text-xs font-semibold dark:text-[#FAFAFA]"
          >
            <CheckCheck className="text-[#71717A] dark:text-[#A1A1AA]" />
            Mark all as read
          </Button>
        </DropdownMenuLabel>

        {notifications.length === 0 ? (
          <EmptyNotifications />
        ) : (
          <div
            id="notifications-scroll"
            className="max-h-[320px] overflow-auto"
          >
            {/* infinite scroll */}

            <InfiniteScroll
              dataLength={notifications.length}
              next={fetchMoreNotifications}
              hasMore={hasMore}
              loader={
                <p className="text-center text-sm py-3 text-muted-foreground">
                  Loading...
                </p>
              }
              endMessage={
                <p className="text-center text-sm py-3 text-muted-foreground">
                  No more notifications
                </p>
              }
              scrollableTarget="notifications-scroll"
            >
              {/* notification */}
              {notifications.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className={`flex justify-between items-start rounded-none px-4 py-3 border-b border-[#D4D4D8] dark:border-[#52525B] ${
                    !item.read
                      ? "bg-[#E4E4E7] dark:bg-[#52525B]"
                      : "dark:bg-[#18181B]"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-md text-[#27272A] font-semibold dark:text-[#FAFAFA]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[#71717A] line-clamp-3 dark:text-[#A1A1AA]">
                      {item.description}
                    </p>
                  </div>

                  {/* sub menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-transparent hover:bg-transparent shadow-none p-0">
                        <EllipsisVertical className="text-[#A1A1AA]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-44 dark:bg-[#3F3F46] border-none"
                      align="start"
                    >
                      <DropdownMenuGroup className="py-2.5 text-[#27272A] text-sm dark:text-[#FAFAFA]">
                        <DropdownMenuItem className="hover:dark:bg-[#52525B]">
                          <Check className="text-[#71717A] dark:text-[#A1A1AA]" />
                          Mark as read
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:dark:bg-[#52525B]">
                          <Trash2 className="text-red-600 dark:text-red-500" />
                          Delete notification
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>
              ))}
            </InfiniteScroll>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
