"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/modules/shared/ui/table";
import type { ReactNode } from "react";

export interface Column<T> {
  header: ReactNode;
  accessor: keyof T | ((row: T) => unknown);
  cell?: (row: T) => ReactNode;
  width?: string;
}

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
};

export function DataTable<T>({
  data,
  columns,
  rowKey,
  isLoading = false,
}: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, i) => (
              <TableHead key={i} className={col.width}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <div className="spinner" />
        ) : (
          <TableBody>
            {data.map((row) => (
              <TableRow key={rowKey(row)}>
                {columns.map((col, i) => {
                  const value =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : row[col.accessor];
                  return (
                    <TableCell key={i}>
                      {col.cell ? col.cell(row) : (value as ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
