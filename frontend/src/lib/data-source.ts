import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../modules/user/entities/user.entity";
import { UserAddress } from "@/modules/addresses/entities/user-address.entity";

export const db = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, UserAddress, __dirname + "/../**/*.entity.js"],
  synchronize: false,
  logging: false,
});

let _initialized = false;

export async function ensureDb() {
  if (!_initialized) {
    if (!db.isInitialized) await db.initialize();
    _initialized = true;
  }
}
