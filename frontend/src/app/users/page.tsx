import UsersList from "@/modules/user/ui/user-list";
import { usersRepo } from "@/modules/user/user.repository";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function UsersPage() {
  const usersPromise = usersRepo.usersList(1, 10);

  return (
    <main className="p-6">
      <Suspense fallback={<div className="spinner" />}>
        <UsersList data={usersPromise} />
      </Suspense>
      <div className="spinner" />
    </main>
  );
}
