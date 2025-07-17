import { db, ensureDb } from "@/lib/data-source";
import { User } from "@/modules/user/entities/user.entity";

export const usersRepo = {
  usersList: async (page = 1, pageSize = 10) => {
    await ensureDb();
    const [users, totalCount] = await Promise.all([
      db.getRepository(User).find({
        skip: (page - 1) * pageSize,
        take: pageSize,
        order: { id: "ASC" },
      }),
      db.getRepository(User).count(),
    ]);

    return {
      users,
      totalCount,
    };
  },

  getUser: async (id: number) => {
    await ensureDb();
    return db.getRepository(User).findOneByOrFail({ id });
  },
};
