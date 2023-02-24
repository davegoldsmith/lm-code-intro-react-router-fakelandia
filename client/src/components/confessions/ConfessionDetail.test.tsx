import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfessionDetails, { ConfessionDetailsProps } from "./ConfessionDetail";

describe("<ConfessionDetails> ", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the confession details input should be present`, () => {
    const requiredProps: ConfessionDetailsProps = {
      confessionDetails: "",
      onChangeHandler: jest.fn(),
    };
    render(<ConfessionDetails {...requiredProps} />);

    const input = screen.getByLabelText("Confession Detail");

    expect(input).toBeInTheDocument();
  });
  test(`Given the required props, 
        When input text is updated, 
        Then onChangeHandler function is called`, async () => {
    const requiredProps: ConfessionDetailsProps = {
      confessionDetails: "",
      onChangeHandler: jest.fn(),
    };
    render(<ConfessionDetails {...requiredProps} />);

    const inputNode = screen.getByLabelText("Confession Detail");
    await userEvent.type(inputNode, "What can I say, it was on a whim");

    expect(requiredProps.onChangeHandler).toBeCalledTimes(32);
    expect(requiredProps.onChangeHandler).toHaveBeenLastCalledWith(
      "m",
      "details"
    );
  });
});
