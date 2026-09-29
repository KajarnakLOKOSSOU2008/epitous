// EpiTous — "What should I do?" modal
// Real contextual advice based on stored progress, journal, and streak.

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Compass,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Sparkles,
  Target,
  Notebook,
} from 'lucide-react';
import {
  loadProgress,
  loadJournal,
  getCurrentDay,
  getStreak,
  getDayProgress,
} from '@/lib/store';
import { getDayByNumber, TOTAL_DAYS } from '@/lib/curriculum';
import { struggleScore } from '@/lib/analyzer';

interface Advice {
  level: 'info' | 'next' | 'warning';
  title: string;
  body: string;
  cta?: { to: string; label: string };
}

export default function WhatShouldIDo({ onClose }: { onClose: () => void }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    // Re-render on open (in case state changed since first mount)
    setTick((t) => t + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const advice = useMemo<Advice[]>(() => {
    const out: Advice[] = [];
    const progress = loadProgress();
    const journal = loadJournal();
    const currentDay = getCurrentDay();
    const streak = getStreak();
    const day = getDayByNumber(currentDay);

    // 1. Current day context
    if (!day) {
      out.push({
        level: 'info',
        title: 'Curriculum terminé 🎉',
        body: `Tu as complété les ${TOTAL_DAYS} jours du programme EpiTous. Revois tes notes de journal, et crée ton propre mini-projet C.`,
        cta: { to: '/journal', label: 'Relire mon journal' },
      });
      return out;
    }

    const dp = getDayProgress(currentDay);
    const totalSessions = day.sessions.length;
    const doneSessions = dp.sessionsCompleted.length;
    const missingSessions = day.sessions.filter((s) => !dp.sessionsCompleted.includes(s.id));

    // 2. If first session not done, prioritize warmup
    if (doneSessions === 0) {
      out.push({
        level: 'next',
        title: `Commence le Jour ${String(currentDay).padStart(2, '0')} — ${day.title}`,
        body: `Tu n'as encore validé aucune session aujourd'hui. Commence par l'échauffement pour activer tes neurones, puis enchaîne le cours.`,
        cta: { to: `/day/${currentDay}`, label: `Aller au Jour ${currentDay}` },
      });
    } else if (doneSessions < totalSessions) {
      const next = missingSessions[0];
      out.push({
        level: 'next',
        title: `Continue le Jour ${currentDay} (${doneSessions}/${totalSessions} sessions)`,
        body: `Prochaine session : ${next.title} prévue à ${next.duration}. Tu avances bien, garde le cap.`,
        cta: { to: `/day/${currentDay}`, label: 'Reprendre ici' },
      });
    } else if (!dp.reviewCompleted) {
      out.push({
        level: 'next',
        title: 'Termine ta fin de journée 🧠',
        body: `Tu as validé toutes les sessions du Jour ${currentDay}. Maintenant, fais ta revue de fin de journée : on va analyser ce que tu as retenu.`,
        cta: { to: `/day/${currentDay}`, label: 'Faire la revue' },
      });
    } else {
      // All done — go to next day
      const nextDay = currentDay + 1;
      const nextDayDef = getDayByNumber(nextDay);
      if (nextDayDef) {
        out.push({
          level: 'info',
          title: `Jour ${currentDay} terminé ✅ — passe au Jour ${nextDay}`,
          body: `Demain : ${nextDayDef.title}. Repose-toi un peu, puis ouvre le programme de demain pour avoir un aperçu.`,
          cta: { to: `/day/${nextDay}`, label: `Préparer le Jour ${nextDay}` },
        });
      } else {
        out.push({
          level: 'info',
          title: 'Bravo, tu as fini le programme 🎉',
          body: 'Toutes les journées sont validées. Construis ton propre mini-projet C pour ancrer tout ça.',
        });
      }
    }

    // 3. Look at last journal entry for struggle signals
    const lastEntry = journal[0];
    if (lastEntry) {
      const text = `${lastEntry.learned} ${lastEntry.notUnderstood} ${lastEntry.mistakes}`;
      const score = struggleScore(text);
      if (score >= 36) {
        // Find a related day to review
        const lower = text.toLowerCase();
        let reviewDay = 7; // pointers by default
        if (lower.includes('boucle') || lower.includes('while') || lower.includes('for')) reviewDay = 6;
        else if (lower.includes('fonction') || lower.includes('param')) reviewDay = 5;
        else if (lower.includes('variable') || lower.includes('type')) reviewDay = 4;
        else if (lower.includes('compil') || lower.includes('gcc')) reviewDay = 3;
        else if (lower.includes('terminal') || lower.includes('command')) reviewDay = 2;
        out.push({
          level: 'warning',
          title: 'Ton dernier journal signale des difficultés 🟡',
          body: `Tu mentionnes des blocages (score de difficulté ${score}/100). On recommande de revoir le Jour ${reviewDay} avant de continuer. La fondation doit être solide.`,
          cta: { to: `/day/${reviewDay}`, label: `Revoir le Jour ${reviewDay}` },
        });
      }

      if (lastEntry.reviewTomorrow && lastEntry.reviewTomorrow.trim().length > 0) {
        out.push({
          level: 'info',
          title: 'Tu avais noté quelque chose à revoir 📓',
          body: `« ${lastEntry.reviewTomorrow.slice(0, 220)}${lastEntry.reviewTomorrow.length > 220 ? '…' : ''} » — c'est le moment de vérifier que tu as comblé ce trou.`,
          cta: { to: '/journal', label: 'Ouvrir mon journal' },
        });
      }
    }

    // 4. Streak nudge
    if (streak === 0) {
      out.push({
        level: 'info',
        title: 'Ta série est à 0 jour',
        body: "Écris au moins une entrée de journal aujourd'hui pour démarrer ta série. Une entrée courte vaut mieux que pas d'entrée du tout.",
        cta: { to: '/journal', label: 'Écrire une entrée' },
      });
    } else if (streak >= 3) {
      out.push({
        level: 'info',
        title: `Série de ${streak} jours 🔥`,
        body: 'Continue ! La régularité bat l’intensité. Même 30 minutes demain comptent.',
      });
    }

    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  // Quick stats
  const stats = useMemo(() => {
    const progress = loadProgress();
    const daysDone = progress.filter((p) => p.reviewCompleted).length;
    const exercises = progress.reduce((s, p) => s + (p.exercisesCompleted || 0), 0);
    const journal = loadJournal().length;
    const streak = getStreak();
    return { daysDone, exercises, journal, streak };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-3"
      onClick={onClose}
    >
      <div
        className="ep-card w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slideUp flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg,#6366f1 0%, #22d3ee 100%)' }}
            >
              <Compass size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Que dois-je faire ?</h2>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Conseils contextuels basés sur ta progression réelle
              </p>
            </div>
          </div>
          <button onClick={onClose} className="ep-btn ep-btn-ghost !p-2" aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-2 p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <Stat icon={<Target size={14} />} label="Jours validés" value={stats.daysDone} />
          <Stat icon={<CheckCircle2 size={14} />} label="Exercices" value={stats.exercises} />
          <Stat icon={<Notebook size={14} />} label="Entrées journal" value={stats.journal} />
          <Stat icon={<Sparkles size={14} />} label="Série (jours)" value={stats.streak} accent />
        </div>

        {/* Advice list */}
        <div className="overflow-y-auto p-4 space-y-3">
          {advice.map((a, i) => (
            <AdviceCard key={i} advice={a} />
          ))}
          {advice.length === 0 && (
            <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
              Tout va bien. Continue comme ça.
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 border-t flex items-center justify-between text-xs"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          <span>EpiTous ne te laisse jamais perdu·e.</span>
          <Link to="/dashboard" onClick={onClose} className="ep-link">
            Voir mon tableau de bord →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-2 flex flex-col items-center text-center"
      style={{ background: accent ? 'var(--accent-soft)' : 'var(--bg-soft)' }}
    >
      <div
        className="flex items-center justify-center w-7 h-7 rounded-lg mb-1"
        style={{ color: accent ? 'var(--accent)' : 'var(--text-muted)', background: 'transparent' }}
      >
        {icon}
      </div>
      <div className="text-base font-bold leading-none">{value}</div>
      <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </div>
    </div>
  );
}

function AdviceCard({ advice }: { advice: Advice }) {
  const palette =
    advice.level === 'warning'
      ? { bg: 'rgba(245, 158, 11, 0.10)', border: '#f59e0b', icon: <AlertTriangle size={18} /> }
      : advice.level === 'next'
        ? { bg: 'rgba(99, 102, 241, 0.12)', border: '#6366f1', icon: <Circle size={18} /> }
        : { bg: 'var(--bg-soft)', border: 'var(--border)', icon: <CheckCircle2 size={18} /> };
  return (
    <div
      className="rounded-xl p-3 border flex gap-3 items-start"
      style={{ background: palette.bg, borderColor: palette.border }}
    >
      <div style={{ color: palette.border }}>{palette.icon}</div>
      <div className="flex-1">
        <div className="font-semibold text-sm">{advice.title}</div>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
          {advice.body}
        </p>
        {advice.cta && (
          <Link to={advice.cta.to} className="ep-btn ep-btn-primary mt-2 !py-1.5 !px-3 text-xs">
            {advice.cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
