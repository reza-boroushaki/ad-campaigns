"use client";

import { Campaign } from "@/lib/types";
import { convertDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
  },
  {
    accessorKey: "startDate",
    header: () => <div className="text-left">Start Date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {convertDate(row.getValue("startDate"))}
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: () => <div className="text-left">End Date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {convertDate(row.getValue("endDate"))}
        </div>
      );
    },
  },
  {
    accessorKey: "targetImpressions",
    header: () => <div className="text-left">Target Impressions</div>,
  },
  {
    accessorKey: "deliveredImpressions",
    header: () => <div className="text-left">Delivered Impressions</div>,
  },
  {
    accessorKey: "remainingImpressions",
    header: () => <div className="text-left">Impressions Left</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {Number(row.getValue("targetImpressions")) -
            Number(row.getValue("deliveredImpressions"))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const impressionDiff =
        Number(row.getValue("targetImpressions")) -
        Number(row.getValue("deliveredImpressions"));
      return (
        <div
          className={`${
            impressionDiff === 0 ? "text-red-500" : "text-green-500"
          } text-left font-bold`}
        >
          {impressionDiff === 0 ? "Ended" : "Running"}
        </div>
      );
    },
  },
];
