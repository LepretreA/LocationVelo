-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 27 mai 2024 à 13:59
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
(69, 60, 4, '2024-05-24 00:00:00', '2024-05-24 08:47:13', 749),
(70, 51, 7, '2024-05-24 00:00:00', NULL, 577),
(72, 44, 6, '2024-05-27 09:16:23', NULL, 258),
(77, 62, 2, '2024-05-27 11:08:03', NULL, 745);

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
(41, 'Julien', 'langlace', 123456789),
(43, 'Royal', 'Yann', 1245789632),
(44, 'Mister', 'Champion', 625147894),
(48, 'Alia', 'Flo', 123456789),
(49, 'Alexia', 'azerty', 123456789),
(50, 'Lucas', 'Julien', 123456789),
(51, 'Lucas', 'Burguet', 123456789),
(52, 'Junior', 'Jnr', 123456789),
(53, 'Joyce', 'Manon', 123456789),
(54, 'Luc', 'Hernandez', 123456789),
(55, 'Lulu', 'Hern', 123456789),
(56, 'pzd', 'hssn', 123456789),
(57, 'Jun', 'Jnr', 123456789),
(58, 'Marie', 'Paul', 123456789),
(59, 'Juniorson', 'Jnr', 123456789),
(60, 'Eloise', 'Lcr', 123456789),
(61, 'Alexandre', 'Gremont', 123456789),
(62, 'Bilhaut', 'Theo', 651322432),
(63, 'Lepretre', 'Alexandre', 620463478),
(64, 'Hautemaniere', 'Edouard', 1234567890),
(65, 'Bite', 'Lucas', 637371374),
(66, 'leduc', 'Jean', 807020104),
(67, 'Paziaud', 'Hassan', 771755876),
(68, 'Quentin', 'Quinquin', 769895425),
(69, 'Quentin', 'Quinquin', 123456789);

-- --------------------------------------------------------

--
-- Structure de la table `Velo`
--

CREATE TABLE `Velo` (
  `ID` int(11) NOT NULL,
  `Latitude` varchar(50) NOT NULL,
  `Longitude` varchar(50) NOT NULL,
  `LastDate` date NOT NULL,
  `isRented` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Velo`
--

INSERT INTO `Velo` (`ID`, `Latitude`, `Longitude`, `LastDate`, `isRented`) VALUES
(1, '49.51007', '2.43853', '2024-02-23', 0),
(2, '49.878584', ' 2.3010', '2024-03-14', 0),
(3, '43.65329', '3.5689', '2024-03-14', 0),
(4, '37.1234567', '14.568', '2024-03-15', 0),
(5, '49.3625', '1.2648', '2024-03-15', 0),
(6, '32.6487', '3.465', '2024-03-15', 0),
(7, '29.6487', '4.1834', '2024-03-15', 0),
(9, '50.080341', '1.822575', '2024-04-09', 0),
(10, '49.890499', '8.612600', '2024-04-18', 0);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT pour la table `Velo`
--
ALTER TABLE `Velo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
