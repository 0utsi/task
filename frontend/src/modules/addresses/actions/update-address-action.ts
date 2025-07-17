"use server";

import { addressesRepo } from "../address.respository";
import { AddressFormData } from "../address.schema";
import { UserAddress } from "../entities/user-address.entity";

async function updateUserAddress(data: AddressFormData, addressId: number) {
  if (!addressId) return;
  const address: Partial<UserAddress> = {
    ...data,
    validFrom: new Date(data.validFrom),
  };
  console.log(data, addressId);
  await addressesRepo.updateUserAddress(addressId, address);
}
export default updateUserAddress;
