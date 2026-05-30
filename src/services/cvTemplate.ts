import { CVData, CVTemplate } from '../types/cv';

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

type Lang = 'en' | 'ar';

/**
 * ─── Template: Classic ─────────────────────────────────────────
 * Clean white background, black text, centered header with border bars.
 */
const templateClassic = (data: CVData, lang: Lang, lbl: any, dir: string, textAlign: string, listPaddingSide: string, fontStack: string): string => {
  const c = { background: '#FFFFFF', primaryHeader: '#000000', body: '#000000', border: '#000000', secondaryText: '#333333' };
  return baseTemplate(data, lang, lbl, dir, textAlign, listPaddingSide, fontStack, c, 'light');
};

/**
 * ─── Template: Modern ──────────────────────────────────────────
 * White background with a dark navy header bar, blue section accents.
 */
const templateModern = (data: CVData, lang: Lang, lbl: any, dir: string, textAlign: string, listPaddingSide: string, fontStack: string): string => {
  const c = {
    background: '#FFFFFF',
    primaryHeader: '#1B2A4A',
    body: '#2C3E50',
    border: '#D5D8DC',
    secondaryText: '#566573',
    accent: '#2980B9',
    headerBg: '#1B2A4A',
    headerText: '#FFFFFF',
    sectionAccent: '#2980B9',
  };

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
    <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:8px;" cellpadding="0" cellspacing="0">
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
    data.workExperience.map((exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px; text-align:${textAlign};">
        <div style="border-left:${lang === 'ar' ? 'none' : '3px solid ' + c.sectionAccent}; border-right:${lang === 'ar' ? '3px solid ' + c.sectionAccent : 'none'}; padding-${lang === 'ar' ? 'right' : 'left'}: 10px;">
          <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.accent}; margin:0 0 2px 0;">${exp.jobTitle}</h3>
          <p style="font-family:${fontStack}; font-size:11px; font-weight:normal; color:${c.secondaryText}; margin:0 0 1px 0;">${exp.companyLocation}</p>
          <p style="font-family:${fontStack}; font-size:10.5px; font-style:italic; color:${c.secondaryText}; margin:0 0 4px 0;">${exp.dateRange}</p>
        </div>
        <p style="font-family:${fontStack}; font-weight:bold; font-size:10px; color:${c.body}; margin:8px 0 2px 0;">${lbl.mainTasks}</p>
        <ul style="margin:0; ${listPaddingSide}:16px; list-style-type:disc;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:3px; font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; line-height:1.4;">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.accent}; margin:0 0 2px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:11px; font-weight:normal; color:${c.body}; margin:0 0 2px 0;">${edu.institution} ${edu.year}</p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:10px; font-style:italic; color:${c.secondaryText}; margin:0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const renderLanguages = (): string =>
    data.languages.map((langItem) => `
      <div style="font-family:${fontStack}; font-size:10.5px; color:${c.body}; text-align:${textAlign}; margin-bottom:4px;">
        <span style="font-weight:bold;">${langItem.name}:</span> ${langItem.level}
      </div>`
    ).join('');

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack}; font-size:13px; font-weight:bold; color:${c.sectionAccent}; border-bottom:2px solid ${c.sectionAccent}; padding-bottom:3px; margin:16px 0 8px 0; letter-spacing:0.5px; text-align:${textAlign};">${title}</h2>`;

  // ═══ Modern Template Layout ═══
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:light;font-family:${fontStack};font-size:11px;line-height:1.5;width:210mm;min-height:297mm;margin:0 auto;direction:${dir};text-align:justify;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <div style="background-color:${c.headerBg}; color:${c.headerText}; padding:24px 30px; text-align:center; margin-bottom:20px;">
    <h1 style="font-family:${fontStack}; font-size:26px; font-weight:900; color:${c.headerText}; margin-bottom:4px; letter-spacing:0.5px;">${data.fullName}</h1>
    <div style="font-family:${fontStack}; font-size:10px; color:${c.headerText}; opacity:0.85; margin-top:6px;">${data.address} | ${data.phone} | ${data.email}</div>
  </div>

  ${data.summary ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:16px; padding:0 30px; text-align:${textAlign};"><p style="font-family:${fontStack}; font-size:10.5px; color:${c.body}; line-height:1.6;">${data.summary}</p></div>` : ''}

  ${data.skills.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:16px; padding:0 30px;">${sectionTitle(lbl.skills)}${renderTwoColumnTable(leftSkills, rightSkills)}</div>` : ''}

  ${data.workExperience.length > 0 ? `<div style="margin-bottom:16px; padding:0 30px;">${sectionTitle(lbl.experience)}${renderExperience()}</div>` : ''}

  ${data.education.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:16px; padding:0 30px;">${sectionTitle(lbl.education)}${renderEducation()}</div>` : ''}

  ${data.courses.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:16px; padding:0 30px;">${sectionTitle(lbl.courses)}${renderTwoColumnTable(leftCourses, rightCourses)}</div>` : ''}

  ${data.languages.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; padding:0 30px;">${sectionTitle(lbl.languages)}${renderLanguages()}</div>` : ''}
</body>
</html>`;
};

/**
 * ─── Template: Creative ────────────────────────────────────────
 * Two-column layout: left sidebar (teal) for contact/skills, right for experience/education.
 */
const templateCreative = (data: CVData, lang: Lang, lbl: any, dir: string, textAlign: string, listPaddingSide: string, fontStack: string): string => {
  const c = {
    sidebarBg: '#0E6655',
    sidebarText: '#FFFFFF',
    background: '#FFFFFF',
    body: '#2C3E50',
    secondaryText: '#566573',
    accent: '#0E6655',
    border: '#E8E8E8',
  };

  const leftAlign = lang === 'ar' ? 'right' : 'left';
  const rightAlign = lang === 'ar' ? 'left' : 'right';

  const sidebarContent = `
    <div style="background-color:${c.sidebarBg}; color:${c.sidebarText}; padding:30px 20px; height:100%;">
      <h1 style="font-family:${fontStack}; font-size:22px; font-weight:900; color:${c.sidebarText}; margin-bottom:8px; text-align:${leftAlign};">${data.fullName}</h1>
      <div style="font-family:${fontStack}; font-size:9.5px; color:${c.sidebarText}; opacity:0.8; margin-bottom:20px; text-align:${leftAlign};">
        ${data.address}<br/>${data.phone}<br/>${data.email}
      </div>

      ${data.skills.length > 0 ? `
        <h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.sidebarText}; border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom:4px; margin-bottom:8px; letter-spacing:1px; text-align:${leftAlign};">${lbl.skills.toUpperCase()}</h2>
        <div style="font-family:${fontStack}; font-size:9.5px; color:${c.sidebarText}; text-align:${leftAlign}; margin-bottom:20px;">
          ${data.skills.join(' • ')}
        </div>` : ''}

      ${data.courses.length > 0 ? `
        <h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.sidebarText}; border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom:4px; margin-bottom:8px; letter-spacing:1px; text-align:${leftAlign};">${lbl.courses.toUpperCase()}</h2>
        <div style="font-family:${fontStack}; font-size:9.5px; color:${c.sidebarText}; text-align:${leftAlign}; margin-bottom:20px;">
          ${data.courses.join(' • ')}
        </div>` : ''}

      ${data.languages.length > 0 ? `
        <h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.sidebarText}; border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom:4px; margin-bottom:8px; letter-spacing:1px; text-align:${leftAlign};">${lbl.languages.toUpperCase()}</h2>
        <div style="font-family:${fontStack}; font-size:9.5px; color:${c.sidebarText}; text-align:${leftAlign};">
          ${data.languages.map(l => `<div style="margin-bottom:3px;"><span style="font-weight:700;">${l.name}:</span> ${l.level}</div>`).join('')}
        </div>` : ''}
    </div>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">
        <h3 style="font-family:${fontStack}; font-size:11px; font-weight:bold; color:${c.accent}; margin:0 0 2px 0;">${exp.jobTitle}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.secondaryText}; margin:0 0 1px 0;">${exp.companyLocation} — ${exp.dateRange}</p>
        <ul style="margin:4px 0 0 0; ${listPaddingSide}:14px; list-style-type:disc;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:2px; font-family:${fontStack}; font-size:9.5px; color:${c.body}; text-align:${textAlign}; line-height:1.4;">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px;">
        <h3 style="font-family:${fontStack}; font-size:11px; font-weight:bold; color:${c.accent}; margin:0 0 2px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.body}; margin:0;">${edu.institution} ${edu.year}</p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:9px; font-style:italic; color:${c.secondaryText}; margin:2px 0 0 0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const rightContent = `
    <div style="padding:30px 20px;">
      ${data.summary ? `<div style="margin-bottom:18px;"><h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.accent}; border-bottom:1px solid ${c.border}; padding-bottom:4px; margin-bottom:8px; letter-spacing:1px; text-align:${leftAlign};">${lbl.summary.toUpperCase()}</h2><p style="font-family:${fontStack}; font-size:10px; color:${c.body}; line-height:1.6; text-align:${leftAlign};">${data.summary}</p></div>` : ''}
      ${data.workExperience.length > 0 ? `<div style="margin-bottom:18px;"><h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.accent}; border-bottom:1px solid ${c.border}; padding-bottom:4px; margin-bottom:8px; letter-spacing:1px; text-align:${leftAlign};">${lbl.experience.toUpperCase()}</h2>${renderExperience()}</div>` : ''}
      ${data.education.length > 0 ? `<div style="margin-bottom:18px;"><h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.accent}; border-bottom:1px solid ${c.border}; padding-bottom:4px; margin-bottom:8px; letter-spacing:1px; text-align:${leftAlign};">${lbl.education.toUpperCase()}</h2>${renderEducation()}</div>` : ''}
    </div>`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:light;font-family:${fontStack};font-size:11px;line-height:1.5;width:210mm;min-height:297mm;margin:0 auto;direction:${dir};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <table style="width:100%; border-collapse:collapse; height:297mm;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width:33%; vertical-align:top; border:none;">${sidebarContent}</td>
      <td style="width:67%; vertical-align:top; border:none;">${rightContent}</td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * Base Classic template — keeps the original structure unchanged.
 */
const baseTemplate = (data: CVData, lang: Lang, lbl: any, dir: string, textAlign: string, listPaddingSide: string, fontStack: string, c: any, colorScheme: string): string => {
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
    <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:8px;" cellpadding="0" cellspacing="0">
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
    data.workExperience.map((exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.body}; margin:0 0 2px 0;">${exp.jobTitle}</h3>
        <p style="font-family:${fontStack}; font-size:11px; font-weight:normal; color:${c.secondaryText}; margin:0 0 1px 0;">${exp.companyLocation}</p>
        <p style="font-family:${fontStack}; font-size:10.5px; font-style:italic; color:${c.secondaryText}; margin:0 0 4px 0;">${exp.dateRange}</p>
        <p style="font-family:${fontStack}; font-weight:bold; font-size:10px; color:${c.body}; margin:4px 0 2px 0;">${lbl.mainTasks}</p>
        <ul style="margin:0; ${listPaddingSide}:16px; list-style-type:disc;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:3px; font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; line-height:1.4;">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.body}; margin:0 0 2px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:11px; font-weight:normal; color:${c.body}; margin:0 0 2px 0;">${edu.institution} ${edu.year}</p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:10px; font-style:italic; color:${c.secondaryText}; margin:0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const renderLanguages = (): string =>
    data.languages.map((langItem) => `
      <div style="font-family:${fontStack}; font-size:10.5px; color:${c.body}; text-align:${textAlign}; margin-bottom:4px;">
        <span style="font-weight:bold;">${langItem.name}:</span> ${langItem.level}
      </div>`
    ).join('');

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack}; font-size:14px; font-weight:bold; color:${c.primaryHeader}; border-bottom:1px solid ${c.border}; padding-bottom:2px; margin:14px 0 8px 0; letter-spacing:0.2px; text-align:${textAlign};">${title}</h2>`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:${colorScheme};">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="${colorScheme}">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    html{color-scheme:${colorScheme};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:${colorScheme};font-family:${fontStack};font-size:11px;line-height:1.5;padding:30px;width:210mm;min-height:297mm;margin:0 auto;direction:${dir};text-align:justify;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <div style="text-align:center; margin-bottom:14px; page-break-inside:avoid;">
    <h1 style="font-family:${fontStack}; font-size:24px; font-weight:bold; color:${c.body}; margin-bottom:6px; letter-spacing:-0.2px;">${data.fullName}</h1>
    <div style="border-top:1px solid ${c.border}; border-bottom:1px solid ${c.border}; padding:6px 0; font-family:${fontStack}; font-size:10.5px; font-weight:normal; color:${c.body}; width:100%; text-align:center; margin-bottom:10px; background-color:${c.background};">
      ${lbl.address} : ${data.address} | ${data.phone} | ${data.email}
    </div>
  </div>
  ${data.summary ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">${sectionTitle(lbl.summary)}<p style="font-family:${fontStack}; font-size:11px; color:${c.body}; text-align:justify; margin:0; line-height:1.5;">${data.summary}</p></div>` : ''}
  ${data.skills.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">${sectionTitle(lbl.skills)}${renderTwoColumnTable(leftSkills, rightSkills)}</div>` : ''}
  ${data.workExperience.length > 0 ? `<div style="margin-bottom:14px;">${sectionTitle(lbl.experience)}${renderExperience()}</div>` : ''}
  ${data.education.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">${sectionTitle(lbl.education)}${renderEducation()}</div>` : ''}
  ${data.courses.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">${sectionTitle(lbl.courses)}${renderTwoColumnTable(leftCourses, rightCourses)}</div>` : ''}
  ${data.languages.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">${sectionTitle(lbl.languages)}${renderLanguages()}</div>` : ''}
</body>
</html>`;
};

/**
 * ─── Template: Engineering ──────────────────────────────────────
 * Modern two-column layout with a blue/gray sidebar for skills,
 * technical focus with code-like styling.
 */
const templateEngineering = (data: CVData, lang: Lang, lbl: any, dir: string, textAlign: string, listPaddingSide: string, fontStack: string): string => {
  const c = {
    sidebarBg: '#1A365D',
    sidebarText: '#FFFFFF',
    background: '#F8FAFC',
    body: '#1E293B',
    secondaryText: '#475569',
    accent: '#2563EB',
    border: '#CBD5E1',
    sectionBg: '#EFF6FF',
  };

  const leftAlign = lang === 'ar' ? 'right' : 'left';
  const sidebarContent = `
    <div style="background-color:${c.sidebarBg}; color:${c.sidebarText}; padding:30px 20px; height:100%;">
      <h1 style="font-family:${fontStack}; font-size:22px; font-weight:900; color:${c.sidebarText}; margin-bottom:4px; text-align:${leftAlign};">${data.fullName}</h1>
      <div style="font-family:${fontStack}; font-size:9px; color:${c.sidebarText}; opacity:0.75; margin-bottom:24px; text-align:${leftAlign};">
        ${data.address}<br/>${data.phone}<br/>${data.email}
      </div>
      <h2 style="font-family:${fontStack}; font-size:10px; font-weight:700; color:${c.sidebarText}; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:4px; margin-bottom:8px; letter-spacing:1.5px; text-align:${leftAlign};">${lbl.skills.toUpperCase()}</h2>
      <div style="font-family:${fontStack}; font-size:9px; color:${c.sidebarText}; text-align:${leftAlign}; margin-bottom:20px;">
        ${data.skills.map(s => `<div style="margin-bottom:4px; padding:3px 6px; background:rgba(255,255,255,0.1); border-radius:3px; display:inline-block; margin-right:4px;">${s}</div>`).join('')}
      </div>
      ${data.courses.length > 0 ? `
        <h2 style="font-family:${fontStack}; font-size:10px; font-weight:700; color:${c.sidebarText}; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:4px; margin-bottom:8px; letter-spacing:1.5px; text-align:${leftAlign};">${lbl.courses.toUpperCase()}</h2>
        <div style="font-family:${fontStack}; font-size:9px; color:${c.sidebarText}; text-align:${leftAlign}; margin-bottom:20px;">
          ${data.courses.map(c => `<div style="margin-bottom:3px;">• ${c}</div>`).join('')}
        </div>` : ''}
      ${data.languages.length > 0 ? `
        <h2 style="font-family:${fontStack}; font-size:10px; font-weight:700; color:${c.sidebarText}; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:4px; margin-bottom:8px; letter-spacing:1.5px; text-align:${leftAlign};">${lbl.languages.toUpperCase()}</h2>
        <div style="font-family:${fontStack}; font-size:9px; color:${c.sidebarText}; text-align:${leftAlign};">
          ${data.languages.map(l => `<div style="margin-bottom:4px;"><span style="font-weight:700;">${l.name}:</span> ${l.level}</div>`).join('')}
        </div>` : ''}
    </div>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px; background:${c.sectionBg}; border-radius:6px; padding:12px;">
        <h3 style="font-family:${fontStack}; font-size:11px; font-weight:bold; color:${c.accent}; margin:0 0 2px 0;">${exp.jobTitle}</h3>
        <p style="font-family:${fontStack}; font-size:9.5px; color:${c.secondaryText}; margin:0 0 1px 0;">${exp.companyLocation} — ${exp.dateRange}</p>
        <ul style="margin:6px 0 0 0; ${listPaddingSide}:14px; list-style-type:disc;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:2px; font-family:${fontStack}; font-size:9px; color:${c.body}; text-align:${textAlign};">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px;">
        <h3 style="font-family:${fontStack}; font-size:11px; font-weight:bold; color:${c.accent}; margin:0 0 2px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:9.5px; color:${c.body}; margin:0;">${edu.institution} ${edu.year}</p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:8.5px; font-style:italic; color:${c.secondaryText}; margin:2px 0 0 0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const rightContent = `
    <div style="padding:30px 20px;">
      ${data.summary ? `<div style="margin-bottom:16px;"><h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.accent}; border-bottom:2px solid ${c.accent}; padding-bottom:3px; margin-bottom:8px; letter-spacing:0.5px; text-align:${leftAlign};">${lbl.summary.toUpperCase()}</h2><p style="font-family:${fontStack}; font-size:9.5px; color:${c.body}; line-height:1.6; text-align:${leftAlign};">${data.summary}</p></div>` : ''}
      ${data.workExperience.length > 0 ? `<div style="margin-bottom:16px;"><h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.accent}; border-bottom:2px solid ${c.accent}; padding-bottom:3px; margin-bottom:8px; letter-spacing:0.5px; text-align:${leftAlign};">${lbl.experience.toUpperCase()}</h2>${renderExperience()}</div>` : ''}
      ${data.education.length > 0 ? `<div style="margin-bottom:16px;"><h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.accent}; border-bottom:2px solid ${c.accent}; padding-bottom:3px; margin-bottom:8px; letter-spacing:0.5px; text-align:${leftAlign};">${lbl.education.toUpperCase()}</h2>${renderEducation()}</div>` : ''}
    </div>`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:light;font-family:${fontStack};font-size:11px;line-height:1.5;width:210mm;min-height:297mm;margin:0 auto;direction:${dir};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <table style="width:100%; border-collapse:collapse; height:297mm;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width:30%; vertical-align:top; border:none;">${sidebarContent}</td>
      <td style="width:70%; vertical-align:top; border:none;">${rightContent}</td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * ─── Template: Hospitality ────────────────────────────────────
 * Warm earth-tone design, rounded cards, service-oriented layout.
 */
const templateHospitality = (data: CVData, lang: Lang, lbl: any, dir: string, textAlign: string, listPaddingSide: string, fontStack: string): string => {
  const c = {
    background: '#FEFCF9',
    headerBg: '#8B6F47',
    headerText: '#FFFFFF',
    body: '#3D3229',
    secondaryText: '#6B5E50',
    accent: '#C4956A',
    border: '#E8DFD3',
    cardBg: '#FFFFFF',
    sectionAccent: '#A67C52',
  };

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack}; font-size:13px; font-weight:700; color:${c.sectionAccent}; margin:18px 0 10px 0; text-align:${textAlign}; letter-spacing:0.3px;">
      <span style="background:${c.accent}; color:${c.headerText}; padding:3px 12px; border-radius:9999px; font-size:10px; display:inline-block;">${title}</span>
    </h2>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:12px; background:${c.cardBg}; border-radius:10px; padding:12px 14px; border:1px solid ${c.border}; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.body}; margin:0 0 2px 0;">${exp.jobTitle}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.accent}; margin:0 0 1px 0; font-weight:600;">${exp.companyLocation}</p>
        <p style="font-family:${fontStack}; font-size:9.5px; font-style:italic; color:${c.secondaryText}; margin:0 0 6px 0;">${exp.dateRange}</p>
        <ul style="margin:0; ${listPaddingSide}:14px; list-style-type:circle;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:3px; font-family:${fontStack}; font-size:9.5px; color:${c.body}; text-align:${textAlign};">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px; background:${c.cardBg}; border-radius:10px; padding:12px 14px; border:1px solid ${c.border}; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.body}; margin:0 0 2px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.accent}; margin:0;">${edu.institution} <span style="color:${c.secondaryText};">${edu.year}</span></p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:9px; font-style:italic; color:${c.secondaryText}; margin:4px 0 0 0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const renderSkills = (): string => `
    <div style="page-break-inside:avoid; break-inside:avoid; text-align:${textAlign};">
      <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:${lang === 'ar' ? 'flex-end' : 'flex-start'};">
        ${data.skills.map(s => `<span style="background:${c.accent}; color:${c.headerText}; padding:4px 12px; border-radius:9999px; font-family:${fontStack}; font-size:9px; display:inline-block; margin:2px;">${s}</span>`).join('')}
      </div>
    </div>`;

  const renderCourses = (): string => `
    <div style="page-break-inside:avoid; break-inside:avoid; text-align:${textAlign};">
      <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:${lang === 'ar' ? 'flex-end' : 'flex-start'};">
        ${data.courses.map(course => `<span style="background:${c.border}; color:${c.body}; padding:4px 12px; border-radius:9999px; font-family:${fontStack}; font-size:9px; display:inline-block; margin:2px;">${course}</span>`).join('')}
      </div>
    </div>`;

  const renderLanguages = (): string =>
    data.languages.map((l) => `
      <div style="font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; margin-bottom:4px;">
        <span style="font-weight:600; color:${c.accent};">${l.name}:</span> ${l.level}
      </div>`
    ).join('');

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:light;font-family:${fontStack};font-size:11px;line-height:1.5;width:210mm;min-height:297mm;margin:0 auto;padding:0 24px 24px;direction:${dir};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <div style="background:${c.headerBg}; color:${c.headerText}; padding:28px 24px; border-radius:0 0 30px 30px; text-align:center; margin-bottom:8px;">
    <h1 style="font-family:${fontStack}; font-size:26px; font-weight:900; color:${c.headerText}; margin-bottom:6px; letter-spacing:0.3px;">${data.fullName}</h1>
    <div style="font-family:${fontStack}; font-size:10px; color:${c.headerText}; opacity:0.9; display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
      <span>${data.address}</span><span>${data.phone}</span><span>${data.email}</span>
    </div>
  </div>

  ${data.summary ? `<div style="page-break-inside:avoid; break-inside:avoid; text-align:${textAlign}; background:${c.cardBg}; border-radius:10px; padding:14px; border:1px solid ${c.border}; margin:10px 0;"><p style="font-family:${fontStack}; font-size:10px; color:${c.body}; line-height:1.7;">${data.summary}</p></div>` : ''}

  ${data.skills.length > 0 ? `<div style="page-break-inside:avoid;">${sectionTitle(lbl.skills)}${renderSkills()}</div>` : ''}

  ${data.workExperience.length > 0 ? `<div>${sectionTitle(lbl.experience)}${renderExperience()}</div>` : ''}

  ${data.education.length > 0 ? `<div>${sectionTitle(lbl.education)}${renderEducation()}</div>` : ''}

  ${data.courses.length > 0 ? `<div style="page-break-inside:avoid;">${sectionTitle(lbl.courses)}${renderCourses()}</div>` : ''}

  ${data.languages.length > 0 ? `<div style="page-break-inside:avoid;">${sectionTitle(lbl.languages)}<div style="margin:0 0 0 4px;">${renderLanguages()}</div></div>` : ''}
</body>
</html>`;
};

/**
 * ─── Template: Executive ───────────────────────────────────────
 * Premium dark header with gold accents, management-focused layout.
 */
const templateExecutive = (data: CVData, lang: Lang, lbl: any, dir: string, textAlign: string, listPaddingSide: string, fontStack: string): string => {
  const c = {
    background: '#FFFFFF',
    headerBg: '#1A1A2E',
    headerText: '#FFFFFF',
    gold: '#C9A84C',
    body: '#2D2D3D',
    secondaryText: '#5A5A6E',
    accent: '#1A1A2E',
    border: '#E2E2EC',
    accentLight: '#16213E',
  };

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.accent}; margin:18px 0 10px 0; text-align:${textAlign}; border-bottom:1px solid ${c.gold}; padding-bottom:4px; letter-spacing:1px;">
      ${title}
    </h2>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px; text-align:${textAlign};">
        <div style="display:flex; justify-content:space-between; align-items:baseline; flex-direction:${lang === 'ar' ? 'row-reverse' : 'row'};">
          <h3 style="font-family:${fontStack}; font-size:11px; font-weight:bold; color:${c.accent}; margin:0;">${exp.jobTitle}</h3>
          <span style="font-family:${fontStack}; font-size:9px; color:${c.gold}; font-weight:600;">${exp.dateRange}</span>
        </div>
        <p style="font-family:${fontStack}; font-size:10px; font-weight:600; color:${c.secondaryText}; margin:2px 0 6px 0;">${exp.companyLocation}</p>
        <ul style="margin:0; ${listPaddingSide}:14px; list-style-type:none;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:4px; font-family:${fontStack}; font-size:9.5px; color:${c.body}; text-align:${textAlign}; position:relative; ${listPaddingSide === 'padding-left' ? 'padding-left:12px;' : 'padding-right:12px;'}">${lang === 'ar' ? '▸' : '▸'} ${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px; text-align:${textAlign}; border-left:${lang === 'ar' ? 'none' : '2px solid ' + c.gold}; border-right:${lang === 'ar' ? '2px solid ' + c.gold : 'none'}; padding-${lang === 'ar' ? 'right' : 'left'}: 10px;">
        <h3 style="font-family:${fontStack}; font-size:11px; font-weight:bold; color:${c.accent}; margin:0 0 2px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.body}; margin:0;">${edu.institution} <span style="color:${c.gold};">${edu.year}</span></p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:9px; font-style:italic; color:${c.secondaryText}; margin:3px 0 0 0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const renderSkills = (): string =>
    data.skills.length > 0 ? `
      <div style="display:flex; flex-wrap:wrap; gap:4px; justify-content:${lang === 'ar' ? 'flex-end' : 'flex-start'};">
        ${data.skills.map(s => `<span style="background:${c.accentLight}; color:${c.gold}; padding:3px 10px; border-radius:2px; font-family:${fontStack}; font-size:9px; font-weight:600;">${s}</span>`).join('')}
      </div>` : '';

  const renderLanguages = (): string =>
    data.languages.map((l) => `
      <div style="font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; margin-bottom:3px;">
        <span style="font-weight:600; color:${c.accent};">${l.name}</span> — ${l.level}
      </div>`
    ).join('');

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:light;font-family:${fontStack};font-size:11px;line-height:1.5;width:210mm;min-height:297mm;margin:0 auto;direction:${dir};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <div style="background:${c.headerBg}; color:${c.headerText}; padding:32px 30px 28px; text-align:center; border-bottom:3px solid ${c.gold};">
    <h1 style="font-family:${fontStack}; font-size:28px; font-weight:900; color:${c.headerText}; margin-bottom:4px; letter-spacing:1px;">${data.fullName}</h1>
    <div style="width:40px; height:2px; background:${c.gold}; margin:8px auto;"></div>
    <div style="font-family:${fontStack}; font-size:9.5px; color:${c.headerText}; opacity:0.85; margin-top:8px; letter-spacing:0.3px;">${data.address} &nbsp;|&nbsp; ${data.phone} &nbsp;|&nbsp; ${data.email}</div>
  </div>

  <div style="padding:20px 30px;">
    ${data.summary ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:16px; text-align:${textAlign};"><p style="font-family:${fontStack}; font-size:10px; color:${c.body}; line-height:1.7; font-style:italic;">${data.summary}</p></div>` : ''}

    ${data.skills.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid;">${sectionTitle(lbl.skills)}${renderSkills()}</div>` : ''}

    ${data.workExperience.length > 0 ? `<div>${sectionTitle(lbl.experience)}${renderExperience()}</div>` : ''}

    ${data.education.length > 0 ? `<div>${sectionTitle(lbl.education)}${renderEducation()}</div>` : ''}

    ${data.courses.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid;"><h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.accent}; margin:18px 0 10px 0; text-align:${textAlign}; border-bottom:1px solid ${c.gold}; padding-bottom:4px; letter-spacing:1px;">${lbl.courses}</h2><div style="font-family:${fontStack}; font-size:9.5px; color:${c.body}; text-align:${textAlign};">${data.courses.join(' • ')}</div></div>` : ''}

    ${data.languages.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid;"><h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.accent}; margin:18px 0 10px 0; text-align:${textAlign}; border-bottom:1px solid ${c.gold}; padding-bottom:4px; letter-spacing:1px;">${lbl.languages}</h2>${renderLanguages()}</div>` : ''}
  </div>
</body>
</html>`;
};

/**
 * Generates a fully self-contained, print-safe A4 HTML document.
 * Routes to the correct template based on `data.template`.
 */
export const generateCVTemplate = (
  data: CVData,
  isDarkMode: boolean,
  lang: 'en' | 'ar' = 'en'
): string => {
  const lbl = LABELS[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const textAlign = lang === 'ar' ? 'right' : 'left';
  const listPaddingSide = lang === 'ar' ? 'padding-right' : 'padding-left';
  const fontStack = "'Cairo', 'Times New Roman', Times, serif";
  const template: CVTemplate = data.template || 'classic';

  switch (template) {
    case 'engineering':
      return templateEngineering(data, lang, lbl, dir, textAlign, listPaddingSide, fontStack);
    case 'hospitality':
      return templateHospitality(data, lang, lbl, dir, textAlign, listPaddingSide, fontStack);
    case 'executive':
      return templateExecutive(data, lang, lbl, dir, textAlign, listPaddingSide, fontStack);
    case 'classic':
    default:
      return templateClassic(data, lang, lbl, dir, textAlign, listPaddingSide, fontStack);
  }
};
