"use client"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Trash, X } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

type Props = {
    isPending: boolean;
    trigger: React.ReactNode;
    onConfirm: () => void;
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

export function DeleteAddressDialog({ open, isPending, trigger, onConfirm, setOpen }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-[474px] rounded-2xl bg-white">
                {/* X icon */}
                <div className="flex justify-end pb-6">
                    <AlertDialogCancel
                        asChild
                        onClick={() => setOpen(false)}
                    >
                        <button className="text-[#969697] hover:opacity-70">
                            <X size={20} />
                        </button>
                    </AlertDialogCancel>
                </div>

                {/* Header */}
                <AlertDialogHeader className="items-center text-center">
                    {/* Icon */}
                    <div className="mb-8 flex h-[105px] w-[105px] items-center justify-center rounded-full bg-[#2E2E300D]">
                        <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#2E2E3026]">
                            <Trash size={29} />
                        </div>
                    </div>

                    {/*Description */}
                    <AlertDialogTitle className="font-semibold text-5 leading-100 text-dark-gray">
                        Are you sure you want to delete this address?
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <AlertDialogFooter className="grid grid-cols-2 justify-between gap-2.5 mt-20">
                    {/* Cancel button */}
                    <AlertDialogCancel
                        asChild
                        onClick={() => setOpen(false)}
                    >
                        <Button
                            variant="subtle"
                        >
                            Cancel
                        </Button>
                    </AlertDialogCancel>

                    {/*Confirm button */}
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isPending}
                        loading={isPending}
                    >
                        Confirm
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
