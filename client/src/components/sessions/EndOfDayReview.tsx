// ============================================================================
// EpiTous — EndOfDayReview
// 🧠 Free-form reflection + keyword analysis (understood / partial / to review).
// ============================================================================

import { useMemo, useState, type ReactNode } from 'react';
import {
  Brain,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Save,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import type { Day } from '../../types';
import { analyzeReview } from '../../lib/analyzer';
import { setReviewCompleted, addJournalEntry } from '../../lib/store';

export interface EndOfDayReviewProps {
  day: Day;
  /** Optional callback once the review is saved */
  onSaved?: () => void;
}

interface Analysis {
  understood: string[];
  partial: string[];
  toReview: string[];
}

export default function EndOfDayReview({ day, onSaved }: EndOfDayReviewProps) {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [saved, setSaved] = useState(false);

  const objectives = useMemo(() => day.objectives ?? [], [day]);

  const handleAnalyze = () => {
    if (text.trim().length < 20) return;
    const result = analyzeReview(text);
    // Enrich "toReview" with day objectives not mentioned in the text.
    const textLower = text.toLowerCase();
    const missingObjectives = objectives.filter((o) => {
      // Check if at least one significant word of the objective is in the text.
      const words = o
        .toLowerCase()
        .split(/[\s,;.]+/)
        .filter((w) => w.length > 4);
      if (words.length === 0) return false;
      return !words.some((w) => textLower.includes(w));
    });
    const merged = Array.from(new Set([...missingObjectives, ...(result.toReview ?? [])]));
    setAnalysis({
      understood: result.understood ?? [],
      partial: result.partial ?? [],
      toReview: merged,
    });
  };

  const handleSave = () => {
    if (!analysis) return;
    const finalText = text.trim();
    setReviewCompleted(day.number, finalText, analysis);

    // Pre-fill a journal entry template the student can complete later.
    addJournalEntry({
      id: `journal-day-${day.number}-${Date.now()}`,
      dayNumber: day.number,
      date: new Date().toISOString(),
      learned: finalText,
      notUnderstood: analysis.toReview.join(', '),
      mistakes: '',
      fixes: '',
      importantCommand: '',
      importantConcept: analysis.understood[0] ?? day.concept,
      reviewTomorrow: analysis.partial.concat(analysis.toReview).join(', '),
    });

    setSaved(true);
    onSaved?.();
  };

  const handleReset = () => {
    setText('');
    setAnalysis(null);
    setSaved(false);
  };

  const charCount = text.trim().length;
  const canAnalyze = charCount >= 20;

  return (
    <div
      style={{
        marginTop: 24,
        border: '1px solid var(--accent, #6366f1)',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(99,102,241,0.08), var(--bg-card, #161b2e))',
        animation: 'fadeIn 0.4s ease-out',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border, #2a3151)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'var(--accent, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(99,102,241,0.45)',
            }}
          >
            <Brain size={22} style={{ color: '#fff' }} />
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-light, #818cf8)',
                fontWeight: 700,
              }}
            >
              Bilan du jour
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--text, #e2e8f0)',
              }}
            >
              🧠 Qu'est-ce que j'ai appris aujourd'hui ?
            </h2>
          </div>
        </div>
        <p
          style={{
            margin: '12px 0 0 0',
            fontSize: 13,
            color: 'var(--text-secondary, #9ca8a3)',
            lineHeight: 1.55,
          }}
        >
          Ferme tous tes cours. Puis explique ce que tu as appris aujourd'hui, avec tes propres
          mots. Écris comme si tu devais l'expliquer à quelqu'un qui ne connaît rien — c'est la
          meilleure façon de vérifier que tu as vraiment compris.
        </p>
      </div>

      {/* Reflection textarea */}
      <div style={{ padding: '20px 24px' }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={saved}
          rows={8}
          placeholder={`Aujourd'hui, j'ai appris que « ${day.concept} » sert à... 

Je peux l'utiliser quand... Un exemple concret : ...

Le point clé à retenir : ...`}
          style={{
            width: '100%',
            padding: 16,
            background: 'var(--bg, #0a0e1a)',
            border: `1px solid ${
              saved ? 'var(--green, #22c55e)' : 'var(--border, #2a3151)'
            }`,
            borderRadius: 10,
            color: 'var(--text, #e2e8f0)',
            fontSize: 14,
            fontFamily: 'inherit',
            outline: 'none',
            resize: 'vertical',
            lineHeight: 1.65,
            opacity: saved ? 0.8 : 1,
          }}
        />
        <div
          style={{
            marginTop: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            color: 'var(--text-muted, #5a6863)',
          }}
        >
          <span>
            {charCount < 20
              ? `${20 - charCount} caractères minimum pour analyser`
              : `${charCount} caractères — c'est suffisant`}
          </span>
          <span>Objectifs du jour : {objectives.length}</span>
        </div>

        {/* Analyze button */}
        {!analysis && (
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            style={{
              marginTop: 16,
              width: '100%',
              padding: '12px 18px',
              background: canAnalyze ? 'var(--accent, #6366f1)' : 'var(--surface, #1f2540)',
              color: canAnalyze ? '#fff' : 'var(--text-muted, #5a6863)',
              border: `1px solid ${
                canAnalyze ? 'var(--accent, #6366f1)' : 'var(--border, #2a3151)'
              }`,
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 14,
              cursor: canAnalyze ? 'pointer' : 'not-allowed',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Sparkles size={16} />
            Analyser ma réponse
          </button>
        )}

        {/* Analysis results */}
        {analysis && (
          <div style={{ marginTop: 18, animation: 'fadeIn 0.35s ease-out' }}>
            <div
              style={{
                fontSize: 12,
                color: 'var(--text-secondary, #9ca8a3)',
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              Résultat de l'analyse :
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Understood */}
              <AnalysisCard
                icon={<CheckCircle2 size={18} />}
                color="var(--green, #22c55e)"
                bg="rgba(34,197,94,0.08)"
                borderColor="rgba(34,197,94,0.35)"
                title="Concepts compris"
                emoji="✅"
                items={analysis.understood}
                emptyHint="Aucun concept n'a pu être identifié avec certitude. Réessaie en nommant explicitement les notions."
              />
              {/* Partial */}
              <AnalysisCard
                icon={<AlertTriangle size={18} />}
                color="var(--amber, #fbbf24)"
                bg="rgba(251,191,36,0.08)"
                borderColor="rgba(251,191,36,0.35)"
                title="Partiellement compris"
                emoji="🟡"
                items={analysis.partial}
                emptyHint="Aucune notion floue détectée — mais vérifie par toi-même."
              />
              {/* To review */}
              <AnalysisCard
                icon={<XCircle size={18} />}
                color="var(--red, #ef4444)"
                bg="rgba(239,68,68,0.08)"
                borderColor="rgba(239,68,68,0.35)"
                title="À revoir demain"
                emoji="🔴"
                items={analysis.toReview}
                emptyHint="Bravo — tous les objectifs du jour semblent abordés. Confirme par la pratique."
              />
            </div>

            {/* Save / Reset */}
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                gap: 10,
                flexDirection: saved ? 'column' : 'row',
              }}
            >
              {!saved && (
                <>
                  <button
                    onClick={handleReset}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      background: 'transparent',
                      color: 'var(--text-secondary, #9ca8a3)',
                      border: '1px solid var(--border, #2a3151)',
                      borderRadius: 10,
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <RotateCcw size={15} /> Réinitialiser
                  </button>
                  <button
                    onClick={handleSave}
                    style={{
                      flex: 2,
                      padding: '12px 18px',
                      background: 'var(--accent, #6366f1)',
                      color: '#fff',
                      border: '1px solid var(--accent, #6366f1)',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                  >
                    <Save size={16} /> Enregistrer le bilan
                  </button>
                </>
              )}
              {saved && (
                <div
                  style={{
                    padding: '14px 16px',
                    background: 'rgba(34,197,94,0.08)',
                    border: '1px solid var(--green, #22c55e)',
                    borderRadius: 10,
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                  }}
                >
                  <BookOpen size={18} style={{ color: 'var(--green, #22c55e)', flexShrink: 0, marginTop: 1 }} />
                  <div style={{ fontSize: 13, color: 'var(--text, #e2e8f0)', lineHeight: 1.55 }}>
                    <strong style={{ color: 'var(--green, #22c55e)' }}>Bilan enregistré.</strong>{' '}
                    Un brouillon de journal a été créé pour le jour {day.number} — va dans ton
                    <strong> Journal</strong> pour le compléter.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AnalysisCard({
  icon,
  color,
  bg,
  borderColor,
  title,
  emoji,
  items,
  emptyHint,
}: {
  icon: ReactNode;
  color: string;
  bg: string;
  borderColor: string;
  title: string;
  emoji: string;
  items: string[];
  emptyHint: string;
}) {
  return (
    <div
      style={{
        padding: '14px 16px',
        background: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
        }}
      >
        <span style={{ color }}>{icon}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{emoji} {title}</span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 11,
            color: 'var(--text-muted, #5a6863)',
            fontWeight: 600,
          }}
        >
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <div style={{ fontSize: 12, color: 'var(--text-muted, #5a6863)', fontStyle: 'italic' }}>
          {emptyHint}
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {items.map((it, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                background: 'var(--bg, #0a0e1a)',
                color: 'var(--text, #e2e8f0)',
                border: `1px solid ${color}33`,
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {it}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
