"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  page: number;
  pageSize: number;
  totalCount: number;
};

export function PaginationControls({
  page = 1,
  pageSize = 5,
  totalCount,
}: Props) {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / pageSize);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    push(`?${params.toString()}`);
  };

  const setPageSize = (newSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", newSize.toString());
    params.set("page", "1");
    push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-6 py-4">
      <div className="flex items-center gap-3">
        <ArrowLeft
          size={18}
          onClick={() => setPage(page - 1)}
          className={
            page === 1 ? "opacity-50 pointer-events-none" : "cursor-pointer"
          }
        />
        <span className="text-sm">
          {page} / {totalPages}
        </span>
        <ArrowRight
          size={18}
          onClick={() => setPage(page + 1)}
          className={
            page === totalPages
              ? "opacity-50 pointer-events-none"
              : "cursor-pointer"
          }
        />
      </div>

      <Select
        defaultValue={String(pageSize)}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 20, 50].map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
