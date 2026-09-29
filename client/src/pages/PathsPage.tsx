// EpiTous — Paths page (curriculum overview)

import { Link } from 'react-router-dom';
import { ArrowRight, Lock, CheckCircle2, Route as RouteIcon } from 'lucide-react';
import { CURRICULUM_PATHS } from '@/lib/curriculum';
import type { PathStatus } from '@/types';

const STATUS_META: Record<PathStatus, { icon: React.ReactNode; color: string; label: string }> = {
  available: { icon: <CheckCircle2 size={14} />, color: '#22d3ee', label: 'Disponible' },
  completed: { icon: <CheckCircle2 size={14} />, color: '#10b981', label: 'Terminé' },
  locked: { icon: <Lock size={14} />, color: 'var(--text-subtle)', label: 'Verrouillé' },
};

export default function PathsPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <RouteIcon size={24} />
          Parcours
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          La carte complète de ton apprentissage. La Piscine Epitech est le premier parcours. D’autres suivront.
        </p>
      </div>

      {/* Tree */}
      <div className="relative">
        {/* Vertical connector */}
        <div
          className="absolute left-[27px] sm:left-[31px] top-0 bottom-0 w-0.5"
          style={{ background: 'linear-gradient(to bottom, #6366f1 0%, #22d3ee 100%)', opacity: 0.25 }}
        />
        <div className="space-y-3">
          {CURRICULUM_PATHS.map((p, i) => {
            const statusMeta = STATUS_META[p.status as PathStatus];

            return (
              <div key={p.id} className="relative flex items-stretch gap-3">
                {/* Node */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 relative z-10"
                  style={{
                    background: p.status === 'locked' ? 'var(--bg-soft)' : 'var(--bg-elev)',
                    border: `2px solid ${p.status === 'locked' ? 'var(--border)' : statusMeta.color}`,
                    opacity: p.status === 'locked' ? 0.6 : 1,
                  }}
                >
                  {p.icon}
                </div>

                {/* Card */}
                <div
                  className="flex-1 ep-card p-4"
                  style={{ opacity: p.status === 'locked' ? 0.65 : 1 }}
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="font-bold">{p.title}</h3>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {p.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1"
                        style={{ background: `${statusMeta.color}22`, color: statusMeta.color }}
                      >
                        {statusMeta.icon}
                        {statusMeta.label}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        ~{p.estimatedDays}j
                      </span>
                    </div>
                  </div>

                  {p.prerequisites.length > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        Prérequis :
                      </span>
                      {p.prerequisites.map((pr) => {
                        const prereq = CURRICULUM_PATHS.find((x) => x.id === pr);
                        return (
                          <span key={pr} className="ep-chip text-[10px]">
                            {prereq?.icon} {prereq?.title ?? pr}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {p.status !== 'locked' && p.id === 'c' && (
                    <Link
                      to="/dashboard"
                      className="ep-btn ep-btn-primary text-xs mt-3 !py-1.5"
                    >
                      Commencer ce parcours
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ep-card p-4">
        <h3 className="font-bold text-sm mb-1">À venir</h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Les parcours Web, Python, Data, IA et Cybersecurity seront débloqués après que tu aies validé
          les fondamentaux (C, Unix, Git, Algorithmes). Construis des fondations solides : tout le reste s’appuiera dessus.
        </p>
      </div>
    </div>
  );
}
