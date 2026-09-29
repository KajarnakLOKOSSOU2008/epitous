// ============================================================================
// EpiTous — VideoSession
// 🎥 Watch a suggested video, then reflect — not just passive watching.
// ============================================================================

import { useMemo, useState } from 'react';
import { Youtube, Eye, Check, Play, AlertCircle, Brain } from 'lucide-react';
import type { DaySession, FullDay } from '../../types';

export interface VideoSessionProps {
  session: DaySession;
  day: FullDay;
  completed: boolean;
  onValidate: () => void;
}

interface VideoData {
  searchQuery: string;
  searchUrl: string;
  reflectionQuestions: string[];
}

const DEFAULT_REFLECTION = [
  'Qu\'as-tu appris ?',
  'Quel concept était nouveau ?',
  'Explique cette notion sans regarder tes notes',
];

function getVideo(session: DaySession, day: FullDay): VideoData {
  const content = day.content?.video;
  if (content && typeof content === 'object' && (content.searchUrl || content.searchQuery)) {
    const query = content.searchQuery ?? `${day.concept} C programming explained français`;
    return {
      searchQuery: query,
      searchUrl: content.searchUrl ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
      reflectionQuestions: content.reflectionQuestions?.length
        ? content.reflectionQuestions.slice(0, 3)
        : DEFAULT_REFLECTION,
    };
  }
  const query = encodeURIComponent(`${day.concept} C programming explained français`);
  return {
    searchQuery: `${day.concept} C programming explained français`,
    searchUrl: `https://www.youtube.com/results?search_query=${query}`,
    reflectionQuestions: DEFAULT_REFLECTION,
  };
}

export default function VideoSession({
  session,
  day,
  completed,
  onValidate,
}: VideoSessionProps) {
  const video = useMemo(() => getVideo(session, day), [session, day]);
  const questions = video.reflectionQuestions?.length
    ? video.reflectionQuestions.slice(0, 3)
    : DEFAULT_REFLECTION;
  const beforeWatching = `Pendant la vidéo, prête une attention particulière à la notion de « ${day.concept} ». Note les exemples concrets et les schémas utilisés.`;

  const [learned, setLearned] = useState('');
  const [newConcept, setNewConcept] = useState('');
  const [explainNoNotes, setExplainNoNotes] = useState('');

  // First two are short text, third is textarea.
  const filled =
    learned.trim().length > 0 && newConcept.trim().length > 0 && explainNoNotes.trim().length > 10;

  return (
    <div style={{ padding: '4px 2px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Youtube size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text, #e2e8f0)' }}>
            Vidéo suggérée sur « {day.concept} »
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary, #9ca8a3)', marginTop: 2 }}>
            Tu regardes la vidéo, puis tu reviens réfléchir ici.
          </div>
        </div>
      </div>

      {/* Suggested video link */}
      <a
        href={video.searchUrl}
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
          e.currentTarget.style.borderColor = '#ef4444';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border, #2a3151)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: 'rgba(239, 68, 68, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Play size={20} style={{ color: '#ef4444' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text, #e2e8f0)' }}>
            Rechercher une vidéo sur YouTube
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-muted, #5a6863)',
              marginTop: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {video.searchQuery}
          </div>
        </div>
        <ExternalLinkSmall />
      </a>

      {/* Before watching prompt */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          padding: '14px 16px',
          background: 'rgba(251, 191, 36, 0.06)',
          border: '1px solid rgba(251, 191, 36, 0.25)',
          borderLeft: '3px solid var(--amber, #fbbf24)',
          borderRadius: 10,
          marginBottom: 22,
        }}
      >
        <Eye size={18} style={{ color: 'var(--amber, #fbbf24)', flexShrink: 0, marginTop: 2 }} />
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
            Avant de regarder
          </div>
          <div style={{ fontSize: 13, color: 'var(--text, #e2e8f0)', lineHeight: 1.55 }}>
            {beforeWatching}
          </div>
        </div>
      </div>

      {/* Reflection questions */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Brain size={16} style={{ color: 'var(--accent-light, #818cf8)' }} />
          <h4
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--text, #e2e8f0)',
            }}
          >
            Après la vidéo — 3 questions de réflexion
          </h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Q1 */}
          <label style={{ display: 'block' }}>
            <div
              style={{
                fontSize: 12,
                color: 'var(--text-secondary, #9ca8a3)',
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              <span style={{ color: 'var(--accent, #6366f1)', marginRight: 6 }}>Q1.</span>
              {questions[0] ?? DEFAULT_REFLECTION[0]}
            </div>
            <input
              type="text"
              value={learned}
              onChange={(e) => setLearned(e.target.value)}
              placeholder="Ce que tu as appris..."
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'var(--bg, #0a0e1a)',
                border: `1px solid ${
                  learned.trim() ? 'var(--accent, #6366f1)' : 'var(--border, #2a3151)'
                }`,
                borderRadius: 8,
                color: 'var(--text, #e2e8f0)',
                fontSize: 13,
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </label>

          {/* Q2 */}
          <label style={{ display: 'block' }}>
            <div
              style={{
                fontSize: 12,
                color: 'var(--text-secondary, #9ca8a3)',
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              <span style={{ color: 'var(--accent, #6366f1)', marginRight: 6 }}>Q2.</span>
              {questions[1] ?? DEFAULT_REFLECTION[1]}
            </div>
            <input
              type="text"
              value={newConcept}
              onChange={(e) => setNewConcept(e.target.value)}
              placeholder="Le concept nouveau..."
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'var(--bg, #0a0e1a)',
                border: `1px solid ${
                  newConcept.trim() ? 'var(--accent, #6366f1)' : 'var(--border, #2a3151)'
                }`,
                borderRadius: 8,
                color: 'var(--text, #e2e8f0)',
                fontSize: 13,
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </label>

          {/* Q3 — textarea */}
          <label style={{ display: 'block' }}>
            <div
              style={{
                fontSize: 12,
                color: 'var(--text-secondary, #9ca8a3)',
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              <span style={{ color: 'var(--accent, #6366f1)', marginRight: 6 }}>Q3.</span>
              {questions[2] ?? DEFAULT_REFLECTION[2]}
            </div>
            <textarea
              value={explainNoNotes}
              onChange={(e) => setExplainNoNotes(e.target.value)}
              rows={5}
              placeholder="Explique la notion avec tes propres mots, comme si tu l'enseignais à un ami..."
              style={{
                width: '100%',
                padding: '12px',
                background: 'var(--bg, #0a0e1a)',
                border: `1px solid ${
                  explainNoNotes.trim().length > 10
                    ? 'var(--accent, #6366f1)'
                    : 'var(--border, #2a3151)'
                }`,
                borderRadius: 8,
                color: 'var(--text, #e2e8f0)',
                fontSize: 13,
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'vertical',
                lineHeight: 1.55,
              }}
            />
            <div
              style={{
                marginTop: 6,
                fontSize: 11,
                color: 'var(--text-muted, #5a6863)',
                textAlign: 'right',
              }}
            >
              {explainNoNotes.trim().length} caractères
            </div>
          </label>
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
        {!filled && !completed && (
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
            Réponds aux 3 questions (la 3e doit faire plus de 10 caractères).
          </div>
        )}
        <button
          onClick={onValidate}
          disabled={completed || !filled}
          style={{
            width: '100%',
            padding: '12px 18px',
            background: completed
              ? 'rgba(34, 197, 94, 0.12)'
              : filled
                ? 'var(--accent, #6366f1)'
                : 'var(--surface, #1f2540)',
            color: completed
              ? 'var(--green, #22c55e)'
              : filled
                ? '#fff'
                : 'var(--text-muted, #5a6863)',
            border: `1px solid ${
              completed
                ? 'var(--green, #22c55e)'
                : filled
                  ? 'var(--accent, #6366f1)'
                  : 'var(--border, #2a3151)'
            }`,
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 14,
            cursor: completed || !filled ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Check size={16} />
          {completed ? 'Vidéo validée' : 'Valider la vidéo'}
        </button>
      </div>
    </div>
  );
}

function ExternalLinkSmall() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: 'var(--text-muted, #5a6863)', flexShrink: 0 }}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
