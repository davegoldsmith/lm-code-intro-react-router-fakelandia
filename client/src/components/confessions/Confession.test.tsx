import { render, screen } from "@testing-library/react";
import Confession from "./Confession";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<Confession>", () => {
  test("renders form element", () => {
    render(<Confession />);

    const form = screen.getByTestId("confession-form");

    expect(form).toBeInTheDocument();
  });

  test(`Given nothing is entered ,
        When submit button is pressed,
        then validation errors are shown`, async () => {
    render(<Confession />);

    // I've set up my validation so validation for all fields happens
    // onSubmit as well as onChange - this way the user cannot
    // proceed without the correct values being entered regardless
    // of them touching any inputs
    const submitButton = screen.getByLabelText(/submit/i);

    await userEvent.click(submitButton);

    expect(
      screen.getByText("🚫Reason for Contact must be Provided")
    ).toBeInTheDocument();
    expect(
      screen.getByText("🚫Subject Must have length between 1 and 25")
    ).toBeInTheDocument();
  });

  test(`Given an invalid subject is entered,
        When submit button is pressed,
        then a validation error are shown`, async () => {
    render(<Confession />);

    const submitButton = screen.getByLabelText(/submit/i);

    const subjectInput = screen.getByLabelText(/subject/i);
    const reasonInput = screen.getByLabelText(/reason for contact/i);
    const detailsInput = screen.getByLabelText(/confession detail/i);

    await userEvent.type(subjectInput, "Been very very very very naughty");
    await userEvent.selectOptions(reasonInput, "rudeness");
    await userEvent.type(detailsInput, "Yep, called a donkey an ass.");

    await userEvent.click(submitButton);

    expect(
      screen.queryByText("🚫Reason for Contact must be Provided")
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("🚫Subject Must have length between 1 and 25")
    ).toBeInTheDocument();
  });

  test(`Given an invalid reason is chosen,
        When submit button is pressed,
        then a validation error are shown`, async () => {
    render(<Confession />);

    const submitButton = screen.getByLabelText(/submit/i);

    const subjectInput = screen.getByLabelText(/subject/i);
    const reasonInput = screen.getByLabelText(/reason for contact/i);
    const detailsInput = screen.getByLabelText(/confession detail/i);

    await userEvent.type(subjectInput, "Been very naughty");
    await userEvent.selectOptions(reasonInput, "none");
    await userEvent.type(detailsInput, "Yep, called a donkey an ass.");

    await userEvent.click(submitButton);

    expect(
      screen.getByText("🚫Reason for Contact must be Provided")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("🚫Subject Must have length between 1 and 25")
    ).not.toBeInTheDocument();
  });

  test(`Given all data is valid and a misdemeanour is selected,
        When submit button is pressed,
        then no validation errors are shown`, async () => {
    render(<Confession />);

    const submitButton = screen.getByLabelText(/submit/i);

    const subjectInput = screen.getByLabelText(/subject/i);
    const reasonInput = screen.getByLabelText(/reason for contact/i);
    const detailsInput = screen.getByLabelText(/confession detail/i);

    await userEvent.type(subjectInput, "Been naughty");
    await userEvent.selectOptions(reasonInput, "rudeness");
    await userEvent.type(detailsInput, "Yep, called a donkey an ass.");

    expect(submitButton).not.toBeDisabled();

    await userEvent.click(submitButton);

    expect(
      screen.queryByText("🚫Reason for Contact must be Provided")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("🚫Subject Must have length between 1 and 25")
    ).not.toBeInTheDocument();
  });

  test(`Given all data is valid and a misdemeanour is selected,
        When submit button is pressed,
        then confession success message is shown`, async () => {
    server.use(
      rest.post("http://localhost:8080/api/confess", (req, res, ctx) => {
        return res(
          ctx.json({
            success: true,
            justTalked: false,
            message: "Confession received.",
          })
        );
      })
    );

    render(<Confession />);

    const submitButton = screen.getByLabelText(/submit/i);

    const subjectInput = screen.getByLabelText(/subject/i);
    const reasonInput = screen.getByLabelText(/reason for contact/i);
    const detailsInput = screen.getByLabelText(/confession detail/i);

    await userEvent.type(subjectInput, "Been naughty");
    await userEvent.selectOptions(reasonInput, "rudeness");
    await userEvent.type(detailsInput, "Yep, called a donkey an ass.");

    await userEvent.click(submitButton);
    const message = await screen.findByText(/thanks for the confession/i);

    // fields should be reset after successful submit
    expect(subjectInput).toHaveValue("");
    expect(detailsInput).toHaveValue("");
    expect(reasonInput).toHaveValue("none");
    
    expect(message).toBeInTheDocument();
  });

  test(`Given all data is valid and Just Talk is selected,
        When submit button is pressed,
        then just talk message is shown`, async () => {
    server.use(
      rest.post("http://localhost:8080/api/confess", (req, res, ctx) => {
        return res(
          ctx.json({
            success: true,
            justTalked: true,
            message: "Thanks for talking to us."
          })
        );
      })
    );

    render(<Confession />);

    const submitButton = screen.getByLabelText(/submit/i);

    const subjectInput = screen.getByLabelText(/subject/i);
    const reasonInput = screen.getByLabelText(/reason for contact/i);
    const detailsInput = screen.getByLabelText(/confession detail/i);

    await userEvent.type(subjectInput, "Pottery inquiry");
    await userEvent.selectOptions(reasonInput, "just-talk");
    await userEvent.type(detailsInput, "Did you see this week's Pottery Throwdown?");

    await userEvent.click(submitButton);
    const message = await screen.findByText(/You just want to talk about Pottery/i);

    // fields should be reset after successful submit
    expect(subjectInput).toHaveValue("");
    expect(detailsInput).toHaveValue("");
    expect(reasonInput).toHaveValue("none");
    
    expect(message).toBeInTheDocument();
  });  

  test(`Given all data is valid but server is not responding,
        When submit button is pressed,
        then an error message should be shown`, async () => {
    server.use(
      rest.post("http://localhost:8080/api/confess", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            success: false,
            message: "Invalid Confession"
          })
        );
      })
    );

    render(<Confession />);

    const submitButton = screen.getByLabelText(/submit/i);

    const subjectInput = screen.getByLabelText(/subject/i);
    const reasonInput = screen.getByLabelText(/reason for contact/i);
    const detailsInput = screen.getByLabelText(/confession detail/i);

    await userEvent.type(subjectInput, "Pottery inquiry");
    await userEvent.selectOptions(reasonInput, "just-talk");
    await userEvent.type(detailsInput, "Did you see this week's Pottery Throwdown?");

    await userEvent.click(submitButton);
    const message = await screen.findByText(/Error trying to save your confession. Please try again later/i);

    // fields should be not be reset if there is an error
    expect(subjectInput).toHaveValue("Pottery inquiry");
    expect(detailsInput).toHaveValue("Did you see this week's Pottery Throwdown?");
    expect(reasonInput).toHaveValue("just-talk");
    
    expect(message).toBeInTheDocument();
  });  
});
