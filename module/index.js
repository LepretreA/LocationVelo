const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware pour activer CORS
app.use(cors());

// Middleware pour parser les données JSON et les données de formulaire
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: '192.168.64.210',
  user: 'root',
  password: 'root',
  database: 'Projet_Velo'
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données établie');
});



// Route pour recevoir les données GPS depuis Sigfox
app.get('/gps/', (req, res) => {
  const lat = parseFloat(req.query.lat) / 1000000;
  const lng = parseFloat(req.query.lng) / 1000000;
  const id = req.query.id;
  
  console.log(`Module Sigfox numéro: ${id}`);
  console.log(`Latitude: ${lat}`);
  console.log(`Longitude: ${lng}`);
  
  if (isNaN(lat) || isNaN(lng)) {
    console.error('Latitude ou longitude invalide');
    res.status(400).send('Latitude ou longitude invalide');
    return;
  }
  
  // Mise à jour de la base de données
  const query = 'UPDATE Velo SET latitude = ?, longitude = ?, isRented = ? WHERE id = ?';
  const values = [lat, lng, 1, 10];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Erreur lors de la mise à jour des coordonnées dans la base de données :', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    console.log('Coordonnées mises à jour avec succès');
    res.send(`Coordonnées mises à jour : Latitude - ${lat}, Longitude - ${lng}`);
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
