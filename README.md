'#'🏕️🚲 Projet BTS Systèmes Numériques : Location de vélos au camping "Les portes de la baie de Somme"
🏫 Lycée La Providence, Amiens (Session 2024)
📋 Présentation du projet
M. Durand, le nouveau propriétaire du camping "Les portes de la baie de Somme", a un projet innovant en tête : proposer un service de location de vélos via un système de QR Code avec identification des vélos sur une carte grâce à une puce GPS et une communication M2M. Nous sommes fiers de travailler sur ce projet en tant qu'étudiants en BTS Systèmes Numériques, option A Informatique et Réseaux.

🔍 Analyse de l'existant
Actuellement, la location de vélos au camping est gérée manuellement par M. Durand, sans aucune application informatique. Les durées de location sont stockées dans un cahier de location manuscrit.

💡 Expression du besoin
🔧 Fonctionnalités attendues
Un client du camping peut réserver un vélo simplement en scannant un QR Code apposé sur le cadre.
L'administrateur doit connaître le temps d'utilisation de chaque campeur et la position GPS des vélos.
Un administrateur doit pouvoir gérer le CRUD (Création, Récupération, Mise à jour, Suppression) des QR Codes.
📐 Exigences attendues
Le QR Code est un lien direct vers la page de location avec le vélo déjà identifié.
Pour louer le vélo, le campeur doit saisir son identifiant et son code secret à 4 chiffres. Il n'a le droit qu'à 3 tentatives avant que son compte soit bloqué. Seul l'administrateur peut débloquer un compte.
L'interface utilisateur (IHM) doit être codée avec la librairie React.js et utiliser uniquement les API.
Une étude comparative de la communication M2M (Machine to Machine) ou GPRS (General Packet Radio Service) ou autre doit être proposée.
Une étude de la puce GPS fixée au vélo doit être proposée.
Le système doit être alimenté via la batterie du VAE (Vélo à Assistance Électrique) et se positionner dans le tube de la selle.
La base de données (BDD) doit être hébergée sur un serveur WEB de type phpMyAdmin.
L'application BACK-END doit être développée en PHP ou en Node.js.
La location doit être la plus simple possible : un scan + un identifiant et un code, c'est tout.
Pour terminer la location, le campeur doit rescanner le vélo, uniquement s'il se trouve dans la zone du camping à l'accueil.
L'API JS pour la carte GPS doit être gratuite.
Si un vélo se déplace sans qu'il soit loué, une alerte doit être levée pour prévenir l'administrateur.
Si un vélo n'est plus dans le système, une alerte doit être levée.
🔨 Énoncé des tâches à réaliser par les étudiants
👨‍💻 Étudiant 1
Création de l'IHM WEB en React.js.
Mise en place des QR Codes.
Logique de location.
👩‍💻 Étudiant 2
Étude de la communication.
Étude de la puce GPS.
Mise en place d'un système de géolocalisation.
Utilisation d'une API GPS.
👨‍💻 Étudiant 3
Création du MCD (Modèle Conceptuel de Données) et de la BDD.
Création des API CRUD pour gérer les données des vélos et des campeurs.
Création des API de location pour gérer les locations.
🧱 Description structurelle du système
🛠️ Principaux constituants
MariaDB (sous Linux).
Serveur BACK-END Node.js.
Interface WEB d'administration (React.js).
Génération et impression de QR Codes.
Interface WEB client (React.js).
Lecture des QR Codes.
🛠️ Inventaire des matériels et outils logiciels à mettre en œuvre par le candidat
Module M2M embarqué (protocole : LoRaWAN ou Sigfox à comparer).
Module GPS.
Alimentation autonome.
Carte à microcontrôleur.
Module M2M récepteur (protocole : LoRaWAN ou Sigfox à comparer).
PC serveur (sous Linux - Debian 12).
Nous sommes impatients de travailler sur ce projet passionnant et de mettre en pratique nos compétences en informatique et réseaux. Nous nous engageons à fournir un travail de qualité et à respecter les délais impartis. 🚀🚀
