# ETSIA_AegisScan-
Repository pour le code realisé dans le cadre de notre projet ETSIA nommé AegisScan 

🛡️ AegisScan
📌 Description du projet

AegisScan est une application desktop de cybersécurité permettant l’analyse de liens, la sensibilisation des utilisateurs via des quiz, la gestion des faux positifs et la consultation de contenus pédagogiques (guides, conseils).
L’application est construite avec NestJS pour le backend et Tauri pour le frontend desktop.

🎯 Objectifs

Détecter et analyser les liens potentiellement dangereux
Réduire les faux positifs par signalement utilisateur
Sensibiliser les utilisateurs à la cybersécurité
Fournir une application desktop légère et sécurisée

🧱 Architecture globale
Frontend (Tauri + UI JS)
        ↓ REST API / JSON
Backend (NestJS)
        ↓ ORM
Base de données (MySQL / PostgreSQL)

🛠️ Technologies utilisées
Backend

NestJS
TypeScript
Prisma / TypeORM
JWT Authentication
MySQL / PostgreSQL

Frontend

Tauri
React / Vue / Svelte
Vite
TailwindCSS (optionnel)

Outils

Git & GitHub
Postman / Insomnia

🗂️ Structure du projet
aegisscan/
├── backend/
├── frontend/
├── database/
├── docs/
└── README.md

🗄️ Base de données

Méthodologie : Merise
Modèle Conceptuel de Données (MCD)
Modèle Logique de Données (MLD)
Scripts SQL disponibles dans /database/sql

🚀 Installation & Lancement
Prérequis

Node.js ≥ 18
Python ≥ 3.10
Rust (pour Tauri)
PostgreSQL


🔐 Authentification

Authentification JWT
Rôles : utilisateur, administrateur
Sécurisation des routes par Guards NestJS

👥 Travail collaboratif
Branches

main : version stable
develop : intégration
feature/* : nouvelles fonctionnalités

Convention de commits
feat: ajout analyse de lien
fix: correction auth
docs: mise à jour README

🧪 Tests

Tests unitaires (Jest)
Tests API (Postman)
Tests fonctionnels

📚 Documentation

Spécification fonctionnelle
Conception technique
Vérification & Validation
Voir le dossier /docs.

📌 Roadmap

 MCD / MLD
 Backend API
 Authentification
 Frontend UI

 Intégration Tauri

 Tests & Déploiement
🤝 Contribution
Fork le projet
Créer une branche feature
Commit avec convention
Pull Request vers develop
