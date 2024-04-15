-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 15 avr. 2024 à 11:11
-- Version du serveur : 10.5.23-MariaDB-0+deb11u1
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Projet_Velo`
--

-- --------------------------------------------------------

--
-- Structure de la table `Admin`
--

CREATE TABLE `Admin` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `MDP` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Admin`
--

INSERT INTO `Admin` (`ID`, `pseudo`, `MDP`) VALUES
(1, 'Admin', 'Admin');

-- --------------------------------------------------------

--
-- Structure de la table `Location`
--

CREATE TABLE `Location` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `VeloID` int(11) NOT NULL,
  `DateEmprunt` datetime NOT NULL,
  `DateRendu` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `CodeRetour` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Location`
--

INSERT INTO `Location` (`ID`, `UserID`, `VeloID`, `DateEmprunt`, `DateRendu`, `CodeRetour`) VALUES
(29, NULL, 1, '2024-04-12 06:49:49', '2024-04-12 13:25:56', 444),
(30, 29, 2, '2024-04-12 06:51:51', '2024-04-12 06:51:49', 234),
(31, 33, 3, '2024-04-12 12:38:49', '2024-04-12 12:38:49', 32),
(33, 35, 4, '2024-04-12 12:57:30', '2024-04-12 12:57:30', 666),
(35, 37, 7, '2024-04-12 14:02:40', '2024-04-12 14:02:39', 1238);

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `ID` int(11) NOT NULL,
  `Nom` varchar(30) NOT NULL,
  `Prenom` varchar(30) NOT NULL,
  `Telephone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`ID`, `Nom`, `Prenom`, `Telephone`) VALUES
(1, 'Admin', 'Admin', 606060606),
(4, 'Dubois', 'Léa', 344256894),
(5, 'Martin', 'Lucas', 468192764),
(6, 'Lefevre', 'Camille', 256487913),
(7, 'Leroy', 'Martin', 154879632),
(8, 'Tanik', 'Betty', 662152635),
(9, 'Langlacier', 'Hugo', 594768135),
(10, 'Lambert', 'Jade', 668492213),
(11, 'Boyart', 'Louis', 264978513),
(12, 'Doro', 'Edouardo', 794865136),
(13, 'Addé', 'Laurent', 255684971),
(14, 'Oswald', 'Clara', 344656621),
(15, 'Talent', 'Inès', 451663578),
(16, 'Carion', 'Zoé', 865442130),
(17, 'Enzo', 'Flavien', 344305497),
(18, 'NGANAMODEI', 'JUNIOR', 123456789),
(22, 'Mathias', 'Snprt', 769895425),
(27, 'Quentin', 'quinquin', 123456789),
(28, 'Thibaut', 'Tiennot', 123456789),
(29, 'HURTEL', 'Joris', 123456789),
(31, 'Dubois', 'Léa', 344305497),
(32, 'Hugo', 'TB', 123456789),
(33, 'Mathias', 'Snprt', 123456789),
(35, 'Alex', 'GRMT', 123456789),
(36, 'Mathias', 'Le pointeur', 123456789),
(37, 'Bilhaut', 'Théo', 653435687);

-- --------------------------------------------------------

--
-- Structure de la table `Velo`
--

CREATE TABLE `Velo` (
  `ID` int(11) NOT NULL,
  `Latitude` varchar(50) NOT NULL,
  `Longitude` varchar(50) NOT NULL,
  `LastDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Velo`
--

INSERT INTO `Velo` (`ID`, `Latitude`, `Longitude`, `LastDate`) VALUES
(1, '49.51007', '2.43853', '2024-02-23'),
(2, '49.878584', ' 2.3010', '2024-03-14'),
(3, '43.65329', '3.5689', '2024-03-14'),
(4, '37.1234567', '4.568', '2024-03-15'),
(5, '49.3625', '1.2648', '2024-03-15'),
(6, '32.6487', '3.465', '2024-03-15'),
(7, '25.6487', '4.1834', '2024-03-15'),
(9, '50.080341', '1.822575', '2024-04-09');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Location`
--
ALTER TABLE `Location`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `VeloID` (`VeloID`),
  ADD KEY `UserID` (`UserID`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Index pour la table `Velo`
--
ALTER TABLE `Velo`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Location`
--
ALTER TABLE `Location`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `Velo`
--
ALTER TABLE `Velo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Location`
--
ALTER TABLE `Location`
  ADD CONSTRAINT `Location_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`ID`),
  ADD CONSTRAINT `Location_ibfk_2` FOREIGN KEY (`VeloID`) REFERENCES `Velo` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
