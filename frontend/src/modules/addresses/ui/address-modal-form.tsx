"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddressType, UserAddress } from "../entities/user-address.entity";
import { format } from "date-fns";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  initialData: UserAddress | null;
  onSubmit: (data: AddressFormData) => void;
  open: boolean;
  onHandleChange: () => void;
};

export default function AddressFormDialog({
  initialData,
  onSubmit,
  open,
  onHandleChange,
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: initialData
      ? {
          addressType: initialData.addressType,
          street: initialData.street,
          buildingNumber: initialData.buildingNumber,
          postCode: initialData.postCode,
          city: initialData.city,
          countryCode: initialData.countryCode,
          validFrom: format(initialData.validFrom, "yyyy-MM-dd"),
        }
      : {
          addressType: AddressType.HOME,
          street: "",
          buildingNumber: "",
          postCode: "",
          city: "",
          countryCode: "",
          validFrom: new Date().toISOString().slice(0, 10),
        },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        addressType: initialData.addressType,
        street: initialData.street,
        buildingNumber: initialData.buildingNumber,
        postCode: initialData.postCode,
        city: initialData.city,
        countryCode: initialData.countryCode,
        validFrom: format(initialData.validFrom, "yyyy-MM-dd"),
      });
    }
  }, [initialData, open, reset]);

  const { street, buildingNumber, postCode, city, countryCode } = watch();

  const submit = (data: AddressFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog onOpenChange={onHandleChange} open={open}>
      <DialogTrigger asChild>
        <Button className="w-fit">Add User Address</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] sm:p-4 p-2 gap-2 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Update Address" : "Add Address"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="grid gap-2 py-2">
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
          <div className="flex sm:flex-row flex-col justify-between">
            <div className="flex flex-col">
              <div>
                <Input
                  label="Valid From"
                  className="w-fit"
                  type="date"
                  {...register("validFrom")}
                />
                {errors.validFrom && (
                  <p className="text-red-600 text-sm">
                    {errors.validFrom.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 text-xs font-light">Address type</label>
                <Controller
                  name="addressType"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
              </div>
            </div>
            <div className="size-full flex flex-col items-center justify-center">
              <div>
                <div className="flex flex-row gap-2">
                  <Typography variant="small">{street}</Typography>
                  <Typography variant="small"> {buildingNumber}</Typography>
                </div>
                <div className="flex flex-row gap-2">
                  <Typography variant="small">{postCode}</Typography>
                  <Typography variant="small"> {city}</Typography>
                </div>
                <Typography variant="small">{countryCode}</Typography>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {initialData ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
