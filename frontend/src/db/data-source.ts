import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserAddress } from "./entities/user-address.entity";
import { User } from "./entities/user.entity";

export const db = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, UserAddress],
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
