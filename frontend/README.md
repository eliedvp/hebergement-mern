# Frontend — liste de tâches

Interface React (Create React App) qui récupère les tâches via `GET /api/lists` et les affiche.
Voir le [README principal](../README.md) pour l'ensemble du projet.

## Scripts

| Commande                       | Description |
|--------------------------------|-------------|
| `npm start`                    | Serveur de développement sur `http://localhost:3000` ; les appels `/api` sont redirigés vers le backend (`proxy` vers `http://localhost:5000`) |
| `npm test -- --watchAll=false` | Tests du composant `App` (React Testing Library, `fetch` simulé) |
| `npm run build`                | Build de production dans `build/`, servi ensuite par le backend Express |

Le backend doit être lancé (voir `../backend`) pour que des tâches s'affichent en développement.
