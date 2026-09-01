import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MindBridge login screen when logged out', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /mindbridge/i, level: 1 });
  expect(heading).toBeInTheDocument();
});