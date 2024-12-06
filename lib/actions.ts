"use server";

import { Campaign } from "./types";

export async function getCampaigns(): Promise<Campaign[]> {
  const response = await fetch(`${process.env.API_BASE_URL}/campaigns/*`, {
    headers: {
      "X-API-Key": `${process.env.AD_SERVER_API_KEY}`,
    },
  });
  return response.json();
}

export async function getSingleCampaign(id: string): Promise<Campaign> {
  const response = await fetch(`${process.env.API_BASE_URL}/campaigns/${id}`, {
    headers: {
      "X-API-Key": `${process.env.AD_SERVER_API_KEY}`,
    },
  });
  return response.json();
}

export async function addCampaigns(value: {
  id: string;
  startDate: number;
  endDate: number;
  targetImpressions: number;
}) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/campaigns/`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "X-API-Key": `${process.env.AD_SERVER_API_KEY}`,
      },
    });
    await response.json();
    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
}
