# 🏥 ClinicFlow - Système de Gestion des Patients & Rendez-vous

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.x-blue.svg)](https://www.postgresql.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/clinicflow.svg)](https://github.com/yourusername/clinicflow/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/clinicflow.svg)](https://github.com/yourusername/clinicflow/issues)

---

## 📋 Table des Matières

- [🇫🇷 À Propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠 Technologies](#-technologies)
- [📊 Architecture](#-architecture)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [💻 Démarrage](#-démarrage)
- [📡 API Endpoints](#-api-endpoints)
- [📱 Frontend Routes](#-frontend-routes)
- [🗄 Base de Données](#-base-de-données)
- [🧪 Tests](#-tests)
- [🐳 Docker](#-docker)
- [📸 Captures d'écran](#-captures-décran)
- [🤝 Contribution](#-contribution)
- [📝 Licence](#-licence)
- [👥 Auteurs](#-auteurs)
- [🙏 Remerciements](#-remerciements)

---

## 🇫🇷 À Propos

**ClinicFlow** est une application web complète de gestion de patients et rendez-vous, conçue spécifiquement pour les cliniques médicales. Elle permet aux professionnels de santé de gérer efficacement leur patientèle et leurs rendez-vous à travers une interface moderne et intuitive.

### 🎯 Objectifs du Projet

- **Simplifier** la gestion administrative des cliniques
- **Optimiser** la planification des rendez-vous
- **Sécuriser** les données des patients
- **Améliorer** l'expérience des patients et du personnel

---

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité
- ✅ Login sécurisé par email/mot de passe
- ✅ Authentification JWT (JSON Web Token)
- ✅ Système de rôles (Admin / Staff)
- ✅ Middleware de protection des routes
- ✅ Hachage des mots de passe avec bcrypt

### 👥 Gestion des Patients
- ✅ Créer, modifier et supprimer des patients
- ✅ Liste paginée avec recherche
- ✅ Recherche par nom complet et CIN
- ✅ Affichage des détails complets
- ✅ Soft delete (suppression logique)
- ✅ Historique des rendez-vous par patient

### 📅 Gestion des Rendez-vous
- ✅ Création de rendez-vous avec validation
- ✅ Statuts : `pending`, `confirmed`, `cancelled`
- ✅ Règle métier : pas de double rendez-vous dans 30min
- ✅ Filtrage par date et statut
- ✅ Changement de statut en temps réel
- ✅ Notes et motifs pour chaque rendez-vous

### 📊 Dashboard
- ✅ Statistiques en temps réel
- ✅ Total des patients
- ✅ Rendez-vous du jour
- ✅ Compteurs : Pending / Confirmed
- ✅ Derniers rendez-vous
- ✅ Vue d'ensemble de l'activité

### 🎨 Interface
- ✅ Design moderne et responsive
- ✅ Interface entièrement en français
- ✅ Notifications toast (réussite/erreur)
- ✅ Icônes vectorielles (FontAwesome)
- ✅ Animations fluides
- ✅ Mode clair/sombre (prêt)

---

## 🛠 Technologies

### Backend
| Technologie | Version | Description |
|-------------|---------|-------------|
| Node.js | 18.x | Runtime JavaScript |
| Express.js | 4.18.2 | Framework web |
| PostgreSQL | 14.x | Base de données relationnelle |
| JWT | 9.x | Authentification |
| Bcrypt | 5.x | Hachage des mots de passe |
| Zod | 3.21.4 | Validation des données |
| Dotenv | 16.x | Variables d'environnement |

### Frontend
| Technologie | Version | Description |
|-------------|---------|-------------|
| React | 18.2.0 | Framework UI |
| React Router | 6.14.0 | Navigation |
| Axios | 1.4.0 | Client HTTP |
| React Hot Toast | 2.4.1 | Notifications |
| React Icons | 4.10.1 | Icônes |
| date-fns | 2.30.0 | Manipulation des dates |

### Outils de Développement
- **Git** - Contrôle de version
- **GitHub** - Hébergement du code
- **Postman** - Tests API
- **ESLint** - Linting du code
- **Prettier** - Formatage du code

---

## 📊 Architecture
