import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock fetch
global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));

describe('App', () => {
  it('renders Bug Tracker title', () => {
    render(<App />);
    expect(screen.getByText(/Bug Tracker/i)).toBeInTheDocument();
  });
});
