// ============================================================================
// EpiTous — ProgressBar (reusable animated progress bar)
// ============================================================================

import type { CSSProperties } from 'react';

export interface ProgressBarProps {
  /** Progress value 0-100 */
  value: number;
  /** Optional label shown above the bar */
  label?: string;
  /** Optional color override (CSS color). Falls back to accent. */
  color?: string;
  /** Optional track color override. */
  trackColor?: string;
  /** Height of the bar in px (default 8) */
  height?: number;
  /** Show percentage text on the right */
  showPercentage?: boolean;
  /** Optional small caption below */
  caption?: string;
  /** Optional inline style override on root */
  style?: CSSProperties;
}

export default function ProgressBar({
  value,
  label,
  color,
  trackColor,
  height = 8,
  showPercentage = false,
  caption,
  style,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const fillColor = color ?? 'var(--accent, #6366f1)';

  return (
    <div style={{ width: '100%', ...style }}>
      {(label || showPercentage) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 6,
            fontSize: 13,
          }}
        >
          {label ? (
            <span style={{ color: 'var(--text-secondary, #9ca8a3)', fontWeight: 500 }}>
              {label}
            </span>
          ) : (
            <span />
          )}
          {showPercentage && (
            <span
              style={{
                color: 'var(--text, #e2e8f0)',
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
                fontSize: 12,
              }}
            >
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height,
          background: trackColor ?? 'var(--surface, #1f2540)',
          borderRadius: height,
          overflow: 'hidden',
          border: '1px solid var(--border, #2a3151)',
        }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${fillColor}, ${fillColor})`,
            borderRadius: height,
            transition: 'width 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
            boxShadow: `0 0 12px ${fillColor}33`,
          }}
        />
      </div>

      {caption && (
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            color: 'var(--text-muted, #5a6863)',
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
