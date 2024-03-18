const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Vous pouvez restreindre l'origine en fonction de vos besoins.
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); 

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: '192.168.64.210',
  user: 'root',
  password: 'root',
  database: 'Projet_Velo'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connecté à la base de données MySQL');
});



// Définir une route pour récupérer des données depuis la base de données
app.get('/SelectUser', (req, res) => {
  let sql = 'SELECT * FROM User';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Route pour récupérer les données de latitude et de longitude depuis la base de données
app.get('/markers', (req, res) => {
    let sql = 'SELECT latitude, longitude FROM Velo';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
// Écoute du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
