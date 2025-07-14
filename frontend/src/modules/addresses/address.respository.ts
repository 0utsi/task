import { db } from "@/db/data-source";
import { UserAddress } from "@/db/entities/user-address.entity";

export const addressesRepo = {
  listByUser: (userId: number, skip = 0, take = 20) =>
    db.getRepository(UserAddress).find({
      where: { userId },
      order: { validFrom: "DESC" },
      skip,
      take,
    }),
  create: (data: Partial<UserAddress>) =>
    db.getRepository(UserAddress).save(data),
  update: (
    pk: Pick<UserAddress, "userId" | "validFrom">,
    data: Partial<UserAddress>
  ) => db.getRepository(UserAddress).update(pk, data),
  delete: (pk: Pick<UserAddress, "userId" | "validFrom">) =>
    db.getRepository(UserAddress).delete(pk),
};
