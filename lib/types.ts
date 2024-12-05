import { ColumnDef } from "@tanstack/react-table";

export type Campaign = {
  id: string;
  startDate: string;
  endDate: string;
  targetImpressions: number;
  deliveredImpressions: number;
  remainingImpressions?: number;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
