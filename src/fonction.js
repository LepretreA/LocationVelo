// fonction.js

const connection = require('./database.js'); 

const getUserId = (nom, prenom, telephone, callback) => {
    const sql = 'SELECT ID FROM User WHERE Nom = ? AND Prenom = ? AND Telephone = ?';
    const values = [nom, prenom, telephone];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', err);
            callback(err, null);
        } else {
            if (result.length > 0) {
                const userId = result[0].ID;
                checkUserCurrentLocation(userId, (err, hasCurrentLocation) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        if (hasCurrentLocation) {
                            const error = new Error('Vous avez déjà une location en cours');
                            error.statusCode = 400;
                            callback(error, null);
                        } else {
                            callback(null, userId);
                        }
                    }
                });
            } else {
                const sqlInsert = 'INSERT INTO User (Nom, Prenom, Telephone) VALUES (?, ?, ?)';
                connection.query(sqlInsert, values, (err, result) => {
                    if (err) {
                        console.error('Erreur lors de la création de l\'utilisateur :', err);
                        callback(err, null);
                    } else {
                        const userId = result.insertId;
                        callback(null, userId);
                    }
                });
            }
        }
    });
};


const checkUserCurrentLocation = ({ nom, prenom, telephone }, callback) => {
    const sql = `
        SELECT * 
        FROM Location 
        INNER JOIN User ON Location.UserID = User.ID
        WHERE User.Nom = ? AND User.Prenom = ? `;
    connection.query(sql, [nom, prenom, telephone], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de la location de l\'utilisateur :', err);
            callback(err, null);
        } else {
            callback(null, result.length > 0);
        }
    });
};



const getVeloId = (idVelo, callback) => {
    const sql = 'SELECT ID FROM Velo WHERE ID = ?'; 
    connection.query(sql, [idVelo], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'ID du vélo :', err);
            callback(err, null);
        } else {
            if (result.length > 0) {
                const veloId = result[0].ID;
                callback(null, veloId);
            } else {
                console.error('ID du vélo introuvable');
                callback('ID du vélo introuvable', null);
            }
        }
    });
};

const checkVeloAvailability = (veloId, callback) => {
    const sql = 'SELECT * FROM Location WHERE VeloID = ?'; 
    connection.query(sql, [veloId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de la disponibilité du vélo :', err);
            callback(err, null);
        } else {
            if (result.length > 0) {
                // Si le résultat est trouvé, le vélo est déjà associé à un utilisateur (déjà loué)
                callback(null, false);
            } else {
                // Si le résultat est vide, le vélo est disponible
                callback(null, true);
            }
        }
    });
};




const louerVelo = (nom, prenom, telephone, idVelo, codeRetour, callback) => {
    getUserId(nom, prenom, telephone, (err, userId) => {
        if (err) {
            callback(err, null);
        } else {
            checkUserCurrentLocation(userId, (err, hasLocation) => {
                if (err) {
                    callback(err, null);
                } else if (hasLocation) {
                    callback('Vous avez déjà une location en cours', null);
                } else {
                    getVeloId(idVelo, (err, veloId) => {
                        if (err) {
                            callback(err, null);
                        } else {
                            checkVeloAvailability(veloId, (err, isVeloAvailable) => {
                                if (err) {
                                    callback(err, null);
                                } else if (!isVeloAvailable) {
                                    err = {}
                                    err.message = 'Le vélo est déjà loué par une autre personne';
                                    callback(err, null);
                                } else {
                                    const dateEmprunt = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                    const sql = 'INSERT INTO Location (UserID, VeloID, DateEmprunt, CodeRetour) VALUES (?, ?, ?, ?)';
                                    const values = [userId, veloId, dateEmprunt, parseInt(codeRetour)];
                                    connection.query(sql, values, (err, result) => {
                                        if (err) {
                                            console.error('Erreur lors de la location du vélo :', err);
                                            callback(err, null);
                                        } else {
                                            console.log('Location enregistrée avec succès');
                                            callback(null, 'Location enregistrée avec succès');
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

const rendreVelo = (idVelo, codeRetour, callback) => {
    const sql = 'SELECT * FROM Location WHERE VeloID = ? AND CodeRetour = ?';
    connection.query(sql, [idVelo, codeRetour], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification du retour du vélo :', err);
            callback(err, null);
        } else {
            if (result.length > 0) {
                const sqlDelete = 'DELETE FROM Location WHERE VeloID = ?';
                connection.query(sqlDelete, [idVelo], (err, result) => {
                    if (err) {
                        console.error('Erreur lors du retour du vélo :', err);
                        callback(err, null);
                    } else {
                        callback(null, 'Vélo rendu avec succès');
                    }
                });
            } else {
                const error = new Error('Code de retour incorrect ou vélo non trouvé');
                error.statusCode = 400;
                callback(error, null);
            }
        }
    });
};

module.exports = { louerVelo, rendreVelo, checkUserCurrentLocation };
