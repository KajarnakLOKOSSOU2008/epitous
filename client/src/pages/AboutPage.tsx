// EpiTous — About page

import { Sparkles, Target, Compass, Code2, Cpu, GitBranch, Layers } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-fadeIn pb-12">
      <div>
        <h1 className="text-3xl font-bold">À propos d’EpiTous</h1>
        <p className="text-lg mt-2 text-gradient font-medium">From Zero to Autonomous Developer</p>
      </div>

      {/* Vision */}
      <section className="ep-card p-5">
        <h2 className="font-bold flex items-center gap-2 mb-2">
          <Sparkles size={16} />
          La vision
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          EpiTous est un système complet d’apprentissage et de travail qui accompagne un débutant complet jusqu’à
          l’autonomie en programmation. Son premier parcours est la Piscine Epitech : l’étudiant commence
          sans prérequis, apprend les fondamentaux de l’ordinateur, d’Unix et du C, puis applique ses connaissances
          aux tâches réelles de la Piscine.
        </p>
        <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
          Le but ultime n’est <strong>pas</strong> de te faire réussir grâce à EpiTous. C’est de t’apprendre à réussir
          <strong> sans</strong> EpiTous.
        </p>
      </section>

      {/* Philosophy */}
      <section className="ep-card p-5">
        <h2 className="font-bold flex items-center gap-2 mb-2">
          <Compass size={16} />
          La philosophie
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          EpiTous n’est pas un guide, c’est un système complet de travail et d’apprentissage. C’est le « système
          d’exploitation » de ton apprentissage — pas un remplacement d’internet, mais un guide pour l’utiliser
          intelligemment. L’assistance diminue progressivement jusqu’à l’autonomie complète.
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span style={{ color: '#6366f1' }}>▸</span>
            <span style={{ color: 'var(--text-muted)' }}>
              <strong> Pas de solutions toutes faites.</strong> Des explications, des questions, des indices, des ressources, des exercices.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#6366f1' }}>▸</span>
            <span style={{ color: 'var(--text-muted)' }}>
              <strong> Une structure journalière.</strong> Chaque jour a un parcours : échauffement → cours → recherche → vidéo → pratique → mode Epitech → tâches → revue.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#6366f1' }}>▸</span>
            <span style={{ color: 'var(--text-muted)' }}>
              <strong> Un journal vivant.</strong> Tu écris chaque jour. Ton journal devient ton manuel personnel.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#6366f1' }}>▸</span>
            <span style={{ color: 'var(--text-muted)' }}>
              <strong> Une assistance décroissante.</strong> EpiTous te guide au début, puis te laisse de plus en plus autonome.
            </span>
          </li>
        </ul>
      </section>

      {/* Autonomy curve */}
      <section className="ep-card p-5">
        <h2 className="font-bold flex items-center gap-2 mb-3">
          <Target size={16} />
          La courbe d’autonomie
        </h2>
        <div className="space-y-2">
          {[
            { label: 'Jour 01–03', assist: 90, you: 10, note: 'EpiTous te tient par la main.' },
            { label: 'Jour 04–07', assist: 60, you: 40, note: 'Tu commences à voler seul·e.' },
            { label: 'Jour 08–14', assist: 30, you: 70, note: 'EpiTous suggère, tu décides.' },
            { label: 'Jour 15+', assist: 10, you: 90, note: 'Tu poses tes propres questions.' },
          ].map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold">{s.label}</span>
                <span style={{ color: 'var(--text-muted)' }}>{s.note}</span>
              </div>
              <div className="flex gap-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-soft)' }}>
                <div style={{ width: `${s.assist}%`, background: '#6366f1' }} />
                <div style={{ width: `${s.you}%`, background: '#22d3ee' }} />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4 text-xs mt-2">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#6366f1' }} />
              <span style={{ color: 'var(--text-muted)' }}>Assistance EpiTous</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#22d3ee' }} />
              <span style={{ color: 'var(--text-muted)' }}>Ton autonomie</span>
            </span>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="ep-card p-5">
        <h2 className="font-bold flex items-center gap-2 mb-2">
          <Layers size={16} />
          Stack technique
        </h2>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          <Tech icon={<Code2 size={14} />} name="React 18 + TypeScript" />
          <Tech icon={<Cpu size={14} />} name="Vite 5" />
          <Tech icon={<Layers size={14} />} name="Tailwind CSS" />
          <Tech icon={<GitBranch size={14} />} name="React Router (hash)" />
          <Tech icon={<Code2 size={14} />} name="localStorage (offline-first)" />
          <Tech icon={<Sparkles size={14} />} name="lucide-react (icons)" />
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
          Aucun backend, aucune clé API, aucun cookie. Tes données sont dans ton navigateur, exportables à tout moment.
        </p>
      </section>

      {/* Roadmap */}
      <section className="ep-card p-5">
        <h2 className="font-bold flex items-center gap-2 mb-2">
          <Target size={16} />
          Feuille de route
        </h2>
        <ul className="space-y-2 text-sm">
          <RoadmapItem version="V1" status="En cours" title="Piscine Epitech (C/Unix)" body="Jours 01–07 complets + journal + glossaire + labo d’erreurs." />
          <RoadmapItem version="V2" status="Planifié" title="Algorithmes & structures de données" body="Tableaux, listes chaînées, piles, files, tris, complexité." />
          <RoadmapItem version="V3" status="Planifié" title="Makefile avancé + Git" body="Norme Epitech stricte, Makefile complet, Git workflow." />
          <RoadmapItem version="V4" status="Planifié" title="Web (HTML/CSS/JS)" body="Premier front-end, mini-projet web." />
          <RoadmapItem version="V5" status="Planifié" title="Python & Data" body="Scripting, Pandas, SQL, visualisation." />
          <RoadmapItem version="V6" status="Planifié" title="IA & Cybersecurity" body="ML, deep learning, sécu offensive/défensive." />
        </ul>
      </section>

      {/* Author */}
      <section className="text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Conçu pour les développeurs francophones — Bénin, Afrique, et au-delà.
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-subtle)' }}>
          EpiTous — From Zero to Autonomous Developer · Built with ❤️ for Francophone developers
        </p>
      </section>
    </div>
  );
}

function Tech({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'var(--bg-soft)' }}>
      <span style={{ color: 'var(--accent)' }}>{icon}</span>
      <span className="font-mono text-xs">{name}</span>
    </div>
  );
}

function RoadmapItem({
  version,
  status,
  title,
  body,
}: {
  version: string;
  status: string;
  title: string;
  body: string;
}) {
  const isActive = status === 'En cours';
  return (
    <li className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-soft)' }}>
      <div
        className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0"
        style={{ background: isActive ? 'var(--accent-soft)' : 'var(--bg-elev)', color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
      >
        {version}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <strong className="text-sm">{title}</strong>
          <span
            className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{
              background: isActive ? 'rgba(34, 211, 238, 0.15)' : 'var(--bg-elev)',
              color: isActive ? '#22d3ee' : 'var(--text-subtle)',
            }}
          >
            {status}
          </span>
        </div>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          {body}
        </p>
      </div>
    </li>
  );
}
