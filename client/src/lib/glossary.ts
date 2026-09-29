// EpiTous — Glossary of programming terms (Francophone)
// Categories: c | unix | git | general

import type { GlossaryTerm } from '../types';

export const GLOSSARY: GlossaryTerm[] = [
  // ─── C language ─────────────────────────────────────────────
  {
    id: 'variable',
    term: 'Variable',
    category: 'c',
    definition:
      "Nom donné à une case mémoire pour stocker une valeur. Le type de la variable indique quelle sorte de donnée on y range (int, char, float...).",
    example: 'int age = 21;  // age est une variable de type int',
    relatedTerms: ['type', 'affectation', 'pointeur'],
    relatedDay: 4,
  },
  {
    id: 'pointeur',
    term: 'Pointeur',
    category: 'c',
    definition:
      "Variable qui stocke l'adresse mémoire d'une autre variable. Déclaré avec `*`. On déréférence avec `*` pour accéder à la valeur pointée.",
    example: 'int a = 10;\nint *p = &a;  // p pointe vers a\n*p = 20;       // modifie a',
    relatedTerms: ['variable', 'adresse', 'null', 'dereferencer'],
    relatedDay: 7,
  },
  {
    id: 'compilation',
    term: 'Compilation',
    category: 'c',
    definition:
      "Action de traduire un fichier source (texte) en fichier exécutable (binaire) grâce à un compilateur comme gcc. 4 étapes : préprocessing, compilation, assemblage, édition des liens.",
    example: 'gcc main.c -o prog   // compile main.c en exécutable prog',
    relatedTerms: ['source', 'executable', 'gcc', 'linker'],
    relatedDay: 3,
  },
  {
    id: 'executable',
    term: 'Exécutable',
    category: 'c',
    definition:
      "Fichier binaire produit par la compilation, que le système d'exploitation peut lancer directement.",
    example: './hello   // lance l’exécutable hello',
    relatedTerms: ['compilation', 'source', 'gcc'],
    relatedDay: 3,
  },
  {
    id: 'fonction',
    term: 'Fonction',
    category: 'c',
    definition:
      "Bloc de code nommé, qui prend des paramètres en entrée, fait un travail, et renvoie un résultat. Unité d’organisation du code.",
    example: 'int add(int a, int b) { return a + b; }',
    relatedTerms: ['parametre', 'return', 'void', 'prototype'],
    relatedDay: 5,
  },
  {
    id: 'parametre',
    term: 'Paramètre',
    category: 'c',
    definition:
      "Variable déclarée dans la signature d'une fonction, qui recevra la valeur passée à l'appel (l'argument).",
    example: 'int add(int a, int b)  // a et b sont les paramètres',
    relatedTerms: ['fonction', 'argument'],
    relatedDay: 5,
  },
  {
    id: 'return',
    term: 'Valeur de retour',
    category: 'c',
    definition:
      "Valeur qu'une fonction renvoie à son appelant via le mot-clé `return`. Le type de retour est déclaré dans la signature.",
    example: 'int square(int x) { return x * x; }',
    relatedTerms: ['fonction', 'void'],
    relatedDay: 5,
  },
  {
    id: 'void',
    term: 'void',
    category: 'c',
    definition:
      "Type spécial signifiant « rien ». En type de retour, indique que la fonction ne renvoie rien. En paramètre (`void`), indique qu'elle n'en prend aucun.",
    example: 'void say_hello(void) { printf("hello\\n"); }',
    relatedTerms: ['fonction', 'return'],
    relatedDay: 5,
  },
  {
    id: 'int',
    term: 'int',
    category: 'c',
    definition:
      "Type pour stocker un entier signé. Souvent 32 bits (de -2 147 483 648 à 2 147 483 647). `unsigned int` ne stocke que des positifs.",
    example: 'int age = 21;\nunsigned int distance = 1000;',
    relatedTerms: ['variable', 'char', 'float', 'double'],
    relatedDay: 4,
  },
  {
    id: 'char',
    term: 'char',
    category: 'c',
    definition:
      "Type pour stocker un caractère (8 bits). Peut représenter une lettre comme 'a' ou un petit entier (0-255).",
    example: "char grade = 'A';\nprintf(\"%c\\n\", grade);",
    relatedTerms: ['variable', 'int', 'float'],
    relatedDay: 4,
  },
  {
    id: 'float',
    term: 'float',
    category: 'c',
    definition:
      "Type pour stocker un nombre décimal en simple précision (32 bits). Utilisé pour les calculs approchés. Le suffixe `f` est souvent nécessaire : `3.14f`.",
    example: 'float pi = 3.14f;\nprintf("%.2f\\n", pi);',
    relatedTerms: ['variable', 'double', 'int'],
    relatedDay: 4,
  },
  {
    id: 'double',
    term: 'double',
    category: 'c',
    definition:
      "Type pour stocker un nombre décimal en double précision (64 bits). Plus précis que `float`, mais occupe plus de mémoire.",
    example: 'double e = 2.718281828;',
    relatedTerms: ['variable', 'float', 'int'],
    relatedDay: 4,
  },
  {
    id: 'if',
    term: 'if',
    category: 'c',
    definition:
      "Mot-clé permettant d'exécuter un bloc de code seulement si une condition est vraie. Peut être suivi de `else if` et `else`.",
    example: 'if (age >= 18) printf("majeur\\n");',
    relatedTerms: ['else', 'while', 'for'],
    relatedDay: 6,
  },
  {
    id: 'else',
    term: 'else',
    category: 'c',
    definition:
      "Mot-clé exécutant un bloc si la condition du `if` précédent est fausse.",
    example: 'if (age >= 18) printf("ok");\nelse printf("mineur");',
    relatedTerms: ['if'],
    relatedDay: 6,
  },
  {
    id: 'while',
    term: 'while',
    category: 'c',
    definition:
      "Boucle qui répète un bloc tant qu'une condition est vraie. Vérifie la condition AVANT chaque itération.",
    example: 'int i = 0;\nwhile (i < 5) { printf("%d", i); i++; }',
    relatedTerms: ['for', 'break', 'continue'],
    relatedDay: 6,
  },
  {
    id: 'for',
    term: 'for',
    category: 'c',
    definition:
      "Boucle regroupant initialisation, condition, incrément. Idéale quand le nombre d'itérations est connu.",
    example: 'for (int i = 0; i < 10; i++) printf("%d\\n", i);',
    relatedTerms: ['while', 'break', 'continue'],
    relatedDay: 6,
  },
  {
    id: 'break',
    term: 'break',
    category: 'c',
    definition:
      "Mot-clé qui sort immédiatement d'une boucle (while, for, do-while) ou d'un switch.",
    example: 'for (int i = 0; ; i++) {\n  if (i == 5) break;\n}',
    relatedTerms: ['continue', 'while', 'for'],
    relatedDay: 6,
  },
  {
    id: 'continue',
    term: 'continue',
    category: 'c',
    definition:
      "Mot-clé qui passe à l'itération suivante d'une boucle, sans exécuter le reste du bloc courant.",
    example: 'for (int i = 0; i < 10; i++) {\n  if (i % 2 == 0) continue;\n  printf("%d", i);  // 1, 3, 5, 7, 9\n}',
    relatedTerms: ['break', 'while', 'for'],
    relatedDay: 6,
  },
  {
    id: 'null',
    term: 'NULL',
    category: 'c',
    definition:
      "Constante représentant un pointeur vide (qui ne pointe vers rien). Déférencer NULL provoque un segfault. Toujours vérifier `if (p != NULL)` avant de déférencer.",
    example: 'int *p = NULL;\nif (p != NULL) printf("%d", *p);',
    relatedTerms: ['pointeur', 'segfault', 'dereferencer'],
    relatedDay: 7,
  },
  {
    id: 'segfault',
    term: 'Segfault',
    category: 'c',
    definition:
      "Erreur d'exécution (segmentation fault) qui survient quand un programme accède à une zone mémoire interdite (pointeur NULL, hors limites, libérée).",
    example: 'int *p = NULL;\n*p = 42;   // 💥 segfault',
    relatedTerms: ['pointeur', 'null', 'runtime'],
    relatedDay: 7,
  },
  {
    id: 'linker',
    term: 'Linker',
    category: 'c',
    definition:
      "Programme (ld, appelé par gcc) qui relie les fichiers objets (.o) et les bibliothèques pour produire l'exécutable final. C'est l'étape 4 de la compilation.",
    example: 'gcc main.o utils.o -o prog   // linkage manuel',
    relatedTerms: ['compilation', 'executable', 'gcc', 'header'],
    relatedDay: 3,
  },
  {
    id: 'header',
    term: 'Header (.h)',
    category: 'c',
    definition:
      "Fichier contenant les déclarations (prototypes de fonctions, types, macros) partagées entre plusieurs fichiers .c. Inclus avec `#include`.",
    example: '// utils.h\nint add(int a, int b);\n\n// main.c\n#include "utils.h"',
    relatedTerms: ['include', 'prototype', 'linker'],
    relatedDay: 5,
  },
  {
    id: 'include',
    term: '#include',
    category: 'c',
    definition:
      "Directive du préprocesseur qui colle le contenu d'un fichier header dans ton fichier source. `<...>` pour les headers système, `\"...\"` pour les headers locaux.",
    example: '#include <stdio.h>     // système\n#include "utils.h"     // local',
    relatedTerms: ['header', 'compilation', 'prototype'],
    relatedDay: 3,
  },
  {
    id: 'main',
    term: 'main',
    category: 'c',
    definition:
      "Fonction principale, point d'entrée du programme. C'est là que l'exécution commence. Doit renvoyer un int (0 = succès).",
    example: 'int main(void) {\n  printf("hello\\n");\n  return 0;\n}',
    relatedTerms: ['fonction', 'return', 'argc', 'argv'],
    relatedDay: 3,
  },
  {
    id: 'printf',
    term: 'printf',
    category: 'c',
    definition:
      "Fonction de la bibliothèque stdio.h qui affiche du texte formaté. Utilise des spécificateurs : %d (int), %c (char), %f (float), %s (string), %p (pointeur).",
    example: 'printf("Age: %d\\n", 21);',
    relatedTerms: ['include', 'fonction'],
    relatedDay: 3,
  },
  {
    id: 'argc',
    term: 'argc',
    category: 'c',
    definition:
      "Argument Count : entier donné à main, qui contient le nombre d'arguments passés au programme (y compris le nom du programme).",
    example: 'int main(int argc, char **argv) {\n  printf("argc: %d\\n", argc);\n}',
    relatedTerms: ['argv', 'main'],
  },
  {
    id: 'argv',
    term: 'argv',
    category: 'c',
    definition:
      "Argument Vector : tableau de chaînes de caractères contenant les arguments passés au programme. argv[0] est le nom du programme.",
    example: 'int main(int argc, char **argv) {\n  printf("argv[1]: %s\\n", argv[1]);\n}',
    relatedTerms: ['argc', 'main'],
  },
  {
    id: 'makefile',
    term: 'Makefile',
    category: 'c',
    definition:
      "Fichier lu par l'outil `make` qui décrit comment compiler un projet : cibles, dépendances, recettes. Indispensable en C pour gérer plusieurs fichiers.",
    example: 'all: prog\n\nprog: main.c utils.c\n\tgcc -Wall main.c utils.c -o prog',
    relatedTerms: ['compilation', 'gcc'],
  },

  // ─── Unix / terminal ────────────────────────────────────────
  {
    id: 'terminal',
    term: 'Terminal',
    category: 'unix',
    definition:
      "Interface en ligne de commande où l'on tape des commandes texte. Outil principal du développeur sous Linux.",
    example: '$ ls\n$ cd Documents',
    relatedTerms: ['shell', 'commande'],
    relatedDay: 1,
  },
  {
    id: 'shell',
    term: 'Shell',
    category: 'unix',
    definition:
      "Programme qui interprète les commandes tapées dans le terminal. Bash est le plus courant sous Linux.",
    example: '$ echo $SHELL\n/bin/bash',
    relatedTerms: ['terminal', 'bash'],
  },
  {
    id: 'fichier',
    term: 'Fichier',
    category: 'unix',
    definition:
      "Unité de stockage de données sur disque. Identifié par un nom et une extension (mais l'extension n'est qu'une convention sous Unix).",
    example: 'hello.c  notes.txt  README.md',
    relatedTerms: ['repertoire', 'chemin'],
    relatedDay: 1,
  },
  {
    id: 'repertoire',
    term: 'Répertoire (dossier)',
    category: 'unix',
    definition:
      "Conteneur qui peut contenir des fichiers et d'autres répertoires. Organisation arborescente à partir de la racine `/`.",
    example: '/home/epitous/day01/',
    relatedTerms: ['fichier', 'chemin'],
    relatedDay: 1,
  },
  {
    id: 'chemin',
    term: 'Chemin (path)',
    category: 'unix',
    definition:
      "Suite de répertoires menant à un fichier. Absolu (depuis `/`) ou relatif (depuis le dossier courant).",
    example: 'absolu : /home/epitous/hello.c\nrelatif : ../day01/hello.c',
    relatedTerms: ['fichier', 'repertoire', 'pwd'],
    relatedDay: 1,
  },
  {
    id: 'pwd',
    term: 'pwd',
    category: 'unix',
    definition:
      "Commande qui affiche le chemin absolu du répertoire courant (Print Working Directory).",
    example: '$ pwd\n/home/epitous/day01',
    relatedTerms: ['chemin', 'repertoire', 'cd'],
    relatedDay: 2,
  },

  // ─── Git ────────────────────────────────────────────────────
  {
    id: 'git',
    term: 'Git',
    category: 'git',
    definition:
      "Système de contrôle de versions distribué. Permet de suivre l'historique d'un projet, de revenir en arrière, de collaborer.",
    example: 'git init\ngit add .\ngit commit -m "premier commit"',
    relatedTerms: ['commit', 'branche', 'depot'],
  },
  {
    id: 'commit',
    term: 'Commit',
    category: 'git',
    definition:
      "Instantané (snapshot) du projet à un instant donné, accompagné d'un message descriptif. C'est l'unité d'historique de Git.",
    example: 'git commit -m "ajout de la fonction add"',
    relatedTerms: ['git', 'branche'],
  },
  {
    id: 'branche',
    term: 'Branche',
    category: 'git',
    definition:
      "Ligne de développement parallèle. Permet de travailler sur une fonctionnalité sans impacter la branche principale (main).",
    example: 'git branch feature-x\ngit checkout feature-x',
    relatedTerms: ['git', 'commit'],
  },
  {
    id: 'depot',
    term: 'Dépôt (repository)',
    category: 'git',
    definition:
      "Espace où Git stocke l'historique d'un projet. Local (`.git/`) ou distant (GitHub, GitLab).",
    example: 'git clone https://github.com/user/repo.git',
    relatedTerms: ['git', 'commit', 'branche'],
  },

  // ─── General ────────────────────────────────────────────────
  {
    id: 'source',
    term: 'Code source',
    category: 'general',
    definition:
      "Fichier texte écrit dans un langage de programmation. Lisible par un humain, mais pas exécutable directement par la machine.",
    example: '// hello.c\nint main(void) { return 0; }',
    relatedTerms: ['compilation', 'executable'],
    relatedDay: 1,
  },
  {
    id: 'gcc',
    term: 'gcc',
    category: 'general',
    definition:
      "Compilateur C standard (GNU Compiler Collection). Transforme un .c en exécutable. La référence à Epitech.",
    example: 'gcc -Wall -Wextra -Werror main.c -o prog',
    relatedTerms: ['compilation', 'executable', 'source'],
    relatedDay: 3,
  },
  {
    id: 'ide',
    term: 'IDE',
    category: 'general',
    definition:
      "Integrated Development Environment. Éditeur de code avec outils intégrés (compilation, debug, autocomplete). Ex : VS Code, CLion.",
    example: 'VS Code est un éditeur léger souvent considéré comme IDE.',
    relatedTerms: ['source', 'gcc'],
  },
];

export const GLOSSARY_CATEGORIES: { id: 'c' | 'unix' | 'git' | 'general'; label: string; icon: string }[] = [
  { id: 'c', label: 'Langage C', icon: '💻' },
  { id: 'unix', label: 'Unix / Terminal', icon: '🐧' },
  { id: 'git', label: 'Git', icon: '🌿' },
  { id: 'general', label: 'Général', icon: '📚' },
];

export function searchGlossary(query: string): GlossaryTerm[] {
  const q = query.trim().toLowerCase();
  if (!q) return GLOSSARY;
  return GLOSSARY.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.example.toLowerCase().includes(q),
  );
}
