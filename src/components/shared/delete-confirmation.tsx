"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, Loader2 } from "lucide-react";
import SubmissionError from "./submission-error";
import { useState } from "react";

type DeleteConfirmationProps = {
  deleteFn: () => void;
  error?: string;
  deleteTitle: string;
  deleteContent: string;
  deleteSubtitle?: string;
  cancelButtonText: string;
  confirmButtonText: string;
  isDeleting?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function DeleteConfirmation({
  deleteFn,
  error,
  deleteTitle,
  deleteContent,
  deleteSubtitle,
  cancelButtonText,
  confirmButtonText,
  isDeleting = false,
  onOpenChange,
}: DeleteConfirmationProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isDeleting) {
      setOpen(newOpen);
      onOpenChange?.(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-transparent text-red-600 hover:bg-red-100">
          {deleteTitle}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => isDeleting && e.preventDefault()}
        onEscapeKeyDown={(e) => isDeleting && e.preventDefault()}>
        <DialogHeader className="items-center space-y-4">
          {/* Icon */}
          <div className="mt-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Trash className="h-7 w-7 text-red-600" aria-hidden="true" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-2 text-center">
            <DialogTitle className="text-xl font-semibold">
              {deleteContent}
            </DialogTitle>
            {deleteSubtitle && (
              <DialogDescription className="text-base text-red-600">
                {deleteSubtitle}
              </DialogDescription>
            )}
          </div>
        </DialogHeader>

        {error && <SubmissionError errorMessage={error} />}

        <DialogFooter className="mt-6 flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full sm:w-1/2"
              disabled={isDeleting}>
              {cancelButtonText}
            </Button>
          </DialogClose>
          <Button
            onClick={deleteFn}
            className="w-full sm:w-1/2"
            variant="destructive"
            disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              confirmButtonText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
