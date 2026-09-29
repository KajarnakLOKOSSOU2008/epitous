// EpiTous — localStorage persistence layer
// All data is stored locally in the browser. No backend.

import type { DayProgress, JournalEntry, ReviewAnalysis } from '../types';

const PROGRESS_KEY = 'epitous:progress';
const JOURNAL_KEY = 'epitous:journal';
const THEME_KEY = 'epitous:theme';

// ---------- helpers ----------

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Quota / privacy mode — fail silently
    console.warn('[EpiTous] localStorage write failed:', err);
  }
}

function genId(): string {
  return `e_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// ---------- Progress ----------

export function loadProgress(): DayProgress[] {
  return safeParse<DayProgress[]>(localStorage.getItem(PROGRESS_KEY), []);
}

export function saveProgress(progress: DayProgress[]): void {
  safeWrite(PROGRESS_KEY, progress);
}

export function getDayProgress(dayNumber: number): DayProgress {
  const all = loadProgress();
  const found = all.find((p) => p.dayNumber === dayNumber);
  if (found) return found;
  return {
    dayNumber,
    sessionsCompleted: [],
    exercisesCompleted: 0,
    reviewCompleted: false,
    reviewText: '',
    reviewAnalysis: { understood: [], partial: [], toReview: [] },
  };
}

function upsertDayProgress(dayNumber: number, mutate: (p: DayProgress) => DayProgress): DayProgress {
  const all = loadProgress();
  const idx = all.findIndex((p) => p.dayNumber === dayNumber);
  const current: DayProgress = idx >= 0 ? all[idx] : getDayProgress(dayNumber);
  const next = mutate({ ...current, sessionsCompleted: [...current.sessionsCompleted] });
  if (idx >= 0) all[idx] = next;
  else all.push(next);
  saveProgress(all);
  return next;
}

export function setSessionCompleted(dayNumber: number, sessionId: string): DayProgress {
  return upsertDayProgress(dayNumber, (p) => {
    if (!p.sessionsCompleted.includes(sessionId)) {
      p.sessionsCompleted.push(sessionId);
    }
    return p;
  });
}

export function setSessionIncomplete(dayNumber: number, sessionId: string): DayProgress {
  return upsertDayProgress(dayNumber, (p) => {
    p.sessionsCompleted = p.sessionsCompleted.filter((id) => id !== sessionId);
    return p;
  });
}

export function setExercisesCompleted(dayNumber: number, count: number): DayProgress {
  return upsertDayProgress(dayNumber, (p) => {
    p.exercisesCompleted = count;
    return p;
  });
}

export function setReviewCompleted(
  dayNumber: number,
  text: string,
  analysis: ReviewAnalysis,
): DayProgress {
  return upsertDayProgress(dayNumber, (p) => {
    p.reviewCompleted = true;
    p.reviewText = text;
    p.reviewAnalysis = analysis;
    return p;
  });
}

// ---------- Journal ----------

export function loadJournal(): JournalEntry[] {
  const entries = safeParse<JournalEntry[]>(localStorage.getItem(JOURNAL_KEY), []);
  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function saveJournal(entries: JournalEntry[]): void {
  safeWrite(JOURNAL_KEY, entries);
}

export function addJournalEntry(
  entry: Omit<JournalEntry, 'id' | 'date'> & { id?: string; date?: string },
): JournalEntry {
  const all = loadJournal();
  const full: JournalEntry = {
    id: entry.id ?? genId(),
    date: entry.date ?? new Date().toISOString(),
    dayNumber: entry.dayNumber,
    learned: entry.learned ?? '',
    notUnderstood: entry.notUnderstood ?? '',
    mistakes: entry.mistakes ?? '',
    fixes: entry.fixes ?? '',
    importantCommand: entry.importantCommand ?? '',
    importantConcept: entry.importantConcept ?? '',
    reviewTomorrow: entry.reviewTomorrow ?? '',
  };
  const filtered = all.filter((e) => e.id !== full.id);
  filtered.push(full);
  saveJournal(filtered);
  return full;
}

export function updateJournalEntry(id: string, partial: Partial<JournalEntry>): JournalEntry | null {
  const all = loadJournal();
  const idx = all.findIndex((e) => e.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...partial, id: all[idx].id };
  saveJournal(all);
  return all[idx];
}

export function deleteJournalEntry(id: string): void {
  const all = loadJournal().filter((e) => e.id !== id);
  saveJournal(all);
}

export function getJournalForDay(dayNumber: number): JournalEntry | null {
  const entries = loadJournal().filter((e) => e.dayNumber === dayNumber);
  return entries[0] ?? null;
}

export function getLastJournalEntry(): JournalEntry | null {
  const entries = loadJournal();
  return entries[0] ?? null;
}

// ---------- Stats ----------

export function getStreak(): number {
  const entries = loadJournal();
  if (entries.length === 0) return 0;
  const days = new Set(
    entries.map((e) => {
      const d = new Date(e.date);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }),
  );
  let streak = 0;
  const cursor = new Date();
  // Walk backwards day-by-day; count consecutive days with an entry.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const key = `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`;
    if (days.has(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      // Allow today to be empty (streak still alive if yesterday has one)
      if (streak === 0) {
        cursor.setDate(cursor.getDate() - 1);
        const key2 = `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`;
        if (days.has(key2)) {
          streak += 1;
          cursor.setDate(cursor.getDate() - 1);
          continue;
        }
      }
      break;
    }
  }
  return streak;
}

export function getDaysCompleted(): number {
  // A day counts as "completed" if its review is done
  return loadProgress().filter((p) => p.reviewCompleted).length;
}

export function getTotalExercisesCompleted(): number {
  return loadProgress().reduce((sum, p) => sum + (p.exercisesCompleted || 0), 0);
}

export function getCurrentDay(): number {
  // First day with incomplete sessions, defaulting to 1
  const progress = loadProgress();
  if (progress.length === 0) return 1;
  // Look for the smallest day number where reviewCompleted is false
  const sorted = [...progress].sort((a, b) => a.dayNumber - b.dayNumber);
  const incomplete = sorted.find((p) => !p.reviewCompleted);
  if (incomplete) return incomplete.dayNumber;
  // If all known days are complete, suggest the next day
  const maxDay = sorted[sorted.length - 1].dayNumber;
  return maxDay + 1;
}

// ---------- Theme ----------

export type Theme = 'dark' | 'light';

export function loadTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  // Default: dark
  return 'dark';
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
}

// ---------- Export / Import ----------

export interface EpiTousBackup {
  version: 1;
  exportedAt: string;
  progress: DayProgress[];
  journal: JournalEntry[];
}

export function exportData(): EpiTousBackup {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: loadProgress(),
    journal: loadJournal(),
  };
}

export function importData(json: string): { ok: boolean; message: string } {
  try {
    const parsed = JSON.parse(json) as Partial<EpiTousBackup>;
    if (!parsed || typeof parsed !== 'object') {
      return { ok: false, message: 'JSON invalide.' };
    }
    if (Array.isArray(parsed.progress)) saveProgress(parsed.progress);
    if (Array.isArray(parsed.journal)) saveJournal(parsed.journal);
    return { ok: true, message: 'Données importées avec succès.' };
  } catch (err) {
    return { ok: false, message: `Erreur d'import : ${(err as Error).message}` };
  }
}

export function resetProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(JOURNAL_KEY);
}

export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
