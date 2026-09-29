// ============================================================================
// EpiTous — ResearchSession
// 📚 Send the student to REAL external docs, then bring them back with notes.
// ============================================================================

import { useMemo, useState } from 'react';
import { BookMarked, ExternalLink, Check, Compass, FileText, AlertCircle } from 'lucide-react';
import type { DaySession, FullDay } from '../../types';

export interface ResearchSessionProps {
  session: DaySession;
  day: FullDay;
  completed: boolean;
  onValidate: () => void;
}

interface ResearchedContent {
  resourceUrl: string;
  resourceName: string;
  mission: string;
  questions: string[];
}

const NOTE_FIELDS = [
  { key: 'role', label: 'Son rôle (à quoi ça sert)' },
  { key: 'params', label: 'Ses paramètres (ce qu\'on lui donne)' },
  { key: 'return', label: 'Sa valeur de retour (ce qu\'elle renvoie)' },
  { key: 'error', label: 'Une erreur possible (cas d\'échec)' },
];

const DEFAULT_QUESTIONS = [
  'Comment formulerais-tu cette notion avec tes propres mots ?',
  'Quelle est la différence entre cette notion et celle vue hier ?',
  'Dans quel cas concret l\'utiliserais-tu dans un projet ?',
  'Quelle commande ou syntaxe est essentielle à retenir ?',
  'Qu\'est-ce qui t\'a surpris dans la documentation ?',
];

function getResearch(session: DaySession, day: FullDay): ResearchedContent {
  const content = day.content?.research;
  if (content && typeof content === 'object' && content.resourceUrl) {
    return {
      resourceUrl: content.resourceUrl,
      resourceName: content.resourceName ?? 'Documentation technique',
      mission: content.mission ?? defaultMission(day),
      questions: content.questions?.length ? content.questions.slice(0, 5) : DEFAULT_QUESTIONS,
    };
  }
  // Defaults: build a doc link from the day concept.
  const query = encodeURIComponent(`${day.concept} documentation C`);
  const manQuery = encodeURIComponent(day.concept.toLowerCase().replace(/\s+/g, '_'));
  return {
    resourceUrl: `https://www.google.com/search?q=${query}`,
    resourceName: `Documentation officielle / manuel sur « ${day.concept} »`,
    mission: `Ouvre la ressource ci-dessous, lis la section qui parle de « ${day.concept} », puis reviens remplir tes notes. Tu peux aussi ouvrir un terminal et taper : \`man ${manQuery}\` ou \`man gcc\`.`,
    questions: DEFAULT_QUESTIONS,
  };
}

function defaultMission(day: FullDay): string {
  return `Ouvre la ressource ci-dessous. Lis la section sur « ${day.concept} ». Prends des notes précises dans les 4 champs ci-dessous, puis réponds aux questions.`;
}

export default function ResearchSession({
  session,
  day,
  completed,
  onValidate,
}: ResearchSessionProps) {
  const research = useMemo(() => getResearch(session, day), [session, day]);
  const questions = research.questions?.length ? research.questions.slice(0, 5) : DEFAULT_QUESTIONS;
  const noteFields = NOTE_FIELDS;

  const [notes, setNotes] = useState<Record<string, string>>(() =>
    Object.fromEntries(noteFields.map((f) => [f.key, '']))
  );
  const [answers, setAnswers] = useState<string[]>(() => questions.map(() => ''));

  const notesFilled = noteFields.every((f) => (notes[f.key] ?? '').trim().length > 0);
  const answersFilled = answers.every((a) => a.trim().length > 0);
  const canValidate = notesFilled && answersFilled;

  return (
    <div style={{ padding: '4px 2px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          background: 'rgba(34, 211, 238, 0.08)',
          border: '1px solid rgba(34, 211, 238, 0.25)',
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <BookMarked size={20} style={{ color: 'var(--cyan, #22d3ee)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text, #e2e8f0)' }}>
            📚 Aujourd'hui tu vas apprendre à utiliser la documentation technique
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary, #9ca8a3)', marginTop: 2 }}>
            Sors d'EpiTous, lis la vraie doc, reviens avec tes notes.
          </div>
        </div>
      </div>

      {/* External resource */}
      <a
        href={research.resourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 16px',
          background: 'var(--bg-elev, #11162a)',
          border: '1px solid var(--border, #2a3151)',
          borderRadius: 12,
          textDecoration: 'none',
          marginBottom: 16,
          transition: 'border-color 0.18s ease, transform 0.18s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--cyan, #22d3ee)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border, #2a3151)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'rgba(34, 211, 238, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ExternalLink size={18} style={{ color: 'var(--cyan, #22d3ee)' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text, #e2e8f0)' }}>
            {research.resourceName}
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--cyan, #22d3ee)',
              marginTop: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {research.resourceUrl}
          </div>
        </div>
      </a>

      {/* Mission */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          padding: '14px 16px',
          background: 'rgba(99, 102, 241, 0.06)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderLeft: '3px solid var(--accent, #6366f1)',
          borderRadius: 10,
          marginBottom: 22,
        }}
      >
        <Compass size={18} style={{ color: 'var(--accent, #6366f1)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent, #6366f1)',
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Ta mission
          </div>
          <div style={{ fontSize: 13, color: 'var(--text, #e2e8f0)', lineHeight: 1.55 }}>
            {research.mission}
          </div>
        </div>
      </div>

      {/* Notes template */}
      <div style={{ marginBottom: 22 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 10,
          }}
        >
          <FileText size={16} style={{ color: 'var(--accent-light, #818cf8)' }} />
          <h4
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--text, #e2e8f0)',
            }}
          >
            Tes notes de lecture
          </h4>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {noteFields.map((f) => (
            <label key={f.key} style={{ display: 'block' }}>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text-secondary, #9ca8a3)',
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                {f.label}
              </div>
              <input
                type="text"
                value={notes[f.key] ?? ''}
                onChange={(e) =>
                  setNotes((prev) => ({ ...prev, [f.key]: e.target.value }))
                }
                placeholder="Ta note ici..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'var(--bg, #0a0e1a)',
                  border: `1px solid ${
                    (notes[f.key] ?? '').trim()
                      ? 'var(--accent, #6366f1)'
                      : 'var(--border, #2a3151)'
                  }`,
                  borderRadius: 8,
                  color: 'var(--text, #e2e8f0)',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div>
        <h4
          style={{
            margin: '0 0 10px 0',
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text, #e2e8f0)',
          }}
        >
          Réponds à ces 5 questions
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {questions.map((q, i) => (
            <label key={i} style={{ display: 'block' }}>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--text-secondary, #9ca8a3)',
                  marginBottom: 6,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: 'var(--accent, #6366f1)', marginRight: 6 }}>
                  Q{i + 1}.
                </span>
                {q}
              </div>
              <input
                type="text"
                value={answers[i]}
                onChange={(e) =>
                  setAnswers((prev) =>
                    prev.map((a, idx) => (idx === i ? e.target.value : a))
                  )
                }
                placeholder="Ta réponse..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'var(--bg, #0a0e1a)',
                  border: `1px solid ${
                    answers[i].trim()
                      ? 'var(--accent, #6366f1)'
                      : 'var(--border, #2a3151)'
                  }`,
                  borderRadius: 8,
                  color: 'var(--text, #e2e8f0)',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </label>
          ))}
        </div>
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
        {!canValidate && !completed && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              justifyContent: 'center',
              fontSize: 12,
              color: 'var(--amber, #fbbf24)',
            }}
          >
            <AlertCircle size={14} />
            Remplis les 4 notes ET les 5 réponses pour valider.
          </div>
        )}
        <button
          onClick={onValidate}
          disabled={completed || !canValidate}
          style={{
            width: '100%',
            padding: '12px 18px',
            background: completed
              ? 'rgba(34, 197, 94, 0.12)'
              : canValidate
                ? 'var(--accent, #6366f1)'
                : 'var(--surface, #1f2540)',
            color: completed
              ? 'var(--green, #22c55e)'
              : canValidate
                ? '#fff'
                : 'var(--text-muted, #5a6863)',
            border: `1px solid ${
              completed
                ? 'var(--green, #22c55e)'
                : canValidate
                  ? 'var(--accent, #6366f1)'
                  : 'var(--border, #2a3151)'
            }`,
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 14,
            cursor: completed || !canValidate ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Check size={16} />
          {completed ? 'Recherche validée' : 'Valider la recherche'}
        </button>
      </div>
    </div>
  );
}
