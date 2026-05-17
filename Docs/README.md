# HostLink — Documentation Officielle

> L'OS de la location courte durée externalisée

## 🌐 Site en ligne
**https://hostlink-eta.vercel.app**

## 📋 Vue d'ensemble
HostLink est une plateforme de délégation locative flexible qui connecte propriétaires et conciergeries via un écosystème complet incluant matching IA, scoring, paiements centralisés et switch concierge en 1 clic.

---

## 🏗️ Architecture du projet
---

## 🚀 Stack technique

| Technologie | Usage |
|-------------|-------|
| Next.js 16 | Frontend + API Routes |
| TypeScript | Langage principal |
| Tailwind CSS | Styling |
| Prisma 5 | ORM |
| PostgreSQL | Base de données |
| Supabase | Hébergement BDD |
| Vercel | Déploiement |
| bcryptjs | Hashage mots de passe |
| jsonwebtoken | Authentification JWT |

---

## 📦 Installation locale

```bash
# Cloner le repo
git clone https://github.com/HostLink33/hostlink.git
cd hostlink

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Remplir DATABASE_URL et JWT_SECRET

# Générer le client Prisma
npx prisma generate

# Pousser le schéma vers la base de données
npx prisma db push

# Seeder la base de données
npx prisma db seed

# Lancer en développement
npm run dev
```

---

## 🗄️ Base de données

### Modèles principaux

| Modèle | Description |
|--------|-------------|
| User | Utilisateur (propriétaire ou concierge) |
| Proprietaire | Profil propriétaire |
| Concierge | Profil conciergerie |
| Bien | Bien immobilier |
| Wallet | Portefeuille virtuel par bien |
| Transaction | Historique des paiements |
| Avis | Avis sur les concierges |

---

## 🔌 API Routes

### Authentification
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | /api/auth/register | Inscription |
| POST | /api/auth/login | Connexion |

### Biens
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/biens | Liste des biens du propriétaire |
| POST | /api/biens | Créer un bien |

### Concierges
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/concierges | Liste des concierges (avec filtres) |

### Transactions
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/transactions | Historique des transactions |
| POST | /api/transactions | Créer une transaction |

### Wallets
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/wallets | Liste des wallets |
| PATCH | /api/wallets | Modifier la fréquence de versement |

---

## 📱 Pages Frontend

| Page | URL | Description |
|------|-----|-------------|
| Landing | / | Page d'accueil publique |
| Inscription | /inscription | Création de compte |
| Connexion | /connexion | Login |
| Dashboard | /dashboard | Tableau de bord propriétaire |
| Matching IA | /matching | Moteur de matching |
| Profil Concierge | /concierge | Fiche concierge |
| Paiements | /paiements | Wallets et transactions |

---

## 🔐 Variables d'environnement

```env
DATABASE_URL=postgresql://...
JWT_SECRET=votre-secret-jwt
```

---

## 🗺️ Roadmap

### ✅ Étape 1 — Frontend
- Landing page
- Inscription / Connexion
- Dashboard propriétaire
- Profil concierge
- Matching IA
- Page paiements

### ✅ Étape 2 — Backend
- API Auth (register/login)
- API Biens
- API Concierges
- API Transactions
- API Wallets

### ✅ Étape 3 — Database
- Schéma Prisma
- Base PostgreSQL (Supabase)
- Seed de données

### ✅ Étape 4 — Infrastructure
- Déploiement Vercel
- CI/CD GitHub

### ✅ Étape 5 — Mobile
- Design responsive
- Nav mobile

### ✅ Étape 6 — Docs
- Documentation technique
- Guide utilisateur
- Roadmap

### 🔜 Étape 7 — Scripts
- Scripts d'automatisation

### 🔜 Étape 8 — IA
- Moteur de matching intelligent

### 🔜 Étape 9 — Tests
- Tests unitaires et E2E

### 🔜 Étape 10 — Shared
- Composants partagés

### 🔜 Étape 11 — Config
- Configuration avancée

### 🔜 Étape 12 — GitHub
- CI/CD avancé

---

## 👥 Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Propriétaire | anas@hostlink.fr | Hostlink2025 |
| Concierge | excellence@hostlink.fr | Hostlink2025 |

---

## 📞 Contact
**HostLink** — contact@hostlink.fr
