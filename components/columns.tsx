"use client";

import { Campaign } from "@/lib/types";
import { convertDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

const campaignSchema = z.object({
  id: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  targetImpressions: z.number(),
});

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
];
