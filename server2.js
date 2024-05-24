const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const expressWs = require('express-ws');
const bodyParser = require('body-parser');

const app = express();
const port = 3080;

let bikesCoordinates = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Vous pouvez restreindre l'origine en fonction de vos besoins.
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const server = expressWs(app);

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

app.get('/SelectUser', (req, res) => {
  console.log('Requête GET reçue : /SelectUser'); // Vérifiez si la requête GET est reçue
  let sql = 'SELECT * FROM User';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/Proprietaire', (req, res) => {
  //console.log('Requête GET reçue : /Proprietaire'); // Vérifiez si la requête GET est reçue
  let sql = 'SELECT DISTINCT Velo.latitude, Velo.longitude, VeloID, UserID, User.Nom, User.Prenom FROM Location JOIN User ON Location.UserID = User.ID JOIN Velo ON Location.VeloID = Velo.ID WHERE Location.UserID IS NOT NULL UNION SELECT DISTINCT Velo.latitude, Velo.longitude, VeloID, UserID, User.Nom, User.Prenom FROM Velo LEFT JOIN Location ON Velo.ID = Location.VeloID LEFT JOIN User ON Location.UserID = User.ID WHERE Location.UserID IS NULL ORDER BY VeloID ASC;';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/updateBikePosition', (req, res) => {
  const bikeData = req.body;

  if (!bikeData.VeloID || !bikeData.latitude || !bikeData.longitude) {
    console.log('Données invalides ou incomplètes pour la mise à jour de la position du vélo :', bikeData);
    res.json({ success: false });
    return;
  }

  console.log('Mise à jour de la position du vélo :', bikeData); // Afficher les données reçues

  let bikeIndex = bikesCoordinates.findIndex(bike => bike.VeloID === bikeData.VeloID);

  console.log('État du tableau bikesCoordinates avant la mise à jour :', bikesCoordinates); // Afficher l'état du tableau avant la mise à jour

  if (bikeIndex === -1) {
    bikesCoordinates.push({
      VeloID: bikeData.VeloID,
      history: [{
        latitude: bikeData.latitude,
        longitude: bikeData.longitude
      }]
    });
  } else {
    bikesCoordinates[bikeIndex].history.push({
      latitude: bikeData.latitude,
      longitude: bikeData.longitude
    });

    if (bikesCoordinates[bikeIndex].history.length > 3) {
      bikesCoordinates[bikeIndex].history.shift();
    }
  }

  console.log('État du tableau bikesCoordinates après la mise à jour :', bikesCoordinates); // Afficher l'état du tableau après la mise à jour
  console.log('Adresse mémoire de bikesCoordinates dans /updateBikePosition :', JSON.stringify(bikesCoordinates));


  
  res.json({ success: true });
});

app.get('/getBikeHistory/:VeloID', (req, res) => {
  const bikeID = parseInt(req.params.VeloID, 10); // convertir la chaîne de caractères en un nombre
  const bike = bikesCoordinates.find(bike => bike.VeloID === bikeID);

  if (!bike) {
    console.log(`Aucun historique de position trouvé pour le vélo avec l'ID ${bikeID}`);
    res.json([]);
    return;
  }

  console.log(`Historique de position pour le vélo avec l'ID ${bikeID} :`, bike.history);
  res.json(bike.history);
});



app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});