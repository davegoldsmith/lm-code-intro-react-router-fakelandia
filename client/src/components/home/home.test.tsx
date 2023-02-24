import { render, screen } from '@testing-library/react';
import Home from './Home';

describe("<HomePage />", () => {
    test('renders the welcome text', () => {
        render(<Home />);
        const introElement = screen.getByText(/Welcome to the home/i);
        expect(introElement).toBeInTheDocument();
    });
})