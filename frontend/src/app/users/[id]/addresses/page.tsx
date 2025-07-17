import { addressesRepo } from "@/modules/addresses/address.respository";
import AddressList from "@/modules/addresses/ui/address-list";

type tParams = Promise<{ id: number }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;
  const addresses = await addressesRepo.listByUser(id);
  const plainAddresses = JSON.parse(JSON.stringify(addresses));

  return (
    <div className="lg:p-8 sm:p-5 p-2">
      <AddressList data={plainAddresses} userId={id} />
    </div>
  );
}
