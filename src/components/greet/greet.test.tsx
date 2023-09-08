/**
 * Greet should render the text and if a name is passed into the component
 * It should render hello followed by the name
 */

import { render, screen } from '@testing-library/react';
import { Greet } from './greet';

describe('Greet', () => {
  test('renders correctly', () => {
    render(<Greet />);
    const textElement = screen.getByText(/Hello/);
    expect(textElement).toBeInTheDocument();
  });

  test('renders with a name', () => {
    render(<Greet name="Vishwas" />);
    const textElement = screen.getByText('Hello Vishwas');
    expect(textElement).toBeInTheDocument();
  });
});
