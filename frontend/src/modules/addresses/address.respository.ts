import { db, ensureDb } from "@/lib/data-source";
import { UserAddress } from "./entities/user-address.entity";

export const addressesRepo = {
  listByUser: async (userId: number, skip = 0, take = 20) => {
    await ensureDb();
    return db.getRepository(UserAddress).find({
      where: { userId },
      order: { validFrom: "DESC" },
      skip,
      take,
    });
  },
  addUserAddress: async (data: Partial<UserAddress>) => {
    await ensureDb();
    db.getRepository(UserAddress).save(data);
  },
  updateUserAddress: (id: number, data: Partial<UserAddress>) =>
    db.getRepository(UserAddress).update(id, data),
  deleteUserAddress: (id: number) => db.getRepository(UserAddress).delete(id),
};
