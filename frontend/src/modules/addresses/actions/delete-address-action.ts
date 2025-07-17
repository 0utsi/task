"use server";

import { addressesRepo } from "../address.respository";

async function deleteUserAddress(id: number) {
  await addressesRepo.deleteUserAddress(id);
}
export default deleteUserAddress;
