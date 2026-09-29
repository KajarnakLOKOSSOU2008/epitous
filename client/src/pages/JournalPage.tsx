// EpiTous — Journal page

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Trash2,
  Download,
  Upload,
  Notebook,
  Calendar,
  Code2,
} from 'lucide-react';
import {
  loadJournal,
  addJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  exportData,
  downloadJson,
  importData,
  resetProgress,
} from '@/lib/store';
import type { JournalEntry } from '@/types';

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(loadJournal());
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [importMsg, setImportMsg] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) =>
      [e.learned, e.notUnderstood, e.mistakes, e.fixes, e.importantCommand, e.importantConcept, e.reviewTomorrow]
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [entries, query]);

  function refresh() {
    setEntries(loadJournal());
  }

  function handleDelete(id: string) {
    if (confirm('Supprimer cette entrée ? Cette action est irréversible.')) {
      deleteJournalEntry(id);
      refresh();
    }
  }

  function handleExport() {
    const data = exportData();
    downloadJson(`epitous-backup-${new Date().toISOString().slice(0, 10)}.json`, data);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const res = importData(String(ev.target?.result ?? ''));
      setImportMsg(res.message);
      refresh();
      setTimeout(() => setImportMsg(null), 3500);
    };
    reader.readAsText(file);
  }

  function handleReset() {
    if (confirm('Réinitialiser TOUTE ta progression (journal + jours validés) ? Irréversible.')) {
      resetProgress();
      refresh();
    }
  }

  function exportMarkdown() {
    const md = entries
      .slice()
      .sort((a, b) => a.dayNumber - b.dayNumber)
      .map((e) => {
        return `# Jour ${e.dayNumber} — ${new Date(e.date).toLocaleDateString('fr-FR')}

## Ce que j'ai appris
${e.learned || '_non renseigné_'}

## Ce que je n'ai pas encore compris
${e.notUnderstood || '_non renseigné_'}

## Mes erreurs
${e.mistakes || '_non renseigné_'}

## Comment je les ai corrigées
${e.fixes || '_non renseigné_'}

## Commande importante
\`${e.importantCommand || '_'}\`

## Concept important
${e.importantConcept || '_non renseigné_'}

## À revoir demain
${e.reviewTomorrow || '_non renseigné_'}

---`;
      })
      .join('\n\n');
    const blob = new Blob([`# Mon Journal de Développement — EpiTous\n\n${md}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'epitous-journal.md';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Notebook size={24} />
            Journal de développement
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Ton manuel personnel de programmation. Tout est local, tout est exportable.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setShowNew(true)} className="ep-btn ep-btn-primary text-sm">
            <Plus size={14} />
            Nouvelle entrée
          </button>
          <button onClick={exportMarkdown} className="ep-btn ep-btn-ghost text-sm">
            <Code2 size={14} />
            Exporter Markdown
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher dans ton journal…"
          className="ep-input pl-9"
        />
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="ep-card p-8 text-center">
          <Notebook size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {query ? 'Aucune entrée ne correspond à ta recherche.' : 'Ton journal est vide. Commence par ta première entrée.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((e) => (
            <JournalCard
              key={e.id}
              entry={e}
              onEdit={() => setEditingId(e.id)}
              onDelete={() => handleDelete(e.id)}
            />
          ))}
        </div>
      )}

      {/* Danger zone */}
      <div className="ep-card p-4 border" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Download size={14} />
              Sauvegarde & restauration
            </h3>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Exporte régulièrement tes données. localStorage peut être effacé.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExport} className="ep-btn ep-btn-ghost text-sm">
              <Download size={14} />
              Export JSON
            </button>
            <label className="ep-btn ep-btn-ghost text-sm cursor-pointer">
              <Upload size={14} />
              Import JSON
              <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
            </label>
            <button onClick={handleReset} className="ep-btn text-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
              <Trash2 size={14} />
              Tout réinitialiser
            </button>
          </div>
        </div>
        {importMsg && (
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            {importMsg}
          </p>
        )}
      </div>

      {/* New entry modal */}
      {showNew && (
        <EntryEditor
          onClose={() => setShowNew(false)}
          onSave={(entry) => {
            addJournalEntry(entry);
            refresh();
            setShowNew(false);
          }}
        />
      )}
      {editingId && (
        <EntryEditor
          entry={entries.find((e) => e.id === editingId)}
          onClose={() => setEditingId(null)}
          onSave={(entry) => {
            updateJournalEntry(editingId, entry);
            refresh();
            setEditingId(null);
          }}
        />
      )}
    </div>
  );
}

function JournalCard({
  entry,
  onEdit,
  onDelete,
}: {
  entry: JournalEntry;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="ep-card p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)' }}
          >
            J{entry.dayNumber}
          </div>
          <div>
            <div className="text-sm font-semibold">Jour {entry.dayNumber}</div>
            <div className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              <Calendar size={10} />
              {new Date(entry.date).toLocaleString('fr-FR')}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="ep-btn ep-btn-ghost text-xs !p-1.5">
            Éditer
          </button>
          <button onClick={onDelete} className="ep-btn text-xs !p-1.5" style={{ color: '#ef4444' }} aria-label="Supprimer">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-2 text-sm">
        <Field label="Appris" value={entry.learned} />
        <Field label="Pas compris" value={entry.notUnderstood} />
        <Field label="Erreurs" value={entry.mistakes} />
        <Field label="Corrections" value={entry.fixes} />
        {entry.importantCommand && (
          <div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Commande importante</div>
            <code className="ep-code text-xs mt-0.5 inline-block">{entry.importantCommand}</code>
          </div>
        )}
        <Field label="Concept important" value={entry.importantConcept} />
        <Field label="À revoir demain" value={entry.reviewTomorrow} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        {label}
      </div>
      <p className="text-sm mt-0.5 whitespace-pre-line" style={{ color: value ? 'var(--text)' : 'var(--text-subtle)' }}>
        {value || '—'}
      </p>
    </div>
  );
}

function EntryEditor({
  entry,
  onSave,
  onClose,
}: {
  entry?: JournalEntry;
  onSave: (e: Omit<JournalEntry, 'id' | 'date'>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    dayNumber: entry?.dayNumber ?? 1,
    learned: entry?.learned ?? '',
    notUnderstood: entry?.notUnderstood ?? '',
    mistakes: entry?.mistakes ?? '',
    fixes: entry?.fixes ?? '',
    importantCommand: entry?.importantCommand ?? '',
    importantConcept: entry?.importantConcept ?? '',
    reviewTomorrow: entry?.reviewTomorrow ?? '',
  });

  function setField<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm({ ...form, [k]: v });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-3 animate-fadeIn" onClick={onClose}>
      <div className="ep-card w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <h2 className="font-bold">{entry ? 'Éditer l’entrée' : 'Nouvelle entrée'}</h2>
          <button onClick={onClose} className="ep-btn ep-btn-ghost text-sm !p-2">
            ✕
          </button>
        </div>
        <div className="overflow-y-auto p-4 space-y-3">
          <div>
            <label className="text-xs font-medium">Jour</label>
            <input
              type="number"
              value={form.dayNumber}
              onChange={(e) => setField('dayNumber', Number(e.target.value))}
              className="ep-input mt-1"
              min={1}
            />
          </div>
          <EntryField label="Ce que j'ai appris" value={form.learned} onChange={(v) => setField('learned', v)} rows={3} />
          <EntryField label="Ce que je n'ai pas compris" value={form.notUnderstood} onChange={(v) => setField('notUnderstood', v)} rows={2} />
          <EntryField label="Mes erreurs" value={form.mistakes} onChange={(v) => setField('mistakes', v)} rows={2} />
          <EntryField label="Comment je les ai corrigées" value={form.fixes} onChange={(v) => setField('fixes', v)} rows={2} />
          <EntryField label="Commande importante" value={form.importantCommand} onChange={(v) => setField('importantCommand', v)} mono />
          <EntryField label="Concept important" value={form.importantConcept} onChange={(v) => setField('importantConcept', v)} />
          <EntryField label="À revoir demain" value={form.reviewTomorrow} onChange={(v) => setField('reviewTomorrow', v)} rows={2} />
        </div>
        <div className="p-3 border-t flex items-center justify-end gap-2" style={{ borderColor: 'var(--border)' }}>
          <button onClick={onClose} className="ep-btn ep-btn-ghost text-sm">
            Annuler
          </button>
          <button
            onClick={() => onSave(form)}
            className="ep-btn ep-btn-primary text-sm"
            disabled={!form.learned.trim()}
            style={{ opacity: form.learned.trim() ? 1 : 0.6 }}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

function EntryField({
  label,
  value,
  onChange,
  rows = 1,
  mono = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium">{label}</label>
      {rows === 1 ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`ep-input mt-1 ${mono ? 'font-mono' : ''}`}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={`ep-input mt-1 ${mono ? 'font-mono' : ''}`}
        />
      )}
    </div>
  );
}
