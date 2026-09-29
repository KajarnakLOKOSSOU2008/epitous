// EpiTous — End-of-day review analyzer
// Real keyword analysis based on regex. No fake random.

import type { ReviewAnalysis } from '../types';

// Concept registry: each concept has a set of keywords (lowercase)
// that, if mentioned, count as "understood". Some are weak markers
// (partial) if mentioned alone, strong if combined with others.
interface ConceptDef {
  name: string;
  keywords: string[];
  weakKeywords?: string[]; // mention alone = partial
}

const CONCEPTS: ConceptDef[] = [
  {
    name: 'ordinateur',
    keywords: ['ordinateur', 'cpu', 'mémoire', 'ram', 'disque', 'processeur'],
    weakKeywords: ['machine'],
  },
  {
    name: 'fichier / dossier',
    keywords: ['fichier', 'dossier', 'répertoire', 'chemin', 'path', 'arborescence'],
  },
  {
    name: 'terminal',
    keywords: ['terminal', 'shell', 'bash', 'ligne de commande', 'commande'],
  },
  {
    name: 'commandes Unix',
    keywords: ['ls', 'cd', 'pwd', 'mkdir', 'touch', 'cp', 'mv', 'rm', 'cat', 'man', 'echo'],
  },
  {
    name: 'compilation',
    keywords: ['compil', 'gcc', 'préprocessing', 'assemblage', 'linker', 'édition des liens', 'exécutable', 'binaire'],
    weakKeywords: ['traduire', 'traduction'],
  },
  {
    name: 'C de base',
    keywords: ['include', 'stdio', 'main', 'printf', 'return', 'void'],
  },
  {
    name: 'variables',
    keywords: ['variable', 'déclaration', 'affectation', 'int', 'char', 'float', 'double', 'type'],
  },
  {
    name: 'fonctions',
    keywords: ['fonction', 'paramètre', 'argument', 'prototype', 'appel', 'retour', 'return'],
  },
  {
    name: 'conditions',
    keywords: ['if', 'else', 'condition', 'comparaison', 'opérateur', '==', '!=', '&&', '||'],
  },
  {
    name: 'boucles',
    keywords: ['boucle', 'while', 'for', 'itération', 'break', 'continue', 'incrément'],
  },
  {
    name: 'pointeurs',
    keywords: ['pointeur', 'adresse', 'déréférenc', '&', 'NULL', 'mémoire', 'segfault'],
    weakKeywords: ['référence'],
  },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasKeyword(text: string, keyword: string): boolean {
  // Word-boundary for word-like tokens, simple includes for symbols
  if (/^[a-zà-ÿ]+$/i.test(keyword)) {
    const re = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'i');
    return re.test(text);
  }
  return text.includes(keyword);
}

export function analyzeReview(text: string, dayObjectives: string[] = []): ReviewAnalysis {
  const lower = text.toLowerCase();
  const understood: string[] = [];
  const partial: string[] = [];
  const toReview: string[] = [];

  for (const concept of CONCEPTS) {
    const strongHit = concept.keywords.some((k) => hasKeyword(lower, k.toLowerCase()));
    const weakHit = concept.weakKeywords?.some((k) => hasKeyword(lower, k.toLowerCase())) ?? false;

    if (strongHit) {
      understood.push(concept.name);
    } else if (weakHit) {
      partial.push(concept.name);
    } else {
      toReview.push(concept.name);
    }
  }

  // Cross-check with day objectives: if an objective mentions a concept
  // and the student doesn't mention it, flag for review.
  for (const obj of dayObjectives) {
    const objLower = obj.toLowerCase();
    const relatedConcept = CONCEPTS.find((c) =>
      c.keywords.some((k) => objLower.includes(k.toLowerCase())),
    );
    if (relatedConcept) {
      const isUnderstood = understood.includes(relatedConcept.name);
      const isPartial = partial.includes(relatedConcept.name);
      if (!isUnderstood && !isPartial && !toReview.includes(relatedConcept.name)) {
        toReview.push(`${relatedConcept.name} (objectif du jour)`);
      }
    }
  }

  return { understood, partial, toReview };
}

// Heuristic difficulty score for the day (0-100).
// Higher = more struggle signals found in the text.
export function struggleScore(text: string): number {
  const lower = text.toLowerCase();
  const signals = [
    'comprends pas',
    'comprend pas',
    'pas compris',
    'difficile',
    'compliqué',
    'perdu',
    'perdue',
    'flou',
    'bloqué',
    'bloque',
    'aide',
    'segfault',
    'erreur',
    'crash',
    'marche pas',
    'ça marche pas',
    'incompréhensible',
    'galère',
    'galere',
  ];
  let score = 0;
  for (const s of signals) {
    if (lower.includes(s)) score += 12;
  }
  return Math.min(100, score);
}
