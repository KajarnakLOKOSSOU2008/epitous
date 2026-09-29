// EpiTous — Landing page

import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  Compass,
  Cpu,
  Code2,
  Bug,
  Notebook,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { CURRICULUM_PATHS } from '@/lib/curriculum';

export default function LandingPage() {
  return (
    <div className="space-y-20 pb-12">
      {/* Hero */}
      <section className="pt-8 sm:pt-16 text-center max-w-4xl mx-auto animate-fadeIn">
        <div className="inline-flex items-center gap-2 ep-chip mb-6">
          <Sparkles size={12} />
          <span>Premier parcours : Piscine Epitech</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          EpiTous — <span className="text-gradient">From Zero to Autonomous Developer</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl" style={{ color: 'var(--text-muted)' }}>
          Un système complet d’apprentissage et de travail qui t’accompagne jour après jour.
          Pas de solutions toutes faites : des explications, des questions, des ressources,
          des exercices, et un retour réel sur ce que tu as compris.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/dashboard" className="ep-btn ep-btn-primary text-base px-6 py-3">
            Démarrer mon parcours
            <ArrowRight size={18} />
          </Link>
          <Link to="/paths" className="ep-btn ep-btn-ghost text-base px-6 py-3">
            Voir les parcours
          </Link>
        </div>

        {/* Pipeline */}
        <div className="mt-14 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center gap-2 min-w-max">
            {[
              { label: 'Apprendre', icon: Brain },
              { label: 'Pratiquer', icon: Code2 },
              { label: 'Rechercher', icon: Compass },
              { label: 'Déboguer', icon: Bug },
              { label: 'Réfléchir', icon: Notebook },
              { label: 'Progresser', icon: TrendingUp },
              { label: 'Autonomie', icon: Sparkles },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="ep-card px-4 py-3 flex flex-col items-center gap-1 min-w-[110px]">
                  <step.icon size={18} className="text-primary" />
                  <span className="text-xs font-medium">{step.label}</span>
                </div>
                {i < arr.length - 1 && <ArrowRight size={14} className="opacity-40" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution / Impact */}
      <section className="grid sm:grid-cols-3 gap-4">
        <Card
          icon={<Cpu size={20} />}
          title="Le problème"
          body="Tu débutes, internet déborde d’infos contradictoires, tu ne sais pas par où commencer, et tu te sens vite perdu·e. Sans structure, tu procrastines ou tu abandonnes."
          tone="warning"
        />
        <Card
          icon={<Compass size={20} />}
          title="La solution"
          body="EpiTous te donne un parcours journalier clair : échauffement, cours, recherche, vidéo, pratique, mode Epitech, tâches, revue. Tu sais toujours quoi faire ensuite."
          tone="primary"
        />
        <Card
          icon={<TrendingUp size={20} />}
          title="L’impact"
          body="Au bout de quelques semaines, tu as un journal de développement personnel, un glossaire vivant, et surtout : la confiance pour coder SEUL·E. C’est ça, l’autonomie."
          tone="accent"
        />
      </section>

      {/* Curriculum paths preview */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Les parcours à venir</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              La Piscine Epitech est le premier parcours. D’autres suivront.
            </p>
          </div>
          <Link to="/paths" className="ep-link text-sm hidden sm:inline">
            Tout voir →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CURRICULUM_PATHS.map((p) => (
            <div
              key={p.id}
              className="ep-card p-4 flex items-start gap-3"
              style={{ opacity: p.status === 'locked' ? 0.55 : 1 }}
            >
              <div className="text-2xl">{p.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{p.title}</h3>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {p.estimatedDays}j
                  </span>
                </div>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {p.description}
                </p>
                <div className="mt-2">
                  <span
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        p.status === 'available'
                          ? 'rgba(34, 211, 238, 0.12)'
                          : p.status === 'locked'
                            ? 'var(--bg-soft)'
                            : 'rgba(99, 102, 241, 0.12)',
                      color:
                        p.status === 'available'
                          ? '#22d3ee'
                          : p.status === 'locked'
                            ? 'var(--text-subtle)'
                            : '#6366f1',
                    }}
                  >
                    {p.status === 'available' ? 'Disponible' : p.status === 'locked' ? 'Verrouillé' : 'Terminé'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Autonomy curve */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">La courbe d'autonomie</h2>
        <p className="text-sm mt-1 text-center" style={{ color: 'var(--text-muted)' }}>
          Au départ, EpiTous te tient par la main. Chaque semaine, l'assistance diminue — jusqu'à ce que tu n'aies plus besoin de personne.
        </p>
        <div className="ep-card p-5 mt-5">
          <div className="flex items-end gap-2 h-40">
            {[
              { w: 'S1', v: 100 },
              { w: 'S2', v: 85 },
              { w: 'S3', v: 70 },
              { w: 'S4', v: 55 },
              { w: 'S5', v: 40 },
              { w: 'S6', v: 25 },
              { w: 'S7', v: 10 },
              { w: 'S8', v: 0 },
            ].map((b) => {
              const color = b.v <= 25 ? '#22d3ee' : b.v <= 60 ? '#6366f1' : '#f59e0b';
              return (
                <div key={b.w} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{b.v}%</span>
                  <div
                    className="w-full rounded-t-md"
                    style={{
                      height: `${Math.max(b.v * 1.4, 4)}px`,
                      background: `linear-gradient(180deg, ${color} 0%, ${color}99 100%)`,
                      boxShadow: `0 0 16px -4px ${color}55`,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 mt-1">
            {['S1','S2','S3','S4','S5','S6','S7','S8'].map((w) => (
              <div key={w} className="flex-1 text-center text-[10px]" style={{ color: 'var(--text-subtle)' }}>
                {w}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-2xl mx-auto">
        <div
          className="ep-card p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--bg-elev) 0%, var(--bg-soft) 100%)' }}
        >
          <span
            aria-hidden
            className="absolute -top-6 -right-2 text-[160px] leading-none opacity-10 select-none"
            style={{ color: '#6366f1', fontFamily: 'Georgia, serif' }}
          >
            ”
          </span>
          <p className="text-lg sm:text-xl font-medium italic relative">
            « L'objectif ultime n'est pas de faire réussir l'étudiant grâce à EpiTous.
            C'est de lui apprendre à réussir sans EpiTous. »
          </p>
          <p
            className="text-[11px] uppercase tracking-widest mt-4"
            style={{ color: 'var(--text-subtle)' }}
          >
            — La promesse EpiTous
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center max-w-2xl mx-auto ep-card p-8">
        <h2 className="text-2xl font-bold">Prêt·e à commencer ?</h2>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
          Aucune inscription. Tes données restent dans ton navigateur. Tu peux tout exporter quand tu veux.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link to="/dashboard" className="ep-btn ep-btn-primary px-6 py-3 text-base">
            Aller au tableau de bord
            <ArrowRight size={18} />
          </Link>
          <Link to="/about" className="ep-btn ep-btn-ghost px-6 py-3 text-base">
            En savoir plus
          </Link>
        </div>
      </section>
    </div>
  );
}

function Card({
  icon,
  title,
  body,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tone: 'warning' | 'primary' | 'accent';
}) {
  const color =
    tone === 'warning' ? '#f59e0b' : tone === 'primary' ? '#6366f1' : '#22d3ee';
  return (
    <div className="ep-card p-5">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ background: `${color}22`, color }}
      >
        {icon}
      </div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {body}
      </p>
    </div>
  );
}
