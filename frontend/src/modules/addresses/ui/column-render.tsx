import { UserAddress } from "@/db/entities/user-address.entity";
import { Column } from "@/modules/shared/ui/data-table";
import { format } from "date-fns";

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
];

export default columns;
