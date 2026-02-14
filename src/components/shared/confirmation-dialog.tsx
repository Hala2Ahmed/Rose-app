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
import { useTranslations } from "next-intl"
import { Dispatch, SetStateAction } from "react"

type Props = {
    isPending: boolean;
    trigger: React.ReactNode;
    onConfirm: () => void;
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    confirmMessage: string,
}

export function DeleteAddressDialog({ confirmMessage,open, isPending, trigger, onConfirm, setOpen }: Props) {
    //Translation 
    const t = useTranslations("common");

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent className="w-474 rounded-2xl bg-white">
                {/* X icon */}
                <div className="flex justify-end pb-6">
                    <AlertDialogCancel
                        asChild
                        onClick={() => setOpen(false)}
                    >
                        <button className="text-gray-opacity hover:opacity-70">
                            <X size={20} />
                        </button>
                    </AlertDialogCancel>
                </div>

                {/* Header */}
                <AlertDialogHeader className="items-center text-center">
                    {/* Icon */}
                    <div className="mb-8 flex h-26 w-26 items-center justify-center rounded-full bg-dark-gray-5">
                        <div className="flex h-18 w-18 items-center justify-center rounded-full bg-dark-gray-15">
                            <Trash size={29} />
                        </div>
                    </div>

                    {/*Description */}
                    <AlertDialogTitle className="font-semibold text-5 leading-100 text-dark-gray">
                        {confirmMessage}
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
                            {t("cancel")}
                        </Button>
                    </AlertDialogCancel>

                    {/*Confirm button */}
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isPending}
                        loading={isPending}
                    >
                        {t("confirm")}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
