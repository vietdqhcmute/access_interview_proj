import { vi } from "vitest";

// Shared mock functions
export const mockMutate = vi.fn();
export const mockNotifySuccess = vi.fn();
export const mockNotifyError = vi.fn();
export const mockRefetch = vi.fn();

// Default mock data for useFetchCsvUpload
export const defaultCsvUploadData = {
  data: {
    data: [
      { attributes: { id: 1, status: "SUCCESSFULL" } },
      { attributes: { id: 2, status: "PROCESSING" } },
      { attributes: { id: 3, status: "FAILED" } },
    ],
  },
  isLoading: false,
  error: null,
  refetch: mockRefetch,
};

// Setup all common mocks - call this at the top of test files
export const setupCommonMocks = () => {
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

  // Mock the useNotification hook
  vi.mock("../../context/Notification/useNotification", () => ({
    default: () => ({
      notifySuccess: mockNotifySuccess,
      notifyError: mockNotifyError,
    }),
  }));
};

// Setup CSV upload mock - call this in tests that need it
export const setupCsvUploadMock = () => {
  vi.mock("../../hooks/csv_dashboard/useFetchCsvUpload", () => ({
    default: () => (defaultCsvUploadData),
  }));
};

// Utility to clear all mocks
export const clearAllMocks = () => {
  mockMutate.mockClear();
  mockNotifySuccess.mockClear();
  mockNotifyError.mockClear();
  mockRefetch.mockClear();
};
