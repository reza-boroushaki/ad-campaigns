import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { getCampaigns } from "@/lib/actions";

export default async function Home() {
  const data = await getCampaigns();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
