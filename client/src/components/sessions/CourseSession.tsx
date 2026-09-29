// ============================================================================
// EpiTous — CourseSession
// 📖 Progressive course content: sections, code examples, key takeaways.
// ============================================================================

import { useMemo, useState, type ReactNode } from 'react';
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Check,
  Lightbulb,
  Terminal,
  Code2,
  Target,
} from 'lucide-react';
import type { DaySession, FullDay } from '../../types';

export interface CourseSessionProps {
  session: DaySession;
  day: FullDay;
  completed: boolean;
  onValidate: () => void;
}

interface CourseSection {
  title: string;
  content: string;
  codeExample?: string;
  illustration?: string;
  takeaway?: string;
}

// Read sections from day.content.course (provided by curriculum), else build defaults.
function getSections(session: DaySession, day: FullDay): { intro: string; sections: CourseSection[] } {
  const content = day.content?.course;
  if (content?.sections && Array.isArray(content.sections) && content.sections.length > 0) {
    return {
      intro: content.intro ?? '',
      sections: content.sections.map((s, i) => ({
        title: s.heading,
        content: s.body,
        codeExample: s.code,
        illustration: s.illustration,
        takeaway: content.keyTakeaways?.[i],
      })),
    };
  }
  return { intro: '', sections: defaultSectionsFor(day) };
}

// Build sensible default course content based on day's concept & objectives.
function defaultSectionsFor(day: FullDay): CourseSection[] {
  const objectives = day.objectives ?? [];
  return [
    {
      title: `Introduction à ${day.concept}`,
      content: `Bienvenue dans cette session de cours. Aujourd'hui nous abordons **${day.concept}** — la notion centrale du jour ${day.number}. L'objectif est de comprendre ce concept, pourquoi il existe, et comment l'utiliser dans un vrai programme C.`,
      takeaway: `Avant d'écrire la moindre ligne de code, sois capable de dire en une phrase à quoi sert « ${day.concept} ».`,
    },
    {
      title: `Pourquoi « ${day.concept} » existe ?`,
      content: `En programmation C, chaque notion répond à un problème concret. « ${day.concept} » est né de la nécessité de ${
        day.number <= 2
          ? 'manipuler efficacement ton système via la ligne de commande'
          : day.number <= 4
            ? 'représenter et manipuler des données en mémoire'
            : day.number <= 6
              ? 'organiser le flux d\'exécution d\'un programme'
              : 'contrôler directement la mémoire de ton programme'
      }. Comprendre le problème t'évite d'apprendre la syntaxe par cœur.`,
      codeExample:
        day.number <= 2
          ? `$ pwd\n/home/student\n$ ls -la\ntotal 8\ndrwxr-xr-x  .\ndrwxr-xr-x  ..\n$ mkdir piscine && cd piscine`
          : `#include <stdio.h>\n\nint main(void)\n{\n    /* Exemple minimal */\n    printf("Bonjour EpiTous !\\n");\n    return 0;\n}`,
      takeaway: `Une notion existe toujours pour résoudre un problème. Identifie ce problème avant d'apprendre la syntaxe.`,
    },
    {
      title: `La syntaxe de ${day.concept}`,
      content: `Voici la forme générale à retenir. Note bien chaque élément : le mot-clé, les accolades, le point-virgule. La rigueur syntaxique du C est stricte — un caractère oublié, et la compilation échoue.`,
      codeExample: `int main(void)\n{\n    /* Déclaration / initialisation */\n    int x = 42;\n\n    /* Utilisation */\n    printf("x = %d\\n", x);\n    return 0;\n}`,
      takeaway: `En C, l'indentation et les accolades comptent. Compile souvent pour détecter les erreurs tôt.`,
    },
    {
      title: `Application concrète`,
      content: `${
        objectives.length > 0
          ? `Pour ancrer la notion, applique-la à un objectif du jour : ${objectives[0]}. `
          : ''
      }Essaie par toi-même dans ton éditeur. Compile avec \`gcc -Wall -Wextra -Werror\` pour voir les warnings. Lire du code ne suffit jamais : il faut écrire le sien.`,
      codeExample: `$ gcc -Wall -Wextra -Werror main.c -o main\n$ ./main\nx = 42`,
      takeaway: `La pratique transforme la théorie en compétence. Un programme qui compile ≠ un programme correct.`,
    },
    {
      title: `Récapitulatif`,
      content: `Tu as vu : (1) à quoi sert ${day.concept}, (2) sa syntaxe, (3) comment l'appliquer. Si une partie reste floue, c'est normal : note-la pour la session de recherche qui suit.`,
      takeaway: `Si tu ne peux pas expliquer ${day.concept} en une phrase à un humain, tu n'as pas fini de l'apprendre — reviens ici.`,
    },
  ];
}

export default function CourseSession({ session, day, completed, onValidate }: CourseSessionProps) {
  const { intro, sections } = useMemo(() => getSections(session, day), [session, day]);
  const [idx, setIdx] = useState(0);
  const total = sections.length;
  const section = sections[idx];

  const isFirst = idx === 0;
  const isLast = idx === total - 1;
  const progressPct = Math.round(((idx + 1) / total) * 100);

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
          marginBottom: 16,
        }}
      >
        <BookOpen size={20} style={{ color: 'var(--accent, #6366f1)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text, #e2e8f0)' }}>
            Cours progressif — {day.concept}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary, #9ca8a3)', marginTop: 2 }}>
            Avance section par section. Lis, observe le code, retiens le point clé.
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--accent-light, #818cf8)', fontWeight: 600 }}>
          {idx + 1}/{total}
        </div>
      </div>

      {/* Section progress dots */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          marginBottom: 18,
        }}
      >
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Aller à la section ${i + 1}`}
            style={{
              flex: 1,
              height: 4,
              border: 'none',
              borderRadius: 4,
              background:
                i < idx
                  ? 'var(--accent, #6366f1)'
                  : i === idx
                    ? 'var(--accent-light, #818cf8)'
                    : 'var(--surface, #1f2540)',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Section content */}
      <article
        style={{
          border: '1px solid var(--border, #2a3151)',
          borderRadius: 14,
          background: 'var(--bg-elev, #11162a)',
          padding: 22,
          animation: 'fadeIn 0.3s ease-out',
        }}
        key={idx}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent, #6366f1)',
            fontWeight: 700,
            marginBottom: 8,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Target size={13} /> Section {idx + 1} sur {total} · {progressPct}%
        </div>
        <h3
          style={{
            margin: '0 0 14px 0',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text, #e2e8f0)',
            lineHeight: 1.25,
          }}
        >
          {section.title}
        </h3>

        {intro && idx === 0 && (
          <p
            style={{
              margin: '0 0 14px 0',
              fontSize: 14,
              fontStyle: 'italic',
              color: 'var(--text-muted, #6b7180)',
              lineHeight: 1.6,
              paddingBottom: 12,
              borderBottom: '1px dashed var(--border, #1f2540)',
            }}
          >
            {intro}
          </p>
        )}

        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--text-muted, #6b7180)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {renderInline(section.content)}
        </p>

        {section.illustration && (
          <div
            style={{
              marginTop: 14,
              padding: '10px 14px',
              background: 'var(--bg-soft, #161b2e)',
              border: '1px solid var(--border, #1f2540)',
              borderRadius: 8,
              textAlign: 'center',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 13,
              color: 'var(--text-muted, #6b7180)',
            }}
          >
            {section.illustration}
          </div>
        )}

        {/* Code example */}
        {section.codeExample && (
          <div
            style={{
              marginTop: 18,
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid var(--border, #2a3151)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                background: 'rgba(99, 102, 241, 0.08)',
                borderBottom: '1px solid var(--border, #2a3151)',
                fontSize: 11,
                color: 'var(--accent-light, #818cf8)',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              {section.codeExample.startsWith('$') ? <Terminal size={13} /> : <Code2 size={13} />}
              {section.codeExample.startsWith('$') ? 'Terminal' : 'C'}
            </div>
            <pre
              style={{
                margin: 0,
                padding: 16,
                background: '#0a0e1a',
                color: '#7ee787',
                fontFamily:
                  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                fontSize: 13,
                lineHeight: 1.6,
                overflowX: 'auto',
              }}
            >
              <code>{section.codeExample}</code>
            </pre>
          </div>
        )}

        {/* Key takeaway callout */}
        {section.takeaway && (
          <div
            style={{
              marginTop: 18,
              display: 'flex',
              gap: 12,
              padding: '14px 16px',
              background: 'rgba(251, 191, 36, 0.06)',
              border: '1px solid rgba(251, 191, 36, 0.25)',
              borderLeft: '3px solid var(--amber, #fbbf24)',
              borderRadius: 10,
            }}
          >
            <Lightbulb size={18} style={{ color: 'var(--amber, #fbbf24)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--amber, #fbbf24)',
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Point clé à retenir
              </div>
              <div style={{ fontSize: 13, color: 'var(--text, #e2e8f0)', lineHeight: 1.55 }}>
                {section.takeaway}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Navigation */}
      <div
        style={{
          marginTop: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={isFirst}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '10px 16px',
            background: isFirst ? 'transparent' : 'var(--surface, #1f2540)',
            color: isFirst
              ? 'var(--text-muted, #5a6863)'
              : 'var(--text-secondary, #9ca8a3)',
            border: `1px solid var(--border, #2a3151)`,
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 13,
            cursor: isFirst ? 'not-allowed' : 'pointer',
            opacity: isFirst ? 0.5 : 1,
          }}
        >
          <ChevronLeft size={15} /> Précédent
        </button>

        {isLast ? (
          <button
            onClick={onValidate}
            disabled={completed}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              background: completed
                ? 'rgba(34, 197, 94, 0.12)'
                : 'var(--accent, #6366f1)',
              color: completed ? 'var(--green, #22c55e)' : '#fff',
              border: `1px solid ${
                completed ? 'var(--green, #22c55e)' : 'var(--accent, #6366f1)'
              }`,
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 13,
              cursor: completed ? 'default' : 'pointer',
            }}
          >
            <Check size={15} />
            {completed ? 'Cours validé' : 'Valider le cours'}
          </button>
        ) : (
          <button
            onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 18px',
              background: 'var(--accent, #6366f1)',
              color: '#fff',
              border: '1px solid var(--accent, #6366f1)',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Section suivante <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

// Minimal markdown-ish inline renderer (supports **bold** and `code`).
function renderInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(
        <strong key={key++} style={{ color: 'var(--text, #e2e8f0)' }}>
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
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
          {token.slice(1, -1)}
        </code>,
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}
