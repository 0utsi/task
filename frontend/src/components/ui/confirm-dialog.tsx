"use client";

import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "./button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from "./dialog";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
};

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This operation cannot be undone.",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="gap-1 py-3 px-6">
        <DialogTitle />
        <DialogHeader>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </DialogHeader>
        <DialogDescription />
        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
