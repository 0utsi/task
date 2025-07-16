// src/app/users/[id]/addresses/page.tsx
import { addressesRepo } from "@/modules/addresses/address.respository";
import AddressList from "@/modules/addresses/ui/address-list";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string }>;
}) {
  const { userId } = await searchParams;
  const id = parseInt(userId ?? "1", 10);

  const [addresses] = await addressesRepo.getUserAddress(id);
  const plainAddresses = JSON.parse(JSON.stringify(addresses));

  return (
    <div className="lg:p-8 sm:p-5 p-2">
      <AddressList data={plainAddresses} userId={id} />
    </div>
  );
}
