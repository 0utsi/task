"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/modules/shared/ui/dialog";
import { Button } from "@/modules/shared/ui/button";
import { Input } from "@/modules/shared/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/modules/shared/ui/select";
import { AddressType } from "@/db/entities/user-address.entity";

// Schemat Zod
const addressFormSchema = z.object({
  addressType: z.nativeEnum(AddressType),
  street: z.string().min(1).max(100),
  buildingNumber: z.string().min(1).max(60),
  postCode: z.string().min(1).max(6),
  city: z.string().min(1).max(60),
  countryCode: z
    .string()
    .length(3)
    .regex(/^[A-Z]{3}$/),
  validFrom: z.string().refine((d) => !isNaN(Date.parse(d))),
});
type AddressFormData = z.infer<typeof addressFormSchema>;

type Props = {
  initialData?: AddressFormData;
  onSubmit: (data: AddressFormData) => void;
};

export default function AddressFormDialog({ initialData, onSubmit }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: initialData ?? {
      addressType: AddressType.HOME,
      street: "",
      buildingNumber: "",
      postCode: "",
      city: "",
      countryCode: "",
      validFrom: new Date().toISOString().slice(0, 10),
    },
  });

  const submit = (data: AddressFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog onOpenChange={() => reset()}>
      <DialogTrigger asChild>
        <Button className="w-fit">Add User Address</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Address" : "Add Address"}
          </DialogTitle>
          <DialogDescription>Fill in address details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="grid gap-4 py-4">
          <Controller
            name="addressType"
            control={control}
            render={({ field }) => (
              <>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Address Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(AddressType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.addressType && (
                  <p className="text-red-600 text-sm">
                    {errors.addressType.message}
                  </p>
                )}
              </>
            )}
          />

          {/* Standard Inputs */}
          <div>
            <Input label="Street" {...register("street")} />
            {errors.street && (
              <p className="text-red-600 text-sm">{errors.street.message}</p>
            )}
          </div>
          <div>
            <Input label="Building Number" {...register("buildingNumber")} />
            {errors.buildingNumber && (
              <p className="text-red-600 text-sm">
                {errors.buildingNumber.message}
              </p>
            )}
          </div>
          <div>
            <Input label="Post Code" {...register("postCode")} />
            {errors.postCode && (
              <p className="text-red-600 text-sm">{errors.postCode.message}</p>
            )}
          </div>
          <div>
            <Input label="City" {...register("city")} />
            {errors.city && (
              <p className="text-red-600 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Country Code"
              maxLength={3}
              {...register("countryCode")}
            />
            {errors.countryCode && (
              <p className="text-red-600 text-sm">
                {errors.countryCode.message}
              </p>
            )}
          </div>
          <div>
            <Input label="Valid From" type="date" {...register("validFrom")} />
            {errors.validFrom && (
              <p className="text-red-600 text-sm">{errors.validFrom.message}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {initialData ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
