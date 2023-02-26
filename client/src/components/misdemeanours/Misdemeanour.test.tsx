import { render, screen } from "@testing-library/react";
import { Misdemeanour } from "../../types/misdemeanours.types";
import Misdemeanor from "./Misdemeanour";

describe("<Misdemeanor> ", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the misdemeanour row is shown`, () => {
    const requiredProps: Misdemeanour = {
      citizenId: "999",
      misdemeanour: "rudeness",
      date: "01/01/2001",
      punishImage: "https://picsum.photos/id/999/300/200",
    };
    render(
      <table>
        <tbody>
          <Misdemeanor {...requiredProps} />
        </tbody>
      </table>
    );

    expect(screen.getByText("999")).toBeInTheDocument();
    expect(screen.getByText("Mild Public Rudeness 🤪")).toBeInTheDocument();
    expect(screen.getByText("01/01/2001")).toBeInTheDocument();

    const punishImage = screen.getByAltText("Punishment idea image");

    expect(punishImage).toBeInTheDocument();
    expect(punishImage).toHaveAttribute(
      "src",
      "https://picsum.photos/id/999/300/200"
    );
  });
});
