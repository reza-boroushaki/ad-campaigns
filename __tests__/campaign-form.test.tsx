import { render, screen, fireEvent } from "@testing-library/react";
import CampaignForm from "@/components/campaign-form";
import { addCampaigns } from "@/lib/actions";
import { encodeObject } from "@/lib/utils";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Campaign form - input validation", () => {
  it("should return campaign id", async () => {
    let now = new Date().getTime();
    const mockData = {
      id: "fsdf-dsfsf-sdfs",
      startDate: `${now}`,
      endDate: `${now + 180000}`,
      targetImpressions: "1001",
    };
    const encoded = encodeObject(mockData);

    const newCampaign = await addCampaigns(
      new URLSearchParams(encoded).toString()
    );

    expect(newCampaign).toEqual({ id: mockData.id });
  });

  it("should display an error message for empty impressions field", async () => {
    render(<CampaignForm />);

    // Submit the form without entering impressions
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    // Expect an error message for impressions
    expect(
      await screen.findByText(/Target impressions is required./)
    ).toBeInTheDocument();
  });

  it("should not display any error messages for valid inputs", async () => {
    render(<CampaignForm />);

    // Fill in valid values
    fireEvent.change(screen.getByPlaceholderText(/Target impressions/i), {
      target: { value: "1000" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    // Ensure no error messages are shown
    expect(
      screen.queryByText(/Target impressions is required./)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Only numbers/)).not.toBeInTheDocument();
  });
});
