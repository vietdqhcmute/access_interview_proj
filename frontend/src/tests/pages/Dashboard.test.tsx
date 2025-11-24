import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { mockMutate, mockNotifySuccess, mockNotifyError, defaultCsvUploadData, defaultMockUser } from "../utils/mockHooks";
import { renderWithRouter } from "../utils/testHelpers";

// Setup mocks at the top level BEFORE importing components
vi.mock("../../context/Auth/useAuthContext", () => ({
  default: () => ({
    user: defaultMockUser,
    token: "mock-token",
  }),
}));

vi.mock("../../hooks/auth/useLogoutMutate", () => ({
  default: () => ({
    mutate: mockMutate,
  }),
}));

vi.mock("../../context/Notification/useNotification", () => ({
  default: () => ({
    notifySuccess: mockNotifySuccess,
    notifyError: mockNotifyError,
  }),
}));

vi.mock("../../hooks/csv_dashboard/useFetchCsvUpload", () => ({
  default: () => defaultCsvUploadData,
}));

import Dashboard from "../../pages/Dashboard";
import { validateCsvFile } from "../../utils/handlers";

describe("Dashboard Page", () => {
  test("renders dashboard heading", () => {
    renderWithRouter(<Dashboard />);
    const headingElement = screen.getByText(/Dashboard/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("uploads CSV is visible on dashboard", () => {
    renderWithRouter(<Dashboard />);
    const uploadInput = screen.getByText("Add CSV");
    expect(uploadInput).toBeInTheDocument();
  });

  test("validateCsvFile function validates file type", async () => {
    // Valid CSV file type with small content
    const validFile = new File(["name,age\nJohn,30"], "test.csv", { type: "text/csv" });
    const mockNotify = vi.fn();
    const result = await validateCsvFile(validFile, mockNotify);
    expect(result).toBe(true);
    expect(mockNotify).not.toHaveBeenCalled();

    // Invalid file type - should return false immediately
    const invalidTypeFile = new File(["<html></html>"], "test.html", { type: "text/html" });
    const result2 = await validateCsvFile(invalidTypeFile, mockNotify);
    expect(result2).toBe(false);
    expect(mockNotify).toHaveBeenCalledWith('You can only upload CSV files!');
  });

  test("validateCsvFile rejects files with more than 100 rows", async () => {
    // File with >100 rows
    const largeContent = new Array(101).fill("keyword").join("\n");
    const largeFile = new File([largeContent], "large.csv", { type: "text/csv" });

    // Now properly awaits validation
    const isValid = await validateCsvFile(largeFile, mockNotifyError);
    expect(isValid).toBe(false);
    expect(mockNotifyError).toHaveBeenCalledWith('The CSV file must not contain more than 100 keywords.');
  });
});

