import { vi } from "vitest";

/**
 * Shared mock functions that can be used across all tests
 * Import these in your test files to use in vi.mock() or assertions
 */
export const mockMutate = vi.fn();
export const mockNotifySuccess = vi.fn();
export const mockNotifyError = vi.fn();
export const mockRefetch = vi.fn();

/**
 * Default mock data for useFetchCsvUpload hook
 * Can be imported and used directly in vi.mock()
 */
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

/**
 * Default mock user data
 */
export const defaultMockUser = {
  name: "Test User",
  email: "test@example.com",
};

/**
 * Utility to clear all mocks between tests
 */
export const clearAllMocks = () => {
  mockMutate.mockClear();
  mockNotifySuccess.mockClear();
  mockNotifyError.mockClear();
  mockRefetch.mockClear();
};
