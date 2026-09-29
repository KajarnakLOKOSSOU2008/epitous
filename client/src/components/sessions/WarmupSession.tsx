// ============================================================================
// EpiTous — WarmupSession
// ☀️ Morning warm-up: 3-5 quick Q&A to reactivate prior knowledge.
// ============================================================================

import { useMemo, useState } from 'react';
import { Sunrise, Eye, EyeOff, Check, Clock, Lightbulb } from 'lucide-react';
import type { DaySession, FullDay } from '../../types';

export interface WarmupSessionProps {
  session: DaySession;
  day: FullDay;
  completed: boolean;
  onValidate: () => void;
}

interface WarmupQuestion {
  q: string;
  a: string;
}

// Read rich content from day.content.warmup (provided by curriculum), else derive defaults.
function getQuestions(session: DaySession, day: FullDay): WarmupQuestion[] {
  const content = day.content?.warmup;
  if (content?.questions && Array.isArray(content.questions) && content.questions.length > 0) {
    return content.questions.slice(0, 5);
  }
  // Sensible defaults adapted to the day's concept.
  return [
    {
      q: `Qu'est-ce que tu retiens du concept suivant : « ${day.concept} » ?`,
      a: `« ${day.concept} » est le sujet central du jour ${day.number}. Essaie de le reformuler avec tes propres mots avant de regarder la réponse type dans le cours.`,
    },
    {
      q: `Cite un élément clé vu hier qui pourrait t'aider aujourd'hui.`,
      a: `Réfléchis à la dernière notion abordée avant « ${day.concept} ». Souvent, le nouveau concept s'appuie dessus.`,
    },
    {
      q: `Quel problème essaie-t-on de résoudre en étudiant « ${day.concept} » ?`,
      a: `Identifie la motivation pratique : pourquoi un développeur a-t-il besoin de cette notion ? Cela te donnera un ancrage concret.`,
    },
    {
      q: `Quelle commande, syntaxe ou mot-clé associes-tu spontanément à « ${day.concept} » ?`,
      a: `Note ton premier réflexe. Si tu n'en as aucun, c'est exactement ce que cette session va éclaircir.`,
    },
  ];
}

export default function WarmupSession({
  session,
  day,
  completed,
  onValidate,
}: WarmupSessionProps) {
  const questions = useMemo(() => getQuestions(session, day), [session, day]);
  const [revealed, setRevealed] = useState<boolean[]>(() => questions.map(() => false));

  const toggleReveal = (i: number) => {
    setRevealed((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const allSeen = revealed.every(Boolean);

  return (
    <div style={{ padding: '4px 2px' }}>
      {/* Header strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          background: 'rgba(251, 191, 36, 0.08)',
          border: '1px solid rgba(251, 191, 36, 0.25)',
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Sunrise size={20} style={{ color: 'var(--amber, #fbbf24)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text, #e2e8f0)' }}>
            Réveille ton cerveau — 5 à 10 minutes
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary, #9ca8a3)', marginTop: 2 }}>
            Réfléchis à chaque question, puis révèle la réponse pour te corriger.
          </div>
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            color: 'var(--text-muted, #5a6863)',
          }}
        >
          <Clock size={13} />
          ~5 min
        </div>
      </div>

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {questions.map((item, i) => (
          <div
            key={i}
            style={{
              border: '1px solid var(--border, #2a3151)',
              borderRadius: 12,
              background: 'var(--bg-elev, #11162a)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '14px 16px' }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent, #6366f1)',
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Question {i + 1}/{questions.length}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'var(--text, #e2e8f0)',
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {item.q}
              </div>
            </div>

            {/* Reveal button */}
            <button
              onClick={() => toggleReveal(i)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderTop: '1px dashed var(--border, #2a3151)',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                color: revealed[i]
                  ? 'var(--accent-light, #818cf8)'
                  : 'var(--text-secondary, #9ca8a3)',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {revealed[i] ? <EyeOff size={14} /> : <Eye size={14} />}
                {revealed[i] ? 'Masquer la réponse' : 'Afficher la réponse'}
              </span>
              {revealed[i] && <Check size={14} style={{ color: 'var(--green, #22c55e)' }} />}
            </button>

            {/* Answer */}
            {revealed[i] && (
              <div
                style={{
                  padding: '12px 16px 16px',
                  background: 'rgba(34, 211, 238, 0.04)',
                  borderTop: '1px solid var(--border, #2a3151)',
                  fontSize: 13,
                  color: 'var(--text-secondary, #9ca8a3)',
                  lineHeight: 1.55,
                  animation: 'fadeIn 0.25s ease-out',
                }}
              >
                <Lightbulb
                  size={14}
                  style={{ color: 'var(--cyan, #22d3ee)', marginRight: 6, verticalAlign: -2 }}
                />
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Validation */}
      <div
        style={{
          marginTop: 22,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          alignItems: 'stretch',
        }}
      >
        {!allSeen && !completed && (
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-muted, #5a6863)',
              textAlign: 'center',
            }}
          >
            Révèle chaque réponse avant de valider.
          </div>
        )}
        <button
          onClick={onValidate}
          disabled={completed}
          style={{
            width: '100%',
            padding: '12px 18px',
            background: completed
              ? 'rgba(34, 197, 94, 0.12)'
              : allSeen
                ? 'var(--accent, #6366f1)'
                : 'var(--surface, #1f2540)',
            color: completed
              ? 'var(--green, #22c55e)'
              : allSeen
                ? '#fff'
                : 'var(--text-muted, #5a6863)',
            border: `1px solid ${
              completed
                ? 'var(--green, #22c55e)'
                : allSeen
                  ? 'var(--accent, #6366f1)'
                  : 'var(--border, #2a3151)'
            }`,
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 14,
            cursor: completed ? 'default' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'transform 0.15s ease, background 0.15s ease',
          }}
        >
          {completed ? (
            <>
              <Check size={16} /> Échauffement validé
            </>
          ) : (
            <>
              <Check size={16} /> Valider l'échauffement
            </>
          )}
        </button>
      </div>
    </div>
  );
}
