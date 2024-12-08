import { render, screen, fireEvent, act } from "@testing-library/react";
import CampaignForm from "@/components/campaign-form";
import { addCampaigns } from "@/lib/actions";
import { encodeObject } from "@/lib/utils";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Campaign form - input validation", () => {
  it("should return campaign id", async () => {
    let now = new Date().getTime();

    // Mock data representing a campaign
    const mockData = {
      id: "fsdf-dsfsf-sdfs",
      startDate: `${now}`,
      endDate: `${now + 180000}`,
      targetImpressions: "1001",
    };

    // Encode the mock data object to be sent in a query string
    const encoded = encodeObject(mockData);

    // Call the addCampaigns function with the encoded query string
    const newCampaign = await addCampaigns(
      new URLSearchParams(encoded).toString()
    );

    // Assert that the returned campaign matches the expected format
    expect(newCampaign).toEqual({ id: mockData.id });
  });

  it("should display an error message for empty impressions field", async () => {
    render(<CampaignForm />);

    // Submit the form without entering impressions
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    });

    // Expect an error message for impressions
    expect(
      await screen.findByText(/Target impressions is required./)
    ).toBeInTheDocument();
  });

  it("should not display any error messages for valid inputs", async () => {
    render(<CampaignForm />);

    // Fill in valid values
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/Target impressions/i), {
        target: { value: "1000" },
      });
    });

    // Submit the form
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    });

    // Ensure no error messages are shown
    expect(
      screen.queryByText(/Target impressions is required./)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Only numbers/)).not.toBeInTheDocument();
  });
});
