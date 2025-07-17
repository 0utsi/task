import { User, UserStatus } from "@/modules/user/entities/user.entity";
import { format } from "date-fns";
import UserActionsDropdown from "./user-action-dropdown";
import { Column } from "@/components/ui/data-table";

const columns: Column<User>[] = [
  {
    header: "Name",
    accessor: (u) => [u.firstName, u.lastName].filter(Boolean).join(" "),
  },
  { header: "E-mail", accessor: "email" },
  {
    header: "Created at",
    accessor: (u) => format(new Date(u.createdAt), "yyyy-MM-dd"),
  },
  {
    header: "Status",
    accessor: (u) => (
      <div className="flex items-center gap-2">
        <span>{u.status}</span>
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            u.status === UserStatus.ACTIVE ? "bg-green-500" : "bg-red-600"
          }`}
        />
      </div>
    ),
  },
  {
    header: "",
    accessor: (u) => <UserActionsDropdown userId={u.id} />,
    width: "w-10",
  },
];

export default columns;
