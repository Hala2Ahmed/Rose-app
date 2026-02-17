import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DialogCom() {
  return (
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Add new address</DialogTitle>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
