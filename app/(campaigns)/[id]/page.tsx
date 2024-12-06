import SingleStat from "@/components/single-stat";
import { TrendingChart } from "@/components/trending-chart";
import { Separator } from "@/components/ui/separator";
import { getSingleCampaign } from "@/lib/actions";
import { convertDate, convertMillisecondsToDays } from "@/lib/utils";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = await params;
  const data = await getSingleCampaign(id);
  return (
    <main className="container my-10">
      <h1 className="text-xl font-bold">Campaign ID: {id}</h1>
      <Separator className="my-8" />
      <div className="max-sm:space-y-10 sm:flex items-start gap-10 flex-wrap">
        <TrendingChart data={data} />
        <div className="max-sm:space-y-10 sm:flex items-start gap-10 flex-wrap sm:h-full">
          <SingleStat
            data={convertDate(data.startDate)}
            title="Started Date"
            // className="h-[330px]"
          />
          <SingleStat
            data={convertDate(data.endDate)}
            title="Ended Date"
            // className="h-[330px]"
          />
          <SingleStat
            data={convertMillisecondsToDays(
              parseInt(data.endDate) - parseInt(data.startDate)
            )}
            title="Days Remaining"
            // className="h-[330px]"
          />
        </div>
      </div>
    </main>
  );
};

export default page;
