import { Column } from "@/modules/shared/ui/data-table";
import { format } from "date-fns";
import { UserAddress } from "../entities/user-address.entity";
import AddressActionsDropdown from "./address-action-dropdown";

export default function getColumns(
  onEdit: (address: UserAddress) => void
): Column<UserAddress>[] {
  return [
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
      header: "",
      accessor: (a) => <AddressActionsDropdown address={a} onEdit={onEdit} />,
      width: "w-10",
    },
  ];
}
