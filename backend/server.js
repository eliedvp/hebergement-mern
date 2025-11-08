const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const List = require("./models/List"); 
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connexion à MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(" MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB:", err));

// Route pour récupérer toutes les tâches
app.get("/api/lists", async (req, res) => {
  try {
    const lists = await List.find(); // récupère tous les documents
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servir le frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
