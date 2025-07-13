import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../BugForm';

describe('BugForm', () => {
  it('renders form and submits', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
    render(<BugForm />);
    fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Bug' } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Desc' } });
    fireEvent.click(screen.getByText(/Report Bug/i));
    expect(await screen.findByPlaceholderText(/Title/i)).toHaveValue('');
  });
});
