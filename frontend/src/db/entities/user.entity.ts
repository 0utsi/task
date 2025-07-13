import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserAddress } from "./user-address.entity";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "first_name", length: 60, nullable: true })
  firstName!: string | null;

  @Column({ name: "last_name", length: 100 })
  lastName!: string;

  @Column({ length: 30, nullable: true })
  initials!: string | null;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;

  @OneToMany(() => UserAddress, (addr) => addr.user, { cascade: true })
  addresses!: UserAddress[];
}
