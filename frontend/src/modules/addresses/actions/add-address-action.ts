"use server";

import { addressesRepo } from "../address.respository";
import { AddressFormData } from "../address.schema";

async function addUserAddressAction(
  userId: number,
  data: AddressFormData & { validFrom: string }
) {
  await addressesRepo.addUserAddress({
    ...data,
    userId,
    validFrom: new Date(data.validFrom),
  });
}
export default addUserAddressAction;
