// EpiTous — Glossary page

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ArrowRight } from 'lucide-react';
import { GLOSSARY, GLOSSARY_CATEGORIES, searchGlossary } from '@/lib/glossary';
import type { GlossaryCategory } from '@/types';

export default function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<GlossaryCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const searched = searchGlossary(query);
    if (activeCat === 'all') return searched;
    return searched.filter((t) => t.category === activeCat);
  }, [query, activeCat]);

  const count = (cat: GlossaryCategory | 'all') => {
    if (cat === 'all') return GLOSSARY.length;
    return GLOSSARY.filter((t) => t.category === cat).length;
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <BookOpen size={24} />
          Glossaire
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {GLOSSARY.length} termes essentiels du développeur C/Unix. Cliquer sur un terme pour voir l’exemple et les termes liés.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un terme, une définition…"
          className="ep-input pl-9"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        <CategoryChip active={activeCat === 'all'} onClick={() => setActiveCat('all')} label="Tous" icon="📚" count={count('all')} />
        {GLOSSARY_CATEGORIES.map((c) => (
          <CategoryChip
            key={c.id}
            active={activeCat === c.id}
            onClick={() => setActiveCat(c.id)}
            label={c.label}
            icon={c.icon}
            count={count(c.id)}
          />
        ))}
      </div>

      {/* Terms */}
      {filtered.length === 0 ? (
        <div className="ep-card p-8 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Aucun terme ne correspond à « {query} ».
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((t) => (
            <div key={t.id} className="ep-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold font-mono">{t.term}</h3>
                <span
                  className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--bg-soft)', color: 'var(--text-muted)' }}
                >
                  {GLOSSARY_CATEGORIES.find((c) => c.id === t.category)?.icon}{' '}
                  {GLOSSARY_CATEGORIES.find((c) => c.id === t.category)?.label}
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t.definition}
              </p>
              <pre className="ep-code mt-2 text-xs whitespace-pre overflow-x-auto">{t.example}</pre>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {t.relatedTerms.map((rt) => (
                  <span key={rt} className="ep-chip text-[10px]">
                    {rt}
                  </span>
                ))}
              </div>
              {t.relatedDay && (
                <Link to={`/day/${t.relatedDay}`} className="ep-link text-xs mt-2 inline-flex items-center gap-1">
                  Voir le Jour {t.relatedDay}
                  <ArrowRight size={10} />
                </Link>
              )}
            </div>
          ))}
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
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className="ep-chip cursor-pointer transition"
      style={
        active
          ? { background: 'var(--accent-soft)', borderColor: 'var(--accent)', color: 'var(--accent)' }
          : {}
      }
    >
      <span>{icon}</span>
      <span>{label}</span>
      <span className="opacity-60">({count})</span>
    </button>
  );
}
