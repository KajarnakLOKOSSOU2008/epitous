// ============================================================================
// EpiTous — TaskSession
// 🎯 Piscine tasks dashboard: locked/unlocked based on prior session progress.
// ============================================================================

import { useMemo, useState } from 'react';
import {
  Target,
  Lock,
  Check,
  AlertCircle,
  Clock,
  Gauge,
  Trophy,
} from 'lucide-react';
import type { DaySession, FullDay } from '../../types';
import ProgressBar from '../ProgressBar';

export interface TaskSessionProps {
  session: DaySession;
  day: FullDay;
  completed: boolean;
  onValidate: () => void;
  /** Number of prior sessions (warmup, course, research, video, practice, epitech) completed */
  priorSessionsCompleted: number;
  /** Total number of prior sessions (those that should be done before tasks) */
  priorSessionsTotal: number;
}

interface TaskItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'challenge';
  estimatedTime: string;
  locked?: boolean;
  lockedReason?: string;
}

const DIFFICULTY_BY_INDEX: TaskItem['difficulty'][] = ['easy', 'medium', 'hard', 'challenge'];
const ESTIMATED_TIME_BY_INDEX = ['30-45 min', '1-2 h', '2-3 h', '3 h+'];
const DIFFICULTY_META: Record<TaskItem['difficulty'], { label: string; color: string; bg: string }> = {
  easy: { label: 'Facile', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  medium: { label: 'Moyen', color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
  hard: { label: 'Difficile', color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
  challenge: { label: 'Défi', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
};

function getTasks(session: DaySession, day: FullDay): { intro: string; tasks: TaskItem[] } {
  const content = day.content?.tasks;
  if (content?.tasks && Array.isArray(content.tasks) && content.tasks.length > 0) {
    return {
      intro: content.intro ?? '',
      tasks: content.tasks.slice(0, 4).map((t, i) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        difficulty: DIFFICULTY_BY_INDEX[i] ?? 'challenge',
        estimatedTime: ESTIMATED_TIME_BY_INDEX[i] ?? '1-2 h',
        locked: t.locked,
        lockedReason: t.lockedReason,
      })),
    };
  }
  return { intro: '', tasks: defaultTasks(day) };
}

function defaultTasks(day: FullDay): TaskItem[] {
  return [
    {
      id: 'task01',
      title: `TASK 01 — Premier rendu`,
      description: `Rends un programme minimal illustrant « ${day.concept} ». Il doit compiler sans warning avec \`-Wall -Wextra -Werror\`, afficher une sortie propre, et suivre la norme Epitech.`,
      difficulty: 'easy',
      estimatedTime: '30-45 min',
    },
    {
      id: 'task02',
      title: `TASK 02 — Avec contraintes`,
      description: `Ajoute à ton programme une gestion d'entrée : paramètre en ligne de commande, ou lecture au clavier. Gère le cas d'erreur correspondant.`,
      difficulty: 'medium',
      estimatedTime: '1-2 h',
    },
    {
      id: 'task03',
      title: `TASK 03 — Cas d'usage réel`,
      description: `Construis un petit utilitaire qui exploite « ${day.concept} » pour résoudre un problème concret (compteur, convertisseur, mini-outil). Documente-le dans un README.`,
      difficulty: 'hard',
      estimatedTime: '2-3 h',
    },
    {
      id: 'task04',
      title: `Mini challenge — Autonomie totale`,
      description: `Sans aide extérieure, écris un programme qui combine « ${day.concept} » avec une notion vue un autre jour. Tu choisis le sujet. Critère : il doit fonctionner ET être propre.`,
      difficulty: 'challenge',
      estimatedTime: '3 h+',
      locked: true,
      lockedReason: 'Débloquée après la tâche 03',
    },
  ];
}

export default function TaskSession({
  session,
  day,
  completed,
  onValidate,
  priorSessionsCompleted,
  priorSessionsTotal,
}: TaskSessionProps) {
  const { intro: taskIntro, tasks } = useMemo(() => getTasks(session, day), [session, day]);
  const [taskDone, setTaskDone] = useState<boolean[]>(() => tasks.map(() => false));

  // First task unlocks when at least 1 prior session is done.
  const tasksAccessible = priorSessionsCompleted >= 1;

  // Compute unlock state for each task: first task uses prior progress,
  // subsequent tasks unlock when previous one is marked done (or if the
  // curriculum explicitly marked it as unlocked via t.locked === false).
  const unlockedFlags = tasks.map((t, i) => {
    if (t.locked === false) return true; // explicitly unlocked
    if (i === 0) return tasksAccessible && t.locked !== true;
    return taskDone[i - 1] && t.locked !== true;
  });

  const doneCount = taskDone.filter(Boolean).length;
  const allDone = doneCount === tasks.length;
  const progressPct = Math.round((doneCount / tasks.length) * 100);

  const toggleDone = (i: number) =>
    setTaskDone((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div style={{ padding: '4px 2px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          background: 'rgba(249, 115, 22, 0.08)',
          border: '1px solid rgba(249, 115, 22, 0.25)',
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Target size={20} style={{ color: 'var(--orange, #f97316)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text, #e2e8f0)' }}>
            Tâches Piscine — applique « {day.concept} » dans un vrai rendu
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary, #9ca8a3)', marginTop: 2 }}>
            Les tâches se débloquent au fur et à mesure de ta progression.
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--orange, #f97316)', fontWeight: 700 }}>
          {doneCount}/{tasks.length}
        </div>
      </div>

      {/* Prior progress indicator */}
      <div
        style={{
          marginBottom: 16,
          padding: '10px 12px',
          background: 'var(--bg-elev, #11162a)',
          border: '1px solid var(--border, #2a3151)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Gauge size={16} style={{ color: 'var(--accent-light, #818cf8)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--text-secondary, #9ca8a3)' }}>
            Sessions précédentes : {priorSessionsCompleted}/{priorSessionsTotal}
          </div>
          <ProgressBar
            value={
              priorSessionsTotal > 0
                ? (priorSessionsCompleted / priorSessionsTotal) * 100
                : 0
            }
            height={4}
            color="var(--accent, #6366f1)"
          />
        </div>
      </div>

      {/* Tasks progress */}
      <div style={{ marginBottom: 20 }}>
        <ProgressBar value={progressPct} height={6} color="var(--orange, #f97316)" />
      </div>

      {/* Tasks list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tasks.map((t, i) => {
          const meta = DIFFICULTY_META[t.difficulty];
          const unlocked = unlockedFlags[i];
          const done = taskDone[i];

          return (
            <div
              key={t.id}
              style={{
                border: '1px solid var(--border, #2a3151)',
                borderColor: done
                  ? 'var(--green, #22c55e)'
                  : unlocked
                    ? 'var(--accent, #6366f1)'
                    : 'var(--border, #2a3151)',
                borderRadius: 12,
                background: done ? 'rgba(34,197,94,0.04)' : 'var(--bg-elev, #11162a)',
                overflow: 'hidden',
                opacity: unlocked ? 1 : 0.55,
                transition: 'opacity 0.2s ease, border-color 0.2s ease',
              }}
            >
              <div style={{ padding: '14px 16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  {!unlocked ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 6,
                        background: 'var(--surface, #1f2540)',
                        color: 'var(--text-muted, #5a6863)',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      <Lock size={11} /> Verrouillé
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 6,
                        background: meta.bg,
                        color: meta.color,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {meta.label}
                    </span>
                  )}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11,
                      color: 'var(--text-muted, #5a6863)',
                    }}
                  >
                    <Clock size={12} /> {t.estimatedTime}
                  </span>
                  {t.difficulty === 'challenge' && (
                    <Trophy size={13} style={{ color: meta.color }} />
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
                  {t.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: 'var(--text-secondary, #9ca8a3)',
                  }}
                >
                  {unlocked ? t.description : 'Termine la tâche précédente pour débloquer.'}
                </p>
              </div>

              {unlocked && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderTop: '1px solid var(--border, #2a3151)',
                    background: done ? 'rgba(34,197,94,0.06)' : 'transparent',
                  }}
                >
                  <button
                    onClick={() => toggleDone(i)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: done ? 'rgba(34,197,94,0.12)' : 'var(--surface, #1f2540)',
                      color: done
                        ? 'var(--green, #22c55e)'
                        : 'var(--text-secondary, #9ca8a3)',
                      border: `1px solid ${
                        done ? 'var(--green, #22c55e)' : 'var(--border, #2a3151)'
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
                    {done ? 'Tâche terminée' : 'J\'ai terminé cette tâche'}
                  </button>
                </div>
              )}
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
        {!allDone && !completed && (
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
            Termine toutes les tâches ({doneCount}/{tasks.length}) pour valider.
          </div>
        )}
        <button
          onClick={onValidate}
          disabled={completed || !allDone}
          style={{
            width: '100%',
            padding: '12px 18px',
            background: completed
              ? 'rgba(34,197,94,0.12)'
              : allDone
                ? 'var(--accent, #6366f1)'
                : 'var(--surface, #1f2540)',
            color: completed
              ? 'var(--green, #22c55e)'
              : allDone
                ? '#fff'
                : 'var(--text-muted, #5a6863)',
            border: `1px solid ${
              completed
                ? 'var(--green, #22c55e)'
                : allDone
                  ? 'var(--accent, #6366f1)'
                  : 'var(--border, #2a3151)'
            }`,
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 14,
            cursor: completed || !allDone ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Check size={16} />
          {completed ? 'Tâches validées' : 'Valider les tâches'}
        </button>
      </div>
    </div>
  );
}
