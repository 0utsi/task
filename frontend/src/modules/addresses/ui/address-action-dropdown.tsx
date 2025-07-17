"use client";

import { Button } from "@/modules/shared/ui/button";
import { ConfirmDialog } from "@/modules/shared/ui/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/modules/shared/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import deleteUserAddress from "../actions/delete-address-action";
import { useRouter } from "next/navigation";

type Props = {
  addressId: number;
};

export default function AddressActionsDropdown({ addressId }: Props) {
  const [open, setOpen] = useState(false);
  const { refresh } = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleOpenChange = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  console.log(addressId);
  const handleDelete = async () => {
    console.log(addressId);
    await deleteUserAddress(addressId);
    startTransition(() => {
      refresh();
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => alert(`Edit user ${addressId}`)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleOpenChange}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        open={open}
        onClose={handleOpenChange}
        onConfirm={handleDelete}
        loading={isPending}
      />
    </>
  );
}
