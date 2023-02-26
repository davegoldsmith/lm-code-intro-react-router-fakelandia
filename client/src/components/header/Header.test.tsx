import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("<Header />", () => {
  test("renders the Fakelandia Justice Dept name", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const titleElement = screen.getByText(/Fakelandia Justice Department/i);
    expect(titleElement).toBeInTheDocument();
  });
});