// EpiTous — Layout (nav + content wrapper + footer + WhatShouldIDo FAB)

import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Moon,
  Sun,
  Menu,
  X,
  Github,
  Compass,
  LayoutDashboard,
  Notebook,
  BookOpen,
  FlaskConical,
  Route as RouteIcon,
  Info,
} from 'lucide-react';
import { loadTheme, saveTheme } from '@/lib/store';
import WhatShouldIDo from './WhatShouldIDo';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/journal', label: 'Journal', icon: Notebook },
  { to: '/glossary', label: 'Glossaire', icon: BookOpen },
  { to: '/errorlab', label: "Labo d'erreurs", icon: FlaskConical },
  { to: '/paths', label: 'Parcours', icon: RouteIcon },
  { to: '/about', label: 'À propos', icon: Info },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const location = useLocation();

  // Init theme
  useEffect(() => {
    const t = loadTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  function applyTheme(t: 'dark' | 'light') {
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    saveTheme(next);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b"
        style={{
          background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)' }}
            >
              <img
                src="/epitous/favicon.svg"
                alt="EpiTous"
                className="w-8 h-8 rounded-lg"
                style={{ filter: 'drop-shadow(0 0 4px rgba(99,102,241,0.4))' }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm">EpiTous</span>
              <span
                className="text-[10px] hidden sm:block"
                style={{ color: 'var(--text-muted)' }}
              >
                Zero → Autonomous
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    isActive ? 'text-white' : ''
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)' }
                    : { color: 'var(--text-muted)' }
                }
              >
                <l.icon size={14} />
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="ep-btn ep-btn-ghost !p-2"
              aria-label="Changer de thème"
              title={theme === 'dark' ? 'Passer en clair' : 'Passer en sombre'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="https://github.com/KajarnakLOKOSSOU2008/epitous"
              target="_blank"
              rel="noopener noreferrer"
              className="ep-btn ep-btn-ghost !p-2"
              aria-label="GitHub"
              title="Code source sur GitHub"
            >
              <Github size={16} />
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="ep-btn ep-btn-ghost !p-2 md:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div
            className="md:hidden border-t animate-fadeIn"
            style={{ background: 'var(--bg-elev)', borderColor: 'var(--border)' }}
          >
            <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-col">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? 'text-white' : ''
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? { background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)' }
                      : { color: 'var(--text-muted)' }
                  }
                >
                  <l.icon size={16} />
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto w-full px-4 py-6">{children}</div>
      </main>

      {/* Footer */}
      <footer
        className="border-t"
        style={{ background: 'var(--bg-elev)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p style={{ color: 'var(--text-muted)' }}>
            EpiTous — From Zero to Autonomous Developer · Built with ❤️ for Francophone developers
          </p>
          <div className="flex items-center gap-3" style={{ color: 'var(--text-muted)' }}>
            <Link to="/about" className="ep-link">
              À propos
            </Link>
            <span>·</span>
            <a
              href="https://github.com/KajarnakLOKOSSOU2008/epitous"
              target="_blank"
              rel="noopener noreferrer"
              className="ep-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Floating "What should I do?" button */}
      <button
        onClick={() => setShowHelper(true)}
        className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 px-4 py-3 rounded-full text-white shadow-lg transition-transform hover:scale-105 glow-indigo"
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)' }}
        title="Que dois-je faire ?"
      >
        <Compass size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden sm:inline text-sm font-medium">Que dois-je faire ?</span>
      </button>

      {showHelper && <WhatShouldIDo onClose={() => setShowHelper(false)} />}
    </div>
  );
}
