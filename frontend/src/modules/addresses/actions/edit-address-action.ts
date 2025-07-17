"use server";

import { addressesRepo } from "../address.respository";
import { AddressFormData } from "../address.schema";

async function addUserAddressAction(
  userId: number,
  data: Partial<AddressFormData>
) {
  await addressesRepo.updateUserAddress(userId, data);
}
export default addUserAddressAction;
