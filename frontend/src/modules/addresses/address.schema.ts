import { z } from "zod";
import { AddressType } from "./entities/user-address.entity";

export const addressFormSchema = z.object({
  addressType: z.enum(AddressType),
  street: z.string().min(1).max(100),
  buildingNumber: z.string().min(1).max(60),
  postCode: z.string().min(1).max(6),
  city: z.string().min(1).max(60),
  countryCode: z
    .string()
    .length(3)
    .refine((c) => /^[A-Z]{3}$/.test(c), "Must be ISO3166-1 alpha-3"),
  validFrom: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date"),
});

export type AddressFormData = z.infer<typeof addressFormSchema>;
