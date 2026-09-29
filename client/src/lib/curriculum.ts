// EpiTous — Curriculum definitions (Day 01-07 fully defined)
// All content in French. The platform does NOT provide direct solutions,
// only explanations, questions, hints, resources, exercises and feedback.

import type { FullDay, CurriculumPath } from '../types';

export const CURRICULUM_DAYS: FullDay[] = [
  // ───────────────────────────────────────────────────────────────────
  // DAY 01 — L'ordinateur et toi
  // ───────────────────────────────────────────────────────────────────
  {
    number: 1,
    title: "L'ordinateur et toi",
    concept: 'Découvrir ce qu’est un ordinateur, un fichier, un système d’exploitation',
    description:
      "Premier contact. Tu vas comprendre ce que tu manipules vraiment chaque jour : 'ordi', 'fichier', 'dossier', 'terminal'. Sans ces fondations, tout le reste sera flou.",
    sessions: [
      { id: 'd1-warmup', type: 'warmup', title: '☀️ Échauffement', duration: '09:00', completed: false },
      { id: 'd1-course', type: 'course', title: '📖 Cours', duration: '09:15', completed: false },
      { id: 'd1-research', type: 'research', title: '📚 Recherche', duration: '11:00', completed: false },
      { id: 'd1-video', type: 'video', title: '🎥 Vidéo', duration: '12:00', completed: false },
      { id: 'd1-practice', type: 'practice', title: '💻 Pratique', duration: '14:00', completed: false },
      { id: 'd1-epitech', type: 'epitech', title: '🏫 Mode Epitech', duration: '16:00', completed: false },
      { id: 'd1-task', type: 'task', title: '🎯 Tâches', duration: '17:00', completed: false },
      { id: 'd1-review', type: 'review', title: '🧠 Fin de journée', duration: '18:00', completed: false },
    ],
    objectives: [
      "Expliquer avec tes propres mots ce qu’est un ordinateur",
      "Différencier un fichier, un dossier, un chemin (path)",
      "Ouvrir un terminal et exécuter ls, cd, pwd, mkdir, touch",
      "Comprendre la différence entre code source et programme exécutable",
    ],
    content: {
      warmup: {
        questions: [
          {
            q: "Qu’est-ce qu’un ordinateur, selon toi ? (Réponds instinctivement, on corrigera après.)",
            a: "Une machine qui exécute des instructions données par un programme. CPU = cerveau, RAM = mémoire courte, disque = mémoire longue.",
          },
          {
            q: "Quelle est la différence entre un fichier et un dossier ?",
            a: "Un fichier stocke des données (texte, image, code). Un dossier (répertoire) contient des fichiers et d’autres dossiers. C’est une structure arborescente.",
          },
          {
            q: "Qu’est-ce que tu vois quand tu ouvres ton ordinateur : le matériel ou un logiciel ?",
            a: "Tu vois un logiciel (le système d’exploitation). Le matériel (CPU, RAM, disque) est en dessous.",
          },
          {
            q: "As-tu déjà ouvert un terminal ? Si oui, que s’est-il passé ?",
            a: "Un terminal est une fenêtre texte où l’on tape des commandes. Pas de souris. On parle directement au système.",
          },
        ],
      },
      course: {
        intro:
          "Avant de coder, il faut comprendre la machine. Aujourd’hui on démystifie l’ordinateur : tu vas voir qu’il n’y a rien de magique, juste des couches empilées.",
        sections: [
          {
            heading: '1. Qu’est-ce qu’un ordinateur ?',
            body: "Un ordinateur est une **machine qui exécute des instructions**. Ces instructions viennent de **programmes**. Le matériel (hardware) est composé de : CPU (le cerveau qui calcule), RAM (mémoire rapide et volatile), disque (mémoire lente et persistante), périphériques (clavier, écran).\n\nL’idée clé : tu donnes des ordres, l’ordinateur obéit. Mais il obéit **au sens propre**. Il ne 'comprend' pas, il exécute.",
            illustration: '🧠 CPU  ·  ⚡ RAM  ·  💾 disque  ·  ⌨️ clavier',
          },
          {
            heading: '2. Système d’exploitation (OS)',
            body: "L’OS (Linux, macOS, Windows) est le **chef d’orchestre**. Il gère les fichiers, la mémoire, les programmes, le clavier, l’écran. À Epitech, tu utiliseras **GNU/Linux**. Comprends-le tôt : la Piscine se passe entièrement sous Linux.\n\nLinux = le noyau. GNU = les outils autour. Bash = le langage du terminal.",
            illustration: '🐧 Linux (noyau) + 📦 GNU (outils) = 🚀 ton OS',
          },
          {
            heading: '3. Fichiers et dossiers',
            body: "Un **fichier** stocke des données. Un **dossier** (répertoire) contient des fichiers et d’autres dossiers. Tout est organisé en **arbre** : la racine s’appelle `/` sous Linux.\n\nLe **chemin (path)** décrit l’emplacement d’un fichier. Exemple : `/home/epitous/day01/hello.c`.",
            illustration: '📁 /  └─ 🏠 home  └─ 📂 epitous  └─ 📄 hello.c',
          },
          {
            heading: '4. Terminal vs interface graphique',
            body: "L’**interface graphique** (GUI) te montre des fenêtres et des icônes. Le **terminal** te montre une ligne de commande : tu tapes du texte, l’ordinateur répond en texte.\n\nLe terminal est **plus puissant**, plus rapide, et **indispensable** en programmation. À Epitech, tu passeras 90% de ton temps dedans.",
            illustration: '🖱️ GUI (souris)   ↔   ⌨️ Terminal (clavier)',
          },
          {
            heading: '5. Code source vs exécutable',
            body: "Le **code source** est un fichier texte écrit par un humain dans un langage de programmation (ex : C). L’ordinateur ne comprend pas directement ce texte.\n\nIl faut **compiler** : un programme (gcc) traduit ton code source en **exécutable** (fichier binaire que la machine peut lancer).",
            code: '# Fichier source (texte)\nhello.c\n  ↓ gcc\n# Fichier exécutable (binaire)\na.out   →   ./a.out   →   "Hello, World!"',
            illustration: '📝 source.c  →  🔧 gcc  →  ⚙️ a.out  →  ▶️ exécution',
          },
        ],
        keyTakeaways: [
          'Un ordinateur exécute des instructions, il ne “comprend” pas.',
          'L’OS gère tout ; à Epitech tu seras sous Linux.',
          'Fichiers + dossiers = arborescence à partir de `/`.',
          'Le terminal est ton outil principal, apprends à l’aimer.',
          'Coder = écrire du texte ; compiler = traduire en exécutable.',
        ],
      },
      research: {
        resourceName: 'Learn-C.org — “What is programming?” + Introduction',
        resourceUrl: 'https://www.learn-c.org/',
        mission:
          "Va sur learn-c.org. Lis la page d’accueil et le premier tutoriel “Hello, World”. Note 4 choses que tu n’aurais pas devinées seul. Ne saute pas les commentaires des autres lecteurs, ils sont parfois plus clairs que le cours.",
        questions: [
          "Qu’est-ce que learn-c.org entend par “compiled language” ?",
          "Pourquoi C est-il qualifié de langage “bas niveau” comparé à Python ?",
          "Quel compilateur est mentionné ? Et le nom du fichier produit ?",
          "Que signifie précisément `#include <stdio.h>` d’après ce que tu lis ?",
          "Quelle est la signature exacte de la fonction `main` dans leur exemple ?",
        ],
      },
      video: {
        searchQuery: 'how does a computer work basics for beginners',
        searchUrl: 'https://www.youtube.com/results?search_query=how+does+a+computer+work+basics+for+beginners',
        reflectionQuestions: [
          "Quelle analogie l’auteur utilise-t-il pour expliquer le CPU / la RAM ? Laquelle t’aide le plus ?",
          "À quel moment de la vidéo aurais-tu voulu qu’on s’arrête plus longtemps ? Pourquoi ?",
          "Qu’est-ce que la vidéo ne dit pas, mais que tu aimerais savoir maintenant ?",
        ],
      },
      practice: {
        intro:
          "On ne code pas encore. Aujourd’hui, on apprivoise le terminal. Ouvre-le, tape ces commandes, **observe**.",
        exercises: [
          {
            id: 'd1-ex1',
            title: 'Exercice 01 — Ouvre le terminal et repère-toi',
            prompt:
              "Ouvre un terminal. Tape `pwd`. Que renvoie-t-il ? Tape ensuite `ls`. Que vois-tu ?",
            hints: [
              '`pwd` = print working directory (où suis-je ?)',
              '`ls` = list (que contient mon dossier actuel ?)',
              "Si tu es perdu, tape `pwd` : c'est ton ancrage.",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd1-ex2',
            title: 'Exercice 02 — Crée ton premier dossier de travail',
            prompt:
              "Crée un dossier nommé `epitous` dans ton dossier personnel. Entre dedans. Vérifie que tu y es avec `pwd`.",
            hints: [
              'Pour créer : `mkdir epitous`',
              "Pour entrer : `cd epitous`",
              "Pour vérifier : `pwd` doit finir par `/epitous`",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd1-ex3',
            title: 'Exercice 03 — Crée un fichier texte',
            prompt:
              "Dans le dossier `epitous`, crée un fichier `notes.txt` avec la commande `touch`. Vérifie avec `ls` qu’il existe.",
            hints: [
              '`touch notes.txt` crée un fichier vide',
              "Tu peux écrire dedans avec `echo \"bonjour\" > notes.txt`",
              "Pour lire : `cat notes.txt`",
            ],
            difficulty: 'moyen',
          },
          {
            id: 'd1-ex4',
            title: 'Défi — Cartographie',
            prompt:
              "Dessine sur papier l’arborescence de ton dossier `epitous` après y avoir ajouté 2 sous-dossiers `day01` et `day02`, et un fichier dans chacun.",
            hints: [
              "Utilise `mkdir day01 day02` pour créer deux dossiers d’un coup",
              "Entre dans `day01`, fais `touch exo.txt`",
              "Reviens en arrière avec `cd ..`",
            ],
            difficulty: 'défi',
          },
        ],
      },
      epitech: {
        context:
          "À la Piscine Epitech, l’environnement de travail est **GNU/Linux** (souvent une distribution installée sur les postes de l’école ou en VM). Tu n’as pas droit à un IDE “magique”. Tu travailles dans un terminal, avec un éditeur comme Vim ou VS Code en mode sobre. La **rigueur** commence ici.",
        rules: [
          'Un dossier par jour, un fichier par exercice, des noms clairs.',
          "Avant d’écrire une ligne de code, organise ton espace : `mkdir day01 && cd day01`.",
          'Jamais d’espaces dans les noms de fichiers/dossiers. Utilise `_` ou `-`.',
          "Le terminal n’est pas un obstacle, c’est ton outil. Apprends-le à fond.",
        ],
      },
      tasks: {
        intro:
          "Tes tâches de fin de journée. Coche-les au fur et à mesure. La dernière se débloque quand tu as fait la précédente.",
        tasks: [
          {
            id: 'd1-t1',
            title: 'Créer un dossier de travail `epitous`',
            description: "Dans ton dossier personnel, crée un dossier `epitous` qui contiendra toute ton aventure.",
          },
          {
            id: 'd1-t2',
            title: 'Y créer `day01/hello.txt`',
            description: "Crée le sous-dossier `day01` et un fichier `hello.txt` contenant « Bonjour Epitech ».",
          },
          {
            id: 'd1-t3',
            title: 'Trouver le chemin absolu de `hello.txt`',
            description: "Avec `pwd` puis `ls`, note le chemin complet de ton fichier. Tu en auras besoin pour Git.",
          },
          {
            id: 'd1-t4',
            title: 'Installer / repérer un éditeur',
            description: "VS Code, Vim, ou Nano : choisis ton éditeur. Tu dois savoir l’ouvrir depuis le terminal.",
            locked: true,
            lockedReason: 'Débloquée après la tâche 03',
          },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 02 — Le terminal : ton meilleur ami
  // ───────────────────────────────────────────────────────────────────
  {
    number: 2,
    title: 'Le terminal : ton meilleur ami',
    concept: 'Maîtriser les commandes Unix de base pour naviguer, créer, détruire',
    description:
      "Hier, tu as touché le terminal. Aujourd’hui, tu deviens ami avec. Tu vas apprendre les 10 commandes que tu utiliseras tous les jours pendant des années.",
    sessions: [
      { id: 'd2-warmup', type: 'warmup', title: '☀️ Échauffement', duration: '09:00', completed: false },
      { id: 'd2-course', type: 'course', title: '📖 Cours', duration: '09:15', completed: false },
      { id: 'd2-research', type: 'research', title: '📚 Recherche', duration: '11:00', completed: false },
      { id: 'd2-video', type: 'video', title: '🎥 Vidéo', duration: '12:00', completed: false },
      { id: 'd2-practice', type: 'practice', title: '💻 Pratique', duration: '14:00', completed: false },
      { id: 'd2-epitech', type: 'epitech', title: '🏫 Mode Epitech', duration: '16:00', completed: false },
      { id: 'd2-task', type: 'task', title: '🎯 Tâches', duration: '17:00', completed: false },
      { id: 'd2-review', type: 'review', title: '🧠 Fin de journée', duration: '18:00', completed: false },
    ],
    objectives: [
      "Naviguer dans l’arborescence avec cd, pwd, ls sans hésitation",
      "Créer, copier, déplacer, supprimer fichiers et dossiers",
      "Lire le contenu d’un fichier avec cat, less, head, tail",
      "Consulter le manuel d’une commande avec man",
    ],
    content: {
      warmup: {
        questions: [
          {
            q: "Quelle commande affiche le dossier courant ?",
            a: "`pwd` (print working directory)",
          },
          {
            q: "Comment lister le contenu d’un dossier ?",
            a: "`ls`. Avec `ls -la` pour voir les fichiers cachés et les permissions.",
          },
          {
            q: "Comment créer un dossier ? Un fichier ?",
            a: "`mkdir nom` pour un dossier, `touch nom.txt` pour un fichier.",
          },
          {
            q: "Qu’est-ce qu’un chemin relatif vs absolu ?",
            a: "Absolu : depuis la racine `/`. Relatif : depuis le dossier courant. Ex : `../day01` est relatif.",
          },
          {
            q: "Que fait `cd` sans argument ?",
            a: "Il te ramène dans ton dossier personnel (`~`).",
          },
        ],
      },
      course: {
        intro:
          "Le terminal n’est pas un outil de hacker. C’est un **langage**. Chaque commande a un nom, des options, des arguments. Aujourd’hui tu apprends le vocabulaire de base.",
        sections: [
          {
            heading: '1. Navigation : pwd, cd, ls',
            body: "`pwd` = où suis-je ?\n`cd chemin` = aller dans `chemin`\n`cd ..` = remonter d’un niveau\n`cd ~` = retour maison\n`cd -` = revenir au dossier précédent\n`ls` = lister\n`ls -la` = tout lister, avec les détails",
            code: '$ pwd\n/home/epitous\n$ cd day02\n$ pwd\n/home/epitous/day02\n$ ls -la\ntotal 8\ndrwxr-xr-x 2 epitous epitous 4096 notes.txt\n-rw-r--r-- 1 epitous epitous    0 hello.c',
            illustration: '🧭 pwd  ·  🚪 cd  ·  📋 ls',
          },
          {
            heading: '2. Création : mkdir, touch',
            body: "`mkdir dossier` crée un dossier.\n`mkdir -p a/b/c` crée toute la hiérarchie d’un coup.\n`touch fichier.txt` crée un fichier vide (ou met à jour sa date).",
            code: '$ mkdir -p projet/src\n$ ls projet\nsrc\n$ touch projet/src/main.c\n$ ls projet/src\nmain.c',
            illustration: '📁 mkdir  ·  📄 touch',
          },
          {
            heading: '3. Copier, déplacer, supprimer : cp, mv, rm',
            body: "`cp source dest` copie un fichier.\n`cp -r dossier1 dossier2` copie un dossier récursivement.\n`mv source dest` déplace ou renomme.\n`rm fichier` supprime (⚠️ pas de corbeille).\n`rm -r dossier` supprime un dossier.\n\nAttention : `rm -rf /` est une blague de hacker, mais elle **détruit** vraiment tout. Ne la tape jamais.",
            code: '$ cp notes.txt notes_backup.txt\n$ mv notes_backup.txt archive/\n$ rm archive/notes_backup.txt',
            illustration: '复印 cp  ·  🚚 mv  ·  🗑️ rm',
          },
          {
            heading: '4. Lire un fichier : cat, less, head, tail',
            body: "`cat fichier` affiche tout d’un coup (court).\n`less fichier` affiche page par page (q pour quitter, / pour chercher).\n`head -n 10 fichier` = 10 premières lignes.\n`tail -n 10 fichier` = 10 dernières lignes.",
            illustration: '🐱 cat  ·  📖 less  ·  ⬆️ head  ·  ⬇️ tail',
          },
          {
            heading: '5. Le manuel : man',
            body: "`man ls` ouvre la documentation de `ls`. Utilise les flèches pour naviguer, `/` pour chercher un mot, `q` pour quitter.\n\nLe réflexe : **avant de chercher sur Google, tape `man commande`**. C’est plus rapide et plus fiable.",
            code: '$ man ls\n# naviguer avec flèches / Page Up-Down\n# /-la pour chercher \"-la\"\n# q pour quitter',
            illustration: '📘 man = ton meilleur ami',
          },
        ],
        keyTakeaways: [
          'pwd / cd / ls : navigation.',
          'mkdir / touch : création.',
          'cp / mv / rm : manipulation (prudence avec rm !).',
          'cat / less / head / tail : lecture.',
          'man : le manuel, toujours là pour toi.',
        ],
      },
      research: {
        resourceName: 'man7.org — Linux man pages (section 1 : commandes)',
        resourceUrl: 'https://man7.org/linux/man-pages/man1/ls.1.html',
        mission:
          "Ouvre la page man de `ls` sur man7.org. Lis la section DESCRIPTION. Trouve 3 options que tu ne connaissais pas et note à quoi elles servent.",
        questions: [
          "Que fait l’option `-l` exactement ?",
          "Que fait `-h` (human-readable) ?",
          "Que fait `-t` et à quoi pourrait-il servir ?",
          "Que signifie le `-a` ? Pourquoi certains fichiers commencent par `.` ?",
          "Comment trier par taille décroissante ?",
        ],
      },
      video: {
        searchQuery: 'linux terminal commands for beginners tutorial',
        searchUrl: 'https://www.youtube.com/results?search_query=linux+terminal+commands+for+beginners+tutorial',
        reflectionQuestions: [
          "Quelle commande de la vidéo vas-tu utiliser chaque jour ?",
          "L’auteur fait une erreur ou une approximation ? Laquelle ?",
          "Quelle est la commande la plus puissante montrée, et pourquoi ?",
        ],
      },
      practice: {
        intro:
          "Pratique pure. Tu dois pouvoir faire ces opérations sans réfléchir, comme tu tapes un SMS.",
        exercises: [
          {
            id: 'd2-ex1',
            title: 'Exercice 01 — Le grand ménage',
            prompt:
              "Crée 3 dossiers `src`, `include`, `build`. Crée dans `src` un fichier `main.c`. Copie-le dans `build`. Supprime l’original dans `src`.",
            hints: [
              "`mkdir src include build`",
              "`touch src/main.c`",
              "`cp src/main.c build/` puis `rm src/main.c`",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd2-ex2',
            title: 'Exercice 02 — Lecture ciblée',
            prompt:
              "Crée un fichier avec 20 lignes (utilise `echo` ou un éditeur). Affiche les 5 premières, puis les 5 dernières, puis page par page.",
            hints: [
              "`head -n 5 fichier`",
              "`tail -n 5 fichier`",
              "`less fichier` puis `q` pour quitter",
            ],
            difficulty: 'moyen',
          },
          {
            id: 'd2-ex3',
            title: 'Exercice 03 — Renommage en série',
            prompt:
              "Dans un dossier, crée `a.txt`, `b.txt`, `c.txt`. Renomme-les en `01_a.txt`, `02_b.txt`, `03_c.txt`. Vérifie avec `ls`.",
            hints: [
              "`mv a.txt 01_a.txt`",
              "Tu peux faire les trois à la suite",
              "Vérifie avec `ls`",
            ],
            difficulty: 'moyen',
          },
          {
            id: 'd2-ex4',
            title: 'Défi — Le manuel vivant',
            prompt:
              "Sans Google, ouvre `man ls` et trouve comment lister **par taille décroissante** et en format human-readable. Tape la commande complète.",
            hints: [
              "Cherche dans man avec `/` puis un mot-clé",
              "Tu peux combiner plusieurs options : `ls -lS -h`",
              "Vérifie sur un dossier contenant des gros fichiers",
            ],
            difficulty: 'défi',
          },
        ],
      },
      epitech: {
        context:
          "À Epitech, **la souris est ton ennemie**. Plus tu utilises le terminal, plus tu es rapide. Les correcteurs (les « studs ») voient immédiatement qui maîtrise son terminal et qui tâtonne. Sois dans le premier groupe.",
        rules: [
          'Lis les pages man avant de demander de l’aide.',
          'Ne supprime jamais avec `rm -rf` sans relire deux fois ta commande.',
          "Organise tes fichiers selon la structure Epitech : `nom_du_projet/` → `src/`, `include/`, `Makefile`, `tests/`.",
          'Utilise `cd -` pour basculer entre deux dossiers sans te perdre.',
        ],
      },
      tasks: {
        intro:
          "Mets en place une structure de projet propre. Tu l’utiliseras tous les jours.",
        tasks: [
          {
            id: 'd2-t1',
            title: 'Créer la structure `projet/{src,include,build}`',
            description: "Crée cette hiérarchie. C’est la base de tout projet C.",
          },
          {
            id: 'd2-t2',
            title: 'Y déposer un `main.c` vide',
            description: "Crée `src/main.c` avec un éditeur de ton choix.",
          },
          {
            id: 'd2-t3',
            title: 'Apprendre 5 options de `ls`',
            description: "Note dans ton journal 5 options utiles de `ls` et leur sens.",
          },
          {
            id: 'd2-t4',
            title: 'Lire une page man en entier',
            description: "Ouvre `man ls`. Lis-la entièrement, même les options que tu ne comprends pas.",
            locked: true,
            lockedReason: 'Débloquée après la tâche 03',
          },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 03 — Premier programme C
  // ───────────────────────────────────────────────────────────────────
  {
    number: 3,
    title: 'Premier programme C',
    concept: 'Écrire, compiler et exécuter ton premier programme en C',
    description:
      "Aujourd’hui, tu écris ta première ligne de C. Tu la compiles. Tu l’exécutes. Et tu vois le résultat. C’est un moment charnière : tu passes du statut d’utilisateur à celui de créateur.",
    sessions: [
      { id: 'd3-warmup', type: 'warmup', title: '☀️ Échauffement', duration: '09:00', completed: false },
      { id: 'd3-course', type: 'course', title: '📖 Cours', duration: '09:15', completed: false },
      { id: 'd3-research', type: 'research', title: '📚 Recherche', duration: '11:00', completed: false },
      { id: 'd3-video', type: 'video', title: '🎥 Vidéo', duration: '12:00', completed: false },
      { id: 'd3-practice', type: 'practice', title: '💻 Pratique', duration: '14:00', completed: false },
      { id: 'd3-epitech', type: 'epitech', title: '🏫 Mode Epitech', duration: '16:00', completed: false },
      { id: 'd3-task', type: 'task', title: '🎯 Tâches', duration: '17:00', completed: false },
      { id: 'd3-review', type: 'review', title: '🧠 Fin de journée', duration: '18:00', completed: false },
    ],
    objectives: [
      "Écrire un programme C minimal (Hello World)",
      "Compiler avec gcc et comprendre le rôle de chaque étape",
      "Exécuter le programme et observer la sortie",
      "Comprendre #include, int main, return, printf",
    ],
    content: {
      warmup: {
        questions: [
          {
            q: "Quelle commande permet de créer un fichier vide ?",
            a: "`touch fichier`",
          },
          {
            q: "Comment lister les fichiers avec détails ?",
            a: "`ls -l` ou `ls -la`",
          },
          {
            q: "À quoi sert le manuel `man` ?",
            a: "À lire la documentation d’une commande directement dans le terminal.",
          },
          {
            q: "Quelle est la différence entre code source et exécutable ?",
            a: "Le code source est du texte lisible par l’humain. L’exécutable est du binaire lisible par la machine.",
          },
        ],
      },
      course: {
        intro:
          "Tu as un terminal, tu sais l’utiliser. Maintenant, tu vas **créer** un programme. C’est le point de bascule : tu n’es plus utilisateur, tu es créateur.",
        sections: [
          {
            heading: '1. Le langage C',
            body: "C a été créé en 1972 par Dennis Ritchie. C’est un langage **compilé**, **typé statiquement**, **bas niveau** (proche de la machine). Il est utilisé partout : OS, embarqué, bases de données, jeux. À Epitech, **tout** est en C.",
            illustration: '👴 1972 · Dennis Ritchie · ⚙️ bas niveau · 🚀 ultra-rapide',
          },
          {
            heading: '2. Hello, World !',
            body: "Le programme le plus célèbre du monde. Voici sa version C :",
            code: '#include <stdio.h>\n\nint main(void)\n{\n    printf("Hello, World!\\n");\n    return 0;\n}',
            illustration: '👋 Hello, World!',
          },
          {
            heading: '3. Anatomie du programme',
            body: "**`#include <stdio.h>`** : inclus l’en-tête standard d’entrée/sortie (printf, scanf).\n\n**`int main(void)`** : la fonction principale, point d’entrée du programme. `int` = retourne un entier. `void` = ne prend pas d’argument.\n\n**`{ ... }`** : le corps de la fonction.\n\n**`printf(\"...\\n\");`** : affiche du texte. `\\n` = saut de ligne. `;` obligatoire à chaque instruction.\n\n**`return 0;`** : 0 signifie “tout s’est bien passé”.",
            illustration: '📦 include  ·  🚪 main  ·  🖨️ printf  ·  ✅ return',
          },
          {
            heading: '4. Compilation avec gcc',
            body: "Pour transformer ton `.c` en exécutable, on utilise **gcc** :",
            code: '$ gcc main.c -o hello\n$ ./hello\nHello, World!',
            illustration: '📝 main.c → 🔧 gcc → ⚙️ hello → ▶️ ./hello',
          },
          {
            heading: '5. Les 4 étapes cachées de gcc',
            body: "Quand tu tapes `gcc main.c -o hello`, gcc fait en réalité 4 choses :\n1. **Préprocessing** : gcc traite les `#include`, `#define`.\n2. **Compilation** : traduit le C en assembleur.\n3. **Assemblage** : traduit l’assembleur en code objet (`.o`).\n4. **Édition des liens** : relie ton `.o` avec les bibliothèques pour produire l’exécutable.\n\nTu peux demander à gcc de s’arrêter à chaque étape avec `-E`, `-S`, `-c`.",
            illustration: '1️⃣ préprocesseur → 2️⃣ compile → 3️⃣ assemble → 4️⃣ link',
          },
        ],
        keyTakeaways: [
          'C = langage compilé, typé, bas niveau.',
          '`#include` importe une bibliothèque, `main` est le point d’entrée.',
          '`printf` affiche, `return 0` termine normalement.',
          'gcc transforme le source en exécutable en 4 étapes.',
          '`./hello` exécute ton programme.',
        ],
      },
      research: {
        resourceName: 'GeeksforGeeks — “C Compilation Process”',
        resourceUrl: 'https://www.geeksforgeeks.org/compiling-a-c-program-behind-the-scenes/',
        mission:
          "Lis l’article sur les 4 étapes de compilation. Refais la compilation étape par étape avec `-E`, `-S`, `-c`. Observe les fichiers produits à chaque étape.",
        questions: [
          "Quelle est la différence entre un fichier `.i`, `.s`, `.o` ?",
          "Que fait exactement le linker ?",
          "Que se passe-t-il si tu oublies `#include <stdio.h>` ?",
          "Comment obtenir juste le code préprocessé ?",
          "Qu’est-ce qu’une bibliothèque statique vs dynamique ?",
        ],
      },
      video: {
        searchQuery: 'C programming hello world first program tutorial',
        searchUrl: 'https://www.youtube.com/results?search_query=C+programming+hello+world+first+program+tutorial',
        reflectionQuestions: [
          "L’auteur explique-t-il chaque mot de `int main(void)` ? Lequel reste flou ?",
          "Quelle erreur de débutant montre-t-il ? L’as-tu évitée ?",
          "Que ferais-tu différemment après cette vidéo ?",
        ],
      },
      practice: {
        intro:
          "À toi de jouer. Crée, compile, exécute. Si tu as une erreur, lis-la attentivement : le compilateur te parle.",
        exercises: [
          {
            id: 'd3-ex1',
            title: 'Exercice 01 — Hello, World',
            prompt: "Crée `hello.c`, compile en `hello`, exécute. Doit afficher « Hello, World! ».",
            hints: [
              "Le code est dans le cours, mais **tape-le toi-même**, ne copie pas.",
              "`gcc hello.c -o hello`",
              "`./hello`",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd3-ex2',
            title: 'Exercice 02 — Bonjour Epitech',
            prompt: "Modifie le programme pour qu’il affiche « Bonjour, Epitech! » sur deux lignes.",
            hints: [
              "Utilise `\\n` pour un saut de ligne",
              "Tu peux faire un seul `printf` avec deux `\\n`, ou deux `printf`",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd3-ex3',
            title: 'Exercice 03 — Erreur volontaire',
            prompt:
              "Retire le `;` après `printf`. Compile. Lis le message d’erreur. Remets le `;` et recompile.",
            hints: [
              "Le compilateur t’indique la ligne et souvent la cause",
              "Ne copie pas l’erreur sans la lire !",
              "Note cette erreur dans ton journal (plus tard : tu la retrouveras dans l’Error Lab)",
            ],
            difficulty: 'moyen',
          },
          {
            id: 'd3-ex4',
            title: 'Défi — Les 4 étapes',
            prompt:
              "Compile `hello.c` en passant par `-E`, `-S`, `-c`, puis linkage. Observe chaque fichier intermédiaire avec `cat` ou `less`.",
            hints: [
              "`gcc -E hello.c -o hello.i`",
              "`gcc -S hello.i -o hello.s`",
              "`gcc -c hello.s -o hello.o`",
              "`gcc hello.o -o hello`",
            ],
            difficulty: 'défi',
          },
        ],
      },
      epitech: {
        context:
          "À Epitech, le premier jour de la Piscine commence souvent par un `my_printf` ou un `hello`. La **norme** (le coding style) est stricte. Apprends-la dès maintenant, tu perdras des points sinon.",
        rules: [
          'Pas plus de 80 caractères par ligne.',
          'Pas de déclaration en milieu de fonction : toutes les variables au début.',
          'Indentation de 4 espaces, pas de tabulations.',
          'Pas d’espace avant `(` sauf pour les mots-clés (if, while, return).',
          'Chaque `.c` doit pouvoir se compiler seul.',
        ],
        example:
          "// ❌ interdit :\nint main() {\n  printf(\"hi\"); return 0;\n}\n\n// ✅ conforme :\nint main(void)\n{\n    printf(\"hi\\n\");\n    return 0;\n}",
      },
      tasks: {
        intro: "Mets en place ton environnement de compilation. Ce sera ta base.",
        tasks: [
          {
            id: 'd3-t1',
            title: 'Vérifier que gcc est installé',
            description: "Tape `gcc --version` dans le terminal. Si erreur, installe-le.",
          },
          {
            id: 'd3-t2',
            title: 'Compiler et exécuter hello.c',
            description: "Écris, compile, exécute. Tu dois voir « Hello, World! ».",
          },
          {
            id: 'd3-t3',
            title: 'Observer les étapes de compilation',
            description: "Fais le défi (exo 4). Observe les fichiers intermédiaires.",
          },
          {
            id: 'd3-t4',
            title: 'Écrire un Makefile minimal',
            description: "Crée un fichier `Makefile` qui compile hello.c en hello. (Indice : on en parlera en mode Epitech plus tard.)",
            locked: true,
            lockedReason: 'Débloquée après la tâche 03',
          },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 04 — Variables et types
  // ───────────────────────────────────────────────────────────────────
  {
    number: 4,
    title: 'Variables et types',
    concept: 'Stocker des données en mémoire avec int, char, float, etc.',
    description:
      "Ton programme ne fait qu’afficher du texte fixe. Pour devenir utile, il doit **retenir** des informations : un âge, un compteur, une lettre. C’est ça une variable.",
    sessions: [
      { id: 'd4-warmup', type: 'warmup', title: '☀️ Échauffement', duration: '09:00', completed: false },
      { id: 'd4-course', type: 'course', title: '📖 Cours', duration: '09:15', completed: false },
      { id: 'd4-research', type: 'research', title: '📚 Recherche', duration: '11:00', completed: false },
      { id: 'd4-video', type: 'video', title: '🎥 Vidéo', duration: '12:00', completed: false },
      { id: 'd4-practice', type: 'practice', title: '💻 Pratique', duration: '14:00', completed: false },
      { id: 'd4-epitech', type: 'epitech', title: '🏫 Mode Epitech', duration: '16:00', completed: false },
      { id: 'd4-task', type: 'task', title: '🎯 Tâches', duration: '17:00', completed: false },
      { id: 'd4-review', type: 'review', title: '🧠 Fin de journée', duration: '18:00', completed: false },
    ],
    objectives: [
      "Déclarer une variable avec le bon type (int, char, float, double)",
      "Affecter et lire une variable",
      "Afficher une variable avec printf et les bons format specifiers",
      "Comprendre la différence entre type signé / non signé",
    ],
    content: {
      warmup: {
        questions: [
          {
            q: "Que fait `#include <stdio.h>` ?",
            a: "Il importe la bibliothèque standard d’entrée/sortie (printf, scanf, etc.).",
          },
          {
            q: "Pourquoi `main` renvoie-t-elle `int` ?",
            a: "Pour indiquer au système comment s’est terminé le programme (0 = succès).",
          },
          {
            q: "Comment compile-t-on `prog.c` ?",
            a: "`gcc prog.c -o prog` puis `./prog`",
          },
          {
            q: "À quoi sert `\\n` dans un printf ?",
            a: "À insérer un saut de ligne.",
          },
        ],
      },
      course: {
        intro:
          "Une **variable** est un nom que tu donnes à une case mémoire. Tu y ranges une valeur. Le **type** indique à la machine quelle sorte de donnée tu y mets (entier, caractère, décimal).",
        sections: [
          {
            heading: '1. Les types de base',
            body: "**`int`** : entier (souvent 32 bits, -2³¹ à 2³¹-1).\n**`char`** : caractère (8 bits). Stocke une lettre comme `'a'` mais aussi un entier 0–255.\n**`float`** : décimal simple précision (32 bits).\n**`double`** : décimal double précision (64 bits).\n**`void`** : pas de type (utilisé pour les fonctions sans retour).",
            code: 'int    age = 21;\nchar   grade = \'A\';\nfloat  pi = 3.14f;\ndouble e  = 2.718281828;',
            illustration: '🔢 int  ·  🔤 char  ·  💧 float  ·  💎 double',
          },
          {
            heading: '2. Déclaration vs affectation',
            body: "Tu peux déclarer puis affecter plus tard, ou faire les deux d’un coup :",
            code: 'int a;        // déclaration\na = 10;        // affectation\n\nint b = 20;    // déclaration + affectation',
            illustration: '📦 int a;  →  a = 10;',
          },
          {
            heading: '3. Afficher : les format specifiers',
            body: "`printf` utilise des `%qqch` pour insérer des variables :",
            code: 'int age = 21;\nchar grade = \'A\';\nfloat pi = 3.14f;\n\nprintf("Age: %d\\n", age);\nprintf("Grade: %c\\n", grade);\nprintf("Pi: %f\\n", pi);\nprintf("Pi: %.2f\\n", pi);  // 2 décimales',
            illustration: '%d → int · %c → char · %f → float/double · %s → string',
          },
          {
            heading: '4. Signé vs non signé',
            body: "`unsigned int` ne stocke que des positifs (0 à 2³²-1). `signed` (par défaut) peut stocker négatif.\n\nC’est important quand tu sais que ta valeur ne sera jamais négative (âge, compteur, taille).",
            code: 'unsigned int distance = 4294967295; // max 32-bit\nint signed_int = -42;',
            illustration: '➕ unsigned  ·  ➕➖ signed',
          },
          {
            heading: '5. Tailles réelles : sizeof',
            body: "La taille d’un type peut varier selon la machine. Utilise `sizeof` pour la connaître :",
            code: 'printf("int: %zu octets\\n", sizeof(int));\nprintf("char: %zu octets\\n", sizeof(char));\nprintf("double: %zu octets\\n", sizeof(double));',
            illustration: '📏 sizeof = la vérité sur ta machine',
          },
        ],
        keyTakeaways: [
          'Type = sorte de donnée stockée. Variable = nom d’une case mémoire.',
          'Types de base : int, char, float, double, void.',
          'printf utilise %d (int), %c (char), %f (float/double), %s (string).',
          'unsigned pour les valeurs jamais négatives.',
          'sizeof donne la taille réelle en octets.',
        ],
      },
      research: {
        resourceName: 'learn-c.org — Variables and Types',
        resourceUrl: 'https://www.learn-c.org/en/Variables_and_Types',
        mission:
          "Lis le tutoriel sur les variables. Fais l’exercice interactif proposé. Note les types que tu découvres et leurs tailles.",
        questions: [
          "Quels types sont mentionnés en plus de int, char, float, double ?",
          "Pourquoi `float` est-il parfois préféré à `double` ?",
          "Que se passe-t-il si tu mets un float dans un int ?",
          "Quelle est la différence entre `=` et `==` ?",
          "Comment afficher un nombre avec précision ?",
        ],
      },
      video: {
        searchQuery: 'C variables and data types explained beginners',
        searchUrl: 'https://www.youtube.com/results?search_query=C+variables+and+data+types+explained+beginners',
        reflectionQuestions: [
          "L’auteur utilise-t-il des noms de variables clairs ? Lesquels ?",
          "Quelle approximation fait-il sur les types ?",
          "Quelle question te poses-tu après la vidéo ?",
        ],
      },
      practice: {
        intro: "À toi. Déclare, affecte, affiche. Vérifie chaque type.",
        exercises: [
          {
            id: 'd4-ex1',
            title: 'Exercice 01 — Carte d’identité',
            prompt:
              "Déclare `int age = 21;`, `char grade = 'A';`, `float taille = 1.75f;`. Affiche-les chacun avec le bon format specifier.",
            hints: [
              "`%d` pour int, `%c` pour char, `%f` pour float",
              "Compile et exécute. Le résultat doit être lisible.",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd4-ex2',
            title: 'Exercice 02 — Addition de variables',
            prompt:
              "Déclare `int a = 10; int b = 20;`. Calcule leur somme dans une troisième variable. Affiche-la.",
            hints: [
              "`int sum = a + b;`",
              "Affiche avec `printf(\"%d\\n\", sum);`",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd4-ex3',
            title: 'Exercice 03 — Précision',
            prompt:
              "Déclare `float pi = 3.14159265f;`. Affiche-le avec 0, 2, et 6 décimales.",
            hints: [
              "`printf(\"%.0f\\n\", pi);`",
              "`printf(\"%.2f\\n\", pi);`",
              "`printf(\"%.6f\\n\", pi);`",
            ],
            difficulty: 'moyen',
          },
          {
            id: 'd4-ex4',
            title: 'Défi — sizeof',
            prompt:
              "Affiche la taille en octets de int, char, short, long, float, double sur ta machine. Compare-les. Sont-ils ce que tu attends ?",
            hints: [
              "`sizeof(int)` renvoie un `size_t`",
              "Affiche avec `%zu`",
              "Compare avec ce que dit la théorie",
            ],
            difficulty: 'défi',
          },
        ],
      },
      epitech: {
        context:
          "À Epitech, les noms de variables suivent la norme : **snake_case**, en anglais, en minuscules. Une variable doit avoir un nom explicite. `i` est acceptable dans une boucle courte. `tmp` est toléré. `x1`, `x2`, `data_thing` sont à éviter.",
        rules: [
          'Variables locales en `snake_case`.',
          'Une lettre acceptable seulement dans une boucle courte (i, j, k).',
          'Initialise tes variables : un `int` non initialisé contient n’importe quoi.',
          'Nomme par intention : `nb_students`, pas `n`.',
        ],
      },
      tasks: {
        intro: "Tu dois pouvoir manipuler les types sans réfléchir.",
        tasks: [
          {
            id: 'd4-t1',
            title: 'Écrire un programme qui affiche 3 types différents',
            description: "int, char, float. Affiche-les proprement.",
          },
          {
            id: 'd4-t2',
            title: 'Afficher sizeof(int), sizeof(char)',
            description: "Vérifie que int=4 octets, char=1 octet sur ta machine.",
          },
          {
            id: 'd4-t3',
            title: 'Comprendre le débordement',
            description: "Mets 300 dans un `char`. Affiche. Que se passe-t-il ? Note ton observation.",
          },
          {
            id: 'd4-t4',
            title: 'Créer un mini-calculateur (addition)',
            description: "Demande (avec scanf si tu connais, ou avec valeurs codées en dur) deux entiers, affiche somme, produit, différence.",
            locked: true,
            lockedReason: 'Débloquée après la tâche 03',
          },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 05 — Fonctions
  // ───────────────────────────────────────────────────────────────────
  {
    number: 5,
    title: 'Fonctions',
    concept: 'Découper ton code en fonctions pour le rendre lisible et réutilisable',
    description:
      "Quand ton `main` dépasse 30 lignes, c’est trop. Tu dois **découper**. Une fonction = une responsabilité. C’est le B-A BA de la programmation propre.",
    sessions: [
      { id: 'd5-warmup', type: 'warmup', title: '☀️ Échauffement', duration: '09:00', completed: false },
      { id: 'd5-course', type: 'course', title: '📖 Cours', duration: '09:15', completed: false },
      { id: 'd5-research', type: 'research', title: '📚 Recherche', duration: '11:00', completed: false },
      { id: 'd5-video', type: 'video', title: '🎥 Vidéo', duration: '12:00', completed: false },
      { id: 'd5-practice', type: 'practice', title: '💻 Pratique', duration: '14:00', completed: false },
      { id: 'd5-epitech', type: 'epitech', title: '🏫 Mode Epitech', duration: '16:00', completed: false },
      { id: 'd5-task', type: 'task', title: '🎯 Tâches', duration: '17:00', completed: false },
      { id: 'd5-review', type: 'review', title: '🧠 Fin de journée', duration: '18:00', completed: false },
    ],
    objectives: [
      "Déclarer une fonction avec type de retour, nom, paramètres",
      "Appeler une fonction depuis main",
      "Comprendre void comme retour et comme paramètre",
      "Différencier paramètre formel et argument effectif",
    ],
    content: {
      warmup: {
        questions: [
          {
            q: "Comment déclares-tu un `int` nommé age à 21 ?",
            a: "`int age = 21;`",
          },
          {
            q: "Comment afficher un int ? un char ? un float ?",
            a: "`%d`, `%c`, `%f`",
          },
          {
            q: "Que fait `sizeof(int)` ?",
            a: "Renvoie la taille en octets d’un int sur ta machine.",
          },
          {
            q: "Que se passe-t-il si tu n’initialises pas une variable ?",
            a: "Elle contient une valeur quelconque (« garbage »). Toujours initialiser.",
          },
        ],
      },
      course: {
        intro:
          "Une **fonction** est un bloc de code nommé, qui prend des **paramètres** en entrée, fait un travail, et renvoie un **résultat**. C’est l’unité d’organisation du code.",
        sections: [
          {
            heading: '1. Anatomie d’une fonction',
            body: "Une fonction C a toujours la forme :",
            code: 'type_retour nom_fonction(type_param param)\n{\n    // corps\n    return valeur;\n}',
            illustration: '🔧 type nom(param) { ... return valeur; }',
          },
          {
            heading: '2. Une fonction qui additionne',
            body: "Exemple canonique : additionner deux entiers.",
            code: 'int add(int a, int b)\n{\n    return a + b;\n}\n\nint main(void)\n{\n    int result = add(3, 4);\n    printf("%d\\n", result);  // 7\n    return 0;\n}',
            illustration: '➕ add(3, 4) → 7',
          },
          {
            heading: '3. void : pas de retour',
            body: "Si une fonction ne renvoie rien, son type est `void`.",
            code: 'void say_hello(void)\n{\n    printf("Hello!\\n");\n}\n\nint main(void)\n{\n    say_hello();  // pas de return\n    return 0;\n}',
            illustration: '🚫 void = pas de retour',
          },
          {
            heading: '4. Paramètres vs arguments',
            body: "**Paramètre** : la variable déclarée dans la signature (ce que la fonction attend).\n**Argument** : la valeur que tu passes à l’appel.\n\nDans `int add(int a, int b)`, `a` et `b` sont les **paramètres**. Dans `add(3, 4)`, `3` et `4` sont les **arguments**.",
            illustration: '📝 paramètre (déclaration)  ·  📤 argument (appel)',
          },
          {
            heading: '5. Prototype et header',
            body: "Si tu appelles une fonction avant sa définition, le compilateur proteste. Tu dois déclarer son **prototype** en haut du fichier (ou dans un `.h`).",
            code: 'int add(int a, int b);  // prototype\n\nint main(void)\n{\n    printf("%d\\n", add(2, 3));\n    return 0;\n}\n\nint add(int a, int b)\n{\n    return a + b;\n}',
            illustration: '📜 prototype (header) → définition plus bas',
          },
        ],
        keyTakeaways: [
          'Une fonction = type de retour + nom + paramètres + corps.',
          '`return` renvoie une valeur. `void` = rien.',
          'Paramètre (déclaration) ≠ argument (valeur à l’appel).',
          'Un prototype permet d’utiliser une fonction avant sa définition.',
          'Une fonction doit faire une seule chose, et bien.',
        ],
      },
      research: {
        resourceName: 'learn-c.org — Functions',
        resourceUrl: 'https://www.learn-c.org/en/Functions',
        mission:
          "Lis la section Functions. Fais l’exercice interactif. Note ce que tu trouves contre-intuitif.",
        questions: [
          "Que signifie le passage par valeur ?",
          "Comment passer une fonction en paramètre d’une autre ?",
          "Une fonction peut-elle modifier ses paramètres ? Pourquoi ?",
          "Que fait `return` sans argument dans une fonction void ?",
          "Comment organiser ses fonctions dans plusieurs fichiers ?",
        ],
      },
      video: {
        searchQuery: 'C functions explained for beginners tutorial',
        searchUrl: 'https://www.youtube.com/results?search_query=C+functions+explained+for+beginners+tutorial',
        reflectionQuestions: [
          "L’auteur parle-t-il de prototypes ? Sinon, pourquoi ?",
          "Quelle fonction montre-t-il comme exemple ? Aurais-tu fait autrement ?",
          "Qu’est-ce qui reste flou à la fin ?",
        ],
      },
      practice: {
        intro: "Construis des fonctions simples, puis appelle-les. Vérifie le retour.",
        exercises: [
          {
            id: 'd5-ex1',
            title: 'Exercice 01 — add(a, b)',
            prompt: "Écris `int add(int a, int b)` qui renvoie la somme. Appelle-la dans main.",
            hints: [
              "`return a + b;`",
              "Déclare le prototype si tu définis `add` après `main`.",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd5-ex2',
            title: 'Exercice 02 — multiply + say_hello',
            prompt:
              "Écris `int multiply(int a, int b)` et `void say_hello(void)`. Appelle les deux dans main.",
            hints: [
              "Une renvoie un int, l’autre renvoie void.",
              "Pour void, pas de return ou `return;` sans valeur.",
            ],
            difficulty: 'moyen',
          },
          {
            id: 'd5-ex3',
            title: 'Exercice 03 — max(a, b)',
            prompt:
              "Écris `int max(int a, int b)` qui renvoie le plus grand. Teste avec plusieurs paires.",
            hints: [
              "Tu peux utiliser `if (a > b)` (on le verra demain, mais tu peux deviner).",
              "Sinon : expression ternaire `a > b ? a : b`",
            ],
            difficulty: 'moyen',
          },
          {
            id: 'd5-ex4',
            title: 'Défi — Une fonction qui appelle une fonction',
            prompt:
              "Écris `int add_and_double(int a, int b)` qui renvoie `(a + b) * 2` **en appelant** `add` (que tu as déjà écrite).",
            hints: [
              "Tu appelles `add(a, b)` puis multiplies.",
              "Une fonction peut en appeler une autre.",
              "Découpe pour réutiliser.",
            ],
            difficulty: 'défi',
          },
        ],
      },
      epitech: {
        context:
          "À Epitech, on te demande de **découper** ton code en fonctions courtes. Une fonction qui dépasse 20-25 lignes est souvent un signe de mauvaise organisation. Les tests unitaires ( Criterion ) sont basés sur des fonctions publiques.",
        rules: [
          'Une fonction = une responsabilité. Si tu hésites sur son nom, c’est qu’elle fait trop de choses.',
          'Nom en `snake_case`, verbe d’action : `compute_sum`, `print_array`.',
          'Toutes les fonctions publiques doivent être déclarées dans un header `.h`.',
          'Évite plus de 4-5 paramètres. Si plus, regroupe-les dans une structure (plus tard).',
        ],
      },
      tasks: {
        intro: "Organise ton code en fonctions. C’est la base de tout projet sérieux.",
        tasks: [
          {
            id: 'd5-t1',
            title: 'Créer add.c avec une fonction add',
            description: "Fichier `add.c` + fonction `int add(int a, int b)`. Compile et exécute.",
          },
          {
            id: 'd5-t2',
            title: 'Créer un header add.h',
            description: "Mets le prototype de `add` dans `add.h`. Inclus-le dans `main.c`.",
          },
          {
            id: 'd5-t3',
            title: 'Trois fonctions : max, min, average',
            description: "Écris les trois. Teste-les avec des valeurs variées.",
          },
          {
            id: 'd5-t4',
            title: 'Un fichier par fonction',
            description: "Découpe : `max.c`, `min.c`, `average.c`, `main.c`. Compile-les ensemble.",
            locked: true,
            lockedReason: 'Débloquée après la tâche 03',
          },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 06 — Conditions et boucles
  // ───────────────────────────────────────────────────────────────────
  {
    number: 6,
    title: 'Conditions et boucles',
    concept: "Prendre des décisions (if/else) et répéter (while, for)",
    description:
      "Jusqu’ici ton programme était linéaire. Aujourd’hui, il devient intelligent : il choisit (if/else) et il répète (boucles). C’est ici que la programmation devient vraiment puissante.",
    sessions: [
      { id: 'd6-warmup', type: 'warmup', title: '☀️ Échauffement', duration: '09:00', completed: false },
      { id: 'd6-course', type: 'course', title: '📖 Cours', duration: '09:15', completed: false },
      { id: 'd6-research', type: 'research', title: '📚 Recherche', duration: '11:00', completed: false },
      { id: 'd6-video', type: 'video', title: '🎥 Vidéo', duration: '12:00', completed: false },
      { id: 'd6-practice', type: 'practice', title: '💻 Pratique', duration: '14:00', completed: false },
      { id: 'd6-epitech', type: 'epitech', title: '🏫 Mode Epitech', duration: '16:00', completed: false },
      { id: 'd6-task', type: 'task', title: '🎯 Tâches', duration: '17:00', completed: false },
      { id: 'd6-review', type: 'review', title: '🧠 Fin de journée', duration: '18:00', completed: false },
    ],
    objectives: [
      "Écrire un if/else if/else correctement indenté",
      "Écrire une boucle while et une boucle for",
      "Comprendre break et continue",
      "Éviter les boucles infinies",
    ],
    content: {
      warmup: {
        questions: [
          {
            q: "Quelle est la signature de `add(int a, int b)` ?",
            a: "`int add(int a, int b);`",
          },
          {
            q: "Que signifie `void` comme type de retour ?",
            a: "Que la fonction ne renvoie aucune valeur.",
          },
          {
            q: "Paramètre ou argument : `add(3, 4)` ?",
            a: "Arguments. Les paramètres sont dans la déclaration.",
          },
          {
            q: "Pourquoi écrire un prototype ?",
            a: "Pour pouvoir appeler une fonction avant sa définition.",
          },
        ],
      },
      course: {
        intro:
          "Jusqu’ici tout était linéaire : ligne 1, puis ligne 2, puis ligne 3. Aujourd’hui, le programme peut **choisir** (if) et **répéter** (boucles). C’est le cœur de la programmation.",
        sections: [
          {
            heading: '1. if / else if / else',
            body: "Le `if` exécute un bloc si une condition est vraie.",
            code: 'int age = 18;\n\nif (age < 18) {\n    printf("Mineur\\n");\n} else if (age == 18) {\n    printf("Tout juste majeur\\n");\n} else {\n    printf("Majeur\\n");\n}',
            illustration: '🔀 if → else if → else',
          },
          {
            heading: '2. Opérateurs de comparaison',
            body: "`==` égal (⚠️ pas `=` qui est l’affectation)\n`!=` différent\n`<`, `>`, `<=`, `>=`\n\nEt les opérateurs logiques :\n`&&` ET\n`||` OU\n`!` NON",
            code: 'if (age >= 18 && has_id == 1)\n    printf("OK\\n");\n\nif (!is_raining)\n    printf("Sors\\n");',
            illustration: '== · != · < · > · <= · >= · && · || · !',
          },
          {
            heading: '3. while',
            body: "Répète tant que la condition est vraie.",
            code: 'int i = 0;\nwhile (i < 5) {\n    printf("%d\\n", i);\n    i++;  // ⚠️ sinon boucle infinie\n}',
            illustration: '🔁 while (cond) { ... }',
          },
          {
            heading: '4. for',
            body: "La boucle `for` regroupe initialisation, condition, incrément.",
            code: 'for (int i = 0; i < 5; i++) {\n    printf("%d\\n", i);\n}',
            illustration: '🔄 for (init; cond; incr) { ... }',
          },
          {
            heading: '5. break et continue',
            body: "**`break`** sort immédiatement de la boucle.\n**`continue`** passe à l’itération suivante sans exécuter le reste du bloc.",
            code: 'for (int i = 0; i < 10; i++) {\n    if (i == 5) break;       // sort à i=5\n    if (i % 2 == 0) continue; // saute pairs\n    printf("%d\\n", i);       // 1, 3\n}',
            illustration: '🛑 break  ·  ⏭️ continue',
          },
        ],
        keyTakeaways: [
          'if/else = choix. Opérateurs : ==, !=, <, >, <=, >=, &&, ||, !.',
          'while = répète tant que. for = répète un nombre précis de fois.',
          'Toujours modifier la condition dans while pour éviter la boucle infinie.',
          'break sort. continue saute.',
          'Attention au `=` (affectation) vs `==` (égalité).',
        ],
      },
      research: {
        resourceName: 'GeeksforGeeks — “Loops in C”',
        resourceUrl: 'https://www.geeksforgeeks.org/loops-in-c/',
        mission:
          "Lis l’article sur les boucles. Compare while, for, do-while. Note quand utiliser laquelle.",
        questions: [
          "Quand utiliser do-while plutôt que while ?",
          "Que se passe-t-il si tu oublies l’incrément dans un for ?",
          "Comment imbriquer deux boucles sans se tromper de variable ?",
          "Que fait `break` dans une boucle imbriquée ?",
          "Quelle est la différence entre `++i` et `i++` ?",
        ],
      },
      video: {
        searchQuery: 'C if else and while for loops tutorial',
        searchUrl: 'https://www.youtube.com/results?search_query=C+if+else+and+while+for+loops+tutorial',
        reflectionQuestions: [
          "L’auteur fait-il une boucle infinie par erreur ? Laquelle ?",
          "Quelle syntaxe de for te semble la plus claire ?",
          "As-tu repéré une utilisation de break qui t’a surprises ?",
        ],
      },
      practice: {
        intro: "Boucles et conditions, c’est la base. Entraîne-toi jusqu’à ce que ça devienne réflexe.",
        exercises: [
          {
            id: 'd6-ex1',
            title: 'Exercice 01 — Pair ou impair',
            prompt:
              "Demande (ou code en dur) un entier. Affiche « Pair » ou « Impair ».",
            hints: [
              "Utilise `if (n % 2 == 0)`",
              "`%` est l’opérateur modulo (reste de division)",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd6-ex2',
            title: 'Exercice 02 — Compter de 1 à 10',
            prompt: "Avec une boucle for, affiche les nombres de 1 à 10.",
            hints: [
              "`for (int i = 1; i <= 10; i++)`",
              "N’oublie pas `\\n` dans printf",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd6-ex3',
            title: 'Exercice 03 — Table de multiplication',
            prompt:
              "Affiche la table de 7 (de 7x1 à 7x10) avec une boucle.",
            hints: [
              "`for (int i = 1; i <= 10; i++) printf(\"%d x %d = %d\\n\", 7, i, 7*i);`",
            ],
            difficulty: 'moyen',
          },
          {
            id: 'd6-ex4',
            title: 'Défi — Somme 1 à 100',
            prompt:
              "Calcule la somme des entiers de 1 à 100. Affiche le résultat (5050 attendu).",
            hints: [
              "Boucle for + accumulateur",
              "Initialise `int sum = 0;` avant la boucle",
              "À chaque tour : `sum += i;`",
            ],
            difficulty: 'défi',
          },
        ],
      },
      epitech: {
        context:
          "À Epitech, **les boucles infinies** sont l’erreur n°1 des débutants. Le compilateur ne te prévient pas toujours. Teste toujours ta boucle avec un cas simple avant de la lâcher sur un gros fichier.",
        rules: [
          'Vérifie toujours que la condition de sortie sera atteinte.',
          'Évite les `while (1)` sans `break` clair et documenté.',
          'Préfère `for` quand le nombre d’itérations est connu.',
          'Indentation de 4 espaces obligatoire (norme).',
          'Pas de `;` après un `if (...)` si tu veux un bloc — surprise garantie.',
        ],
      },
      tasks: {
        intro: "Pratique les conditions et les boucles jusqu’à l’automatisme.",
        tasks: [
          {
            id: 'd6-t1',
            title: 'Programme pair/impair',
            description: "Lit un int, affiche « Pair » ou « Impair ».",
          },
          {
            id: 'd6-t2',
            title: 'Compter de 1 à 10 avec for',
            description: "Boucle for + printf.",
          },
          {
            id: 'd6-t3',
            title: 'Table de multiplication',
            description: "Table de 7 (ou au choix) avec boucle.",
          },
          {
            id: 'd6-t4',
            title: 'Mini-calculatrice (4 opérations)',
            description: "Demande 2 nombres et une opération (+, -, *, /). Affiche le résultat. Gère la division par zéro.",
            locked: true,
            lockedReason: 'Débloquée après la tâche 03',
          },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 07 — Pointeurs (the critical day)
  // ───────────────────────────────────────────────────────────────────
  {
    number: 7,
    title: 'Pointeurs',
    concept: "Comprendre l’adresse mémoire d’une variable, et la manipuler",
    description:
      "Le jour critique. Les pointeurs font peur à tout le monde, mais ils sont la clé du C. Sans eux, pas de tableaux dynamiques, pas de structures complexes, pas d’Epitech. On va y aller doucement, avec des dessins.",
    sessions: [
      { id: 'd7-warmup', type: 'warmup', title: '☀️ Échauffement', duration: '09:00', completed: false },
      { id: 'd7-course', type: 'course', title: '📖 Cours', duration: '09:15', completed: false },
      { id: 'd7-research', type: 'research', title: '📚 Recherche', duration: '11:00', completed: false },
      { id: 'd7-video', type: 'video', title: '🎥 Vidéo', duration: '12:00', completed: false },
      { id: 'd7-practice', type: 'practice', title: '💻 Pratique', duration: '14:00', completed: false },
      { id: 'd7-epitech', type: 'epitech', title: '🏫 Mode Epitech', duration: '16:00', completed: false },
      { id: 'd7-task', type: 'task', title: '🎯 Tâches', duration: '17:00', completed: false },
      { id: 'd7-review', type: 'review', title: '🧠 Fin de journée', duration: '18:00', completed: false },
    ],
    objectives: [
      "Expliquer la différence entre une variable et son adresse",
      "Utiliser & pour obtenir l’adresse d’une variable",
      "Utiliser * pour déclarer un pointeur et pour déréférencer",
      "Comprendre NULL et éviter le segfault",
    ],
    content: {
      warmup: {
        questions: [
          {
            q: "Quand tu écris `int a = 10;`, que contient `a` exactement ?",
            a: "`a` est un nom symbolique donné à une case mémoire qui contient la valeur 10. La case a une adresse (ex : 0x7ffe...).",
          },
          {
            q: "Que fait `if (i == 5) break;` ?",
            a: "Sort de la boucle si i vaut 5.",
          },
          {
            q: "Comment éviter une boucle infinie ?",
            a: "Toujours modifier la variable testée dans la condition.",
          },
          {
            q: "Que fait `continue` ?",
            a: "Passe à l’itération suivante, sans exécuter le reste du bloc.",
          },
          {
            q: "Différence entre `=` et `==` ?",
            a: "`=` affecte, `==` compare. Erreur classique : `if (a = 5)` qui affecte au lieu de comparer.",
          },
        ],
      },
      course: {
        intro:
          "Quand tu écris `int a = 10;`, `a` est un nom facile pour toi, mais la machine voit une **case mémoire** à une certaine **adresse**. Un pointeur est une variable qui **stocke une adresse**. C’est tout. Une adresse = un numéro de case.",
        sections: [
          {
            heading: '1. La mémoire comme une rue',
            body: "Imagine une rue avec des maisons numérotées. Chaque maison est une case mémoire. Chaque numéro est une **adresse**.\n\n`int a = 10;` → la machine réserve une case, y écrit 10, et lui donne une adresse (ex : 0x7ffd1a2b3c4d).\n\n`a` est ton nom pour cette case. L’adresse est le numéro de la maison.",
            illustration: '🏠 maison 0x7ffd1a2b3c4d → contient 10',
          },
          {
            heading: '2. L’opérateur & : adresse de',
            body: "Pour connaître l’adresse d’une variable, utilise `&` :",
            code: 'int a = 10;\nprintf("Valeur: %d\\n", a);    // 10\nprintf("Adresse: %p\\n", &a);  // 0x7ffd1a2b3c4d',
            illustration: '&a = adresse de a',
          },
          {
            heading: '3. Le type pointeur : `int *`',
            body: "Un **pointeur** est une variable qui stocke une adresse. On déclare avec `*` :",
            code: 'int a = 10;\nint *p = &a;   // p stocke l’adresse de a\n\nprintf("%p\\n", p);     // adresse\nprintf("%p\\n", &a);    // même adresse',
            illustration: '📦 p (type int *) → contient l’adresse de a',
          },
          {
            heading: '4. L’opérateur * : déréférencer',
            body: "Pour accéder à la valeur **pointée** par un pointeur, utilise `*` :",
            code: 'int a = 10;\nint *p = &a;\n\nprintf("%d\\n", *p);   // 10 (la valeur pointée)\n*p = 20;                // modifie a !\nprintf("%d\\n", a);    // 20',
            illustration: '*p = va chercher la valeur à l’adresse stockée dans p',
          },
          {
            heading: '5. NULL : le pointeur vide',
            body: "`NULL` est un pointeur qui ne pointe vers rien. C’est une bonne pratique d’initialiser un pointeur à NULL si tu n’as pas encore d’adresse à y mettre.\n\nDéréférencer NULL = **segfault** (erreur fatale). Vérifie toujours avant :",
            code: 'int *p = NULL;\nif (p != NULL) {\n    printf("%d\\n", *p);\n} else {\n    printf("Pointeur vide !\\n");\n}',
            illustration: '⚠️ NULL = adresse 0 = ne pas déréférencer !',
          },
        ],
        keyTakeaways: [
          'Une variable a une valeur ET une adresse mémoire.',
          '`&var` donne l’adresse de `var`.',
          '`int *p` déclare un pointeur vers un int. `p = &var` stocke l’adresse.',
          '`*p` déréférence : accède à la valeur pointée.',
          'NULL = pointeur vide. Toujours vérifier avant de déréférencer.',
        ],
      },
      research: {
        resourceName: 'GeeksforGeeks — “C Pointers”',
        resourceUrl: 'https://www.geeksforgeeks.org/c-pointers/',
        mission:
          "Lis l’article sur les pointeurs. Refais chaque exemple. Note ce qui reste flou — on en parlera dans ton journal.",
        questions: [
          "Quelle est la différence entre `int *p` et `int p` ?",
          "Pourquoi dit-on qu’un pointeur a un type ?",
          "Que se passe-t-il si tu déréférences un pointeur non initialisé ?",
          "Comment échanger deux variables sans `return` (avec pointeurs) ?",
          "Qu’est-ce que l’arithmétique des pointeurs (`p + 1`) ?",
        ],
      },
      video: {
        searchQuery: 'C pointers explained simply visual tutorial',
        searchUrl: 'https://www.youtube.com/results?search_query=C+pointers+explained+simply+visual+tutorial',
        reflectionQuestions: [
          "Quelle analogie de la vidéo t’a le plus aidé ?",
          "Le moment où l’auteur modifie `a` via `*p` : as-tu bien vu ce qui se passait ?",
          "Que ferais-tu pour expliquer les pointeurs à un ami ?",
        ],
      },
      practice: {
        intro:
          "Les pointeurs ne s’apprennent qu’en pratiquant. Tape chaque exemple. Modifie-le. Observe.",
        exercises: [
          {
            id: 'd7-ex1',
            title: 'Exercice 01 — Affiche l’adresse',
            prompt:
              "Déclare `int a = 10;`. Affiche sa valeur et son adresse (`&a`) avec `%p`.",
            hints: [
              "`printf(\"%p\\n\", (void*)&a);`",
              "Compile avec `-Wall` pour les warnings",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd7-ex2',
            title: 'Exercice 02 — Premier pointeur',
            prompt:
              "Déclare `int a = 10; int *p = &a;`. Affiche p, *p, et &a. Compare-les.",
            hints: [
              "`%p` pour afficher une adresse",
              "p et &a doivent être identiques",
              "*p doit valoir 10",
            ],
            difficulty: 'facile',
          },
          {
            id: 'd7-ex3',
            title: 'Exercice 03 — Modifier via pointeur',
            prompt:
              "Avec `int a = 10; int *p = &a;`, fais `*p = 42;`. Affiche a. Que vaut-il ? Pourquoi ?",
            hints: [
              "a et *p pointent sur la même case",
              "Modifier *p modifie a",
              "Affiche a après la modification",
            ],
            difficulty: 'moyen',
          },
          {
            id: 'd7-ex4',
            title: 'Défi — swap(a, b) par pointeur',
            prompt:
              "Écris `void swap(int *a, int *b)` qui échange les valeurs. Appelle-la depuis main.",
            hints: [
              "Tu as besoin d’une variable temporaire",
              "`int tmp = *a; *a = *b; *b = tmp;`",
              "Appel : `swap(&x, &y)`",
            ],
            difficulty: 'défi',
          },
        ],
      },
      epitech: {
        context:
          "À Epitech, **sans pointeurs, tu ne peux rien faire**. Toutes les fonctions qui modifient une variable passée en paramètre utilisent des pointeurs. C’est le cœur de ton quotidien Piscine.",
        rules: [
          'Toujours initialiser un pointeur (NULL si pas d’adresse).',
          'Toujours vérifier `if (p != NULL)` avant de déréférencer.',
          'Une fonction qui doit modifier un argument prend un pointeur vers cet argument.',
          'Les tableaux sont des pointeurs déguisés (on le verra bientôt).',
          'Compiling avec `-Wall -Wextra -Werror` : aucun warning toléré à Epitech.',
        ],
      },
      tasks: {
        intro: "Aujourd’hui, tu passes un cap. Une fois les pointeurs compris, tout s’éclaire.",
        tasks: [
          {
            id: 'd7-t1',
            title: 'Afficher valeur + adresse',
            description: "Déclare `int a`, affiche valeur et adresse.",
          },
          {
            id: 'd7-t2',
            title: 'Stocker l’adresse dans un pointeur',
            description: "`int *p = &a;`. Affiche p et *p.",
          },
          {
            id: 'd7-t3',
            title: 'Modifier a via *p',
            description: "`*p = 42;` puis affiche a.",
          },
          {
            id: 'd7-t4',
            title: 'Écrire swap(int*, int*)',
            description: "Échange deux valeurs via pointeurs. Teste.",
            locked: true,
            lockedReason: 'Débloquée après la tâche 03',
          },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 08 — Allocation memoire (malloc, free, my_strdup, my_str_to_word_array)
  // ───────────────────────────────────────────────────────────────────
  {
    number: 8,
    title: "Allocation memoire et parsing",
    concept: "malloc, free, my_strdup, my_str_to_word_array, concat_params",
    description: "Tu decouvre l'allocation dynamique avec malloc(). C'est le moment ou tu cesses d'utiliser des tableaux statiques pour creer de la memoire a la demande. C'est aussi le jour ou tu apprends a decouper une chaine en mots.",
    sessions: [
      { id: "d8-warmup", type: "warmup", title: "Echauffement", duration: "09:00", completed: false },
      { id: "d8-course", type: "course", title: "Cours : malloc & free", duration: "09:15", completed: false },
      { id: "d8-research", type: "research", title: "Recherche : man malloc", duration: "11:00", completed: false },
      { id: "d8-video", type: "video", title: "Video : Pointers and memory", duration: "12:00", completed: false },
      { id: "d8-practice", type: "practice", title: "Pratique", duration: "14:00", completed: false },
      { id: "d8-epitech", type: "epitech", title: "Mode Epitech : Norme & malloc", duration: "16:00", completed: false },
      { id: "d8-task", type: "task", title: "Taches Piscine", duration: "17:00", completed: false },
      { id: "d8-review", type: "review", title: "Fin de journee", duration: "18:00", completed: false },
    ],
    objectives: [
      "Comprendre ce qu'est la memoire heap vs stack",
      "Utiliser malloc() pour allouer dynamiquement de la memoire",
      "Utiliser free() pour liberer la memoire allouee",
      "Implementer my_strdup() qui duplique une chaine",
      "Implementer my_str_to_word_array() qui decoupe une phrase en mots",
    ],
    content: {
      warmup: {
        questions: [
          { q: "Que fait malloc en C ?", a: "malloc alloue un bloc de memoire sur le heap et retourne un pointeur vers ce bloc." },
          { q: "Que se passe-t-il si tu oublies de free() ?", a: "Fuite de memoire (memory leak). La memoire reste occupee jusqu'a la fin du programme." },
          { q: "Que retourne malloc en cas d'echec ?", a: "NULL. Il faut TOUJOURS verifier le retour de malloc." },
          { q: "Quelle difference entre stack et heap ?", a: "La stack est automatique (variables locales), le heap est manuel (malloc/free)." },
        ],
      },
      course: {
        sections: [
          {
            heading: "La memoire en C",
            body: "En C, il y a deux zones de memoire :\n\n1. La stack (pile) : variables locales, automatiquement allouees et liberees. Taille limitee (~8MB).\n\n2. Le heap (tas) : memoire dynamique, allouee avec malloc() et liberee avec free(). Taille limitee par la RAM disponible.\n\nQuand tu ne connais pas la taille a l'avance (une chaine de longueur variable, un tableau dynamique), tu utilises le heap.",
          },
          {
            heading: "malloc() et free()",
            body: "int *array = malloc(sizeof(int) * 100);\nif (array == NULL) return 84;\narray[0] = 42;\nfree(array);\n\nRegle d'or : chaque malloc() doit avoir un free() correspondant.",
          },
          {
            heading: "my_strdup()",
            body: "strdup alloue une nouvelle chaine et y copie le contenu de l'originale.\n\nchar *my_strdup(char const *src)\n{\n    int len = my_strlen(src);\n    char *dest = malloc(sizeof(char) * (len + 1));\n    if (dest == NULL) return NULL;\n    for (int i = 0; i <= len; i++)\n        dest[i] = src[i];\n    return dest;\n}\n\nNote : len + 1 pour le caractere de fin \\0.",
          },
          {
            heading: "my_str_to_word_array()",
            body: "Cette fonction decoupe une chaine en tableau de mots, en utilisant les espaces et caracteres non-imprimables comme separateurs.\n\n1. Compter le nombre de mots\n2. Allouer le tableau de pointeurs (char**)\n3. Pour chaque mot : calculer sa longueur, allouer, copier\n4. Terminer par NULL\n\nC'est un exercice difficile mais fondamental. Il combine malloc, strlen, strcpy et la gestion de tableaux de pointeurs.",
          },
        ],
      },
      research: {
        resourceUrl: "https://man7.org/linux/man-pages/man3/malloc.3.html",
        mission: "Lis la page de manuel de malloc(3). Note : 1. Les parametres (un seul : size_t size) 2. La valeur de retour (void*, NULL si echec) 3. Les fonctions liees : calloc, realloc, free 4. Les erreurs possibles (ENOMEM)",
        questions: [
          "Que signifie le type size_t ?",
          "Quelle difference entre malloc et calloc ?",
          "Que fait realloc ?",
          "Pourquoi malloc retourne-t-elle void* ?",
          "Que faut-il TOUJOURS faire apres un malloc ?",
        ],
      },
      video: {
        searchQuery: "C programming malloc free memory management explained",
        reflectionQuestions: [
          "Qu'as-tu appris sur la difference entre stack et heap ?",
          "Pourquoi les fuites de memoire sont-elles dangereuses ?",
          "Comment verifier qu'un malloc a reussi ?",
        ],
      },
      practice: {
        exercises: [
          { id: "d8-ex1", title: "my_strdup()", description: "Implemente my_strdup(char const *src) qui alloue et copie une chaine. N'oublie pas le +1 pour \\0.", hint: "Utilise my_strlen pour calculer la taille, puis malloc, puis boucle de copie." },
          { id: "d8-ex2", title: "concat_params()", description: "Concatene tous les parametres de main (argv) en une seule chaine, separes par \\n.", hint: "Compte la taille totale necessaire, un seul malloc, puis copie chaque parametre." },
          { id: "d8-ex3", title: "my_str_to_word_array()", description: "Decoupe une chaine en tableau de mots. Separateurs : espaces, tabulations, caracteres non imprimables. Retourne un char** termine par NULL.", hint: "Commence par compter les mots. Pour chaque mot : compte sa longueur, malloc, copie." },
        ],
      },
      epitech: {
        rules: [
          "Verifier le retour de malloc : la norme Epitech exige que tu verifies ptr == NULL apres chaque malloc.",
          "Free ce que tu malloc : chaque allocation doit avoir une liberation correspondante. Utilise valgrind pour verifier.",
          "Pas de variable globale : la norme interdit les variables globales.",
          "sizeof au lieu de tailles en dur : utilise sizeof(char) plutot que 1.",
        ],
      },
      tasks: {
        intro: "Jour 08 de la Piscine. Ces exercices combinent tout ce que tu as appris : pointeurs, chaines, et maintenant allocation memoire.",
        tasks: [
          { id: "d8-t1", title: "my_strdup", description: "Dupliquer une chaine avec malloc.", difficulty: "medium", estimatedTime: "45 min", locked: false },
          { id: "d8-t2", title: "concat_params", description: "Concatener argv en une chaine avec \\n.", difficulty: "medium", estimatedTime: "1h", locked: true, lockedReason: "Apres my_strdup" },
          { id: "d8-t3", title: "my_str_to_word_array", description: "Decouper une chaine en tableau de mots.", difficulty: "hard", estimatedTime: "2-3h", locked: true, lockedReason: "Apres concat_params" },
          { id: "d8-t4", title: "my_show_word_array", description: "Afficher un tableau de mots (char**).", difficulty: "easy", estimatedTime: "30 min", locked: true, lockedReason: "Apres my_str_to_word_array" },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 09 — Structures et tableaux de structures
  // ───────────────────────────────────────────────────────────────────
  {
    number: 9,
    title: "Structures de donnees",
    concept: "struct, typedef, my_params_to_array, my_show_param_array",
    description: "Tu vas decouvrir les structures : un moyen de regrouper plusieurs variables sous un meme nom. C'est la base de la programmation structuree et de tous les types complexes.",
    sessions: [
      { id: "d9-warmup", type: "warmup", title: "Echauffement", duration: "09:00", completed: false },
      { id: "d9-course", type: "course", title: "Cours : struct & typedef", duration: "09:15", completed: false },
      { id: "d9-research", type: "research", title: "Recherche", duration: "11:00", completed: false },
      { id: "d9-video", type: "video", title: "Video", duration: "12:00", completed: false },
      { id: "d9-practice", type: "practice", title: "Pratique", duration: "14:00", completed: false },
      { id: "d9-epitech", type: "epitech", title: "Mode Epitech", duration: "16:00", completed: false },
      { id: "d9-task", type: "task", title: "Taches", duration: "17:00", completed: false },
      { id: "d9-review", type: "review", title: "Fin de journee", duration: "18:00", completed: false },
    ],
    objectives: [
      "Definir et utiliser une struct en C",
      "Utiliser typedef pour creer des alias de types",
      "Acceder aux champs d'une structure avec . et ->",
      "Creer un tableau de structures dynamiquement",
      "Implementer my_params_to_array() et my_show_param_array()",
    ],
    content: {
      warmup: {
        questions: [
          { q: "Qu'est-ce qu'une struct en C ?", a: "Une structure permet de regrouper plusieurs variables de types differents sous un meme nom." },
          { q: "Comment acceder au champ 'name' d'une struct 'p' ?", a: "Avec p.name si p est une variable, ou p->name si p est un pointeur." },
          { q: "Que fait typedef ?", a: "typedef cree un alias pour un type existant." },
        ],
      },
      course: {
        sections: [
          {
            heading: "Definir une struct",
            body: "typedef struct info {\n    char *name;\n    char *value;\n} info_t;\n\ninfo_t my_info;\nmy_info.name = \"epitech\";\nmy_info.value = \"42\";",
          },
          {
            heading: "Pointeurs et structures",
            body: "Quand tu as un pointeur vers une struct, utilise -> au lieu de .\ninfo_t *ptr = &my_info;\nptr->name = \"test\";  // Equivalent a (*ptr).name",
          },
          {
            heading: "Tableau de structures (my_params_to_array)",
            body: "my_params_to_array convertit argv en un tableau de structures :\n\ntypedef struct info {\n    char *name;\n    char *value;\n} info_t;\n\ninfo_t *my_params_to_array(int ac, char **av)\n{\n    info_t *arr = malloc(sizeof(info_t) * ac);\n    // Remplir chaque element avec name = av[i] et value = NULL\n    return arr;\n}\n\nOn utilise un tableau dynamique de structures alloue avec un seul malloc.",
          },
        ],
      },
      research: {
        resourceUrl: "https://learn-c.org/en/Structures",
        mission: "Lis le tutoriel sur les structures. Note : 1. Comment declarer une struct 2. Comment utiliser typedef 3. Comment acceder aux champs 4. Comment passer une struct a une fonction",
        questions: [
          "Quelle est la difference entre . et -> ?",
          "Pourquoi utiliser typedef ?",
          "Peut-on imbriquer des structures ?",
          "Comment allouer une structure dynamiquement ?",
        ],
      },
      video: {
        searchQuery: "C programming structures struct typedef tutorial",
        reflectionQuestions: [
          "Pourquoi les structures sont-elles utiles en C ?",
          "Quelle difference entre . et -> ?",
          "Comment organiser ses donnees avec des structures ?",
        ],
      },
      practice: {
        exercises: [
          { id: "d9-ex1", title: "Definir une struct info_t", description: "Cree une structure info_t avec deux champs : char *name et char *value.", hint: "Utilise typedef struct { ... } info_t;" },
          { id: "d9-ex2", title: "my_params_to_array()", description: "Convertit argv en tableau de info_t. Chaque element : name = av[i], value = NULL.", hint: "Un seul malloc pour le tableau, puis remplir chaque element." },
          { id: "d9-ex3", title: "my_show_param_array()", description: "Affiche un tableau de info_t : name\\nvalue\\n pour chaque element.", hint: "Parcours le tableau jusqu'a rencontrer NULL." },
        ],
      },
      epitech: {
        rules: [
          "typedef obligatoire : la norme Epitech exige typedef pour les structures.",
          "Nom en _t : par convention, les types se terminent par _t (info_t, list_t, etc.).",
          "Initialiser a NULL : les pointeurs dans une struct doivent etre initialises a NULL.",
          "Header .h : les definitions de struct vont dans un fichier .h, pas dans le .c.",
        ],
      },
      tasks: {
        intro: "Jour 09 : les structures ouvrent la porte a la programmation organisee.",
        tasks: [
          { id: "d9-t1", title: "Creer une struct", description: "Definir info_t avec name et value.", difficulty: "easy", estimatedTime: "20 min", locked: false },
          { id: "d9-t2", title: "my_params_to_array", description: "argv -> tableau de info_t.", difficulty: "hard", estimatedTime: "2h", locked: true, lockedReason: "Apres struct" },
          { id: "d9-t3", title: "my_show_param_array", description: "Afficher le tableau de structs.", difficulty: "medium", estimatedTime: "45 min", locked: true, lockedReason: "Apres params_to_array" },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 10 — Do-op : premiere calculatrice
  // ───────────────────────────────────────────────────────────────────
  {
    number: 10,
    title: "Do-op : ta premiere calculatrice",
    concept: "switch, pointeurs sur fonctions, do_op, my_sort_word_array",
    description: "Tu vas creer un programme qui prend une operation en parametre (ex: ./do_op 5 + 3) et affiche le resultat. C'est le jour ou tu decouvres les pointeurs sur fonctions.",
    sessions: [
      { id: "d10-warmup", type: "warmup", title: "Echauffement", duration: "09:00", completed: false },
      { id: "d10-course", type: "course", title: "Cours : switch & function pointers", duration: "09:15", completed: false },
      { id: "d10-research", type: "research", title: "Recherche", duration: "11:00", completed: false },
      { id: "d10-video", type: "video", title: "Video", duration: "12:00", completed: false },
      { id: "d10-practice", type: "practice", title: "Pratique", duration: "14:00", completed: false },
      { id: "d10-epitech", type: "epitech", title: "Mode Epitech", duration: "16:00", completed: false },
      { id: "d10-task", type: "task", title: "Taches", duration: "17:00", completed: false },
      { id: "d10-review", type: "review", title: "Fin de journee", duration: "18:00", completed: false },
    ],
    objectives: [
      "Utiliser switch/case pour gerer plusieurs cas",
      "Comprendre les pointeurs sur fonctions",
      "Implementer do_op (mini calculatrice en ligne de commande)",
      "Implementer my_sort_word_array (trier un tableau de mots)",
    ],
    content: {
      warmup: {
        questions: [
          { q: "Quelle difference entre if/else et switch ?", a: "switch est plus lisible pour tester une valeur contre plusieurs constantes. Il ne fonctionne qu'avec des entiers et des chars." },
          { q: "Qu'est-ce qu'un pointeur sur fonction ?", a: "C'est un pointeur qui stocke l'adresse d'une fonction. On peut l'appeler indirectement via ce pointeur." },
          { q: "Comment convertir une chaine en entier ?", a: "Avec atoi() ou my_getnbr() que tu as implemente au Jour 04." },
        ],
      },
      course: {
        sections: [
          {
            heading: "switch / case",
            body: "switch (operator) {\n    case '+': result = a + b; break;\n    case '-': result = a - b; break;\n    case '*': result = a * b; break;\n    case '/': result = a / b; break;\n    default: result = 0; break;\n}\n\nN'oublie pas break; Sans break, l'execution continue dans le case suivant (fall-through).",
          },
          {
            heading: "Pointeurs sur fonctions",
            body: "Un pointeur sur fonction permet d'appeler une fonction indirectement :\nint (*operation)(int, int);\noperation = &add;\nint result = operation(3, 4);  // Appelle add(3, 4)\n\nPour do_op, tu peux creer un tableau de pointeurs sur fonctions :\nint (*ops[4])(int, int) = {&add, &sub, &mul, &div};",
          },
          {
            heading: "Tri de mots (my_sort_word_array)",
            body: "Tri a bulles sur un tableau de chaines (char**) :\nvoid my_sort_word_array(char **tab)\n{\n    int n = 0;\n    while (tab[n] != NULL) n++;\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - 1 - i; j++)\n            if (my_strcmp(tab[j], tab[j+1]) > 0) {\n                char *tmp = tab[j];\n                tab[j] = tab[j+1];\n                tab[j+1] = tmp;\n            }\n}\n\nOn utilise my_strcmp (du Jour 06) pour comparer les mots.",
          },
        ],
      },
      research: {
        resourceUrl: "https://www.geeksforgeeks.org/function-pointer-in-c/",
        mission: "Lis l'article sur les pointeurs sur fonctions. Note : 1. La syntaxe de declaration 2. Comment assigner une fonction 3. Comment appeler via le pointeur 4. Les cas d'usage (callbacks, dispatch tables)",
        questions: [
          "Pourquoi utiliser un pointeur sur fonction ?",
          "Quelle est la syntaxe de declaration ?",
          "Comment creer un tableau de pointeurs sur fonctions ?",
          "Quels sont les avantages par rapport a if/else ?",
        ],
      },
      video: {
        searchQuery: "C programming function pointers tutorial",
        reflectionQuestions: [
          "Qu'est-ce qu'un pointeur sur fonction et pourquoi l'utiliser ?",
          "Comment un tableau de pointeurs sur fonctions remplace-t-il un switch ?",
          "Quel concept etait nouveau pour toi ?",
        ],
      },
      practice: {
        exercises: [
          { id: "d10-ex1", title: "do_op basique (switch)", description: "./do_op 5 + 3 -> affiche 8. Utilise switch/case pour l'operateur.", hint: "Recupere argv[1] = nombre, argv[2] = operateur, argv[3] = nombre. Convertis avec atoi." },
          { id: "d10-ex2", title: "do_op avec pointeurs sur fonctions", description: "Refais do_op mais avec un tableau de pointeurs sur fonctions au lieu de switch.", hint: "Cree int (*ops[])(int,int) = {add, sub, mul, div}; et un tableau de chars d'operateurs." },
          { id: "d10-ex3", title: "my_sort_word_array", description: "Trie un tableau de mots (char**) par ordre alphabetique. Utilise my_strcmp.", hint: "Tri a bulles (bubble sort). Compte le nombre de mots jusqu'a NULL." },
        ],
      },
      epitech: {
        rules: [
          "Gerer les erreurs : division par zero -> afficher 0 ou un message d'erreur selon le sujet.",
          "argc check : verifier que tu as bien 4 parametres (programme + 3 args).",
          "Pas de if en cascade : si tu as plus de 3 cas, utilise switch.",
          "Pointeurs sur fonctions : c'est attendu pour do_op avance.",
        ],
      },
      tasks: {
        intro: "Jour 10 : tu as assez de connaissances pour construire une vraie application (mini-calculatrice).",
        tasks: [
          { id: "d10-t1", title: "do_op (switch)", description: "Calculatrice basique avec switch/case.", difficulty: "medium", estimatedTime: "1h", locked: false },
          { id: "d10-t2", title: "my_sort_word_array", description: "Trier un tableau de mots.", difficulty: "medium", estimatedTime: "1h", locked: true, lockedReason: "Apres do_op" },
          { id: "d10-t3", title: "my_advanced_do_op", description: "do_op avec pointeurs sur fonctions + gestion d'erreurs.", difficulty: "hard", estimatedTime: "2h", locked: true, lockedReason: "Apres sort_word_array" },
          { id: "d10-t4", title: "my_advanced_sort_word_array", description: "Tri avec fonction de comparaison en parametre.", difficulty: "challenge", estimatedTime: "2h+", locked: true, lockedReason: "Apres advanced_do_op" },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 11 — Listes chainees
  // ───────────────────────────────────────────────────────────────────
  {
    number: 11,
    title: "Listes chainees",
    concept: "listes chainees, my_params_to_list, my_list_size, parcours de liste",
    description: "Tu vas decouvrir les listes chainees - la structure de donnees la plus importante de la Piscine. C'est un concept fondamental que tu utiliseras pendant toute ta carriere de developpeur.",
    sessions: [
      { id: "d11-warmup", type: "warmup", title: "Echauffement", duration: "09:00", completed: false },
      { id: "d11-course", type: "course", title: "Cours : Listes chainees", duration: "09:15", completed: false },
      { id: "d11-research", type: "research", title: "Recherche", duration: "11:00", completed: false },
      { id: "d11-video", type: "video", title: "Video", duration: "12:00", completed: false },
      { id: "d11-practice", type: "practice", title: "Pratique", duration: "14:00", completed: false },
      { id: "d11-epitech", type: "epitech", title: "Mode Epitech", duration: "16:00", completed: false },
      { id: "d11-task", type: "task", title: "Taches", duration: "17:00", completed: false },
      { id: "d11-review", type: "review", title: "Fin de journee", duration: "18:00", completed: false },
    ],
    objectives: [
      "Comprendre ce qu'est une liste chainee et pourquoi elle est utile",
      "Definir une struct de noeud (node) avec un pointeur next",
      "Implementer my_params_to_list() qui cree une liste depuis argv",
      "Implementer my_list_size() qui compte les elements",
      "Parcourir une liste chainee avec une boucle while",
    ],
    content: {
      warmup: {
        questions: [
          { q: "Qu'est-ce qu'une liste chainee ?", a: "Une structure de donnees ou chaque element (noeud) contient une valeur et un pointeur vers l'element suivant." },
          { q: "Pourquoi utiliser une liste chainee plutot qu'un tableau ?", a: "Une liste chainee peut grandir/retrécir dynamiquement sans reallocation. Insertion/suppression en O(1) en tete." },
          { q: "Comment savoir qu'on est a la fin de la liste ?", a: "Le pointeur next du dernier noeud est NULL." },
        ],
      },
      course: {
        sections: [
          {
            heading: "Definir un noeud (node)",
            body: "typedef struct list {\n    char *value;\n    struct list *next;\n} list_t;\n\nChaque noeud contient :\n- value : la donnee stockee\n- next : un pointeur vers le noeud suivant (ou NULL si dernier)\n\nC'est une structure recursive : un noeud pointe vers un autre noeud du meme type.",
          },
          {
            heading: "Creer un noeud",
            body: "list_t *create_node(char *value)\n{\n    list_t *node = malloc(sizeof(list_t));\n    if (node == NULL) return NULL;\n    node->value = value;\n    node->next = NULL;\n    return node;\n}\n\nToujours initialiser next a NULL.",
          },
          {
            heading: "my_params_to_list()",
            body: "Convertit argv en liste chainee. Chaque parametre devient un noeud.\n\nlist_t *my_params_to_list(int ac, char **av)\n{\n    list_t *head = NULL;\n    for (int i = 0; i < ac; i++) {\n        list_t *node = create_node(av[i]);\n        node->next = head;  // Insertion en tete\n        head = node;\n    }\n    return head;\n}\n\nNote : l'insertion en tete inverse l'ordre. C'est le plus simple et le plus efficace (O(1)).",
          },
          {
            heading: "Parcourir une liste (my_list_size)",
            body: "int my_list_size(list_t *list)\n{\n    int count = 0;\n    list_t *current = list;\n    while (current != NULL) {\n        count++;\n        current = current->next;\n    }\n    return count;\n}\n\nLe parcours se fait toujours avec une boucle while et un pointeur courant.",
          },
        ],
      },
      research: {
        resourceUrl: "https://www.geeksforgeeks.org/linked-list-set-1-introduction/",
        mission: "Lis l'introduction aux listes chainees. Note : 1. La difference avec un tableau 2. Les avantages (insertion/suppression) 3. Les inconvenients (acces aleatoire O(n)) 4. Les differents types (simplement, doublement, circulaire)",
        questions: [
          "Quelle est la complexite d'insertion en tete d'une liste vs un tableau ?",
          "Pourquoi ne peut-on pas acceder directement au 5eme element ?",
          "Que fait head->next->next->next ?",
          "Comment liberer toute une liste ?",
        ],
      },
      video: {
        searchQuery: "C programming linked lists tutorial explained",
        reflectionQuestions: [
          "Pourquoi les listes chainees sont-elles fondamentales en C ?",
          "Quelle difference avec un tableau ?",
          "Comment parcourir une liste sans perdre le pointeur de tete ?",
        ],
      },
      practice: {
        exercises: [
          { id: "d11-ex1", title: "Definir list_t et create_node()", description: "Cree la struct list_t (value + next) et une fonction create_node(char *value).", hint: "typedef struct list { char *value; struct list *next; } list_t;" },
          { id: "d11-ex2", title: "my_params_to_list()", description: "Convertit argv en liste chainee. Insere en tete pour chaque parametre.", hint: "Boucle for sur ac, cree un noeud pour chaque av[i], insere en tete." },
          { id: "d11-ex3", title: "my_list_size()", description: "Compte le nombre d'elements dans une liste chainee.", hint: "Boucle while avec pointeur courant. current = current->next jusqu'a NULL." },
        ],
      },
      epitech: {
        rules: [
          "struct recursive : la struct doit s'inclure elle-meme via un pointeur (struct list *next).",
          "typedef obligatoire : typedef struct list { ... } list_t;",
          "Malloc check : verifier le retour de malloc dans create_node.",
          "Header .h : la definition de list_t va dans un .h.",
        ],
      },
      tasks: {
        intro: "Jour 11 : les listes chainees sont le coeur de la Piscine. Beaucoup de projets futurs les utiliseront.",
        tasks: [
          { id: "d11-t1", title: "list_t + create_node", description: "Definir la struct et la fonction de creation.", difficulty: "easy", estimatedTime: "30 min", locked: false },
          { id: "d11-t2", title: "my_params_to_list", description: "argv -> liste chainee.", difficulty: "hard", estimatedTime: "2h", locked: true, lockedReason: "Apres create_node" },
          { id: "d11-t3", title: "my_list_size", description: "Compter les elements d'une liste.", difficulty: "medium", estimatedTime: "45 min", locked: true, lockedReason: "Apres params_to_list" },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 12 — Recreer cat et grep
  // ───────────────────────────────────────────────────────────────────
  {
    number: 12,
    title: "Recreer cat et grep",
    concept: "open, read, write, close, file descriptors, my_cat, my_grep",
    description: "Tu vas recreer deux outils Unix fondamentaux : cat (afficher le contenu d'un fichier) et grep (chercher un motif dans un fichier). C'est le jour ou tu decouvres les appels systeme : open, read, write, close.",
    sessions: [
      { id: "d12-warmup", type: "warmup", title: "Echauffement", duration: "09:00", completed: false },
      { id: "d12-course", type: "course", title: "Cours : File descriptors", duration: "09:15", completed: false },
      { id: "d12-research", type: "research", title: "Recherche : man open", duration: "11:00", completed: false },
      { id: "d12-video", type: "video", title: "Video : File I/O", duration: "12:00", completed: false },
      { id: "d12-practice", type: "practice", title: "Pratique", duration: "14:00", completed: false },
      { id: "d12-epitech", type: "epitech", title: "Mode Epitech", duration: "16:00", completed: false },
      { id: "d12-task", type: "task", title: "Taches", duration: "17:00", completed: false },
      { id: "d12-review", type: "review", title: "Fin de journee", duration: "18:00", completed: false },
    ],
    objectives: [
      "Comprendre ce qu'est un file descriptor (fd)",
      "Utiliser open() pour ouvrir un fichier",
      "Utiliser read() pour lire le contenu",
      "Utiliser write() pour ecrire sur la sortie standard",
      "Utiliser close() pour fermer le fichier",
      "Implementer my_cat (afficher un fichier) et my_grep (chercher un motif)",
    ],
    content: {
      warmup: {
        questions: [
          { q: "Qu'est-ce qu'un file descriptor ?", a: "Un entier qui identifie un fichier ouvert. 0 = stdin, 1 = stdout, 2 = stderr." },
          { q: "Que font les 4 appels systeme open, read, write, close ?", a: "open ouvre un fichier, read lit des octets, write ecrit des octets, close ferme le fichier." },
          { q: "Que fait la commande cat ?", a: "Elle affiche le contenu d'un fichier sur la sortie standard." },
        ],
      },
      course: {
        sections: [
          {
            heading: "Le cycle open -> read -> close",
            body: "#include <fcntl.h>   // open\n#include <unistd.h> // read, write, close\n\nint fd = open(\"file.txt\", O_RDONLY);\nif (fd == -1) return 84;\nchar buffer[256];\nint bytes_read = read(fd, buffer, 255);\nbuffer[bytes_read] = '\\0';\nwrite(1, buffer, bytes_read);  // 1 = stdout\nclose(fd);\n\nLe cycle :\n1. open() -> obtient un fd\n2. read(fd, buffer, size) -> lit size octets dans buffer\n3. write(1, buffer, size) -> ecrit sur stdout\n4. close(fd) -> ferme le fichier",
          },
          {
            heading: "read() en boucle (my_cat)",
            body: "Pour lire un fichier entier, il faut boucler sur read() jusqu'a ce qu'il retourne 0 (fin de fichier) :\n\nvoid my_cat(char *path)\n{\n    int fd = open(path, O_RDONLY);\n    if (fd == -1) return;\n    char buffer[256];\n    int bytes;\n    while ((bytes = read(fd, buffer, 255)) > 0) {\n        write(1, buffer, bytes);\n    }\n    close(fd);\n}\n\nread retourne le nombre d'octets lus. 0 = fin de fichier. -1 = erreur.",
          },
          {
            heading: "my_grep (chercher un motif)",
            body: "grep cherche une chaine dans chaque ligne d'un fichier. On lit ligne par ligne et on verifie si le motif est present :\n\nwhile (read_line(fd, line)) {\n    if (my_strstr(line, pattern) != NULL) {\n        write(1, line, my_strlen(line));\n    }\n}\n\nOn utilise my_strstr() du Jour 06 pour chercher le motif.",
          },
        ],
      },
      research: {
        resourceUrl: "https://man7.org/linux/man-pages/man2/open.2.html",
        mission: "Lis la page de manuel de open(2). Note : 1. Les parametres (path, flags, mode) 2. Les flags courants (O_RDONLY, O_WRONLY, O_RDWR, O_CREAT) 3. La valeur de retour (fd ou -1) 4. Les erreurs possibles",
        questions: [
          "Que signifie O_RDONLY ?",
          "Quelle est la difference entre open et fopen ?",
          "Que retourne read quand le fichier est fini ?",
          "Pourquoi fermer un fichier avec close() ?",
        ],
      },
      video: {
        searchQuery: "C programming file I/O open read write close tutorial",
        reflectionQuestions: [
          "Qu'est-ce qu'un file descriptor et pourquoi 0, 1, 2 sont speciaux ?",
          "Pourquoi read peut retourner moins d'octets que demande ?",
          "Comment gerer les erreurs de open ?",
        ],
      },
      practice: {
        exercises: [
          { id: "d12-ex1", title: "my_cat basique", description: "Affiche le contenu d'un fichier passe en parametre. Utilise open, read, write, close.", hint: "Boucle sur read jusqu'a 0. write(1, buffer, bytes) a chaque iteration." },
          { id: "d12-ex2", title: "my_cat avec gestion d'erreurs", description: "Ajoute la gestion : fichier introuvable -> write sur stderr (fd 2). Pas de parametre -> lire stdin (fd 0).", hint: "if (fd == -1) { write(2, error_msg, len); } Pour stdin, fd = 0." },
          { id: "d12-ex3", title: "my_grep", description: "Cherche un motif dans un fichier. ./my_grep motif fichier. Affiche les lignes qui contiennent le motif.", hint: "Lis ligne par ligne, utilise my_strstr pour chercher le motif." },
        ],
      },
      epitech: {
        rules: [
          "Verifier open : fd == -1 -> erreur. Toujours gerer.",
          "Verifier read : read peut retourner -1 en cas d'erreur.",
          "Pas de printf : utilise write() pour la sortie. La norme Epitech privilegie les appels systeme.",
          "Fermer les fichiers : chaque open doit avoir un close correspondant.",
          "Gerer le cas sans parametre : si argc < 2, lire sur stdin (fd 0).",
        ],
      },
      tasks: {
        intro: "Jour 12 : recreer cat et grep te fait comprendre comment fonctionnent vraiment les outils Unix.",
        tasks: [
          { id: "d12-t1", title: "my_cat", description: "Afficher un fichier avec open/read/write/close.", difficulty: "medium", estimatedTime: "1.5h", locked: false },
          { id: "d12-t2", title: "my_cat (erreurs + stdin)", description: "Gerer les erreurs et lire stdin si pas de fichier.", difficulty: "hard", estimatedTime: "2h", locked: true, lockedReason: "Apres my_cat basique" },
          { id: "d12-t3", title: "my_grep", description: "Chercher un motif dans un fichier.", difficulty: "hard", estimatedTime: "2-3h", locked: true, lockedReason: "Apres my_cat" },
        ],
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // DAY 13 — Graphisme : ouvrir une fenetre
  // ───────────────────────────────────────────────────────────────────
  {
    number: 13,
    title: "Graphisme : ouvrir une fenetre",
    concept: "CSFML, opening_a_window, display_an_image, evenements",
    description: "Dernier jour ! Tu vas decouvrir comment ouvrir une fenetre graphique et afficher une image en C avec la CSFML. C'est une introduction au monde de la programmation graphique.",
    sessions: [
      { id: "d13-warmup", type: "warmup", title: "Echauffement", duration: "09:00", completed: false },
      { id: "d13-course", type: "course", title: "Cours : CSFML", duration: "09:15", completed: false },
      { id: "d13-research", type: "research", title: "Recherche : CSFML docs", duration: "11:00", completed: false },
      { id: "d13-video", type: "video", title: "Video : CSFML", duration: "12:00", completed: false },
      { id: "d13-practice", type: "practice", title: "Pratique", duration: "14:00", completed: false },
      { id: "d13-epitech", type: "epitech", title: "Mode Epitech", duration: "16:00", completed: false },
      { id: "d13-task", type: "task", title: "Taches", duration: "17:00", completed: false },
      { id: "d13-review", type: "review", title: "Fin de journee", duration: "18:00", completed: false },
    ],
    objectives: [
      "Comprendre ce qu'est la CSFML et comment l'installer",
      "Ouvrir une fenetre graphique avec sfRenderWindow_create",
      "Afficher une image avec sfTexture et sfSprite",
      "Gerer la boucle d'evenements (fermeture de fenetre)",
      "Comprendre la notion de frame rate et de boucle de rendu",
    ],
    content: {
      warmup: {
        questions: [
          { q: "Qu'est-ce que la CSFML ?", a: "CSFML est la binding C de la SFML (Simple and Fast Multimedia Library), une bibliotheque pour creer des applications graphiques." },
          { q: "Qu'est-ce qu'une boucle d'evenements ?", a: "Une boucle qui ecoute en continu les actions de l'utilisateur (clic, touche, fermeture de fenetre) et y reagir." },
          { q: "Que fait un frame rate de 60 FPS ?", a: "La fenetre se rafraichit 60 fois par seconde, ce qui donne une animation fluide." },
        ],
      },
      course: {
        sections: [
          {
            heading: "Ouvrir une fenetre",
            body: "#include <SFML/Graphics.h>\n\nint main(void)\n{\n    sfVideoMode mode = {800, 600, 32};\n    sfRenderWindow *window = sfRenderWindow_create(mode, \"My Window\", sfClose, NULL);\n    \n    while (sfRenderWindow_isOpen(window)) {\n        sfEvent event;\n        while (sfRenderWindow_pollEvent(window, &event)) {\n            if (event.type == sfEvtClosed)\n                sfRenderWindow_close(window);\n        }\n        sfRenderWindow_clear(window, sfBlack);\n        sfRenderWindow_display(window);\n    }\n    sfRenderWindow_destroy(window);\n    return 0;\n}\n\nLa boucle principale : 1. Poll events 2. Clear 3. Draw 4. Display",
          },
          {
            heading: "Afficher une image",
            body: "sfTexture *texture = sfTexture_createFromFile(\"image.png\", NULL);\nsfSprite *sprite = sfSprite_create();\nsfSprite_setTexture(sprite, texture, sfTrue);\n\n// Dans la boucle :\nsfRenderWindow_drawSprite(window, sprite, NULL);\n\nUne image en SFML = une texture + un sprite.",
          },
          {
            heading: "Gerer les evenements",
            body: "while (sfRenderWindow_pollEvent(window, &event)) {\n    if (event.type == sfEvtClosed)\n        sfRenderWindow_close(window);\n    if (event.type == sfEvtKeyPressed) {\n        if (event.key.code == sfKeyEscape)\n            sfRenderWindow_close(window);\n    }\n    if (event.type == sfEvtMouseButtonPressed) {\n        // event.mouseButton.x, event.mouseButton.y\n    }\n}\n\nLes evenements : fermeture, clavier, souris, joystick...",
          },
        ],
      },
      research: {
        resourceUrl: "https://www.sfml-dev.org/documentation/2.6.0/",
        mission: "Parcours la documentation de la CSFML. Note : 1. Les modules disponibles (Graphics, Window, System, Audio, Network) 2. La creation d'une fenetre 3. La gestion des evenements 4. Comment compiler avec -lcsfml-graphics",
        questions: [
          "Comment compiler un programme qui utilise la CSFML ?",
          "Quelle est la difference entre sfTexture et sfSprite ?",
          "Comment gerer la fermeture de la fenetre ?",
          "Que fait sfRenderWindow_clear ?",
        ],
      },
      video: {
        searchQuery: "CSFML C programming window tutorial graphics",
        reflectionQuestions: [
          "Qu'est-ce qu'une boucle de rendu et pourquoi est-elle necessaire ?",
          "Comment la CSFML simplifie-t-elle la programmation graphique ?",
          "Quels evenements peux-tu gerer ?",
        ],
      },
      practice: {
        exercises: [
          { id: "d13-ex1", title: "opening_a_window", description: "Ouvre une fenetre 800x600 qui reste ouverte jusqu'a ce qu'on clique sur la croix. Compile avec : gcc file.c -lcsfml-graphics -lcsfml-window -lcsfml-system.", hint: "sfRenderWindow_create + boucle avec pollEvent + sfEvtClosed." },
          { id: "d13-ex2", title: "display_an_image", description: "Affiche une image dans la fenetre. Utilise sfTexture_createFromFile et sfSprite.", hint: "Charge la texture, cree le sprite, draw dans la boucle." },
        ],
      },
      epitech: {
        rules: [
          "Makefile : doit inclure les flags -lcsfml-graphics -lcsfml-window -lcsfml-system.",
          "Liberer la memoire : sfRenderWindow_destroy, sfTexture_destroy, sfSprite_destroy.",
          "Frame rate : utiliser sfRenderWindow_setFramerateLimit(window, 60).",
          "Erreur de chargement : verifier que sfTexture_createFromFile ne retourne pas NULL.",
        ],
      },
      tasks: {
        intro: "Jour 13 : dernier jour ! Tu decouvres le graphisme, une toute autre dimension de la programmation.",
        tasks: [
          { id: "d13-t1", title: "opening_a_window", description: "Ouvrir une fenetre qui se ferme correctement.", difficulty: "medium", estimatedTime: "1.5h", locked: false },
          { id: "d13-t2", title: "display_an_image", description: "Afficher une image dans la fenetre.", difficulty: "hard", estimatedTime: "2h", locked: true, lockedReason: "Apres opening_a_window" },
        ],
      },
    },
  },
];

// Helper for the curriculum paths page (preview)
export const CURRICULUM_PATHS: CurriculumPath[] = [
  { id: 'c', icon: '💻', title: 'C', description: 'Langage de base. La Piscine Epitech démarre ici.', estimatedDays: 7, prerequisites: [], status: 'available' },
  { id: 'unix', icon: '🐧', title: 'Unix / Linux', description: 'Maîtriser le terminal et le shell.', estimatedDays: 5, prerequisites: ['c'], status: 'available' },
  { id: 'git', icon: '🌿', title: 'Git', description: 'Versionner son code et collaborer.', estimatedDays: 3, prerequisites: ['unix'], status: 'available' },
  { id: 'algo', icon: '🧠', title: 'Algorithmes', description: 'Structures de données et complexité.', estimatedDays: 10, prerequisites: ['c'], status: 'locked' },
  { id: 'web', icon: '🌐', title: 'Web', description: 'HTML, CSS, JS, back-end.', estimatedDays: 14, prerequisites: ['algo'], status: 'locked' },
  { id: 'python', icon: '🐍', title: 'Python', description: 'Scripting, data, automation.', estimatedDays: 7, prerequisites: ['algo'], status: 'locked' },
  { id: 'data', icon: '📊', title: 'Data', description: 'Pandas, SQL, visualisation.', estimatedDays: 10, prerequisites: ['python'], status: 'locked' },
  { id: 'ai', icon: '🤖', title: 'IA', description: 'ML, deep learning, LLMs.', estimatedDays: 20, prerequisites: ['data'], status: 'locked' },
  { id: 'cyber', icon: '🔐', title: 'Cybersecurity', description: 'Sécurité offensive & défensive.', estimatedDays: 14, prerequisites: ['algo'], status: 'locked' },
];

export function getDayByNumber(n: number): FullDay | undefined {
  return CURRICULUM_DAYS.find((d) => d.number === n);
}

export const TOTAL_DAYS = CURRICULUM_DAYS.length;
