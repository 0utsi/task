"use client";

import { Button } from "@/modules/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/modules/shared/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

type Props = {
  userId: number;
};

export default function UserActionsDropdown({ userId }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => alert(`Edit user ${userId}`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => alert(`Delete user ${userId}`)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
