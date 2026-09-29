// EpiTous — DayPage (the core experience)
// Renders all sessions for a given day, with inline interaction.

import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  ChevronDown,
  ChevronRight,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  Lightbulb,
  ListChecks,
  Play,
  Search,
  Target,
  Video,
  PenLine,
  Save,
  AlertTriangle,
} from 'lucide-react';
import { getDayByNumber, TOTAL_DAYS } from '@/lib/curriculum';
import {
  getDayProgress,
  setSessionCompleted,
  setSessionIncomplete,
  setExercisesCompleted,
  setReviewCompleted,
  addJournalEntry,
  getJournalForDay,
} from '@/lib/store';
import { analyzeReview } from '@/lib/analyzer';
import type { LucideIcon } from 'lucide-react';
import type { FullDay, DayProgress } from '@/types';

const SESSION_META: Record<
  string,
  { label: string; icon: LucideIcon }
> = {
  warmup: { label: 'Échauffement', icon: Cpu },
  course: { label: 'Cours', icon: Code2 },
  research: { label: 'Recherche', icon: Search },
  video: { label: 'Vidéo', icon: Video },
  practice: { label: 'Pratique', icon: Play },
  epitech: { label: 'Mode Epitech', icon: Compass },
  task: { label: 'Tâches', icon: ListChecks },
  review: { label: 'Revue', icon: PenLine },
};

export default function DayPage() {
  const { number } = useParams<{ number: string }>();
  const dayNumber = Number(number);
  const day = getDayByNumber(dayNumber);

  const [progress, setProgress] = useState<DayProgress>(getDayProgress(dayNumber));

  useEffect(() => {
    setProgress(getDayProgress(dayNumber));
  }, [dayNumber]);

  if (!day) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold">Jour introuvable</h1>
        <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
          Le jour {dayNumber} n’existe pas encore.
        </p>
        <Link to="/dashboard" className="ep-btn ep-btn-ghost mt-4">
          Retour au tableau de bord
        </Link>
      </div>
    );
  }

  function toggleSession(sessionId: string) {
    const isDone = progress.sessionsCompleted.includes(sessionId);
    const next = isDone
      ? setSessionIncomplete(dayNumber, sessionId)
      : setSessionCompleted(dayNumber, sessionId);
    setProgress({ ...next });
  }

  const completedSessions = progress.sessionsCompleted.length;
  const totalSessions = day.sessions.length;
  const pct = Math.round((completedSessions / totalSessions) * 100);

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      {/* Header */}
      <div>
        <Link to="/dashboard" className="ep-link text-sm flex items-center gap-1 mb-2">
          <ArrowLeft size={14} />
          Tableau de bord
        </Link>
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-lg"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)' }}
          >
            {String(day.number).padStart(2, '0')}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{day.title}</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {day.concept}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>
          {day.description}
        </p>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-soft)' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)' }}
            />
          </div>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {completedSessions}/{totalSessions} ({pct}%)
          </span>
        </div>
      </div>

      {/* Objectives */}
      <div className="ep-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target size={16} />
          <h3 className="font-bold text-sm">Objectifs du jour</h3>
        </div>
        <ul className="space-y-1">
          {day.objectives.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sessions */}
      <div className="space-y-3">
        {day.sessions.map((s) => {
          const meta = SESSION_META[s.type];
          const Icon = meta.icon;
          const done = progress.sessionsCompleted.includes(s.id);
          return (
            <SessionBlock
              key={s.id}
              day={day}
              sessionId={s.id}
              title={s.title}
              duration={s.duration}
              icon={<Icon size={16} />}
              label={meta.label}
              done={done}
              onToggle={() => toggleSession(s.id)}
              progress={progress}
              setProgress={setProgress}
            />
          );
        })}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between pt-2">
        {dayNumber > 1 ? (
          <Link to={`/day/${dayNumber - 1}`} className="ep-btn ep-btn-ghost text-sm">
            <ArrowLeft size={14} />
            Jour {dayNumber - 1}
          </Link>
        ) : (
          <span />
        )}
        {dayNumber < TOTAL_DAYS ? (
          <Link to={`/day/${dayNumber + 1}`} className="ep-btn ep-btn-primary text-sm">
            Jour {dayNumber + 1}
            <ChevronRight size={14} />
          </Link>
        ) : (
          <Link to="/paths" className="ep-btn ep-btn-primary text-sm">
            Voir les parcours
          </Link>
        )}
      </div>
    </div>
  );
}

function SessionBlock({
  day,
  sessionId,
  title,
  duration,
  icon,
  label,
  done,
  onToggle,
  progress,
  setProgress,
}: {
  day: FullDay;
  sessionId: string;
  title: string;
  duration: string;
  icon: React.ReactNode;
  label: string;
  done: boolean;
  onToggle: () => void;
  progress: DayProgress;
  setProgress: (p: DayProgress) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ep-card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-4 text-left"
        style={{ opacity: done ? 0.85 : 1 }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: done ? 'var(--accent-soft)' : 'var(--bg-soft)',
            color: done ? 'var(--accent)' : 'var(--text-muted)',
          }}
        >
          {done ? <CheckCircle2 size={18} /> : icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {label}
            </span>
            <span className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>
              ·
            </span>
            <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              <Clock size={10} />
              {duration}
            </span>
          </div>
          <div className="font-semibold text-sm truncate">{title}</div>
        </div>
        <ChevronDown
          size={16}
          className="flex-shrink-0 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'none', color: 'var(--text-muted)' }}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 animate-fadeIn">
          <SessionContent day={day} sessionId={sessionId} progress={progress} setProgress={setProgress} />
          <div className="mt-4 flex items-center justify-end gap-2">
            <button onClick={onToggle} className={done ? 'ep-btn ep-btn-ghost text-sm' : 'ep-btn ep-btn-primary text-sm'}>
              {done ? (
                <>
                  <Circle size={14} />
                  Marquer non fait
                </>
              ) : (
                <>
                  <CheckCircle2 size={14} />
                  Marquer comme fait
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SessionContent({
  day,
  sessionId,
  progress,
  setProgress,
}: {
  day: FullDay;
  sessionId: string;
  progress: DayProgress;
  setProgress: (p: DayProgress) => void;
}) {
  const c = day.content;
  if (sessionId.endsWith('-warmup')) return <WarmupView questions={c.warmup.questions} />;
  if (sessionId.endsWith('-course')) return <CourseView content={c.course} />;
  if (sessionId.endsWith('-research')) return <ResearchView content={c.research} />;
  if (sessionId.endsWith('-video')) return <VideoView content={c.video} />;
  if (sessionId.endsWith('-practice'))
    return (
      <PracticeView
        content={c.practice}
        completed={progress.exercisesCompleted}
        onChange={(n) => {
          const next = setExercisesCompleted(day.number, n);
          setProgress({ ...next });
        }}
      />
    );
  if (sessionId.endsWith('-epitech')) return <EpitechView content={c.epitech} />;
  if (sessionId.endsWith('-task')) return <TaskView content={c.tasks} />;
  if (sessionId.endsWith('-review'))
    return (
      <ReviewView
        dayNumber={day.number}
        objectives={day.objectives}
        progress={progress}
        setProgress={setProgress}
      />
    );
  return null;
}

// ─── Views ─────────────────────────────────────────────────────────

function WarmupView({ questions }: { questions: { q: string; a: string }[] }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        Réponds d’abord dans ta tête, puis révèle la réponse. Sois honnête avec toi-même.
      </p>
      {questions.map((q, i) => (
        <div key={i} className="rounded-xl p-3 border" style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}>
          <div className="text-sm font-medium mb-1">
            {i + 1}. {q.q}
          </div>
          {revealed[i] ? (
            <p className="text-sm mt-2 p-2 rounded-lg font-mono" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
              {q.a}
            </p>
          ) : (
            <button onClick={() => setRevealed({ ...revealed, [i]: true })} className="ep-btn ep-btn-ghost text-xs mt-2">
              <Lightbulb size={12} />
              Révéler la réponse
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function CourseView({ content }: { content: FullDay['content']['course'] }) {
  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {content.intro}
      </p>
      {content.sections.map((s, i) => (
        <div key={i} className="rounded-xl p-3 border" style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}>
          <h4 className="font-semibold text-sm mb-1">{s.heading}</h4>
          <p className="text-sm whitespace-pre-line" style={{ color: 'var(--text-muted)' }}>
            {renderInline(s.body)}
          </p>
          {s.illustration && (
            <div className="text-center text-base mt-2 font-mono opacity-90">{s.illustration}</div>
          )}
          {s.code && (
            <pre className="ep-code mt-2 overflow-x-auto whitespace-pre text-xs">{s.code}</pre>
          )}
        </div>
      ))}
      <div className="rounded-xl p-3 border" style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent)' }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--accent)' }}>
          À retenir
        </div>
        <ul className="space-y-1">
          {content?.keyTakeaways || [].map((t, i) => (
            <li key={i} className="text-sm flex items-start gap-2">
              <CheckCircle2 size={12} className="mt-1 flex-shrink-0" style={{ color: 'var(--accent)' }} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  // very simple inline: **bold** and `code`
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      parts.push(
        <code key={key++} className="font-mono px-1 rounded" style={{ background: 'var(--bg-soft)' }}>
          {token.slice(1, -1)}
        </code>,
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function ResearchView({ content }: { content: FullDay['content']['research'] }) {
  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <strong>Ressource :</strong>{' '}
        <a href={content.resourceUrl} target="_blank" rel="noopener noreferrer" className="ep-link inline-flex items-center gap-1">
          {content.resourceName}
          <ExternalLink size={12} />
        </a>
      </p>
      <p className="text-sm">{content.mission}</p>
      <div className="rounded-xl p-3 border" style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
          Questions à se poser pendant la lecture
        </div>
        <ul className="space-y-1.5">
          {content.questions.map((q, i) => (
            <li key={i} className="text-sm flex items-start gap-2">
              <span style={{ color: 'var(--accent)' }}>{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs italic" style={{ color: 'var(--text-subtle)' }}>
        Sors d’EpiTous. Va lire. Reviens avec des notes. Note ce qui te surprend dans ton journal.
      </p>
    </div>
  );
}

function VideoView({ content }: { content: FullDay['content']['video'] }) {
  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        Recherche suggérée sur YouTube :
      </p>
      <a
        href={content.searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ep-card p-3 flex items-center gap-3 hover:opacity-90 transition"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
          style={{ background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)' }}
        >
          <Video size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm">{content.searchQuery}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Ouvrir la recherche YouTube →
          </div>
        </div>
        <ExternalLink size={14} />
      </a>
      <div className="rounded-xl p-3 border" style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
          Questions de réflexion (après avoir regardé)
        </div>
        <ul className="space-y-1.5">
          {content.reflectionQuestions.map((q, i) => (
            <li key={i} className="text-sm flex items-start gap-2">
              <span style={{ color: 'var(--accent)' }}>{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PracticeView({
  content,
  completed,
  onChange,
}: {
  content: FullDay['content']['practice'];
  completed: number;
  onChange: (n: number) => void;
}) {
  const [revealedHint, setRevealedHint] = useState<Record<string, number>>({});
  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {content.intro}
      </p>
      {content.exercises.map((ex, i) => {
        const isDone = i < completed;
        return (
          <div
            key={ex.id}
            className="rounded-xl p-3 border"
            style={{
              background: isDone ? 'var(--accent-soft)' : 'var(--bg-soft)',
              borderColor: isDone ? 'var(--accent)' : 'var(--border)',
            }}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onChange(isDone ? i : i + 1)}
                className="mt-0.5 flex-shrink-0"
                aria-label="Marquer comme fait"
              >
                {isDone ? <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} /> : <Circle size={18} style={{ color: 'var(--text-subtle)' }} />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{ex.title}</span>
                  <span
                    className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--bg-elev)', color: difficultyColor(ex.difficulty || "") }}
                  >
                    {ex.difficulty}
                  </span>
                </div>
                <p className="text-sm mt-1">{ex?.prompt || ex?.description || ''}</p>

                {/* Hints */}
                <div className="mt-2 space-y-1">
                  {(ex.hints || ex.hint ? [ex.hint] : []).slice(0, revealedHint[ex.id] ?? 0).map((h, hi) => (
                    <div key={hi} className="text-xs flex items-start gap-1.5" style={{ color: 'var(--text-muted)' }}>
                      <Lightbulb size={11} className="mt-0.5 flex-shrink-0" style={{ color: '#f59e0b' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                  {(ex.hints && (revealedHint[ex.id] ?? 0) < (ex.hints || []).length) && (
                    <button
                      onClick={() => setRevealedHint({ ...revealedHint, [ex.id]: (revealedHint[ex.id] ?? 0) + 1 })}
                      className="ep-btn ep-btn-ghost text-xs !py-1 !px-2"
                    >
                      <Lightbulb size={11} />
                      Indice {(revealedHint[ex.id] ?? 0) + 1}/{(ex.hints || ex.hint ? [ex.hint] : []).length}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <p className="text-xs italic" style={{ color: 'var(--text-subtle)' }}>
        Indice : EpiTous ne donne JAMAIS la solution. Les indices te guident, mais c’est toi qui écris le code.
      </p>
    </div>
  );
}

function difficultyColor(d: string): string {
  if (d === 'facile') return '#10b981';
  if (d === 'moyen') return '#f59e0b';
  if (d === 'difficile') return '#ef4444';
  return '#8b5cf6';
}

function EpitechView({ content }: { content: FullDay['content']['epitech'] }) {
  return (
    <div className="space-y-3">
      <div
        className="rounded-xl p-3 border"
        style={{ background: 'rgba(99, 102, 241, 0.08)', borderColor: 'var(--accent)' }}
      >
        <p className="text-sm">{content.context}</p>
      </div>
      <ul className="space-y-1.5">
        {content.rules.map((r, i) => (
          <li key={i} className="text-sm flex items-start gap-2">
            <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
            <span>{r}</span>
          </li>
        ))}
      </ul>
      {content.example && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
            Exemple
          </div>
          <pre className="ep-code text-xs whitespace-pre overflow-x-auto">{content.example}</pre>
        </div>
      )}
    </div>
  );
}

function TaskView({ content }: { content: FullDay['content']['tasks'] }) {
  return (
    <div className="space-y-2">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {content.intro}
      </p>
      {content.tasks.map((t, i) => {
        const locked = t.locked;
        return (
          <div
            key={t.id}
            className="rounded-xl p-3 border flex items-start gap-3"
            style={{
              background: locked ? 'var(--bg-soft)' : 'var(--bg-elev)',
              borderColor: 'var(--border)',
              opacity: locked ? 0.55 : 1,
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: locked ? 'var(--border)' : 'var(--accent-soft)', color: locked ? 'var(--text-subtle)' : 'var(--accent)' }}
            >
              {locked ? '🔒' : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{t.title}</div>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {t.description}
              </p>
              {locked && t.lockedReason && (
                <p className="text-xs mt-1 italic" style={{ color: 'var(--text-subtle)' }}>
                  🔒 {t.lockedReason}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ReviewView({
  dayNumber,
  objectives,
  progress,
  setProgress,
}: {
  dayNumber: number;
  objectives: string[];
  progress: DayProgress;
  setProgress: (p: DayProgress) => void;
}) {
  const existing = getJournalForDay(dayNumber);
  const [text, setText] = useState(progress.reviewText || existing?.learned || '');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const analysis = analyzeReview(text, objectives);
    const next = setReviewCompleted(dayNumber, text, analysis);
    // Also push a journal entry (or update if exists)
    if (existing) {
      addJournalEntry({ ...existing, learned: text, dayNumber });
    } else {
      addJournalEntry({
        dayNumber,
        learned: text,
        notUnderstood: '',
        mistakes: '',
        fixes: '',
        importantCommand: '',
        importantConcept: '',
        reviewTomorrow: '',
      });
    }
    setProgress({ ...next });
    setSaved(true);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        Écris librement ce que tu as appris aujourd’hui. EpiTous va analyser les mots-clés
        pour identifier ce que tu as compris, ce qui est partiel, et ce qu’il faut revoir.
      </p>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setSaved(false);
        }}
        rows={8}
        placeholder="Aujourd'hui, j'ai appris que…"
        className="ep-input font-mono text-sm leading-relaxed"
      />

      {/* Analysis preview */}
      {progress.reviewCompleted && progress.reviewAnalysis.understood.length + progress.reviewAnalysis.partial.length + progress.reviewAnalysis.toReview.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-2">
          <AnalysisBox label="✅ Compris" items={progress.reviewAnalysis.understood} color="#10b981" />
          <AnalysisBox label="🟡 Partiel" items={progress.reviewAnalysis.partial} color="#f59e0b" />
          <AnalysisBox label="🔴 À revoir" items={progress.reviewAnalysis.toReview} color="#ef4444" />
        </div>
      )}

      {progress.reviewCompleted && (
        <Link to="/journal" className="ep-link text-sm flex items-center gap-1">
          <PenLine size={14} />
          Compléter mon entrée de journal détaillée →
        </Link>
      )}

      <div className="flex items-center justify-end gap-2">
        {saved && (
          <span className="text-xs flex items-center gap-1" style={{ color: '#10b981' }}>
            <CheckCircle2 size={12} />
            Enregistré
          </span>
        )}
        <button onClick={handleSave} className="ep-btn ep-btn-primary text-sm">
          <Save size={14} />
          {progress.reviewCompleted ? 'Mettre à jour' : 'Enregistrer ma revue'}
        </button>
      </div>

      <div className="rounded-xl p-3 border flex items-start gap-2" style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}>
        <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#f59e0b' }} />
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          L’analyse est heuristique (regex + mots-clés). Elle te donne une indication, pas un verdict. Sois honnête dans ton texte : plus tu écris précisément, plus l’analyse est pertinente.
        </p>
      </div>
    </div>
  );
}

function AnalysisBox({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div className="rounded-xl p-2 border" style={{ background: `${color}11`, borderColor: `${color}55` }}>
      <div className="text-xs font-bold mb-1" style={{ color }}>
        {label}
      </div>
      {items.length === 0 ? (
        <p className="text-xs italic" style={{ color: 'var(--text-subtle)' }}>
          —
        </p>
      ) : (
        <ul className="space-y-0.5">
          {items.map((x, i) => (
            <li key={i} className="text-xs">
              {x}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
