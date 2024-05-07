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
  
// Route utiliser pour savoir si un vélo possède un propriétaire ou non
app.get('/Proprietaire', (req, res) => {
  let sql = 'SELECT DISTINCT Velo.latitude, Velo.longitude, VeloID, UserID, User.Nom, User.Prenom FROM Location JOIN User ON Location.UserID = User.ID JOIN Velo ON Location.VeloID = Velo.ID WHERE Location.UserID IS NOT NULL UNION SELECT DISTINCT Velo.latitude, Velo.longitude, VeloID, UserID, User.Nom, User.Prenom FROM Velo LEFT JOIN Location ON Velo.ID = Location.VeloID LEFT JOIN User ON Location.UserID = User.ID WHERE Location.UserID IS NULL ORDER BY VeloID ASC;';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
//SELECT DISTINCT Latitude, longitude, UserID, VeloID FROM Velo, Location;
//SELECT latitude, longitude, VeloID, Nom, Prenom FROM Velo , User , Location WHERE VeloID = Velo.ID AND UserID = User.ID;
//SELECT DISTINCT Velo.latitude, Velo.longitude, VeloID, UserID, User.Nom, User.Prenom FROM Location JOIN User ON Location.UserID = User.ID JOIN Velo ON Location.VeloID = Velo.ID WHERE Location.UserID IS NOT NULL UNION SELECT DISTINCT Velo.latitude, Velo.longitude, VeloID, UserID, User.Nom, User.Prenom FROM Velo LEFT JOIN Location ON Velo.ID = Location.VeloID LEFT JOIN User ON Location.UserID = User.ID WHERE Location.UserID IS NULL ORDER BY VeloID ASC;
// Écoute du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
