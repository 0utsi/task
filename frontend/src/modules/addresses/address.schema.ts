import { z } from "zod";

export const addressSchema = z.object({
  userId: z.number().int().positive(),
  validFrom: z.coerce.date(),
  street: z.string().max(100),
  buildingNumber: z.string().max(60),
  postCode: z.string().regex(/^\d{2,6}$/),
  city: z.string().max(60),
  countryCode: z.string().regex(/^[A-Z]{3}$/),
});

export type AddressDTO = z.infer<typeof addressSchema>;
