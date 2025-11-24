import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

/**
 * Renders a component wrapped with BrowserRouter for testing components that use React Router
 */
export const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};
