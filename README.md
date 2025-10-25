# 🚀 Portfolio Steve Bayonne - Développeur Full Stack Junior

![Portfolio Preview](images/cv.jpg)

Portfolio moderne et professionnel présentant mes compétences Full Stack (Frontend, Backend, Database), mes projets et mon parcours.

[![Live Demo](https://img.shields.io/badge/Live-Demo-667EEA?style=for-the-badge)](https://stevebay0605.github.io/myportofolio/)
[![GitHub](https://img.shields.io/badge/GitHub-stevebay0605-181717?style=for-the-badge&logo=github)](https://github.com/stevebay0605)
[![Technologies](https://img.shields.io/badge/Technologies-17-success?style=for-the-badge)](https://github.com/stevebay0605/myportofolio)
[![Stack](https://img.shields.io/badge/Stack-Full%20Stack-blue?style=for-the-badge)](https://github.com/stevebay0605/myportofolio)

---

## 📋 Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du Projet](#structure-du-projet)
- [Projets Présentés](#projets-présentés)
- [Optimisation SEO](#optimisation-seo)
- [Performance](#performance)
- [Contribution](#contribution)
- [Contact](#contact)

---

## 🎯 Aperçu

Portfolio Full Stack développé from scratch présentant **17 compétences techniques** réparties entre Frontend, Backend et Outils. Design moderne, responsive et optimisé pour les performances avec un score Lighthouse de 95+.

### ✨ Points Forts

- 💻 **Stack Full Stack complète** - React, Django, MySQL/PostgreSQL
- 🎨 **Design moderne** avec 11 icônes en rotation orbitale (35s)
- 📊 **Graphique radar adaptatif** - Couleurs automatiques selon le thème
- 📱 **100% Responsive** - Mobile, Tablette, Desktop
- 🌓 **Mode Sombre/Clair** avec persistance et transitions fluides
- ⚡ **Performance optimisée** - Chargement rapide, animations GPU
- 🔍 **SEO avancé** - Schema.org, Open Graph, Twitter Cards
- 📧 **Formulaire de contact fonctionnel** via EmailJS
- ♿ **Accessible** - Normes WCAG respectées

---

## 🌟 Fonctionnalités

### Navigation & UX

- ✅ Navigation fixe avec indicateur de page active
- ✅ Menu mobile hamburger avec animations
- ✅ Barre de progression de scroll
- ✅ Bouton "Retour en haut" dynamique
- ✅ Curseur personnalisé (desktop uniquement)
- ✅ Indicateur de scroll animé

### Sections

1. **Hero Section**
   - Animation de texte (effet typewriter)
   - Boutons d'action (Projets, Contact, CV)
   - 11 éléments flottants en rotation orbitale (35s par tour)
   - Icônes de technologies animées autour de la photo

2. **À propos**
   - Présentation personnelle Full Stack
   - Statistiques animées (6 Projets Full Stack, 11 Technologies, 100% Motivation)
   - 5 compétences clés détaillées
   - Badges de 11 technologies
   - Image professionnelle

3. **Projets**
   - Filtres par catégorie
   - Cards interactives avec hover effects
   - Modals détaillés pour chaque projet
   - Liens vers projets live et GitHub

4. **Compétences** (17 compétences)
   - Graphique radar adaptatif (9 technologies principales)
   - Changement de couleur automatique selon le thème
   - 3 catégories : Frontend (5), Backend & Database (7), Outils (5)
   - Barres de progression animées
   - Prochaines étapes d'apprentissage

5. **Contact**
   - Formulaire fonctionnel (EmailJS)
   - Méthodes de contact multiples
   - Validation en temps réel
   - Liens sociaux

### Thème & Personnalisation

- 🎨 **Thème clair/sombre** avec bouton toggle
- 💾 **Persistance** du thème via localStorage
- 🎭 **Transitions douces** entre les thèmes
- 🌈 **Palette de couleurs cohérente**

---

## 🛠 Technologies

### Stack Technique Complète (17 compétences)

#### Frontend Development (5)
| Technologie | Niveau | Description |
|-------------|--------|-------------|
| **HTML5** | 90% | Structure sémantique |
| **CSS3** | 85% | Styles & Animations avancées |
| **JavaScript** | 70% | Interactivité ES6+ |
| **Tailwind CSS** | 80% | Framework CSS utilitaire |
| **React** | 65% | Bibliothèque UI moderne |

#### Backend & Database (7)
| Technologie | Niveau | Description |
|-------------|--------|-------------|
| **Django** | 60% | Framework web Python |
| **Django REST Framework** | 65% | APIs REST |
| **Python** | 70% | Langage backend |
| **MySQL** | 65% | Base de données relationnelle |
| **PostgreSQL** | 65% | Base de données avancée |
| **SQLite** | 70% | BD légère pour développement |
| **API REST** | 65% | Architecture d'API |

#### Outils & DevOps (5)
| Technologie | Niveau | Description |
|-------------|--------|-------------|
| **Git & GitHub** | 75% | Versioning et collaboration |
| **Postman** | 70% | Test d'APIs |
| **VS Code** | 85% | Environnement de développement |
| **npm / pip** | 70% | Gestionnaires de paquets |
| **Responsive Design** | 85% | Design adaptatif |

### Bibliothèques & Services

- **Chart.js** (4.4.0) - Graphiques interactifs
- **Font Awesome** (6.4.0) - Icônes
- **Google Fonts** (Inter) - Typographie
- **EmailJS** - Envoi d'emails sans backend
- **Google Analytics** - Suivi des visites
- **Icons8** - Icônes de technologies

### Optimisation

- Lazy loading pour les images
- Minification (CSS/JS en production)
- Compression d'images
- Preconnect pour fonts externes

---

## 📦 Installation

### Prérequis

- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Éditeur de code (VS Code recommandé)
- Serveur local (Live Server, http-server, etc.)

### Installation Locale

```bash
# Cloner le repository
git clone https://github.com/stevebay0605/myportofolio.git

# Accéder au dossier
cd myportofolio

# Ouvrir avec Live Server (VS Code)
# Ou utiliser Python pour un serveur local
python -m http.server 8000

# Ouvrir dans le navigateur
# http://localhost:8000
```

---

## ⚙️ Configuration

### 1. EmailJS (Formulaire de Contact)

Suivez le guide détaillé : [EMAILJS_SETUP.md](EMAILJS_SETUP.md)

**Fichiers à modifier :**

**`index.html` (ligne 55)**
```javascript
emailjs.init("VOTRE_CLE_PUBLIQUE");
```

**`script.js` (ligne 515)**
```javascript
await emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', templateParams);
```

### 2. Google Analytics

**`index.html` (ligne 49)**
```javascript
gtag('config', 'VOTRE_GA_ID');
```

### 3. GitHub Stats

**`index.html` (lignes 325-328)**
```html
<!-- Remplacer 'stevebay0605' par votre username GitHub -->
<img src="https://github-readme-stats.vercel.app/api?username=VOTRE_USERNAME&..." />
```

### 4. Informations Personnelles

Modifier dans les fichiers suivants :
- `index.html` - Toutes les informations personnelles
- Meta tags (lignes 7-30)
- Schema.org (lignes 60-99)
- Contenu des sections

---

## 📁 Structure du Projet

```
myportofolio/
│
├── index.html              # Page principale
├── styles.css              # Tous les styles
├── script.js               # Toute la logique JavaScript
│
├── images/                 # Images et médias
│   ├── cv.jpg             # Photo de profil Hero
│   ├── cv2.jpg            # Photo de profil À propos
│   ├── projet1.png        # Gestion de Pressing
│   ├── projet3.png        # E-commerce v1
│   ├── projet4.png        # Site Immobilier
│   ├── projet5.png        # TaskFlow (à ajouter)
│   ├── projet6.png        # E-commerce v2 (à ajouter)
│   ├── favicon.png        # Favicon (à créer)
│   └── apple-touch-icon.png # Apple touch icon (à créer)
│
├── documents/             # Documents téléchargeables
│   └── CV_Steve_Bayonne.pdf # CV à ajouter
│
├── README.md              # Ce fichier
├── EMAILJS_SETUP.md      # Guide EmailJS
├── IMAGES_GUIDE.md       # Guide des images
└── .gitignore            # Fichiers à ignorer
```

---

## 💼 Projets Présentés

### 1. 🧺 Gestion de Pressing
**Technologies :** HTML5, CSS3, JavaScript  
**Lien :** [stevepressing.infy.uk](https://www.stevepressing.infy.uk/)  
Application complète de gestion de pressing avec suivi des commandes.

### 2. 🛒 Boutique en ligne (v1)
**Technologies :** HTML5, CSS3, JavaScript  
**Lien :** [steveshop.free.nf](https://steveshop.free.nf/)  
Plateforme e-commerce avec panier et système de paiement.

### 3. 🏠 Site Immobilier
**Technologies :** HTML5, CSS3, JavaScript  
**Lien :** [stevebay0605.github.io/immo](https://stevebay0605.github.io/immo/)  
Plateforme immobilière avec recherche avancée.

### 4. ✅ TaskFlow
**Technologies :** React, JavaScript, Tailwind CSS  
**Lien :** [stevetaskflow.netlify.app](https://stevetaskflow.netlify.app/)  
Application moderne de gestion de tâches.

### 5. 🛍️ E-commerce v2
**Technologies :** React, Django, Tailwind CSS  
**Lien :** [stevecom.netlify.app](https://stevecom.netlify.app/)  
Plateforme full-stack avec API Django.

---

## 🔍 Optimisation SEO

### Meta Tags Implémentés

- ✅ **Meta Description** optimisée
- ✅ **Open Graph** (Facebook, LinkedIn)
- ✅ **Twitter Cards**
- ✅ **Canonical URL**
- ✅ **Structured Data (Schema.org)**
- ✅ **Meta Keywords**
- ✅ **Favicon & Apple Touch Icon**

### Schema.org Person

```json
{
  "@type": "Person",
  "name": "Steve Bayonne",
  "jobTitle": "Développeur Full Stack Junior",
  "knowsAbout": [
    "HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS",
    "Django", "Django REST Framework", "Python",
    "MySQL", "PostgreSQL", "SQLite", "API REST",
    "Git", "GitHub", "Postman", "VS Code", "npm", "pip"
  ],
  "sameAs": [
    "https://github.com/stevebay0605",
    "https://www.linkedin.com/in/steve-bayonne"
  ]
}
```

### Résultats

- 🎯 **Score SEO :** 95+/100 (Lighthouse)
- 📈 **Indexation Google** optimisée
- 🔗 **Rich Snippets** compatibles
- 📱 **Mobile-friendly** certifié

---

## ✨ Fonctionnalités Avancées

### 🎯 Éléments Flottants en Rotation Orbitale

- **11 icônes de technologies** tournant autour de la photo de profil
- **Animation orbitale fluide** : 35 secondes par tour complet
- **Répartition égale** : 33° entre chaque icône
- **Pause au survol** : Animation s'arrête quand on survole une icône
- **Contre-rotation** : Les icônes restent à l'endroit pendant la rotation

**Technologies affichées :**
HTML5, CSS3, JavaScript, React, GitHub, Git, Django, Tailwind CSS, MySQL, PostgreSQL, Postman

### 📊 Graphique Radar Adaptatif

- **Changement automatique de couleurs** selon le thème (clair/sombre)
- **9 technologies principales** affichées
- **Mise à jour dynamique** lors du changement de thème
- **Animations fluides** avec Chart.js
- **Labels toujours visibles** dans les deux thèmes

**Couleurs adaptatives :**
- Thème clair : Labels noirs, grille gris clair
- Thème sombre : Labels blancs, grille gris foncé

### 🎨 Thème Dynamique

- **Mode clair/sombre** avec transition fluide
- **Persistance** : Le thème est sauvegardé dans localStorage
- **Éléments flottants** : Fond `rgba(17, 24, 39, 0.95)` en mode sombre
- **Graphique radar** : Couleurs adaptatives automatiques
- **Bouton toggle** accessible avec icône dynamique

---

## ⚡ Performance

### Scores Lighthouse

| Métrique | Score |
|----------|-------|
| Performance | 95+ |
| Accessibility | 98+ |
| Best Practices | 100 |
| SEO | 100 |

### Optimisations Appliquées

✅ **Images**
- Lazy loading natif
- Formats optimisés (WebP recommandé)
- Compression (TinyPNG)

✅ **Code**
- Minification CSS/JS
- Suppression du code mort
- Debounce & Throttle sur events

✅ **Réseau**
- Preconnect fonts
- Defer JavaScript non-critique
- Cache browser optimisé

✅ **Rendu**
- Critical CSS inline
- Animations GPU-accelerated
- Layout shift minimisé

---

## 🎨 Personnalisation

### Changer les Couleurs

**`styles.css` (lignes 1-50)**
```css
:root {
    --primary-color: #667EEA;     /* Votre couleur principale */
    --secondary-color: #764BA2;   /* Couleur secondaire */
    /* ... autres variables */
}
```

### Modifier le Thème Sombre

```css
[data-theme="dark"] {
    --bg-primary: #0A0E27;        /* Fond principal */
    --text-primary: #FFFFFF;      /* Texte principal */
    /* ... */
}
```

### Ajouter une Nouvelle Section

1. Créer le HTML dans `index.html`
2. Ajouter les styles dans `styles.css`
3. Ajouter au menu de navigation
4. (Optionnel) Ajouter animations JavaScript

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 480px) { ... }

/* Tablette */
@media (max-width: 768px) { ... }

/* Desktop */
@media (min-width: 769px) { ... }
```

### Tests

- ✅ iPhone SE (375px)
- ✅ iPhone 12 Pro (390px)
- ✅ iPad (768px)
- ✅ iPad Pro (1024px)
- ✅ Desktop (1920px+)

---

## 🚀 Déploiement

### GitHub Pages

1. Pusher le code sur GitHub
2. Aller dans Settings → Pages
3. Sélectionner la branche `main`
4. Le site sera disponible sur `https://username.github.io/repository/`

### Netlify

```bash
# Initialiser le déploiement
netlify init

# Déployer
netlify deploy --prod
```

### Autres Plateformes

- **Vercel** - Connexion GitHub automatique
- **Cloudflare Pages** - Performances optimales
- **Firebase Hosting** - Gratuit avec domaine personnalisé

---

## 🔧 Maintenance

### Mises à Jour Régulières

- [ ] Ajouter nouveaux projets
- [ ] Mettre à jour les compétences
- [ ] Actualiser le CV
- [ ] Vérifier les liens externes
- [ ] Optimiser les images
- [ ] Tester sur nouveaux navigateurs

### Monitoring

- Google Analytics pour le trafic
- Google Search Console pour SEO
- Lighthouse pour performance
- Dead Link Checker pour liens cassés

---

## 📧 Contact

**Steve Bayonne**  
Développeur Full Stack Junior

- 📧 Email: [bayonnestevekelly@gmail.com](mailto:bayonnestevekelly@gmail.com)
- 💼 Portfolio: [stevebay0605.github.io/myportofolio](https://stevebay0605.github.io/myportofolio/)
- 🐙 GitHub: [@stevebay0605](https://github.com/stevebay0605)
- 💼 LinkedIn: [Steve Bayonne](https://www.linkedin.com/in/steve-bayonne)
- 📱 Téléphone: +242 069 339 097
- 📍 Localisation: Brazzaville, Congo

**Stack Technique :**  
Frontend (React, Tailwind CSS) • Backend (Django, DRF) • Database (MySQL, PostgreSQL, SQLite)

---

## 📝 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser comme template pour votre propre portfolio.

---

## 🙏 Remerciements

- **Font Awesome** pour les icônes
- **Google Fonts** pour la typographie Inter
- **Chart.js** pour les graphiques
- **EmailJS** pour le service d'emails
- **Icons8** pour les icônes de technologies
- **Vercel** pour GitHub README Stats

---

## 📚 Ressources Utiles

### Documentation

- [Guide EmailJS](EMAILJS_SETUP.md)
- [Guide des Images](IMAGES_GUIDE.md)

### Liens Externes

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Can I Use](https://caniuse.com/)

---

## 📈 Récapitulatif du Portfolio

### 🎯 Compétences Techniques

```
Frontend (5)     : HTML5, CSS3, JavaScript, Tailwind CSS, React
Backend (7)      : Django, DRF, Python, MySQL, PostgreSQL, SQLite, API REST
Outils (5)       : Git & GitHub, Postman, VS Code, npm/pip, Responsive Design
─────────────────────────────────────────────────────────────────────────
TOTAL : 17 compétences Full Stack
```

### 🚀 Fonctionnalités Clés

| Fonctionnalité | Description |
|----------------|-------------|
| 🎯 **Éléments Flottants** | 11 icônes en rotation orbitale (35s) |
| 📊 **Graphique Radar** | 9 technologies avec couleurs adaptatives |
| 🌓 **Thème Dynamique** | Mode clair/sombre avec persistance |
| 📧 **Contact** | Formulaire EmailJS fonctionnel |
| 📱 **Responsive** | Mobile, Tablette, Desktop optimisés |
| ⚡ **Performance** | Score Lighthouse 95+ |

### 💼 Projets

- ✅ 6 Projets Full Stack présentés
- ✅ Modals interactifs avec détails
- ✅ Liens GitHub et Live Demo
- ✅ Filtres par catégorie

---

<div align="center">

**⭐ N'oubliez pas de mettre une étoile si ce projet vous a aidé ! ⭐**

**Portfolio Full Stack • 17 Technologies • React + Django + MySQL/PostgreSQL**

Made with ❤️ by [Steve Bayonne](https://github.com/stevebay0605)

</div>
