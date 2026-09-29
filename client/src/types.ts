// EpiTous — Types

export type SessionType =
  | 'warmup'
  | 'course'
  | 'research'
  | 'video'
  | 'practice'
  | 'epitech'
  | 'task'
  | 'review';

export interface DaySession {
  id: string;
  type: SessionType;
  title: string;
  duration: string; // "09:00"
  completed: boolean;
}

export interface Day {
  number: number;
  title: string;
  concept: string;
  description?: string;
  sessions: DaySession[];
  objectives: string[];
}

// Rich session content (used by DayPage / sessions components)

export interface WarmupQuestion {
  q: string;
  a: string;
}

export interface WarmupContent {
  questions: WarmupQuestion[];
}

export interface CourseSection {
  heading: string;
  body: string;
  // Alternative field names (backwards compat)
  title?: string;
  content?: string; // markdown-ish, supports **bold** and `code`
  code?: string; // C code block
  illustration?: string; // emoji or short ascii
}

export interface CourseContent {
  intro?: string;
  sections: CourseSection[];
  keyTakeaways?: string[];
}

export interface ResearchContent {
  resourceUrl: string;
  resourceName?: string;
  url?: string;
  mission: string;
  questions: string[];
}

export interface VideoContent {
  searchQuery: string;
  searchUrl?: string;
  query?: string;
  reflectionQuestions: string[];
  reflections?: string[];
}

export interface PracticeExercise {
  id: string;
  title: string;
  heading?: string;
  prompt?: string;
  description?: string;
  hint?: string;
  hints?: string[];
  difficulty?: string;
}

export interface PracticeContent {
  intro?: string;
  exercises: PracticeExercise[];
}

export interface EpitechContent {
  context?: string;
  rules: string[]; // coding style, Makefile, Git rules
  example?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  heading?: string;
  description?: string;
  difficulty?: string;
  estimatedTime?: string;
  locked?: boolean;
  lockedReason?: string;
}

export interface TaskContent {
  intro: string;
  tasks: TaskItem[];
}

export interface DayContent {
  warmup: WarmupContent;
  course: CourseContent;
  research: ResearchContent;
  video: VideoContent;
  practice: PracticeContent;
  epitech: EpitechContent;
  tasks: TaskContent;
}

export interface FullDay extends Day {
  content: DayContent;
}

// Journal

export interface JournalEntry {
  id: string;
  dayNumber: number;
  date: string; // ISO
  learned: string;
  notUnderstood: string;
  mistakes: string;
  fixes: string;
  importantCommand: string;
  importantConcept: string;
  reviewTomorrow: string;
}

// Progress

export interface ReviewAnalysis {
  understood: string[];
  partial: string[];
  toReview: string[];
}

export interface DayProgress {
  dayNumber: number;
  sessionsCompleted: string[];
  exercisesCompleted: number;
  reviewCompleted: boolean;
  reviewText: string;
  reviewAnalysis: ReviewAnalysis;
}

// Glossary

export type GlossaryCategory = 'c' | 'unix' | 'git' | 'general';

export interface GlossaryTerm {
  id: string;
  term: string;
  category: GlossaryCategory;
  definition: string;
  example: string;
  relatedTerms: string[];
  relatedDay?: number;
}

// Error Lab

export type ErrorCategory =
  | 'compilation'
  | 'segfault'
  | 'linker'
  | 'runtime'
  | 'warning';

export interface ErrorEntry {
  id: string;
  errorMessage: string;
  category: ErrorCategory;
  meaning: string;
  causes: string[];
  debugSteps: string[];
  exampleFix: string;
}

// Curriculum paths

export type PathStatus = 'locked' | 'available' | 'completed';

export interface CurriculumPath {
  id: string;
  icon: string;
  title: string;
  description?: string;
  estimatedDays: number;
  prerequisites: string[];
  status: PathStatus;
}
