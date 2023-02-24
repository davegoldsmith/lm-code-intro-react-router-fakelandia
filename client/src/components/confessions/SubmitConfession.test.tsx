import { render, screen } from "@testing-library/react";
import SubmitConfession from "./SubmitConfession";

describe("<SubmitConfession> ", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the submit button should be present`, () => {
    render(<SubmitConfession />);

    const input = screen.getByLabelText("Submit");

    expect(input).toBeInTheDocument();
  });
});
