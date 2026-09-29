// EpiTous — Error Lab: common C/Unix errors explained in French

import type { ErrorEntry } from '../types';

export const ERRORS: ErrorEntry[] = [
  {
    id: 'segfault',
    errorMessage: 'segmentation fault (core dumped)',
    category: 'segfault',
    meaning:
      "Ton programme a accédé à une zone mémoire à laquelle il n'avait pas le droit. Le système d'exploitation l'a tué pour protéger la mémoire.",
    causes: [
      "Déréférencer un pointeur NULL (int *p = NULL; *p = 42;)",
      "Déréférencer un pointeur non initialisé (contient une adresse au hasard)",
      "Accéder hors des bornes d'un tableau (tab[100] alors que tab a 10 cases)",
      "Libérer deux fois la même mémoire (double free)",
      "Écrire dans une chaîne de caractères en lecture seule (char *s = \"hi\"; s[0] = 'H';)",
    ],
    debugSteps: [
      "Compile avec -g pour garder les symboles : gcc -g main.c -o prog",
      "Lance gdb ./prog puis run. Quand ça crash, tape bt (backtrace).",
      "Identifie la ligne exacte du crash dans la backtrace.",
      "Vérifie chaque pointeur : est-il NULL ? Non initialisé ?",
      "Vérifie les bornes de tes boucles et tableaux.",
      "Si tu utilises malloc, vérifie que tu as testé le retour != NULL.",
    ],
    exampleFix:
      '// ❌ crash\nint *p = NULL;\n*p = 42;\n\n// ✅ corrigé\nint value = 0;\nint *p = &value;  // p pointe vers une vraie case\n*p = 42;          // OK',
  },
  {
    id: 'undefined-main',
    errorMessage: "undefined reference to `main`",
    category: 'linker',
    meaning:
      "Le linker ne trouve pas la fonction main. C'est le point d'entrée obligatoire de tout programme C.",
    causes: [
      "Tu as oublié d'écrire la fonction main dans ton fichier .c",
      "Tu as mal orthographié main (Main, MAIN, mian...)",
      "La signature de main est incorrecte (mauvais type de retour)",
      "Tu compiles seulement un fichier utilitaire sans main, sans le lier au fichier qui a main",
    ],
    debugSteps: [
      "Vérifie que tu as bien int main(void) { ... } quelque part.",
      "Vérifie l'orthographe : main, tout en minuscules.",
      "Si tu as plusieurs fichiers, vérifie que gcc les inclut tous : gcc main.c utils.c -o prog",
      "Vérifie que main est au niveau global, pas dans une autre fonction.",
    ],
    exampleFix:
      '// ❌ erreur : pas de main\n#include <stdio.h>\nvoid hello(void) { printf("hi\\n"); }\n\n// ✅ corrigé\n#include <stdio.h>\nvoid hello(void) { printf("hi\\n"); }\n\nint main(void)\n{\n    hello();\n    return 0;\n}',
  },
  {
    id: 'implicit-declaration',
    errorMessage: "implicit declaration of function 'X'",
    category: 'warning',
    meaning:
      "Tu appelles une fonction que le compilateur ne connaît pas (pas de prototype, pas de #include). Il suppose qu'elle renvoie un int, ce qui est souvent faux.",
    causes: [
      "Tu as oublié #include <stdio.h> avant d'utiliser printf",
      "Tu appelles une fonction définie plus bas dans le fichier, sans prototype",
      "Tu as mal orthographié le nom de la fonction",
      "Tu utilises une fonction d'un autre fichier sans inclure son header",
    ],
    debugSteps: [
      "Vérifie les #include en haut du fichier.",
      "Si la fonction est dans le même fichier, ajoute son prototype au-dessus de main.",
      "Si la fonction est dans un autre fichier, crée un .h et inclus-le.",
      "Vérifie l'orthographe du nom de fonction.",
    ],
    exampleFix:
      '// ❌ warning\nint main(void)\n{\n    say_hello();  // prototype manquant\n    return 0;\n}\nvoid say_hello(void) { printf("hi\\n"); }\n\n// ✅ corrigé\nvoid say_hello(void);  // prototype\n\nint main(void)\n{\n    say_hello();\n    return 0;\n}\nvoid say_hello(void) { printf("hi\\n"); }',
  },
  {
    id: 'expected-semicolon',
    errorMessage: "expected ';' before '}' token",
    category: 'compilation',
    meaning:
      "Le compilateur attendait un point-virgule à la fin d'une instruction, et a trouvé une accolade fermante à la place. Tu as oublié un ; quelque part.",
    causes: [
      "Tu as oublié un ; à la fin d'une instruction",
      "Tu as oublié un ; après un return",
      "Tu as coupé une instruction en deux lignes par erreur",
    ],
    debugSteps: [
      "Regarde la ligne indiquée par le compilateur, parfois la vraie erreur est juste avant.",
      "Vérifie chaque fin d'instruction : printf(...); return 0; etc.",
      "Compte les ; au-dessus de l'erreur.",
    ],
    exampleFix:
      '// ❌ erreur\nint main(void)\n{\n    printf("hi\\n")\n    return 0;\n}\n\n// ✅ corrigé\nint main(void)\n{\n    printf("hi\\n");   // ; ajouté\n    return 0;\n}',
  },
  {
    id: 'incompatible-pointer',
    errorMessage: 'warning: incompatible pointer type',
    category: 'warning',
    meaning:
      "Tu passes un pointeur d'un type à une fonction qui attend un pointeur d'un autre type. Le programme peut compiler mais le comportement sera indéfini.",
    causes: [
      "Tu passes un int* à une fonction qui attend un char*",
      "Tu castes incorrectement un pointeur",
      "Tu as oublié de caster un void*",
    ],
    debugSteps: [
      "Vérifie la signature de la fonction : quel type de pointeur attend-elle ?",
      "Vérifie le type de la variable que tu passes.",
      "Si tu sais ce que tu fais, caste explicitement : (char *)p",
      "Sinon, corrige le type à la source.",
    ],
    exampleFix:
      '// ❌ warning\nvoid print_char(char *s) { printf("%c\\n", s[0]); }\nint n = 65;\nprint_char(&n);  // &n est int*\n\n// ✅ corrigé\nchar c = \'A\';\nprint_char(&c);  // &c est char*',
  },
  {
    id: 'no-such-file',
    errorMessage: 'no such file or directory',
    category: 'runtime',
    meaning:
      "Le système ne trouve pas le fichier ou le dossier que tu essaies d'utiliser. Soit il n'existe pas, soit tu te trompes de chemin.",
    causes: [
      "Mauvais chemin (absolu vs relatif)",
      "Tu n'es pas dans le bon répertoire courant",
      "Le fichier n'existe pas encore (oubli de le créer)",
      "Faute de frappe dans le nom",
    ],
    debugSteps: [
      "Tape pwd pour savoir où tu es.",
      "Tape ls pour voir ce qui existe vraiment dans le dossier.",
      "Vérifie l'orthographe : Linux est sensible à la casse (Hello ≠ hello).",
      "Utilise un chemin absolu si tu doutes.",
    ],
    exampleFix:
      '// ❌ erreur\n$ cd Day01\ncd: no such file or directory: Day01\n\n// ✅ corrigé\n$ ls\nday01  day02\n$ cd day01   // bonne casse',
  },
  {
    id: 'permission-denied',
    errorMessage: 'permission denied',
    category: 'runtime',
    meaning:
      "Tu n'as pas les droits nécessaires pour lire/écrire/exécuter ce fichier. Linux protège les fichiers par un système de permissions.",
    causes: [
      "Tu essaies d'exécuter un fichier qui n'a pas le droit d'exécution (chmod)",
      "Tu essaies d'écrire dans un fichier en lecture seule",
      "Tu essaies d'accéder à un dossier d'un autre utilisateur",
    ],
    debugSteps: [
      "Tape ls -l fichier pour voir ses permissions (r = read, w = write, x = execute).",
      "Si tu veux exécuter : chmod +x fichier",
      "Si tu veux écrire : chmod +w fichier",
      "Si ce n'est pas ton fichier, demande à son propriétaire ou utilise sudo (prudence).",
    ],
    exampleFix:
      '$ ./prog\nbash: ./prog: Permission denied\n\n$ ls -l prog\n-rw-r--r-- 1 user user 1234 prog   // pas de x\n\n$ chmod +x prog\n$ ./prog   // OK',
  },
  {
    id: 'command-not-found',
    errorMessage: 'command not found',
    category: 'runtime',
    meaning:
      "Le shell ne trouve pas la commande que tu viens de taper. Soit elle n'existe pas, soit elle n'est pas installée, soit elle n'est pas dans ton PATH.",
    causes: [
      "Faute de frappe dans le nom de la commande",
      "Le programme n'est pas installé",
      "Le programme est installé mais pas dans le PATH",
      "Tu essaies d'exécuter un programme du dossier courant sans ./",
    ],
    debugSteps: [
      "Vérifie l'orthographe (Linux est sensible à la casse).",
      "Pour exécuter un fichier du dossier courant : ./programme (pas juste programme).",
      "Vérifie si le programme est installé : which gcc, which python3.",
      "Sinon, installe-le avec le gestionnaire de paquets (apt, brew, etc.).",
    ],
    exampleFix:
      '$ prog\nbash: prog: command not found\n\n// ✅ si prog est dans le dossier courant :\n$ ./prog\n\n// ✅ pour installer un programme manquant :\n$ sudo apt install gcc',
  },
  {
    id: 'no-rule-make-target',
    errorMessage: "make: *** No rule to make target 'X'.  Stop.",
    category: 'runtime',
    meaning:
      "L'outil make ne trouve pas de règle pour fabriquer la cible que tu as demandée. Soit tu as mal orthographié la cible, soit ton Makefile est incomplet.",
    causes: [
      "Mauvais orthographe de la cible (make clean vs make claen)",
      "La cible n'est pas définie dans le Makefile",
      "Le Makefile est vide ou mal écrit",
      "Tu appelles make depuis le mauvais répertoire",
    ],
    debugSteps: [
      "Vérifie que tu es dans le bon dossier (celui qui contient le Makefile).",
      "Ouvre le Makefile et liste les cibles disponibles (all, clean, fclean, re...).",
      "Vérifie l'orthographe de la cible.",
      "Pour voir les cibles : make -p | grep -v '^#'",
    ],
    exampleFix:
      "$ make fclena\nmake: *** No rule to make target 'fclena'.  Stop.\n\n// ✅ bonne orthographe :\n$ make fclean",
  },
  {
    id: 'expected-expression',
    errorMessage: "error: expected expression before '}' token",
    category: 'compilation',
    meaning:
      "Le compilateur attendait une expression à un endroit où il a trouvé une accolade fermante. Souvent dû à une syntaxe incomplète ou un caractère en trop.",
    causes: [
      "Tu as oublié une expression dans une condition (if () avec rien)",
      "Tu as un point-virgule manquant avant l'accolade",
      "Tu as coupé une instruction en plein milieu",
      "Tu as mis un ; juste après un if (if (a) ; { ... })",
    ],
    debugSteps: [
      "Regarde la ligne indiquée et la précédente.",
      "Vérifie que chaque if, while, for a une condition valide entre ().",
      "Vérifie que chaque instruction se termine par ;.",
      "Compte les accolades : { et } doivent s'équilibrer.",
    ],
    exampleFix:
      '// ❌ erreur\nif (a > 0)\n{\n}\nelse\n{\n}\n\nif ()   // erreur : condition vide\n{\n}\n\n// ✅ corrigé\nif (a > 0) {\n    // ...\n} else {\n    // ...\n}\n\nif (a > 0)  // condition valide\n{\n}',
  },
  {
    id: 'redefinition-of-main',
    errorMessage: 'redefinition of `main`',
    category: 'compilation',
    meaning:
      "Tu as défini la fonction main deux fois dans ton projet. Un programme C ne peut avoir qu'une seule fonction main.",
    causes: [
      "Tu as collé main() deux fois dans le même fichier",
      "Tu compiles deux fichiers qui ont chacun un main",
      "Tu as inclus un .c au lieu d'un .h (erreur classique)",
    ],
    debugSteps: [
      "Cherche toutes les occurrences de 'int main' dans ton projet : grep -rn 'int main' .",
      "Garde uniquement un main, supprime ou renomme les autres.",
      "Vérifie que tu n'as jamais #include \"fichier.c\" — on n'inclus que des .h.",
    ],
    exampleFix:
      '// ❌ erreur : main défini deux fois\n// main.c\nint main(void) { return 0; }\n\n// utils.c\nint main(void) { return 0; }  // ❌\n\n// ✅ corrigé : un seul main\n// main.c\nint main(void) { return 0; }\n\n// utils.c (pas de main)\nint add(int a, int b) { return a + b; }',
  },
  {
    id: 'unused-variable',
    errorMessage: "error: unused variable 'X' [-Werror=unused-variable]",
    category: 'warning',
    meaning:
      "Tu as déclaré une variable que tu n'utilises jamais. À Epitech, -Werror transforme ce warning en erreur, et la compilation échoue.",
    causes: [
      "Tu as déclaré une variable et oublié de l'utiliser",
      "Tu as déclaré deux variables similaires et confondues",
      "Tu as gardé une variable de debug que tu n'utilises plus",
    ],
    debugSteps: [
      "Cherche la variable indiquée par le compilateur.",
      "Si tu n'en as pas besoin, supprime la déclaration.",
      "Si tu en as besoin, utilise-la !",
      "Si c'est volontaire (debug), tu peux la marquer (void)x; pour ignorer.",
    ],
    exampleFix:
      '// ❌ erreur\nint main(void)\n{\n    int unused = 42;  // ❌ jamais utilisée\n    return 0;\n}\n\n// ✅ corrigé : supprimée\nint main(void)\n{\n    return 0;\n}\n\n// ✅ ou utilisée\nint main(void)\n{\n    int x = 42;\n    printf("%d\\n", x);  // utilisée\n    return 0;\n}',
  },
];

export const ERROR_CATEGORIES: { id: ErrorEntry['category']; label: string; icon: string; color: string }[] = [
  { id: 'compilation', label: 'Compilation', icon: '🔧', color: '#f59e0b' },
  { id: 'segfault', label: 'Segfault', icon: '💥', color: '#ef4444' },
  { id: 'linker', label: 'Linker', icon: '🔗', color: '#8b5cf6' },
  { id: 'runtime', label: 'Exécution', icon: '▶️', color: '#3b82f6' },
  { id: 'warning', label: 'Warnings', icon: '⚠️', color: '#eab308' },
];

export function searchErrors(query: string): ErrorEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return ERRORS;
  return ERRORS.filter(
    (e) =>
      e.errorMessage.toLowerCase().includes(q) ||
      e.meaning.toLowerCase().includes(q) ||
      e.causes.some((c) => c.toLowerCase().includes(q)) ||
      e.debugSteps.some((d) => d.toLowerCase().includes(q)),
  );
}
