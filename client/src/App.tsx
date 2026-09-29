// EpiTous — App.tsx (router + layout + pages)

import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import DayPage from './pages/DayPage';
import JournalPage from './pages/JournalPage';
import GlossaryPage from './pages/GlossaryPage';
import ErrorLabPage from './pages/ErrorLabPage';
import PathsPage from './pages/PathsPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/day/:number" element={<DayPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/errorlab" element={<ErrorLabPage />} />
        <Route path="/paths" element={<PathsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
