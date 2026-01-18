"use client";

import * as React from "react";
import { cn } from "@/lib/utils/tailwind-merge";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input-password";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationFirst,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select } from "@/components/ui/input-select";
import { FileInput } from "@/components/ui/input-file";
import { PhoneInput } from "@/components/ui/phone-input";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UIExample() {
  return (
    <main className="p-8 space-y-12 bg-zinc-50 dark:bg-zinc-900 min-h-screen">
      {/* ========== Toasts ========== */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          Toasts
        </h2>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => toast("Default Toast")}>Default</Button>
          <Button onClick={() => toast.success("Success Toast")}>
            Success
          </Button>
          <Button onClick={() => toast.error("Error Toast")}>Error</Button>
        </div>
      </section>

      {/* ========== Badges ========== */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          Badges
        </h2>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="subtle">Subtle</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="primary">Primary</Badge>
        </div>
      </section>

      {/* ========== Password Input ========== */}
      <section className="space-y-2 w-72">
        <Label>Password Input</Label>
        <InputPassword placeholder="Enter password" status="default" />
        <InputPassword placeholder="Enter password" status="error" />
        <InputPassword placeholder="Enter password" status="disabled" />
      </section>

      {/* ========== OTP Input ========== */}
      <section className="space-y-2">
        <Label>OTP Input</Label>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            {[0, 1, 2].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
          <InputOTPGroup>
            {[3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </section>

      {/* ========== Select & File Input ========== */}
      <section className="flex flex-col gap-4 w-72">
        <Label>Select Inputs</Label>
        <Select status="default">
          <option>Option 1</option>
          <option>Option 2</option>
        </Select>
        <Select status="error">
          <option>Option 1</option>
          <option>Option 2</option>
        </Select>
        <Select status="disabled">
          <option>Option 1</option>
          <option>Option 2</option>
        </Select>

        <Label>File Inputs</Label>
        <FileInput />
        <FileInput status="error" />
        <FileInput status="disabled" />
      </section>

      {/* ========== Phone Input ========== */}
      <section className="w-80">
        <Label>Phone Input</Label>
        <PhoneInput
          defaultCountry="EG"
          placeholder="Enter your phone number"
          className={cn("w-full")}
        />
      </section>

      {/* ========== Pagination ========== */}
      <section className="space-y-2">
        <Label>Pagination</Label>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>

      {/* ========== Breadcrumbs ========== */}
      <section className="space-y-4">
        <Label>Breadcrumbs</Label>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Task 1</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Task 2</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* ========== Dropdown Menu ========== */}
      <section className="space-y-2">
        <Label>Dropdown Menu</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts{" "}
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </main>
  );
}
