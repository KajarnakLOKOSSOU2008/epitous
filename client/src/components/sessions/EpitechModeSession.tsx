// ============================================================================
// EpiTous — EpitechModeSession
// 🏫 How to apply today's concept in the real Piscine environment.
// ============================================================================

import { useMemo, type ReactNode } from 'react';
import {
  School,
  Check,
  Terminal,
  FileCode2,
  GitBranch,
  CheckCheck,
  ListChecks,
} from 'lucide-react';
import type { DaySession, FullDay } from '../../types';

export interface EpitechModeSessionProps {
  session: DaySession;
  day: FullDay;
  completed: boolean;
  onValidate: () => void;
}

interface EpitechData {
  intro: string;
  rules: string[];
  example?: string;
  tips?: string[];
}

function getContent(session: DaySession, day: FullDay): EpitechData {
  const content = day.content?.epitech;
  if (content && typeof content === 'object') {
    return {
      intro: content.context ?? '',
      rules: content.rules ?? [],
      example: content.example,
    };
  }
  return defaultContent(day);
}

function defaultContent(day: FullDay): EpitechData {
  if (day.number <= 2) {
    return {
      intro: `À la Piscine Epitech, ton environnement de travail compte autant que ton code. Voici les règles d'or pour le terminal et l'organisation.`,
      rules: [
        'Crée un dossier par jour : `jour_03/`, `jour_04/`...',
        'Compile avec les flags -Wall -Wextra -Werror',
        'Un fichier = une fonction principale claire',
        'Git : un commit par exercice terminé',
        'Ne laisse jamais de warnings non corrigés',
        'Ne code pas en root',
        'N\'oublie pas le `return 0` à la fin du main',
      ],
      example: `jour_03/\n├── ex00/\n│   ├── main.c\n│   └── Makefile\n├── ex01/\n│   ├── main.c\n│   └── Makefile\n└── README.md`,
      tips: [
        'Fais un `git status` avant chaque commit',
        'Apprends les raccourcis de ton éditeur (Vim, VSCode)',
        'Un programme qui compile n\'est pas un programme correct : teste-le !',
      ],
    };
  }
  if (day.number <= 4) {
    return {
      intro: `Maintenant que tu écris du C, applique les règles de style Epitech. La norme est stricte : c'est une discipline professionnelle.`,
      rules: [
        'Indente avec 4 espaces (jamais de tabulations)',
        'Une fonction = maximum 25 lignes',
        'Pas plus de 80 colonnes par ligne',
        'Nomme tes variables en snake_case',
        'Une déclaration par ligne',
        'Pas de `for` ni `do/while` à la Piscine (uniquement `while`)',
        'Pas de `switch` (utilise des `if / else if`)',
        'Pas de commentaire dans le code (sauf le header du fichier)',
      ],
      example: `int main(void)\n{\n    int a;\n    int b;\n\n    a = 42;\n    b = a + 8;\n    return 0;\n}`,
      tips: [
        'Lis la norme Epitech en entier au moins une fois',
        'Utilise `git commit -m "ex00 done"` après chaque exercice',
        'Si tu bloques plus de 15 minutes, écris ton problème dans ton journal',
      ],
    };
  }
  if (day.number <= 6) {
    return {
      intro: `Avec les boucles et conditions, l'organisation de ton code devient cruciale. Voici comment garder un code lisible dans le contexte Piscine.`,
      rules: [
        'Une boucle = une responsabilité claire',
        'Vérifie TOUJOURS tes conditions de sortie',
        'Initialise tes compteurs explicitement',
        'Teste les cas limites (0, négatif, max int)',
        'Ne fais pas de boucles infinies',
        'Ne mélange pas logique et affichage dans la même fonction',
        'N\'oublie pas d\'incrémenter ton compteur',
      ],
      example: `int i;\n\ni = 0;\nwhile (i < 10) {\n    printf("%d\\n", i);\n    i = i + 1;\n}`,
      tips: [
        'Dessine ton algorithme sur papier avant de coder',
        'Utilise `printf` de débogage, puis retire-les avant le rendu',
      ],
    };
  }
  // Day 7+ (pointeurs et au-delà)
  return {
    intro: `Les pointeurs sont la notion qui fait ou défaite un étudiant Piscine. Voici comment les manier avec rigueur dans tes rendus.`,
    rules: [
      'Toujours initialiser un pointeur (NULL si pas d\'adresse)',
      'Toujours vérifier `if (p != NULL)` avant de déréférencer',
      'Passe les grosses structures par pointeur (pas par valeur)',
      'Documente qui est responsable de la libération (free)',
      'Ne déréférence jamais un pointeur non initialisé',
      'Ne retourne jamais l\'adresse d\'une variable locale',
      'Ne fais pas de `free` sur un pointeur déjà libéré',
    ],
    example: `void increment(int *n)\n{\n    *n = *n + 1;\n}\n\nint main(void)\n{\n    int x;\n\n    x = 5;\n    increment(&x);\n    /* x vaut maintenant 6 */\n    return 0;\n}`,
    tips: [
      'Si segfault, lance `gdb ./my_program` puis `run`',
      'Dessine la mémoire sur papier : cases, adresses, valeurs',
      'Le pointeur = l\'adresse. *p = la valeur à cette adresse',
    ],
  };
}

export default function EpitechModeSession({
  session,
  day,
  completed,
  onValidate,
}: EpitechModeSessionProps) {
  const content = useMemo(() => getContent(session, day), [session, day]);

  return (
    <div style={{ padding: '4px 2px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 12,
          marginBottom: 18,
        }}
      >
        <School size={20} style={{ color: 'var(--accent, #6366f1)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text, #e2e8f0)' }}>
            🏫 Appliquer « {day.concept} » dans ton environnement Piscine
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary, #9ca8a3)', marginTop: 2 }}>
            Les règles professionnelles Epitech, illustrées pour aujourd'hui.
          </div>
        </div>
      </div>

      {/* Intro */}
      {content.intro && (
        <div
          style={{
            marginBottom: 22,
            padding: '14px 16px',
            background: 'rgba(99, 102, 241, 0.06)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderLeft: '3px solid var(--accent, #6366f1)',
            borderRadius: 10,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: 'var(--text, #e2e8f0)',
              lineHeight: 1.65,
            }}
          >
            {content.intro}
          </p>
        </div>
      )}

      {/* Rules */}
      {content.rules.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <CheckCheck size={16} style={{ color: 'var(--accent-light, #818cf8)' }} />
            <h4
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--text, #e2e8f0)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Règles d'or
            </h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {content.rules.map((rule, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '10px 12px',
                  background: 'rgba(99, 102, 241, 0.06)',
                  borderRadius: 8,
                  border: '1px solid rgba(99, 102, 241, 0.18)',
                }}
              >
                <Check
                  size={15}
                  style={{ color: 'var(--accent, #6366f1)', flexShrink: 0, marginTop: 2 }}
                />
                <div
                  style={{ fontSize: 13, color: 'var(--text, #e2e8f0)', lineHeight: 1.55 }}
                >
                  {renderInline(rule)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Example code */}
      {content.example && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <FileCode2 size={16} style={{ color: 'var(--accent-light, #818cf8)' }} />
            <h4
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--text, #e2e8f0)',
              }}
            >
              Exemple
            </h4>
          </div>
          <div
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid var(--border, #1f2540)',
            }}
          >
            <div
              style={{
                padding: '8px 12px',
                background: 'rgba(99,102,241,0.08)',
                borderBottom: '1px solid var(--border, #1f2540)',
                fontSize: 11,
                color: 'var(--accent-light, #818cf8)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {content.example.startsWith('$') ||
              content.example.includes('/') ? (
                <Terminal size={13} />
              ) : (
                <FileCode2 size={13} />
              )}
              {content.example.startsWith('$') ? 'Terminal / Arborescence' : 'Code C'}
            </div>
            <pre
              style={{
                margin: 0,
                padding: 14,
                background: '#0a0e1a',
                color: '#7ee787',
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 12,
                lineHeight: 1.6,
                overflowX: 'auto',
              }}
            >
              <code>{content.example}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Tips (optional) */}
      {content.tips && content.tips.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <ListChecks size={16} style={{ color: 'var(--cyan, #22d3ee)' }} />
            <h4
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--text, #e2e8f0)',
              }}
            >
              Conseils pratiques
            </h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {content.tips.map((tip, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  padding: '10px 12px',
                  background: 'var(--bg-soft, #161b2e)',
                  border: '1px solid var(--border, #1f2540)',
                  borderRadius: 8,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(34,211,238,0.12)',
                    color: 'var(--cyan, #22d3ee)',
                    fontSize: 11,
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ fontSize: 13, color: 'var(--text-muted, #6b7180)', lineHeight: 1.5 }}>
                  {renderInline(tip)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation */}
      <button
        onClick={onValidate}
        disabled={completed}
        style={{
          width: '100%',
          padding: '12px 18px',
          background: completed ? 'rgba(34,197,94,0.12)' : 'var(--accent, #6366f1)',
          color: completed ? 'var(--green, #22c55e)' : '#fff',
          border: `1px solid ${
            completed ? 'var(--green, #22c55e)' : 'var(--accent, #6366f1)'
          }`,
          borderRadius: 10,
          fontWeight: 600,
          fontSize: 14,
          cursor: completed ? 'default' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Check size={16} />
        {completed ? 'Mode Epitech validé' : 'Valider le mode Epitech'}
      </button>
    </div>
  );
}

// Minimal markdown-ish inline renderer for backticks.
function renderInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /(`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <code
        key={key++}
        style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          padding: '1px 5px',
          background: 'var(--bg-soft, #161b2e)',
          border: '1px solid var(--border, #1f2540)',
          borderRadius: 4,
          fontSize: 12,
          color: 'var(--accent-light, #818cf8)',
        }}
      >
        {match[0].slice(1, -1)}
      </code>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}
