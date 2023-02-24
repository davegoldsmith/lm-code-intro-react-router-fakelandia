import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubjectInput, { SubjectInputProps } from "./ConfessionSubject";

describe("<SubjectInput> ", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the subject input should be present`, () => {
    const requiredProps: SubjectInputProps = {
      subject: "",
      validate: jest.fn(),
      onChangeHandler: jest.fn(),
      doSubmitValidation: false,
    };
    render(<SubjectInput {...requiredProps} />);

    const input = screen.getByLabelText("Subject");

    expect(input).toBeInTheDocument();
  });
  test(`Given the required props, 
        When input text is updated, 
        Then onChangeHandler function is called`, async () => {
    const requiredProps: SubjectInputProps = {
      subject: "",
      validate: jest.fn(),
      onChangeHandler: jest.fn(),
      doSubmitValidation: false,
    };
    render(<SubjectInput {...requiredProps} />);

    const inputNode = screen.getByLabelText(/subject/i);
    await userEvent.type(inputNode, "I've been naughty!");

    expect(requiredProps.onChangeHandler).toBeCalledTimes(18);
    expect(requiredProps.onChangeHandler).toHaveBeenLastCalledWith(
      "!",
      "subject"
    );
  });
  test(`Given the required props, 
        When input text is updated, 
        Then validate function is called`, async () => {
    const requiredProps: SubjectInputProps = {
      subject: "",
      validate: jest.fn(),
      onChangeHandler: jest.fn(),
      doSubmitValidation: false,
    };
    render(<SubjectInput {...requiredProps} />);

    const inputNode = screen.getByLabelText(/subject/i);
    await userEvent.type(inputNode, "I've been naughty!");

    expect(requiredProps.validate).toBeCalledTimes(18);
    expect(requiredProps.validate).toHaveBeenLastCalledWith("!");
  });

  test(`Given the required props, 
        When submit flag is false and subject is invalid, 
        Then validate function is not called`, async () => {
    const mockValidate = jest.fn();
    mockValidate.mockReturnValue("Fake error message");

    const requiredProps: SubjectInputProps = {
      subject: "",
      validate: mockValidate,
      onChangeHandler: jest.fn(),
      doSubmitValidation: false,
    };
    render(<SubjectInput {...requiredProps} />);

    expect(mockValidate).toBeCalledTimes(0);

    expect(screen.queryByText("Fake error message")).toBeNull();
  });

  test(`Given the required props, 
        When submit flag is true and subject is invalid, 
        Then validate function is called`, async () => {
    const mockValidate = jest.fn();
    mockValidate.mockReturnValue("Fake error message");

    const requiredProps: SubjectInputProps = {
      subject: "",
      validate: mockValidate,
      onChangeHandler: jest.fn(),
      doSubmitValidation: true,
    };
    render(<SubjectInput {...requiredProps} />);

    expect(mockValidate).toBeCalledTimes(1);

    expect(screen.queryByText("Fake error message")).toBeInTheDocument();
  });
});
