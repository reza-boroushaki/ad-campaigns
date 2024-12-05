import BarChart from "@/components/bar-chart";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { getCampaigns } from "@/lib/actions";

export default async function Home() {
  const data = await getCampaigns();
  return (
    <main className="container">
      <div className="my-10">
        <BarChart chartData={data} />
      </div>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
