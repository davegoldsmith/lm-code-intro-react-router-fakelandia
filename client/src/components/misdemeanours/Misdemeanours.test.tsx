import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Misdemeanours from "./Misdemeanours";
import MisdemeanoursProvider from "../context/MisdemeanoursProvider";

const server = setupServer(
  rest.get(`http://localhost:8080/api/misdemeanours/5`, (req, res, ctx) => {
    return res(
      ctx.json({
        misdemeanours: [
          {
            citizenId: 1234,
            misdemeanour: "vegetables",
            date: "22/2/2022",
          },
          {
            citizenId: 5678,
            misdemeanour: "rudeness",
            date: "23/3/2023",
          },
          {
            citizenId: 999,
            misdemeanour: "rudeness",
            date: "21/2/2022",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<Misdemeanours>", () => {
  test("renders form element", async () => {
    render(
      <MisdemeanoursProvider>
        <Misdemeanours />
      </MisdemeanoursProvider>
    );

    const filter = await(screen.findByText("Filter by Misdemeanour:"));
    const misdemRows = await (screen.findAllByRole("row"));

    expect(filter).toBeInTheDocument();

    expect(misdemRows).toHaveLength(4);
    expect(misdemRows[0]).toHaveTextContent("Citizen ID");
    expect(misdemRows[0]).toHaveTextContent("Date");
    expect(misdemRows[0]).toHaveTextContent("Misdemeanour");
    expect(misdemRows[0]).toHaveTextContent("Punishment Idea");

    expect(misdemRows[1]).toHaveTextContent("1234");
    expect(misdemRows[2]).toHaveTextContent("5678");
    expect(misdemRows[3]).toHaveTextContent("999");

    expect(misdemRows[1]).toHaveTextContent("22/2/2022");
    expect(misdemRows[2]).toHaveTextContent("23/3/2023");
    expect(misdemRows[3]).toHaveTextContent("21/2/2022");

    expect(misdemRows[1]).toHaveTextContent("Not Eating Your Vegetables 🥗");
    expect(misdemRows[2]).toHaveTextContent("Mild Public Rudeness 🤪");
    expect(misdemRows[3]).toHaveTextContent("Mild Public Rudeness 🤪");
  });

  test("renders form element", async () => {
    server.use(
      rest.get(`http://localhost:8080/api/misdemeanours/5`, (req, res, ctx) => {
        return res(
          ctx.json({
            misdemeanours: [
            ],
          })
        );
      })
    );
    render(
      <MisdemeanoursProvider>
        <Misdemeanours />
      </MisdemeanoursProvider>
    );

    const filter = await(screen.findByText("Filter by Misdemeanour:"));
    const noRows = await(screen.findByText("No matching misdemeanours found."));

    const misdemRows = screen.queryAllByRole("row");

    expect(filter).toBeInTheDocument();
    expect(noRows).toBeInTheDocument();
    expect(misdemRows).toHaveLength(0);
  });

});
