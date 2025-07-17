"use client";

import { useCallback, useState, useTransition } from "react";
import { AddressFormData } from "../address.schema";
import addUserAddress from "../actions/add-address-action";
import AddressFormDialog from "./address-modal-form";
import { useRouter } from "next/navigation";
import { UserAddress } from "../entities/user-address.entity";
import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import updateUserAddress from "../actions/update-address-action";
import getColumns from "./column-render";
import { Typography } from "@/components/ui/typography";
import { DataTable } from "@/components/ui/data-table";

type Props = {
  data: UserAddress[];
  userId: number;
};

export default function AddressList({ data, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<UserAddress | null>(null);
  const { refresh } = useRouter();

  const handleOpen = useCallback((addr?: UserAddress) => {
    setAddress(addr ?? null);
    setOpen((o) => !o);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const handleOpenChange = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleSubmit = async (formData: AddressFormData) => {
    if (address) {
      await updateUserAddress(formData, address.id);
      handleOpenChange();
    } else {
      await addUserAddress(userId, formData);
      handleOpenChange();
    }
    startTransition(() => refresh());
    setAddress(null);
  };

  return (
    <div className="space-y-4">
      <div className="w-full flex flex-row justify-between">
        <h2 className="text-xl font-semibold">Addresses</h2>
        <AddressFormDialog
          open={open}
          onHandleChange={handleOpenChange}
          onSubmit={handleSubmit}
          initialData={address}
        />
      </div>
      <div className="max-h-[300px] overflow-y-auto rounded-lg border">
        <DataTable<UserAddress>
          data={data}
          columns={getColumns((addr) => handleOpen(addr))}
          onEdit={setAddress}
          rowKey={(a) => a.id.toString()}
        />
      </div>
      <Typography
        icon={<ChevronLeft size={14} />}
        variant="small"
        className="hover:underline"
      >
        <Link href={"/users"}>Back to users list</Link>
      </Typography>
    </div>
  );
}
