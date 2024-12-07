"use server";

import { revalidatePath } from "next/cache";

export async function getCampaigns() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/campaigns/*`, {
      headers: {
        "X-API-Key": `${process.env.AD_SERVER_API_KEY}`,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleCampaign(id: string) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/campaigns/${id}`,
      {
        headers: {
          "X-API-Key": `${process.env.AD_SERVER_API_KEY}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
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
    // relvalidate the path to get the latest update
    revalidatePath("/");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
