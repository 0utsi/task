"use client";

import { User } from "@/modules/user/entities/user.entity";

import columns from "./column-render";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  data: User[];
};

export default function UsersList({ data }: Props) {
  const { push } = useRouter();
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
        onRowClick={(user) => push(`/users/${user.id}/addresses`)}
      />
    </div>
  );
}
