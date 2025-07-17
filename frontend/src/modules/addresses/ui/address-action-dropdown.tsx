"use client";

import { MoreVertical } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import deleteUserAddress from "../actions/delete-address-action";
import { useRouter } from "next/navigation";
import { UserAddress } from "../entities/user-address.entity";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

type Props = {
  address: UserAddress;
  onEdit: (address: UserAddress) => void;
};

export default function AddressActionsDropdown({ address, onEdit }: Props) {
  const [open, setOpen] = useState(false);
  const { refresh } = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleOpenChange = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleDelete = async () => {
    await deleteUserAddress(address.id);
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
          <DropdownMenuItem onSelect={() => onEdit(address)}>
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
