# EpiTous — From Zero to Autonomous Developer

> Système complet d'apprentissage et de travail pour les développeurs francophones.
> Premier parcours : la **Piscine Epitech** (C / Unix).

**URL :** https://kajarnaklokossou2008.github.io/epitous/

---

## 🎯 La vision

EpiTous accompagne un débutant complet jusqu'à l'autonomie en programmation.
Son premier parcours est la Piscine Epitech : l'étudiant commence sans prérequis,
apprend les fondamentaux de l'ordinateur, d'Unix et du C, puis applique ses
connaissances aux tâches réelles de la Piscine.

Le but ultime n'est **pas** de te faire réussir grâce à EpiTous. C'est de
t'apprendre à réussir **sans** EpiTous.

## 🧭 La philosophie

EpiTous n'est pas un guide, c'est un **système complet de travail et d'apprentissage**.
C'est le « système d'exploitation » de ton apprentissage — pas un remplacement
d'internet, mais un guide pour l'utiliser intelligemment. L'assistance diminue
progressivement jusqu'à l'autonomie complète.

- ❌ **Pas de solutions toutes faites.**
- ✅ Des explications, des questions, des indices, des ressources, des exercices.
- 📓 Un journal vivant : tu écris chaque jour, ton journal devient ton manuel personnel.
- 📉 Une assistance décroissante : EpiTous te guide au début, puis te laisse autonome.

---

## ✨ Fonctionnalités (V1)

### 🏠 Tableau de bord
- Bouton « Commencer ma journée »
- Carte du jour courant (progression %)
- Stats : jours validés, exercices, entrées journal, série (streak)
- Planning du jour (09:00 → 18:00)
- Dernières entrées du journal

### 📅 Journée type (cœur de l'expérience)
Chaque jour a 8 sessions :
1. ☀️ **Échauffement** — questions de réactivation
2. 📖 **Cours** — sections structurées + exemples de code C
3. 📚 **Recherche** — ressource externe + mission + questions
4. 🎥 **Vidéo** — requête YouTube + questions de réflexion
5. 💻 **Pratique** — exercices progressifs avec indices (jamais de solutions)
6. 🏫 **Mode Epitech** — règles de coding style, Makefile, Git
7. 🎯 **Tâches** — tâches Piscine, certaines verrouillées par prérequis
8. 🧠 **Revue de fin de journée** — analyse par mots-clés (regex)

### 📓 Journal de développement
- Template structuré (appris / pas compris / erreurs / corrections / commande / concept / à revoir)
- Recherche par mot-clé
- Export Markdown
- Export / Import JSON (backup)
- « Ton manuel personnel de programmation »

### 📖 Glossaire
- 40+ termes (C, Unix, Git, général)
- Définitions en français + exemples de code
- Termes liés + lien vers le jour concerné
- Recherche + filtre par catégorie

### 🧪 Labo d'erreurs
- 12 erreurs fréquentes (segfault, undefined reference, implicit declaration, etc.)
- Catégories : compilation / segfault / linker / runtime / warnings
- Pour chaque : message, signification, causes, étapes de debug, exemple de correction

### 🛣️ Parcours
- Vue arborescente : 🐣 C → 🐧 Unix → 🌿 Git → 🧠 Algorithmes → 🌐 Web → 🐍 Python → 📊 Data → 🤖 IA → 🔐 Cybersecurity
- Statut (disponible / verrouillé / terminé), prérequis, durée estimée

### 🆘 « Que dois-je faire ? »
- Bouton flottant toujours visible
- Conseils **contextuels réels** basés sur ta progression :
  - Jour courant, sessions validées
  - Dernière entrée de journal (signaux de difficulté)
  - Série de jours consécutifs
- Recommande la prochaine action concrète

### 💾 Persistance
- 100% **localStorage** (offline-first)
- Aucun backend, aucune clé API, aucun cookie
- Export / import JSON
- Réinitialisation complète possible

---

## 🎨 Design

- Thème sombre par défaut : `#0a0e1a` (fond), `#6366f1` (indigo), `#22d3ee` (cyan)
- Thème clair disponible (toggle persistant)
- Polices : **Inter** (corps) + **JetBrains Mono** (code)
- Style : premium, minimaliste (Linear / Notion-like)
- Mobile-first responsive
- Animations : fadeIn, slideUp
- Scrollbar custom

---

## 🛠️ Stack technique

| Categorie | Choix |
|-----------|-------|
| UI | React 18 + TypeScript |
| Build | Vite 5 |
| Style | Tailwind CSS 3 |
| Routing | react-router-dom 6 (HashRouter) |
| Icônes | lucide-react |
| Persistance | localStorage |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

Aucune dépendance runtime externe critique. Aucune clé API.

---

## 🚀 Démarrage

### Prérequis
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
cd epitous
npm install
npm run dev
```

L'appli est servie sur `http://localhost:5173/epitous/`.

### Build de production

```bash
npm run build
npm run preview
```

Le build sort dans `./dist`. Sert `/epitous/` comme base path pour GitHub Pages.

### Vérification TypeScript

```bash
npm run check
```

---

## 📁 Structure du projet

```
epitous/
├── client/
│   ├── public/
│   │   ├── favicon.svg          # Logo EpiTous (gradient indigo → cyan)
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx       # Nav + footer + FAB
│   │   │   └── WhatShouldIDo.tsx
│   │   ├── lib/
│   │   │   ├── store.ts         # localStorage: progress, journal, theme
│   │   │   ├── curriculum.ts    # Day 01–07 definitions (FULL)
│   │   │   ├── glossary.ts      # 40+ terms
│   │   │   ├── errorlab.ts     # 12 errors with explanations
│   │   │   ├── analyzer.ts     # Keyword analysis (regex)
│   │   │   └── i18n.ts         # Minimal
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── DayPage.tsx     # The core experience
│   │   │   ├── JournalPage.tsx
│   │   │   ├── GlossaryPage.tsx
│   │   │   ├── ErrorLabPage.tsx
│   │   │   ├── PathsPage.tsx
│   │   │   └── AboutPage.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── styles.css
│   │   └── types.ts
│   └── index.html
├── .github/workflows/deploy.yml  # CI/CD GitHub Pages
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

---

## 📚 Contenu pédagogique

### Jours définis (Day 01–07)

| Jour | Titre | Concept clé |
|------|-------|--------------|
| 01 | L'ordinateur et toi | Fichiers, dossiers, OS, terminal, compilation |
| 02 | Le terminal : ton meilleur ami | ls, cd, pwd, mkdir, rm, cp, mv, cat, man |
| 03 | Premier programme C | Hello World, gcc, 4 étapes de compilation |
| 04 | Variables et types | int, char, float, double, sizeof |
| 05 | Fonctions | signature, paramètres, return, void, prototype |
| 06 | Conditions et boucles | if/else, while, for, break, continue |
| 07 | Pointeurs (jour critique) | &, *, NULL, segfault, swap |

Chaque jour contient :
- Échauffement (4–5 Q/R)
- Cours (5 sections + key takeaways)
- Recherche (ressource externe + 5 questions)
- Vidéo (requête YouTube + 3 réflexions)
- Pratique (4 exercices progressifs avec indices)
- Mode Epitech (règles de coding style)
- Tâches (3–5, certaines verrouillées)
- Objectifs (4 par jour)

---

## 🧠 Analyse de fin de journée

Quand tu écris ta revue, EpiTous applique une analyse heuristique par mots-clés (regex) :

- **Compris** ✅ : concept mentionné avec des mots-clés forts
- **Partiel** 🟡 : concept mentionné avec des mots-clés faibles
- **À revoir** 🔴 : concept non mentionné (mais présent dans les objectifs du jour)

L'analyse compare aussi aux **objectifs du jour** pour signaler ce que tu as manqué.

---

## 🔐 Vie privée

- Aucune donnée envoyée à un serveur.
- Tout est stocké dans le **localStorage** de ton navigateur.
- Tu peux tout exporter en JSON à tout moment.
- Tu peux tout réinitialiser depuis la page Journal.

---

## 🚢 Déploiement

Le déploiement se fait automatiquement via GitHub Actions à chaque push sur `main`.

1. Le workflow installe les dépendances (`npm ci`)
2. Build l'application (`npm run build`)
3. Upload l'artefact `./dist`
4. Déploie sur GitHub Pages

URL : https://kajarnaklokossou2008.github.io/epitous/

### Déploiement manuel

```bash
npm run build
# Le dossier ./dist est prêt à être servi statiquement
```

---

## 🗺️ Feuille de route

- **V1** — Piscine Epitech (C/Unix) ✅ en cours
- **V2** — Algorithmes & structures de données
- **V3** — Makefile avancé + Git workflow
- **V4** — Web (HTML/CSS/JS)
- **V5** — Python & Data
- **V6** — IA & Cybersecurity

---

## 🤝 Contribution

Ce projet est personnel. Pour des suggestions, ouvre une issue sur [GitHub](https://github.com/KajarnakLOKOSSOU2008/epitous).

---

## 📝 Licence

MIT — Libre d'utilisation et de modification.

---

## 🙏 Remerciements

Pensé pour les étudiants francophones — Bénin, Afrique, et au-delà.
« From Zero to Autonomous Developer » — Built with ❤️ for Francophone developers.
