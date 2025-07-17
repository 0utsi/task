import { Column } from "@/modules/shared/ui/data-table";
import { format } from "date-fns";
import { UserAddress } from "../entities/user-address.entity";
import AddressActionsDropdown from "./address-action-dropdown";

const columns: Column<UserAddress>[] = [
  { header: "Type", accessor: "addressType" },
  { header: "City", accessor: "city" },
  {
    header: "Street",
    accessor: (a) => `${a.street} ${a.buildingNumber}`,
  },
  { header: "Post Code", accessor: "postCode" },
  { header: "Country", accessor: "countryCode" },
  {
    header: "Valid From",
    accessor: (a) => format(new Date(a.validFrom), "yyyy-MM-dd"),
  },
  {
    header: "Valid From",
    accessor: (a) => format(new Date(a.validFrom), "yyyy-MM-dd"),
  },
  {
    header: "",
    accessor: (a) => <AddressActionsDropdown addressId={a.id} />,
    width: "w-10",
  },
];

export default columns;
