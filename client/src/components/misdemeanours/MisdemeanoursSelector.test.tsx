import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MisdemeanourSelector, {
  MisdemeanourSelectorProps,
} from "./MisdemeanourSelector";

describe("<MisdemeanourSelector> - filter misdemeanours", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the misdemeanour selector should be present`, () => {
    const requiredProps: MisdemeanourSelectorProps = {
      misdemeanourKind: "lift",
      labelForNoSelection: "All",
      onChangeHandler: jest.fn(),
    };
    render(<MisdemeanourSelector {...requiredProps} />);

    const input = screen.getByLabelText("Filter by Misdemeanour");

    expect(input).toBeInTheDocument();

    expect(
      (screen.getByText("Speaking in a Lift 🗣") as HTMLOptionElement).selected
    ).toBe(true);
  });
  test(`Given the required props,
        When each misdemeanour is selected,
        Then onchange is called with the select value`, async () => {
    const mockOnChange = jest.fn((x) => x);
    const requiredProps: MisdemeanourSelectorProps = {
      misdemeanourKind: undefined,
      labelForNoSelection: "All",
      onChangeHandler: mockOnChange,
    };
    render(<MisdemeanourSelector {...requiredProps} />);

    expect((screen.getByText("All") as HTMLOptionElement).selected).toBe(true);

    const select = screen.getByLabelText("Filter by Misdemeanour");
    await userEvent.selectOptions(select, ["Not Eating Your Vegetables 🥗"]);
    expect(mockOnChange).toHaveReturnedWith("vegetables");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    await userEvent.selectOptions(select, ["Mild Public Rudeness 🤪"]);
    expect(mockOnChange).toHaveReturnedWith("rudeness");
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    await userEvent.selectOptions(select, ["Speaking in a Lift 🗣"]);
    expect(mockOnChange).toHaveReturnedWith("lift");
    expect(mockOnChange).toHaveBeenCalledTimes(3);
    await userEvent.selectOptions(select, ["Supporting Manchester United 😈"]);
    expect(mockOnChange).toHaveReturnedWith("united");
    expect(mockOnChange).toHaveBeenCalledTimes(4);
  });
});

describe("<MisdemeanourSelector> - reason for confession", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the misdemeanour selector should be present`, () => {
    const requiredProps: MisdemeanourSelectorProps = {
      misdemeanourKind: "just-talk",
      labelForNoSelection: "Select",
      onChangeHandler: jest.fn(),
      validate: jest.fn(),
      includeJustTalk: true,
      doSubmitValidation: false,
    };
    render(<MisdemeanourSelector {...requiredProps} />);

    const input = screen.getByLabelText("Reason for Contact");

    expect(input).toBeInTheDocument();

    expect(
      (screen.getByText("I just want to talk") as HTMLOptionElement).selected
    ).toBe(true);
  });
  test(`Given the required props,
        When the component is rendered,
        Then the misdemeanour selector should be present`, () => {
    const requiredProps: MisdemeanourSelectorProps = {
      misdemeanourKind: "united",
      labelForNoSelection: "Select",
      onChangeHandler: jest.fn(),
      validate: jest.fn(),
      includeJustTalk: true,
      doSubmitValidation: true,
    };
    render(<MisdemeanourSelector {...requiredProps} />);

    const input = screen.getByLabelText("Reason for Contact");

    expect(input).toBeInTheDocument();

    expect(
      (screen.getByText("Supporting Manchester United 😈") as HTMLOptionElement)
        .selected
    ).toBe(true);

    expect(requiredProps.validate).toHaveBeenCalledTimes(1);
    expect(requiredProps.validate).toHaveBeenLastCalledWith("united");
  });
  test(`Given the required props,
        When each misdemeanour is selected,
        Then onchange is called with the select value`, async () => {
    const mockOnChange = jest.fn((x) => x);
    const requiredProps: MisdemeanourSelectorProps = {
      misdemeanourKind: undefined,
      labelForNoSelection: "Select",
      onChangeHandler: mockOnChange,
      validate: jest.fn(),
      includeJustTalk: true,
      doSubmitValidation: true,
    };
    render(<MisdemeanourSelector {...requiredProps} />);

    expect((screen.getByText("Select") as HTMLOptionElement).selected).toBe(true);

    const select = screen.getByLabelText("Reason for Contact");
    await userEvent.selectOptions(select, ["Not Eating Your Vegetables 🥗"]);
    expect(mockOnChange).toHaveBeenLastCalledWith("vegetables", "reason");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    await userEvent.selectOptions(select, ["Mild Public Rudeness 🤪"]);
    expect(mockOnChange).toHaveBeenLastCalledWith("rudeness", "reason");
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    await userEvent.selectOptions(select, ["Speaking in a Lift 🗣"]);
    expect(mockOnChange).toHaveBeenLastCalledWith("lift", "reason");
    expect(mockOnChange).toHaveBeenCalledTimes(3);
    await userEvent.selectOptions(select, ["Supporting Manchester United 😈"]);
    expect(mockOnChange).toHaveBeenLastCalledWith("united", "reason");
    expect(mockOnChange).toHaveBeenCalledTimes(4);
    await userEvent.selectOptions(select, ["I just want to talk"]);
    expect(mockOnChange).toHaveBeenLastCalledWith("just-talk", "reason");
    expect(mockOnChange).toHaveBeenCalledTimes(5);    
  });
});
