// EpiTous — Error Lab page

import { useMemo, useState } from 'react';
import { Search, FlaskConical, AlertTriangle, Bug } from 'lucide-react';
import { ERRORS, ERROR_CATEGORIES, searchErrors } from '@/lib/errorlab';
import type { ErrorCategory } from '@/types';

export default function ErrorLabPage() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<ErrorCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const searched = searchErrors(query);
    if (activeCat === 'all') return searched;
    return searched.filter((e) => e.category === activeCat);
  }, [query, activeCat]);

  const count = (cat: ErrorCategory | 'all') => {
    if (cat === 'all') return ERRORS.length;
    return ERRORS.filter((e) => e.category === cat).length;
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <FlaskConical size={24} />
          Labo d’erreurs
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {ERRORS.length} erreurs fréquentes en C/Unix. Lis le message, comprends la cause, applique le debug, corrige.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par message, cause, ou mot-clé…"
          className="ep-input pl-9 font-mono"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-1.5">
        <CategoryChip active={activeCat === 'all'} onClick={() => setActiveCat('all')} label="Toutes" icon="🧪" count={count('all')} color="var(--accent)" />
        {ERROR_CATEGORIES.map((c) => (
          <CategoryChip
            key={c.id}
            active={activeCat === c.id}
            onClick={() => setActiveCat(c.id)}
            label={c.label}
            icon={c.icon}
            count={count(c.id)}
            color={c.color}
          />
        ))}
      </div>

      {/* Errors */}
      {filtered.length === 0 ? (
        <div className="ep-card p-8 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Aucune erreur ne correspond à « {query} ».
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((e) => {
            const meta = ERROR_CATEGORIES.find((c) => c.id === e.category)!;
            return (
              <div key={e.id} className="ep-card overflow-hidden">
                {/* Error banner */}
                <div
                  className="px-4 py-3 border-b flex items-center gap-3"
                  style={{ background: `${meta.color}11`, borderColor: `${meta.color}55` }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: `${meta.color}22`, color: meta.color }}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-wider" style={{ color: meta.color }}>
                      {meta.label}
                    </div>
                    <code className="text-sm font-mono font-semibold block truncate">
                      $ {e.errorMessage}
                    </code>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {/* Meaning */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                      Ce que ça veut dire
                    </div>
                    <p className="text-sm">{e.meaning}</p>
                  </div>

                  {/* Causes */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1" style={{ color: '#f59e0b' }}>
                      <AlertTriangle size={12} />
                      Causes fréquentes
                    </div>
                    <ul className="space-y-1">
                      {e.causes.map((c, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span style={{ color: '#f59e0b' }}>•</span>
                          <span style={{ color: 'var(--text-muted)' }}>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Debug steps */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                      <Bug size={12} />
                      Étapes de debug
                    </div>
                    <ol className="space-y-1">
                      {e.debugSteps.map((d, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span
                            className="w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                          >
                            {i + 1}
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>{d}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Fix */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#10b981' }}>
                      ✅ Exemple de correction
                    </div>
                    <pre className="ep-code text-xs whitespace-pre overflow-x-auto">{e.exampleFix}</pre>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
  icon,
  count,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
  count: number;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className="ep-chip cursor-pointer transition"
      style={active ? { background: `${color}22`, borderColor: color, color } : {}}
    >
      <span>{icon}</span>
      <span>{label}</span>
      <span className="opacity-60">({count})</span>
    </button>
  );
}
