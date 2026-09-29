// EpiTous — Dashboard (student home)

import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import {
  Play,
  Calendar,
  CheckCircle2,
  Dumbbell,
  Target,
  Sparkles,
  Flame,
  Notebook,
  ArrowRight,
  Clock,
  Download,
  Upload,
} from 'lucide-react';
import {
  loadProgress,
  loadJournal,
  getCurrentDay,
  getStreak,
  getDayProgress,
  exportData,
  downloadJson,
  importData,
} from '@/lib/store';
import { getDayByNumber } from '@/lib/curriculum';

export default function DashboardPage() {
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const data = useMemo(() => {
    const progress = loadProgress();
    const journal = loadJournal();
    const streak = getStreak();
    const currentDay = getCurrentDay();
    const day = getDayByNumber(currentDay);
    const dp = getDayProgress(currentDay);
    return { progress, journal, streak, currentDay, day, dp };
  }, []);

  function handleExport() {
    downloadJson(`epitous-backup-${new Date().toISOString().slice(0, 10)}.json`, exportData());
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const res = importData(String(ev.target?.result ?? ''));
      setImportMsg(res.message);
      setTimeout(() => {
        setImportMsg(null);
        window.location.reload();
      }, 1500);
    };
    reader.readAsText(file);
  }

  const daysDone = data.progress.filter((p) => p.reviewCompleted).length;
  const exercises = data.progress.reduce((s, p) => s + (p.exercisesCompleted || 0), 0);
  const completedSessions = data.dp.sessionsCompleted.length;
  const totalSessions = data.day?.sessions.length ?? 0;
  const progressPct =
    totalSessions > 0 ? Math.round(((completedSessions + (data.dp.reviewCompleted ? 1 : 0)) / (totalSessions + 1)) * 100) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Bienvenue. Voici où tu en es aujourd’hui.
          </p>
          {importMsg && (
            <p className="text-xs mt-2" style={{ color: 'var(--accent)' }}>
              {importMsg}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={handleExport} className="ep-btn ep-btn-ghost text-xs" title="Exporter tes données">
            <Download size={14} />
            Exporter
          </button>
          <label className="ep-btn ep-btn-ghost text-xs cursor-pointer" title="Importer une sauvegarde">
            <Upload size={14} />
            Importer
            <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
          </label>
          <Link
            to={`/day/${data.currentDay}`}
            className="ep-btn ep-btn-primary text-base px-5 py-3 glow-indigo"
          >
            <Play size={18} />
            Commencer ma journée
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={<CheckCircle2 />} label="Jours validés" value={daysDone} accent="primary" />
        <StatCard icon={<Target />} label="Exercices" value={exercises} accent="accent" />
        <StatCard icon={<Notebook />} label="Entrées journal" value={data.journal.length} />
        <StatCard icon={<Flame />} label="Série (jours)" value={data.streak} accent="primary" />
      </div>

      {/* Current day card */}
      {data.day && (
        <div className="ep-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Aujourd’hui
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)' }}
                >
                  {String(data.day.number).padStart(2, '0')}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{data.day.title}</h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {data.day.concept}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gradient">{progressPct}%</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {completedSessions}/{totalSessions} sessions
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="mt-4 h-2 rounded-full overflow-hidden"
            style={{ background: 'var(--bg-soft)' }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)' }}
            />
          </div>

          {/* Schedule preview */}
          <div className="mt-5">
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
              Planning du jour
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {data.day.sessions.map((s) => {
                const done = data.dp.sessionsCompleted.includes(s.id);
                return (
                  <div
                    key={s.id}
                    className="rounded-xl p-2.5 border flex items-center gap-2"
                    style={{
                      background: done ? 'var(--accent-soft)' : 'var(--bg-soft)',
                      borderColor: done ? 'var(--accent)' : 'var(--border)',
                      opacity: done ? 1 : 0.85,
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                      style={{ background: done ? 'var(--accent)' : 'var(--border)', color: done ? '#fff' : 'var(--text-muted)' }}
                    >
                      {done ? '✓' : <Clock size={12} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{s.title}</div>
                      <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        {s.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link to={`/day/${data.day.number}`} className="ep-btn ep-btn-ghost mt-4 text-sm">
            Ouvrir le jour {data.day.number}
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Recent journal entries */}
      <div className="ep-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Notebook size={16} />
            <h3 className="font-bold">Dernières entrées du journal</h3>
          </div>
          <Link to="/journal" className="ep-link text-sm">
            Tout voir →
          </Link>
        </div>
        {data.journal.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Aucune entrée pour l’instant. Écris ta première revue de fin de journée dans un Jour, ou crée une entrée libre dans le Journal.
          </p>
        ) : (
          <ul className="space-y-2">
            {data.journal.slice(0, 3).map((e) => (
              <li
                key={e.id}
                className="rounded-xl p-3 border"
                style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                  <span>Jour {e.dayNumber}</span>
                  <span>{new Date(e.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <p className="text-sm line-clamp-2">
                  {e.learned || <span style={{ color: 'var(--text-muted)' }}>(vide)</span>}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick tip */}
      <div className="ep-card p-4 flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
        >
          <Dumbbell size={16} />
        </div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--text)' }}>Astuce :</strong> Le bouton flottant en bas à droite
          (« Que dois-je faire ? ») te donne des conseils contextuels à tout moment, basés sur ta vraie progression.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: 'primary' | 'accent';
}) {
  const color = accent === 'primary' ? '#6366f1' : accent === 'accent' ? '#22d3ee' : 'var(--text-muted)';
  return (
    <div className="ep-card p-4">
      <div className="flex items-center gap-2 mb-2" style={{ color }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}22` }}>
          {icon}
        </div>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
