import { render, screen } from '@testing-library/react';
import BugList from '../BugList';

describe('BugList', () => {
  it('renders bug list', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([{ _id: '1', title: 'Bug', description: 'Desc', status: 'open' }]) }));
    render(<BugList />);
    expect(await screen.findByText(/Bug/i)).toBeInTheDocument();
  });
});
