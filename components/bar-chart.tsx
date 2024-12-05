"use client";

import React, { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Campaign } from "@/lib/types";

const chartConfig = {
  campaings: {
    label: "Ended",
  },
  deliveredImpressions: {
    label: "Campaigns",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const BarChart = ({ chartData }: { chartData: Campaign[] }) => {
  const total = useMemo(
    () =>
      chartData.filter(
        (data) => data.targetImpressions - data.deliveredImpressions === 0
      ),
    []
  );

  return (
    <Card>
      <CardHeader className="flex items-center space-y-0 border-b px-6 py-5 sm:py-6 !flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Ended Campaigns</CardTitle>
          <CardDescription>Showing total ended campaigns</CardDescription>
        </div>
        <div className="flex">
          <span className="text-lg font-bold leading-none sm:text-3xl">
            {total.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={total}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="endDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="campaings"
                />
              }
            />
            <Line
              dataKey={`deliveredImpressions`}
              type="monotone"
              stroke={`var(--color-deliveredImpressions)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChart;
