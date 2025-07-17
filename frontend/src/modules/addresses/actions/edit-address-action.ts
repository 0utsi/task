"use server";

import { addressesRepo } from "../address.respository";
import { AddressFormData } from "../address.schema";

async function editUserAddress(
  addressId: number,
  data: Partial<AddressFormData>
) {
  await addressesRepo.updateUserAddress(addressId, data);
}
export default editUserAddress;
