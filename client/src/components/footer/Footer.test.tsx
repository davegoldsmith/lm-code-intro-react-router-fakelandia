import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

describe("<Footer/>", () => {
  test("renders the copyright owner", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const titleElement = screen.getByText(/Amazing Websites Inc/i);
    expect(titleElement).toBeInTheDocument();
  });
});