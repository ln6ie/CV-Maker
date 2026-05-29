import { CVData } from '../types/cv';

/**
 * Static PDF color palettes — completely decoupled from the app theme.
 * Standard clean CV: Background is white, text is strictly solid black.
 */
const PDF_COLORS = {
  light: {
    background: '#FFFFFF',
    primaryHeader: '#000000',
    body: '#000000',
    border: '#000000',
    contactBox: '#000000',
    secondaryText: '#333333',
  },
  dark: {
    // Kept for structural compatibility, but we enforce light style for premium printing.
    background: '#FFFFFF',
    primaryHeader: '#000000',
    body: '#000000',
    border: '#000000',
    contactBox: '#000000',
    secondaryText: '#333333',
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
 * Implements:
 * - A clean, professional, high-end global company style CV (strictly white background, pure black text).
 * - Proper Arabic typography: Cairo font is loaded and declared cleanly so Arabic letters don't appear disjointed/segmented.
 * - Hierarchy of font sizes: Header is 24px/bold, Section headers 14px/bold, item titles 12px/bold, bullet texts 10px/regular.
 * - Controls the size of skills & courses texts to be smaller (10px) and formatted elegantly.
 * - Main task texts under headers are strictly smaller (10px) with solid line heights.
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
  const colorScheme = 'light'; // Always light scheme for high-fidelity printing.

  // Using Cairo as it covers both Arabic and English perfectly, ensuring letters do not appear segmented.
  const fontStack = "'Cairo', 'Times New Roman', Times, serif";

  // Split items evenly between two columns
  const splitTwo = (arr: string[]): [string[], string[]] => {
    const half = Math.ceil(arr.length / 2);
    return [arr.slice(0, half), arr.slice(half)];
  };

  const [leftSkills, rightSkills] = splitTwo(data.skills);
  const [leftCourses, rightCourses] = splitTwo(data.courses);

  const renderBulletColumn = (items: string[], fontSizePx: number = 10.5): string =>
    items.length > 0
      ? `<ul style="margin:0; ${listPaddingSide}:16px; list-style-type:disc;">
           ${items.map((item) => `<li style="margin-bottom:4px; font-size:${fontSizePx}px; color:${c.body}; text-align:${textAlign}; font-family:${fontStack};">${item}</li>`).join('')}
         </ul>`
      : '';

  const renderTwoColumnTable = (left: string[], right: string[]): string => `
    <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:8px;"
           cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:50%; vertical-align:top; border:none; padding-right:${lang === 'ar' ? '0' : '8px'}; padding-left:${lang === 'ar' ? '8px' : '0'};">
          ${renderBulletColumn(left, 10)}
        </td>
        <td style="width:50%; vertical-align:top; border:none;">
          ${renderBulletColumn(right, 10)}
        </td>
      </tr>
    </table>`;

  const renderExperience = (): string =>
    data.workExperience
      .map(
        (exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.body}; margin:0 0 2px 0;">
          ${exp.jobTitle}
        </h3>
        <p style="font-family:${fontStack}; font-size:11px; font-weight:normal; color:${c.secondaryText}; margin:0 0 1px 0;">
          ${exp.companyLocation}
        </p>
        <p style="font-family:${fontStack}; font-size:10.5px; font-style:italic; color:${c.secondaryText}; margin:0 0 4px 0;">
          ${exp.dateRange}
        </p>
        <p style="font-family:${fontStack}; font-weight:bold; font-size:10px; color:${c.body}; margin:4px 0 2px 0;">
          ${lbl.mainTasks}
        </p>
        <ul style="margin:0; ${listPaddingSide}:16px; list-style-type:disc;">
          ${exp.mainTasks
            .filter((t) => t.trim().length > 0)
            .map(
              (task) =>
                `<li style="margin-bottom:3px; font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; line-height:1.4;">${task}</li>`
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
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.body}; margin:0 0 2px 0;">
          ${edu.degree}
        </h3>
        <p style="font-family:${fontStack}; font-size:11px; font-weight:normal; color:${c.body}; margin:0 0 2px 0;">
          ${edu.institution} ${edu.year}
        </p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:10px; font-style:italic; color:${c.secondaryText}; margin:0;">${edu.notes}</p>` : ''}
      </div>`
      )
      .join('');

  const renderLanguages = (): string =>
    data.languages
      .map(
        (langItem) => `
      <div style="font-family:${fontStack}; font-size:10.5px; color:${c.body}; text-align:${textAlign}; margin-bottom:4px;">
        <span style="font-weight:bold;">${langItem.name}:</span> ${langItem.level}
      </div>`
      )
      .join('');

  const sectionTitle = (title: string): string => `
    <h2 style="
      font-family: ${fontStack};
      font-size: 14px;
      font-weight: bold;
      color: ${c.primaryHeader};
      border-bottom: 1px solid ${c.border};
      padding-bottom: 2px;
      margin: 14px 0 8px 0;
      letter-spacing: 0.2px;
      text-align: ${textAlign};
    ">${title}</h2>`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:${colorScheme};">
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="${colorScheme}">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    html {
      color-scheme: ${colorScheme};
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      forced-color-adjust: none;
    }
    body {
      background-color: ${c.background} !important;
      color: ${c.body} !important;
      color-scheme: ${colorScheme};
      font-family: ${fontStack};
      font-size: 11px;
      line-height: 1.5;
      padding: 30px;
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
  <div style="text-align:center; margin-bottom:14px; page-break-inside:avoid;">
    <h1 style="font-family:${fontStack}; font-size:24px; font-weight:bold; color:${c.body}; margin-bottom:6px; letter-spacing:-0.2px;">
      ${data.fullName}
    </h1>
    <div style="
      border-top:1px solid ${c.border};
      border-bottom:1px solid ${c.border};
      padding:6px 0;
      font-family:${fontStack};
      font-size:10.5px;
      font-weight:normal;
      color:${c.body};
      display:block;
      width:100%;
      text-align:center;
      margin-bottom:10px;
      background-color:${c.background};
    ">
      ${lbl.address} : ${data.address} | ${data.phone} | ${data.email}
    </div>
  </div>

  <!-- Summary -->
  ${data.summary ? `
  <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">
    ${sectionTitle(lbl.summary)}
    <p style="font-family:${fontStack}; font-size:11px; color:${c.body}; text-align:justify; margin:0; line-height:1.5;">${data.summary}</p>
  </div>` : ''}

  <!-- Skills -->
  ${data.skills.length > 0
      ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">
    ${sectionTitle(lbl.skills)}
    ${renderTwoColumnTable(leftSkills, rightSkills)}
  </div>`
      : ''
    }

  <!-- Work Experience -->
  ${data.workExperience.length > 0
      ? `<div style="margin-bottom:14px;">
    ${sectionTitle(lbl.experience)}
    ${renderExperience()}
  </div>`
      : ''
    }

  <!-- Education -->
  ${data.education.length > 0
      ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">
    ${sectionTitle(lbl.education)}
    ${renderEducation()}
  </div>`
      : ''
    }

  <!-- Courses -->
  ${data.courses.length > 0
      ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">
    ${sectionTitle(lbl.courses)}
    ${renderTwoColumnTable(leftCourses, rightCourses)}
  </div>`
      : ''
    }

  <!-- Languages -->
  ${data.languages.length > 0
      ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">
    ${sectionTitle(lbl.languages)}
    ${renderLanguages()}
  </div>`
      : ''
    }

</body>
</html>`;
};
