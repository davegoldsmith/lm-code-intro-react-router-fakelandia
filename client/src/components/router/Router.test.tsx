import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import Router from "./Router"

describe("<Router />", () => {
    it("navigates to the home page when home is clicked", async () => {
        render(<MemoryRouter initialEntries={['/confess']}><Router /></MemoryRouter>)
        await userEvent.click(screen.getByText("Home"));
        expect(screen.getByText("Welcome to the home of the Justice Department of Fakelandia.")).toBeInTheDocument();
    });

    it("navigates to the misdemeanours page when misdemeanours is clicked", async () => {
        render(<MemoryRouter initialEntries={['/confess']}><Router /></MemoryRouter>)
        await userEvent.click(screen.getByText("Misdemeanours"));
        expect(screen.getByText("Filter by Misdemeanour:")).toBeInTheDocument();
    });

    it("navigates to the confession page when confession is clicked", async () => {
        render(<MemoryRouter initialEntries={['/misdemeanours']}><Router /></MemoryRouter>)
        await userEvent.click(screen.getByText("Confess To Us"));
        expect(screen.getByText("Subject:")).toBeInTheDocument();
    });
})