"use server";

import { revalidatePath } from "next/cache";
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

export async function addCampaigns(value: string) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/campaigns/`, {
      method: "POST",
      body: value,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-API-Key": `${process.env.AD_SERVER_API_KEY}`,
      },
    });
    await response.json();
    // relvalidate the path to get the latest update
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
