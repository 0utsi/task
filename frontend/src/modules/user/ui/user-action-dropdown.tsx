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
        <DropdownMenuItem
          onSelect={() => {
            console.log(userId);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            console.log(userId);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
