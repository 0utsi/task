"use client";

import { User } from "@/db/entities/user.entity";

import { Button } from "@/modules/shared/ui/button";
import { DataTable } from "@/modules/shared/ui/data-table";
import columns from "./column-render";

type Props = {
  data: User[];
};

export default function UsersList({ data }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Button variant="default">Create user</Button>
      </div>
      <DataTable<User>
        data={data}
        columns={columns}
        rowKey={(u) => u.id.toString()}
      />
    </div>
  );
}
