import { EllipsisVertical } from "lucide-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components//ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { generateBackground } from "@/lib/utils/generate-background";
import { CustomDropDownMenu } from "./drop-down-menu";

export default async function Footer() {
  //user data
  const session = await getServerSession(authOptions);

  return (
    <SidebarFooter className="px-6 py-6 border-t border-black/5 dark:bg-zinc-800">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                className="flex items-center justify-center pt-4 pb-6 
                            overflow-visible hover:bg-transparent active:bg-transparent 
                            data-[state=open]:bg-transparent"
              >
                {/* Profile pic */}
                {session?.user?.photo ? (
                  <Image
                    src={session?.user.photo || ""}
                    alt="Avatar"
                    width={54}
                    height={54}
                    className="rounded-full"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full
                                    flex flex-col flex-shrink-0 items-center justify-center 
                                    text-lg font-bold"
                    style={{
                      backgroundColor: generateBackground(
                        session?.user.firstName || "U",
                      ),
                    }}
                  >
                    {session?.user.firstName.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Profile name and email */}
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200 leading-100">
                    {session?.user.firstName} {session?.user.lastName}
                  </span>
                  <span className="text-softGray dark:text-zinc-500 text-sm font-semibold leading-100">
                    {session?.user.email}
                  </span>
                </div>

                {/* Vertical ellipsis for user menu */}
                <EllipsisVertical className="ml-auto" size={18} />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            {/* User menu */}
            <CustomDropDownMenu />
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
