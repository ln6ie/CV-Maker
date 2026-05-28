import { CVData } from '../types/cv';

/**
 * Static PDF color palettes — completely decoupled from the app theme.
 * These are hardcoded strings, never derived from PlatformColor or system
 * values, so expo-print's isolated WebView cannot override them.
 */
const PDF_COLORS = {
  light: {
    background: '#FFFFFF',
    primaryHeader: '#002060',
    body: '#000000',
    border: '#000000',
    contactBox: '#000000',
  },
  dark: {
    background: '#0D0D0D',
    primaryHeader: '#4A90D9',
    body: '#E8E8E8',
    border: '#4A4A4A',
    contactBox: '#E8E8E8',
  },
} as const;

/**
 * Bilingual label map for section headings.
 */
const LABELS = {
  en: {
    summary: 'Summary',
    skills: 'Skills',
    experience: 'Work Experience',
    education: 'Education',
    courses: 'Courses',
    languages: 'Languages',
    address: 'Official Address',
    mainTasks: 'Main Tasks:',
  },
  ar: {
    summary: 'الخلاصة المهنية',
    skills: 'المهارات والقدرات',
    experience: 'الخبرات المهنية',
    education: 'التعليم والشهادات الاكاديمية',
    courses: 'الدورات التدريبية',
    languages: 'اللغات',
    address: 'العنوان الرسمي',
    mainTasks: 'المهام الرئيسية:',
  },
} as const;

/**
 * Generates a fully self-contained, print-safe A4 HTML document.
 *
 * Key guarantees:
 * - `color-scheme: light` (or `dark`) is explicitly declared on <html> so the
 *   WebView never auto-adapts text/background colors regardless of OS setting.
 * - `-webkit-print-color-adjust: exact` forces background colors to render.
 * - All colors are explicit hex strings — no CSS variables, no system colors.
 * - The Google Fonts @import is present for Arabic but the font stack falls
 *   back gracefully when offline (expo-print WebView is isolated).
 *
 * @param data   Zod-validated CVData object
 * @param isDarkMode  PDF color palette selector (independent of app theme)
 * @param lang   Layout language / direction ('en' | 'ar')
 */
export const generateCVTemplate = (
  data: CVData,
  isDarkMode: boolean,
  lang: 'en' | 'ar' = 'en'
): string => {
  const c = isDarkMode ? PDF_COLORS.dark : PDF_COLORS.light;
  const lbl = LABELS[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const textAlign = lang === 'ar' ? 'right' : 'left';
  const listPaddingSide = lang === 'ar' ? 'padding-right' : 'padding-left';
  const colorScheme = isDarkMode ? 'dark' : 'light';

  const fontStack =
    lang === 'ar'
      ? "'Amiri', 'Times New Roman', Times, serif"
      : "'Times New Roman', Times, serif";

  // Split items evenly between two columns
  const splitTwo = (arr: string[]): [string[], string[]] => {
    const half = Math.ceil(arr.length / 2);
    return [arr.slice(0, half), arr.slice(half)];
  };

  const [leftSkills, rightSkills] = splitTwo(data.skills);
  const [leftCourses, rightCourses] = splitTwo(data.courses);

  const renderBulletColumn = (items: string[]): string =>
    items.length > 0
      ? `<ul style="margin:0; ${listPaddingSide}:18px;">
           ${items.map((item) => `<li style="margin-bottom:5px; color:${c.body}; text-align:${textAlign};">${item}</li>`).join('')}
         </ul>`
      : '';

  const renderTwoColumnTable = (left: string[], right: string[]): string => `
    <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:10px;"
           cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:50%; vertical-align:top; border:none; padding-right:${lang === 'ar' ? '0' : '10px'}; padding-left:${lang === 'ar' ? '10px' : '0'};">
          ${renderBulletColumn(left)}
        </td>
        <td style="width:50%; vertical-align:top; border:none;">
          ${renderBulletColumn(right)}
        </td>
      </tr>
    </table>`;

  const renderExperience = (): string =>
    data.workExperience
      .map(
        (exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:20px; text-align:${textAlign};">
        <h3 style="font-size:15px; font-weight:bold; text-decoration:underline; color:${c.body}; margin:0 0 3px 0;">
          ${exp.jobTitle}
        </h3>
        <p style="font-size:14px; font-weight:bold; color:${c.body}; margin:0 0 3px 0;">
          ${exp.companyLocation}
        </p>
        <p style="font-size:14px; font-weight:bold; color:${c.body}; margin:0 0 6px 0;">
          ${exp.dateRange}
        </p>
        <p style="font-weight:bold; font-size:14px; color:${c.body}; margin:8px 0 4px 0;">
          ${lbl.mainTasks}
        </p>
        <ul style="margin:0; ${listPaddingSide}:20px;">
          ${exp.mainTasks
            .filter((t) => t.trim().length > 0)
            .map(
              (task) =>
                `<li style="margin-bottom:4px; color:${c.body}; text-align:${textAlign};">${task}</li>`
            )
            .join('')}
        </ul>
      </div>`
      )
      .join('');

  const renderEducation = (): string =>
    data.education
      .map(
        (edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:15px; text-align:${textAlign};">
        <h3 style="font-size:15px; font-weight:bold; color:${c.body}; margin:0 0 3px 0;">
          ${edu.degree}
        </h3>
        <p style="font-size:14px; font-weight:bold; color:${c.body}; margin:0 0 4px 0;">
          ${edu.institution} ${edu.year}
        </p>
        ${edu.notes ? `<p style="font-size:14px; font-style:italic; color:${c.body}; margin:0;">${edu.notes}</p>` : ''}
      </div>`
      )
      .join('');

  const renderLanguages = (): string =>
    data.languages
      .map(
        (langItem) => `
      <div style="font-size:14px; color:${c.body}; text-align:${textAlign}; margin-bottom:6px;">
        <span style="font-weight:bold;">${langItem.name}:</span> ${langItem.level}
      </div>`
      )
      .join('');

  const sectionTitle = (title: string): string => `
    <h2 style="
      font-size:18px;
      font-weight:bold;
      color:${c.primaryHeader};
      border-bottom:2px solid ${c.border};
      padding-bottom:4px;
      margin:15px 0 12px 0;
      letter-spacing:0.5px;
      text-align:${textAlign};
    ">${title}</h2>`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:${colorScheme};">
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="${colorScheme}">
  <title>${data.fullName} - CV</title>
  ${lang === 'ar' ? `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">` : ''}
  <style>
    /* Force the WebView rendering engine to use our explicit palette.
       color-scheme on both html and body prevents the browser from
       auto-inverting colors when the OS is in dark mode. */
    html {
      color-scheme: ${colorScheme};
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      /* Override any OS-injected forced color. */
      forced-color-adjust: none;
    }
    body {
      /* Explicit backgrounds prevent transparent PDF pages. */
      background-color: ${c.background} !important;
      color: ${c.body} !important;
      color-scheme: ${colorScheme};
      font-family: ${fontStack};
      font-size: 14px;
      line-height: 1.55;
      padding: 40px;
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      direction: ${dir};
      text-align: justify;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div style="text-align:center; margin-bottom:22px; page-break-inside:avoid;">
    <h1 style="font-size:32px; font-weight:bold; color:${c.body}; margin-bottom:10px; letter-spacing:-0.5px;">
      ${data.fullName}
    </h1>
    <div style="
      border:1px solid ${c.border};
      padding:8px 12px;
      font-size:12px;
      font-weight:bold;
      color:${c.contactBox};
      display:block;
      width:100%;
      text-align:center;
      margin-bottom:15px;
      background-color:${c.background};
    ">
      ${lbl.address} : ${data.address} | ${data.phone} | ${data.email}
    </div>
  </div>

  <!-- Summary -->
  <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:25px;">
    ${sectionTitle(lbl.summary)}
    <p style="color:${c.body}; text-align:justify; margin-bottom:15px;">${data.summary}</p>
  </div>

  <!-- Skills -->
  ${
    data.skills.length > 0
      ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:25px;">
    ${sectionTitle(lbl.skills)}
    ${renderTwoColumnTable(leftSkills, rightSkills)}
  </div>`
      : ''
  }

  <!-- Work Experience -->
  ${
    data.workExperience.length > 0
      ? `<div style="margin-bottom:25px;">
    ${sectionTitle(lbl.experience)}
    ${renderExperience()}
  </div>`
      : ''
  }

  <!-- Education -->
  ${
    data.education.length > 0
      ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:25px;">
    ${sectionTitle(lbl.education)}
    ${renderEducation()}
  </div>`
      : ''
  }

  <!-- Courses -->
  ${
    data.courses.length > 0
      ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:25px;">
    ${sectionTitle(lbl.courses)}
    ${renderTwoColumnTable(leftCourses, rightCourses)}
  </div>`
      : ''
  }

  <!-- Languages -->
  ${
    data.languages.length > 0
      ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:25px;">
    ${sectionTitle(lbl.languages)}
    ${renderLanguages()}
  </div>`
      : ''
  }

</body>
</html>`;
};
