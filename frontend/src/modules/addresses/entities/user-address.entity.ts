import { User } from "@/modules/user/entities/user.entity";
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import type { Relation } from "typeorm";

export enum AddressType {
  HOME = "HOME",
  INVOICE = "INVOICE",
  POST = "POST",
  WORK = "WORK",
}

@Entity({ name: "users_addresses" })
export class UserAddress {
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn({ name: "user_id", type: "int" })
  userId!: number;

  @PrimaryColumn({ name: "address_type", type: "varchar", length: 7 })
  addressType!: AddressType;

  @PrimaryColumn({ name: "valid_from", type: "timestamptz" })
  validFrom!: Date;

  @Column({ name: "post_code", length: 6 })
  postCode!: string;

  @Column({ length: 60 })
  city!: string;

  @Column({ name: "country_code", length: 3 })
  countryCode!: string;

  @Column({ length: 100 })
  street!: string;

  @Column({ name: "building_number", length: 60 })
  buildingNumber!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;
}
