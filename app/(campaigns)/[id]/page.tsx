import SingleStat from "@/components/single-stat";
import { TrendingChart } from "@/components/trending-chart";
import { Separator } from "@/components/ui/separator";
import { getSingleCampaign } from "@/lib/actions";
import { convertDate, convertMillisecondsToDays } from "@/lib/utils";

const page = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;
  const data = await getSingleCampaign(id);
  return (
    <main className="container my-10">
      <h1 className="text-xl font-bold break-all">Campaign ID: {id}</h1>
      <Separator className="my-8" />
      <div className="max-sm:space-y-10 sm:flex items-start gap-10 flex-wrap">
        <TrendingChart data={data} className="w-full sm:w-[300px]" />
        <div className="max-sm:space-y-10 sm:flex items-start gap-10 flex-wrap sm:h-full">
          <SingleStat data={convertDate(data.startDate)} title="Started Date" />
          <SingleStat data={convertDate(data.endDate)} title="Ended Date" />
          <SingleStat
            data={convertMillisecondsToDays(
              parseInt(data.endDate) - parseInt(data.startDate)
            )}
            title="Days Remaining"
          />
        </div>
      </div>
    </main>
  );
};

export default page;
