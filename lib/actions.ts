import { Campaign } from "./types";

export async function getCampaigns(): Promise<Campaign[]> {
  const response = await fetch(`${process.env.API_BASE_URL}/campaigns/*`, {
    headers: {
      "X-API-Key": `${process.env.AD_SERVER_API_KEY}`,
    },
  });
  return response.json();
}
