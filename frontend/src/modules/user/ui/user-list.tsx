import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/modules/shared/ui/table";
import { Button } from "@/modules/shared/ui/button";
import Link from "next/link";
import { UserStatus, type User } from "@/db/entities/user.entity";
import { use } from "react";
import { InfoIcon } from "lucide-react";

type Props = {
  data: Promise<User[]>;
};

export default function UsersList({ data }: Props) {
  const users = use(data);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Button variant="default">Create user</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                {[u.firstName, u.lastName].filter(Boolean).join(" ")}
              </TableCell>

              <TableCell>
                <Link
                  href={`/users/${u.id}/addresses`}
                  className="text-blue-600 hover:underline"
                >
                  {u.email}
                </Link>
              </TableCell>

              <TableCell>{u.createdAt.toLocaleDateString()}</TableCell>

              <TableCell className="flex flex-row gap-2">
                {u.status}
                <div
                  className={`size-5 rounded-full ${
                    u.status === UserStatus.ACTIVE
                      ? "bg-green-500"
                      : "bg-red-600"
                  }`}
                />
              </TableCell>

              <TableCell>
                <InfoIcon className="cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
