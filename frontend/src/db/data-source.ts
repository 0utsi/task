import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { UserAddress } from "./entities/user-address.entity";

const globalForDS = globalThis as unknown as { dataSource?: DataSource };

export const db =
  globalForDS.dataSource ??
  new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User, UserAddress],
    synchronize: false,
    logging: false,
  });
