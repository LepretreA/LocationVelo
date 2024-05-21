#include "MyWebSocketServer.h"
#include <QDebug>
#include <QtSerialPort/QSerialPort>
#include <QtSerialPort/QSerialPortInfo>
#include <QSqlQuery>
#include <QDate>

MyWebSocketServer::MyWebSocketServer(QObject* parent) : QObject(parent), m_insertionCount(0)
{
    // Configuration de la base de donnees
    m_database = QSqlDatabase::addDatabase("QMYSQL");
    m_database.setHostName("192.168.64.210");
    m_database.setDatabaseName("Projet_Velo");
    m_database.setUserName("mathias");
    m_database.setPassword("root");

    if (!m_database.open()) {
        qDebug() << "Impossible de se connecter a la base de donnees.";
        return;
    }

    qDebug() << "Connexion a la base de donnees etablie.";

    // Configuration du port serie
    m_serialPort.setPortName("COM6"); // Remplacez par le bon port serie
    m_serialPort.setBaudRate(QSerialPort::Baud9600); // Vitesse de communication
    m_serialPort.setDataBits(QSerialPort::Data8);
    m_serialPort.setParity(QSerialPort::NoParity);
    m_serialPort.setStopBits(QSerialPort::OneStop);
    m_serialPort.setFlowControl(QSerialPort::NoFlowControl);

    // Connexion du slot onReadyRead au signal readyRead du port serie
    connect(&m_serialPort, SIGNAL(readyRead()), this, SLOT(onReadyRead()));

    // Ouverture du port serie
    if (m_serialPort.open(QIODevice::ReadOnly)) {
        qDebug() << "Port serie ouvert.";
    }
    else {
        qDebug() << "Impossible d'ouvrir le port serie.";
    }
}

void MyWebSocketServer::onReadyRead()
{
    static QByteArray receivedData;

    receivedData.append(m_serialPort.readAll());

    // Tant qu'il y a des donnees a lire
    while (m_serialPort.waitForReadyRead(10)) {
        receivedData.append(m_serialPort.readAll());
    }

    // Recherche du caractere de fin de ligne
    int endIndex = receivedData.indexOf("\r\n");
    if (endIndex != -1) {
        // Si le caractere de fin de ligne est trouve, extraire la ligne
        QByteArray lineData = receivedData.left(endIndex).trimmed();
        receivedData = receivedData.mid(endIndex + 2);

        // Afficher la ligne dans la console
        qDebug() << "Donnees recues du port serie : " << QString::fromUtf8(lineData);

        // Extraire latitude et longitude de la ligne
        QString line = QString::fromUtf8(lineData);
        int latitudeIndex = line.indexOf("Latitude:");
        int longitudeIndex = line.indexOf(":Longitude:");

        if (latitudeIndex != -1 && longitudeIndex != -1) {
            QString latitude = line.mid(latitudeIndex + QString("Latitude:").length(), longitudeIndex - (latitudeIndex + QString("Latitude:").length())).trimmed();
            QString longitude = line.mid(longitudeIndex + QString(":Longitude:").length()).trimmed();

            // Inserer les donnees dans la base de donnees
            insertDataIntoDatabase(latitude, longitude);
        }
        else {
            qDebug() << "Format de donnees invalide.";
        }
    }
}


void MyWebSocketServer::insertDataIntoDatabase(const QString& latitudeStr, const QString& longitudeStr)
{
    QSqlQuery query;
    query.prepare("UPDATE `Velo` SET `Longitude` = :longitude, `Latitude` = :latitude, `LastDate` = :lastDate WHERE `ID` = 10");

    // Recuperer la date et l'heure actuelles
    QDateTime currentTime = QDateTime::currentDateTime();
    QString currentDateTimeString = currentTime.toString(Qt::ISODate);

    // Requete d'insertion en BDD
    query.bindValue(":longitude", longitudeStr);
    query.bindValue(":latitude", latitudeStr);
    query.bindValue(":lastDate", currentDateTimeString);

    if (query.exec()) {
        qDebug() << "Donnees inserees avec succes dans la base de donnees.";
        // Message insertion BDD - reussite
    }
    else {
        qDebug() << "Erreur lors de l'insertion dans la base de donnees.";
        // Message insertion BDD - echec
    }
}
