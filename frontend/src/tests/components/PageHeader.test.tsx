import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import PageHeader from "../../components/PageHeader";

const mockMutate = vi.fn();

// Mock the useAuth hook
vi.mock("../../context/Auth/useAuthContext", () => ({
  default: () => ({
    user: { name: "Test User", email: "test@example.com" },
    token: "mock-token",
  }),
}));

// Mock the useLogoutMutate hook
vi.mock("../../hooks/auth/useLogoutMutate", () => ({
  default: () => ({
    mutate: mockMutate,
  }),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>); // Need this so getByRole("link") works
};

describe("PageHeader Component", () => {
  const mockTitle = "Test Page";
  const mockBackLink = "/previous-page";

  test("renders title correctly", () => {
    renderWithRouter(<PageHeader title={mockTitle} />);
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  test("renders back link when provided", () => {
    renderWithRouter(<PageHeader title={mockTitle} backLink={mockBackLink} />);
    const backLinkElement = screen.getByRole("link");
    expect(backLinkElement).toHaveAttribute("href", mockBackLink);
  });

  test("does not render back link when not provided", () => {
    renderWithRouter(<PageHeader title={mockTitle} />);
    const links = screen.queryAllByRole("link");
    // When no backLink is provided, there should be no link elements
    expect(links.length).toBe(0);
  });

  test("displays user avatar with initial", () => {
    renderWithRouter(<PageHeader title={mockTitle} />);
    const avatarElement = screen.getByText("T"); // 'T' is the initial of "Test User"
    expect(avatarElement).toBeInTheDocument();
  });

  test("show dropdown menu on avatar click", async () => {
    renderWithRouter(<PageHeader title={mockTitle} />);
    const avatarElement = screen.getByText("T");
    expect(avatarElement).toBeInTheDocument();

    // Simulate click to open dropdown
    await screen.findByText("T").then((avatar) => {
      avatar.click();
    });

    // Check if the logout option is present
    const logoutOption = await screen.findByText("Log out");
    expect(logoutOption).toBeInTheDocument();
  });

  test("calls logout mutation on logout click", async () => {
    mockMutate.mockClear(); // Clear any previous calls

    renderWithRouter(<PageHeader title={mockTitle} />);
    const avatarElement = screen.getByText("T");
    expect(avatarElement).toBeInTheDocument();

    // Simulate click to open dropdown
    await screen.findByText("T").then((avatar) => {
      avatar.click();
    });

    // Click the logout option
    const logoutOption = await screen.findByText("Log out");
    expect(logoutOption).toBeInTheDocument();
    logoutOption.click();

    // Verify that the logout mutation was called
    expect(mockMutate).toHaveBeenCalled();
  });
});
