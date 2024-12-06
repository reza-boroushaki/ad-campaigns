import BarChart from "@/components/bar-chart";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { getCampaigns } from "@/lib/actions";
import Form from "@/components/campaign-form";
import SingleStat from "@/components/single-stat";

export default async function Home() {
  const data = await getCampaigns();
  return (
    <main className="container">
      <div className="my-10">
        <BarChart chartData={data} />
      </div>
      <div className="my-10 flex flex-col sm:flex-row w-full items-center sm:h-[270px] gap-10">
        <SingleStat data={data.length} className="max-sm:w-full" />
        <Form />
      </div>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
