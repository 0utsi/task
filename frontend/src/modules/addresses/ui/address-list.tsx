"use client";

import columns from "./column-render";
import { DataTable } from "@/modules/shared/ui/data-table";

import { useTransition } from "react";
import { AddressFormData } from "../address.schema";
import addUserAddress from "../actions/add-address-action";
import AddressFormDialog from "./address-modal-form";
import { useRouter } from "next/navigation";
import { UserAddress } from "../entities/user-address.entity";

type Props = {
  data: UserAddress[];
  userId: number;
};

export default function AddressList({ data, userId }: Props) {
  const { refresh } = useRouter();
  console.log(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  console.log(data);
  const handleAdd = async (formData: AddressFormData) => {
    await addUserAddress(userId, formData);
    startTransition(() => {
      refresh();
    });
  };
  console.log(data);
  return (
    <div className="space-y-4">
      <div className="w-full flex flex-row justify-between">
        <h2 className="text-xl font-semibold">Addresses</h2>
        <AddressFormDialog onSubmit={handleAdd} />
      </div>
      <div className="max-h-[300px] overflow-y-auto rounded-lg border">
        <DataTable<UserAddress>
          data={data}
          columns={columns}
          rowKey={(a) => a.id.toString()}
        />
      </div>
    </div>
  );
}
