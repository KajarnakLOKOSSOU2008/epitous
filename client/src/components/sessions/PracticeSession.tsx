// ============================================================================
// EpiTous — PracticeSession
// 💻 Progressive exercises: easy → medium → hard → mini challenge.
// ============================================================================

import { useMemo, useState } from 'react';
import {
  Code2,
  Check,
  Lightbulb,
  Lock,
  AlertCircle,
  Trophy,
  ChevronRight,
} from 'lucide-react';
import type { DaySession, FullDay } from '../../types';
import ProgressBar from '../ProgressBar';

export interface PracticeSessionProps {
  session: DaySession;
  day: FullDay;
  completed: boolean;
  onValidate: () => void;
}

export interface PracticeExercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'challenge';
  hint: string;
  extraHints?: string[];
}

// Read exercises from day.content.practice (provided by curriculum), else derive defaults.
function getExercises(session: DaySession, day: FullDay): { intro: string; exercises: PracticeExercise[] } {
  const content = day.content?.practice;
  if (content?.exercises && Array.isArray(content.exercises) && content.exercises.length > 0) {
    return {
      intro: content.intro ?? '',
      exercises: content.exercises.slice(0, 4).map((ex) => ({
        id: ex.id,
        title: ex.title,
        description: ex.prompt,
        hint: ex.hints?.[0] ?? 'Réfléchis au problème en le découpant en 2 ou 3 étapes.',
        extraHints: ex.hints?.slice(1) ?? [],
        difficulty: mapDifficulty(ex.difficulty),
      })),
    };
  }
  return { intro: '', exercises: defaultExercises(day) };
}

function mapDifficulty(d: string): PracticeExercise['difficulty'] {
  switch (d) {
    case 'facile':
      return 'easy';
    case 'moyen':
      return 'medium';
    case 'difficile':
      return 'hard';
    case 'défi':
    case 'defi':
      return 'challenge';
    default:
      return 'easy';
  }
}

function defaultExercises(day: FullDay): PracticeExercise[] {
  return [
    {
      id: 'ex01',
      title: 'Exercice 01 — Premier pas',
      description: `Écris un programme minimal qui illustre la notion de « ${day.concept} ». Compile-le, exécute-le, observe la sortie. L'objectif : faire fonctionner la syntaxe de base.`,
      difficulty: 'easy',
      hint: `Commence par un \`#include\` approprié et une fonction \`main\` qui retourne 0. Compile avec : \`gcc -Wall -Wextra -Werror main.c -o main\`.`,
    },
    {
      id: 'ex02',
      title: 'Exercice 02 — Réutilisation',
      description: `Reprends l'exercice 01 et ajoute une variation : utilise « ${day.concept} » dans un contexte légèrement différent (autre valeur, autre format d'affichage, autre entrée).`,
      difficulty: 'medium',
      hint: `Change un seul paramètre à la fois pour comprendre son effet. Affiche le résultat avec \`printf\` et le bon format (%d, %s, %c...).`,
    },
    {
      id: 'ex03',
      title: 'Exercice 03 — Approfondissement',
      description: `Construis un petit programme qui combine « ${day.concept} » avec une notion vue précédemment. Vérifie que tu gères correctement les cas limites (valeur 0, valeur négative, chaîne vide).`,
      difficulty: 'hard',
      hint: `Identifie les 2 ou 3 cas limites possibles. Teste-les un par un. Ajoute des \`printf\` de débogage si nécessaire.`,
    },
    {
      id: 'ex04',
      title: 'Mini défi — Autonomie',
      description: `Sans regarder tes notes précédentes, écris un programme qui résout un problème concret lié à « ${day.concept} ». Tu as le droit à la documentation (man, internet), mais pas à tes anciens codes.`,
      difficulty: 'challenge',
      hint: `Décompose le problème en 3 étapes maximum. Avant de coder, écris en commentaire ce que doit faire ton programme. C'est ce qu'on appelle un pseudo-algorithme.`,
    },
  ];
}

const DIFFICULTY_META: Record<
  PracticeExercise['difficulty'],
  { label: string; color: string; bg: string }
> = {
  easy: { label: 'Facile', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  medium: { label: 'Moyen', color: '#22d3ee', bg: 'rgba(34,211,238,0.12)' },
  hard: { label: 'Difficile', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  challenge: { label: 'Mini défi', color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
};

export default function PracticeSession({
  session,
  day,
  completed,
  onValidate,
}: PracticeSessionProps) {
  const { intro, exercises } = useMemo(() => getExercises(session, day), [session, day]);

  const [checked, setChecked] = useState<boolean[]>(() => exercises.map(() => false));
  const [shownHints, setShownHints] = useState<boolean[]>(() => exercises.map(() => false));
  const [code, setCode] = useState<string[]>(() => exercises.map(() => ''));

  const completedCount = checked.filter(Boolean).length;
  const allChecked = completedCount === exercises.length;
  const progressPct = Math.round((completedCount / exercises.length) * 100);

  const toggleCheck = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const toggleHint = (i: number) =>
    setShownHints((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div style={{ padding: '4px 2px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          background: 'rgba(34, 197, 94, 0.08)',
          border: '1px solid rgba(34, 197, 94, 0.25)',
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Code2 size={20} style={{ color: 'var(--green, #22c55e)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text, #e2e8f0)' }}>
            Exercices progressifs — {day.concept}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary, #9ca8a3)', marginTop: 2 }}>
            {intro || 'Du plus simple au mini défi. Tu écris ton code dans ton éditeur, pas ici.'}
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--green, #22c55e)', fontWeight: 700 }}>
          {completedCount}/{exercises.length}
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <ProgressBar value={progressPct} height={6} color="var(--green, #22c55e)" />
      </div>

      {/* Exercises */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {exercises.map((ex, i) => {
          const meta = DIFFICULTY_META[ex.difficulty];
          const prevDone = i === 0 || checked[i - 1];
          const isLocked = !prevDone && !checked[i];

          return (
            <div
              key={ex.id}
              style={{
                border: '1px solid var(--border, #2a3151)',
                borderRadius: 12,
                background: 'var(--bg-elev, #11162a)',
                overflow: 'hidden',
                opacity: isLocked ? 0.6 : 1,
                transition: 'opacity 0.2s ease, border-color 0.2s ease',
                borderColor: checked[i] ? 'var(--green, #22c55e)' : undefined,
              }}
            >
              {/* Exercise header */}
              <div
                style={{
                  padding: '14px 16px',
                  borderBottom: checked[i] ? '1px solid var(--green, #22c55e)' : '1px solid var(--border, #2a3151)',
                  background: checked[i] ? 'rgba(34,197,94,0.06)' : 'transparent',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 6,
                      background: meta.bg,
                      color: meta.color,
                    }}
                  >
                    {meta.label}
                  </span>
                  {ex.difficulty === 'challenge' && (
                    <Trophy size={13} style={{ color: meta.color }} />
                  )}
                  {isLocked && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11,
                        color: 'var(--text-muted, #5a6863)',
                      }}
                    >
                      <Lock size={11} /> Termine l'exercice précédent
                    </span>
                  )}
                </div>
                <h4
                  style={{
                    margin: '0 0 6px 0',
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--text, #e2e8f0)',
                  }}
                >
                  {ex.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: 'var(--text-secondary, #9ca8a3)',
                  }}
                >
                  {ex.description}
                </p>
              </div>

              {/* Hint */}
              <div style={{ padding: '0 16px' }}>
                <button
                  onClick={() => toggleHint(i)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '10px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    color: shownHints[i]
                      ? 'var(--amber, #fbbf24)'
                      : 'var(--text-secondary, #9ca8a3)',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Lightbulb size={14} />
                    {shownHints[i] ? 'Masquer l\'indice' : 'Afficher un indice'}
                  </span>
                  <ChevronRight
                    size={14}
                    style={{
                      transform: shownHints[i] ? 'rotate(90deg)' : 'rotate(0)',
                      transition: 'transform 0.18s ease',
                    }}
                  />
                </button>
                {shownHints[i] && (
                  <div
                    style={{
                      padding: '0 0 12px 0',
                      fontSize: 13,
                      color: 'var(--text-secondary, #9ca8a3)',
                      lineHeight: 1.55,
                      animation: 'fadeIn 0.25s ease-out',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 6px',
                        background: 'rgba(251,191,36,0.1)',
                        color: 'var(--amber, #fbbf24)',
                        borderRadius: 4,
                        fontSize: 10,
                        fontWeight: 700,
                        marginRight: 6,
                        verticalAlign: 1,
                      }}
                    >
                      INDICE
                    </span>
                    {ex.hint}
                  </div>
                )}
              </div>

              {/* Code notes area */}
              <div style={{ padding: '0 16px 14px' }}>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted, #5a6863)',
                    marginBottom: 6,
                  }}
                >
                  Colle ici ton code ou tes notes (ne sera pas exécuté) :
                </div>
                <textarea
                  value={code[i]}
                  onChange={(e) =>
                    setCode((prev) => prev.map((c, idx) => (idx === i ? e.target.value : c)))
                  }
                  rows={4}
                  placeholder="// Ton code ou tes notes ici..."
                  style={{
                    width: '100%',
                    padding: 10,
                    background: '#0a0e1a',
                    border: '1px solid var(--border, #2a3151)',
                    borderRadius: 8,
                    color: '#7ee787',
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: 12,
                    lineHeight: 1.55,
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Check button */}
              <div
                style={{
                  padding: '12px 16px',
                  borderTop: '1px solid var(--border, #2a3151)',
                  background: checked[i] ? 'rgba(34,197,94,0.06)' : 'transparent',
                }}
              >
                <button
                  onClick={() => toggleCheck(i)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: checked[i]
                      ? 'rgba(34,197,94,0.12)'
                      : 'var(--surface, #1f2540)',
                    color: checked[i]
                      ? 'var(--green, #22c55e)'
                      : 'var(--text-secondary, #9ca8a3)',
                    border: `1px solid ${
                      checked[i] ? 'var(--green, #22c55e)' : 'var(--border, #2a3151)'
                    }`,
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <Check size={15} />
                  {checked[i] ? 'Exercice terminé' : 'J\'ai terminé cet exercice'}
                </button>
              </div>
            </div>
          );
        })}
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
        {!allChecked && !completed && (
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
            Coche tous les exercices ({completedCount}/{exercises.length}) pour valider.
          </div>
        )}
        <button
          onClick={onValidate}
          disabled={completed || !allChecked}
          style={{
            width: '100%',
            padding: '12px 18px',
            background: completed
              ? 'rgba(34, 197, 94, 0.12)'
              : allChecked
                ? 'var(--accent, #6366f1)'
                : 'var(--surface, #1f2540)',
            color: completed
              ? 'var(--green, #22c55e)'
              : allChecked
                ? '#fff'
                : 'var(--text-muted, #5a6863)',
            border: `1px solid ${
              completed
                ? 'var(--green, #22c55e)'
                : allChecked
                  ? 'var(--accent, #6366f1)'
                  : 'var(--border, #2a3151)'
            }`,
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 14,
            cursor: completed || !allChecked ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Check size={16} />
          {completed ? 'Pratique validée' : 'Valider la pratique'}
        </button>
      </div>
    </div>
  );
}
