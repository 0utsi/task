import { db, ensureDb } from "@/db/data-source";
import { UserAddress } from "@/db/entities/user-address.entity";

export const addressesRepo = {
  getUserAddress: async (userId: number, skip = 0, take = 20) => {
    await ensureDb();
    const [addresses] = await Promise.all([
      db.getRepository(UserAddress).find({
        where: { userId },
        order: { validFrom: "DESC" },
        skip,
        take,
      }),
    ]);

    return [addresses];
  },
  addUserAddress: async (data: Partial<UserAddress>) => {
    await ensureDb();
    db.getRepository(UserAddress).save(data);
  },
  update: (
    pk: Pick<UserAddress, "userId" | "validFrom">,
    data: Partial<UserAddress>
  ) => db.getRepository(UserAddress).update(pk, data),
  delete: (pk: Pick<UserAddress, "userId" | "validFrom">) =>
    db.getRepository(UserAddress).delete(pk),
};
