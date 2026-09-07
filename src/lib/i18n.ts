export const locales = ['en', 'zh', 'de', 'es', 'fr'] as const;
export type Locale = typeof locales[number];
export const messages = {
  en: { home: 'Home', archive: 'Archive', latest: 'Latest writing', intro: 'Notes on building, learning, and the things worth keeping.', comments: 'Comments', footer: 'Thoughtfully made by Ben.', language: 'Language' },
  zh: { home: '首页', archive: '归档', latest: '最新文章', intro: '关于构建、学习与值得记录之事的笔记。', comments: '评论', footer: '由 Ben 用心制作。', language: '语言' },
  de: { home: 'Startseite', archive: 'Archiv', latest: 'Neueste Beiträge', intro: 'Notizen über Erschaffen, Lernen und Dinge, die es wert sind, festgehalten zu werden.', comments: 'Kommentare', footer: 'Sorgfältig von Ben gemacht.', language: 'Sprache' },
  es: { home: 'Inicio', archive: 'Archivo', latest: 'Últimos artículos', intro: 'Notas sobre crear, aprender y las cosas que vale la pena conservar.', comments: 'Comentarios', footer: 'Hecho con atención por Ben.', language: 'Idioma' },
  fr: { home: 'Accueil', archive: 'Archives', latest: 'Derniers articles', intro: 'Notes sur la création, l’apprentissage et les choses qui méritent d’être conservées.', comments: 'Commentaires', footer: 'Conçu avec soin par Ben.', language: 'Langue' },
} as const;
export type MessageKey = keyof typeof messages.en;
export function normalizeLocale(value?: string | null): Locale { const candidate = value?.toLowerCase().split('-')[0]; return locales.includes(candidate as Locale) ? candidate as Locale : 'en'; }
export function t(locale: Locale, key: MessageKey): string { return messages[locale][key] ?? messages.en[key]; }
