import { db, ensureDb } from "@/db/data-source";
import { User } from "@/db/entities/user.entity";

export const usersRepo = {
  usersList: async (page = 1, take = 10) => {
    await ensureDb();
    const raw = await db.getRepository(User).find({
      skip: (page - 1) * take,
      take,
      order: { id: "ASC" },
    });
    return raw.map((u) => ({ ...u }));
  },

  getUser: async (id: number) => {
    await ensureDb();
    return db.getRepository(User).findOneByOrFail({ id });
  },
};
