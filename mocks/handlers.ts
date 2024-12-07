import { http, HttpResponse } from "msw";

const allCampaigns = new Map();

export const handlers = [
  http.post(`${process.env.API_BASE_URL}/campaigns/`, async ({ request }) => {
    // convert searchParams format to object
    const searchParams = new URLSearchParams(await request.text());
    const paramsObject = Object.fromEntries(searchParams.entries());
    allCampaigns.set(paramsObject.id, paramsObject);
    return HttpResponse.json({ id: paramsObject.id });
  }),
];
