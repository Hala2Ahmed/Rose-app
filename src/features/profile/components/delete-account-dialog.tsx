"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteAccountMutation } from "@/hooks/use-profile-mutations";

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteAccountMutation();

  const handleConfirm = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-maroon-600 dark:text-maroon-400 hover:underline"
      >
        Delete My Account
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Delete account</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center text-center py-2">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-[110px] h-[110px] flex items-center justify-center rounded-full bg-[#2E2E300D] dark:bg-zinc-800/80 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[70px] h-[70px] rounded-full bg-[#E5E5E5] dark:bg-zinc-600 shadow-inner" />
                </div>
                <Trash2 className="relative z-10 w-[29px] h-[29px] text-zinc-800 dark:text-zinc-200" />
              </div>
            </div>
            <p className="font-semibold text-zinc-800 dark:text-zinc-200 text-base">
              Are you sure you want to delete your account?
            </p>
            <p className="text-sm text-red-600 dark:text-red-400 font-medium mt-2">
              This action is permanent and cannot be undone.
            </p>
          </div>
          <DialogFooter className="flex flex-row gap-2 justify-center sm:justify-center pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
              disabled={deleteMutation.isPending}
            >
              No, keep it
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="flex-1"
              onClick={handleConfirm}
              loading={deleteMutation.isPending}
              disabled={deleteMutation.isPending}
            >
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
