import { render, screen } from '@testing-library/react';
import App from './App';

afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
});

test('affiche les tâches récupérées depuis /api/lists', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve([{ _id: '1', title: 'Déployer', body: 'Configurer Render' }]),
  });

  render(<App />);

  expect(await screen.findByText('Déployer')).toBeInTheDocument();
  expect(screen.getByText('Configurer Render')).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith('/api/lists');
});

test('affiche un message lorsque la liste est vide', async () => {
  global.fetch = jest.fn().mockResolvedValue({ json: () => Promise.resolve([]) });

  render(<App />);

  expect(await screen.findByText(/aucune tâche disponible/i)).toBeInTheDocument();
});
