const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const List = require("./models/List"); 
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Route pour récupérer toutes les tâches
app.get("/api/lists", async (req, res) => {
  try {
    const lists = await List.find(); // récupère tous les documents
    res.json(lists);
  } catch (err) {
    // Le détail est journalisé côté serveur mais pas renvoyé au client
    console.error("Erreur /api/lists:", err);
    res.status(500).json({ error: "Erreur lors de la récupération des tâches" });
  }
});

// Servir le frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Express 5 n'accepte plus le chemin "*" : "/{*splat}" capture toutes les routes, y compris "/"
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"), (err) => {
    // Build absent : message simple au lieu de la page d'erreur avec chemin et stack
    if (err && !res.headersSent) {
      res.status(404).send("Frontend non disponible : lancez « npm run build » dans frontend/.");
    }
  });
});

module.exports = app;

// Connexion MongoDB et écoute seulement si le fichier est exécuté directement
if (require.main === module) {
  if (!MONGO_URI) {
    console.error("Variable d'environnement MONGO_URI manquante : copiez backend/.env.example vers backend/.env et renseignez-la.");
    process.exit(1);
  }

  // Connexion à MongoDB Atlas
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log(" MongoDB connecté"))
    .catch((err) => console.error("Erreur MongoDB:", err));

  app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
}
