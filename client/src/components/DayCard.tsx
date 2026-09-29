// ============================================================================
// EpiTous — DayCard (used in Dashboard to preview a day)
// ============================================================================

import { ArrowRight, CheckCircle2, RotateCcw, PlayCircle, Lock } from 'lucide-react';
import type { Day, DayProgress } from '../types';
import ProgressBar from './ProgressBar';

export interface DayCardProps {
  day: Day;
  progress: DayProgress | null;
  /** If true, this day is locked (prerequisites not yet completed) */
  locked?: boolean;
  /** If true, this is the day the student is currently on */
  isCurrent?: boolean;
  /** Click handler — receives day number */
  onClick?: (dayNumber: number) => void;
}

export default function DayCard({
  day,
  progress,
  locked = false,
  isCurrent = false,
  onClick,
}: DayCardProps) {
  const totalSessions = day.sessions.filter((s) => s.type !== 'review').length || 1;
  const completedSessions = progress?.sessionsCompleted?.length ?? 0;
  const pct = Math.min(100, Math.round((completedSessions / totalSessions) * 100));
  const reviewDone = !!progress?.reviewCompleted;

  // Determine status
  let status: 'locked' | 'todo' | 'in-progress' | 'review' | 'done';
  let ctaLabel: string;
  let CtaIcon = ArrowRight;

  if (locked) {
    status = 'locked';
    ctaLabel = 'Verrouillé';
    CtaIcon = Lock;
  } else if (pct === 0) {
    status = 'todo';
    ctaLabel = 'Commencer';
    CtaIcon = PlayCircle;
  } else if (pct >= 100 && !reviewDone) {
    status = 'review';
    ctaLabel = 'Revue du jour';
    CtaIcon = RotateCcw;
  } else if (pct >= 100 && reviewDone) {
    status = 'done';
    ctaLabel = 'Revoir';
    CtaIcon = CheckCircle2;
  } else {
    status = 'in-progress';
    ctaLabel = 'Continuer';
    CtaIcon = ArrowRight;
  }

  return (
    <div
      onClick={() => !locked && onClick?.(day.number)}
      role="button"
      tabIndex={locked ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !locked) {
          e.preventDefault();
          onClick?.(day.number);
        }
      }}
      style={{
        position: 'relative',
        background: 'var(--bg-card, #161b2e)',
        border: `1px solid ${isCurrent ? 'var(--accent, #6366f1)' : 'var(--border, #2a3151)'}`,
        borderRadius: 16,
        padding: 20,
        cursor: locked ? 'not-allowed' : 'pointer',
        transition: 'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
        opacity: locked ? 0.55 : 1,
        boxShadow: isCurrent ? '0 0 0 3px rgba(99,102,241,0.18)' : 'none',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (locked) return;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'var(--accent, #6366f1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = isCurrent
          ? 'var(--accent, #6366f1)'
          : 'var(--border, #2a3151)';
      }}
    >
      {/* Day number badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent, #6366f1)',
              marginBottom: 6,
            }}
          >
            Jour {String(day.number).padStart(2, '0')}
            {isCurrent && (
              <span
                style={{
                  marginLeft: 8,
                  padding: '2px 8px',
                  borderRadius: 999,
                  fontSize: 10,
                  background: 'rgba(99,102,241,0.15)',
                  color: 'var(--accent-light, #818cf8)',
                }}
              >
                En cours
              </span>
            )}
          </div>
          <h3
            style={{
              margin: '0 0 4px 0',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--text, #e2e8f0)',
              lineHeight: 1.2,
            }}
          >
            {day.title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: 'var(--text-secondary, #9ca8a3)',
              lineHeight: 1.4,
            }}
          >
            {day.concept}
          </p>
        </div>
        {status === 'done' && (
          <CheckCircle2
            size={20}
            style={{ color: 'var(--green, #22c55e)', flexShrink: 0 }}
          />
        )}
        {locked && <Lock size={18} style={{ color: 'var(--text-muted, #5a6863)' }} />}
      </div>

      {/* Progress */}
      <div style={{ marginTop: 16 }}>
        <ProgressBar
          value={pct}
          height={6}
          showPercentage
          color={
            status === 'done'
              ? 'var(--green, #22c55e)'
              : status === 'review'
                ? 'var(--amber, #fbbf24)'
                : undefined
          }
        />
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 13,
          fontWeight: 600,
          color: locked ? 'var(--text-muted, #5a6863)' : 'var(--accent, #6366f1)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <CtaIcon size={15} />
          {ctaLabel}
        </span>
        {(progress?.sessionsCompleted?.length ?? 0) > 0 && (
          <span style={{ fontSize: 11, color: 'var(--text-muted, #5a6863)' }}>
            {completedSessions}/{totalSessions} sessions
          </span>
        )}
      </div>
    </div>
  );
}
