# MERN — liste de tâches et hébergement

Petite application MERN (MongoDB, Express, React, Node.js) qui affiche une liste de tâches stockées dans MongoDB (Atlas ou local).
Exercice de formation centré sur la préparation d'une application full stack au déploiement : un seul serveur Express sert à la fois l'API et le frontend React compilé.

## Fonctionnalités

- API REST en lecture : `GET /api/lists` renvoie les tâches de la collection MongoDB
- Interface React qui récupère et affiche les tâches (titre et contenu), avec un message si la liste est vide
- Express sert le build React (`frontend/build`) et renvoie `index.html` pour toutes les autres routes
- Configuration de déploiement Render (`render.yaml`)
- Tests automatisés du backend (sans base de données) et du frontend, intégration continue GitHub Actions pour le backend

## Stack

- Backend : Node.js, Express 5, Mongoose 8, cors, dotenv
- Frontend : React 19 (Create React App)
- Tests : Jest et supertest (backend), React Testing Library (frontend)

## Structure

```
backend/
  server.js        # API Express + service du build React
  models/List.js   # schéma Mongoose des tâches (title, body, user, dates)
  tests/           # tests de l'API
frontend/          # application React (Create React App)
render.yaml        # configuration de déploiement Render
```

## Installation et lancement en local

Prérequis : Node.js 20 ou plus récent et une base MongoDB.

```bash
# Backend
cd backend
npm install
cp .env.example .env   # puis renseigner MONGO_URI
npm start              # http://localhost:5000

# Frontend (dans un autre terminal)
cd frontend
npm install
npm start              # http://localhost:3000, les appels /api sont redirigés vers le port 5000
```

Pour servir l'interface depuis Express (comme en production), générer le build : `cd frontend && npm run build`, puis ouvrir `http://localhost:5000`.

## Variables d'environnement (backend)

| Variable    | Obligatoire | Description                 | Défaut |
|-------------|-------------|-----------------------------|--------|
| `MONGO_URI` | oui         | Chaîne de connexion MongoDB | —      |
| `PORT`      | non         | Port d'écoute               | `5000` |

Le serveur s'arrête avec un message explicite si `MONGO_URI` est absente.

## Endpoints

| Méthode | Route        | Description                                    |
|---------|--------------|------------------------------------------------|
| GET     | `/api/lists` | Liste de toutes les tâches (tableau JSON)      |
| GET     | `/*`         | Fichiers du build React, sinon `index.html`    |

## Déploiement

Le fichier `render.yaml` décrit un service web Node pour [Render](https://render.com) : installation et démarrage du backend, `NODE_ENV=production`, `PORT=10000` et `MONGO_URI` à renseigner dans le tableau de bord Render.
À noter : la commande de build actuelle n'installe que le backend ; pour que l'interface React soit servie, il faut aussi générer le build du frontend.

## Tests

```bash
cd backend && npm test                      # API, modèle Mongoose simulé
cd frontend && npm test -- --watchAll=false # composant App, fetch simulé
```

Les tests du backend sont exécutés à chaque push par GitHub Actions (`.github/workflows/ci.yml`).
