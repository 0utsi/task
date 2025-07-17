import UsersList from "@/modules/user/ui/user-list";
import { PaginationControls } from "@/modules/user/ui/user-pagination";
import { usersRepo } from "@/modules/user/user.repository";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const { page: rawPage, pageSize: rawSize } = await searchParams;
  const page = parseInt(rawPage ?? "1", 10);
  const pageSize = parseInt(rawSize ?? "10", 10);

  const { users, totalCount } = await usersRepo.usersList(page, pageSize);
  const plainUsers = JSON.parse(JSON.stringify(users));

  return (
    <main className="p-6">
      <UsersList data={plainUsers} />
      <PaginationControls
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </main>
  );
}
