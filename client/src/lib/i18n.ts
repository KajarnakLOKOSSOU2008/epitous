// EpiTous — Minimal i18n
// Content is mostly FR. This file provides a few EN nav labels for future use.

export type Lang = 'fr' | 'en';

export const I18N = {
  fr: {
    nav: {
      dashboard: 'Tableau de bord',
      journal: 'Journal',
      glossary: 'Glossaire',
      errorlab: "Labo d'erreurs",
      paths: 'Parcours',
      about: 'À propos',
    },
    actions: {
      startDay: 'Commencer ma journée',
      whatShouldIDo: "Que dois-je faire ?",
      export: 'Exporter',
      import: 'Importer',
      reset: 'Réinitialiser',
      save: 'Enregistrer',
      cancel: 'Annuler',
    },
  },
  en: {
    nav: {
      dashboard: 'Dashboard',
      journal: 'Journal',
      glossary: 'Glossary',
      errorlab: 'Error Lab',
      paths: 'Paths',
      about: 'About',
    },
    actions: {
      startDay: 'Start my day',
      whatShouldIDo: 'What should I do?',
      export: 'Export',
      import: 'Import',
      reset: 'Reset',
      save: 'Save',
      cancel: 'Cancel',
    },
  },
} as const;

export const DEFAULT_LANG: Lang = 'fr';

export function t(lang: Lang = DEFAULT_LANG) {
  return I18N[lang];
}
