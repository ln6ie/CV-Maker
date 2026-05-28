import { CVData } from '../types/cv';
import { COLORS } from '../constants/tokens';

/**
 * Translations map for dynamic bidi PDF rendering.
 * Conforms to no-emoji rules.
 */
const TRANSLATIONS = {
  en: {
    summary: 'Summary',
    skills: 'Skills',
    experience: 'Work Experience',
    education: 'Education',
    courses: 'Courses',
    languages: 'Languages',
    mainTasks: 'Main Tasks:',
  },
  ar: {
    summary: 'الخلاصة المهنية',
    skills: 'المهارات والقدرات',
    experience: 'الخبرات المهنية',
    education: 'التعليم والشهادات الاكاديمية',
    courses: 'الدورات التدريبية',
    languages: 'اللغات',
    mainTasks: 'المهام الرئيسية:',
  },
};

/**
 * Generates an A4 optimized dynamic LTR/RTL HTML template.
 * Forces solid backgrounds to prevent transparent exporting bugs.
 *
 * @param data Strict CVData verified by Zod
 * @param isDarkMode Flag for Dark Mode rendering
 * @param lang Language toggle ('en' or 'ar')
 * @returns Production-grade HTML string
 */
export const generateCVTemplate = (data: CVData, isDarkMode: boolean, lang: 'en' | 'ar' = 'en'): string => {
  const colors = isDarkMode ? COLORS.pdf.dark : COLORS.pdf.light;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const fontFamily = lang === 'ar' 
    ? "'Amiri', serif" 
    : "'Times New Roman', Times, serif";
  
  const text = TRANSLATIONS[lang];

  // Split skills list into two even columns
  const halfSkills = Math.ceil(data.skills.length / 2);
  const leftSkills = data.skills.slice(0, halfSkills);
  const rightSkills = data.skills.slice(halfSkills);

  // Split courses list into two even columns
  const halfCourses = Math.ceil(data.courses.length / 2);
  const leftCourses = data.courses.slice(0, halfCourses);
  const rightCourses = data.courses.slice(halfCourses);

  return `
    <!DOCTYPE html>
    <html lang="${lang}" dir="${dir}">
    <head>
      <meta charset="utf-8">
      <title>${data.fullName} - CV</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          background-color: ${colors.background} !important; /* Force solid color (anti-transparency) */
          color: ${colors.body} !important;
          font-family: ${fontFamily};
          font-size: 14px;
          line-height: 1.5;
          padding: 40px;
          width: 210mm; /* A4 width */
          min-height: 297mm; /* A4 height */
          margin-left: auto;
          margin-right: auto;
          direction: ${dir};
          text-align: justify;
        }
        .header {
          text-align: center;
          margin-bottom: 22px;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .fullname {
          font-size: 32px;
          font-weight: bold;
          color: ${colors.body};
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        .contact-box {
          border: 1px solid ${colors.border};
          padding: 8px 12px;
          font-size: 12px;
          font-weight: bold;
          color: ${colors.body};
          display: inline-block;
          width: 100%;
          text-align: center;
          margin-bottom: 15px;
        }
        .section-container {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: ${colors.primaryHeader};
          border-bottom: 2px solid ${colors.border};
          padding-bottom: 4px;
          margin-top: 15px;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
          text-align: ${lang === 'ar' ? 'right' : 'left'};
        }
        .summary-text {
          color: ${colors.body};
          text-align: justify;
          margin-bottom: 15px;
        }
        .two-column-table {
          width: 100%;
          border-collapse: collapse;
          border: none;
          margin-bottom: 10px;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .two-column-table td {
          width: 50%;
          vertical-align: top;
          border: none;
          padding-${lang === 'ar' ? 'left' : 'right'}: 10px;
        }
        .two-column-table ul {
          list-style-type: disc;
          padding-${lang === 'ar' ? 'right' : 'left'}: 20px;
        }
        .two-column-table li {
          margin-bottom: 5px;
          color: ${colors.body};
          text-align: ${lang === 'ar' ? 'right' : 'left'};
        }
        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .job-block {
          page-break-inside: avoid; /* Prevent text fragmentation */
          break-inside: avoid;
          text-align: ${lang === 'ar' ? 'right' : 'left'};
        }
        .job-title {
          font-size: 15px;
          font-weight: bold;
          text-decoration: underline;
          color: ${colors.body};
          margin-bottom: 3px;
        }
        .job-company {
          font-size: 14px;
          font-weight: bold;
          color: ${colors.body};
          margin-bottom: 3px;
        }
        .job-dates {
          font-size: 14px;
          font-weight: bold;
          color: ${colors.body};
          margin-bottom: 6px;
        }
        .tasks-indicator {
          font-weight: bold;
          font-size: 14px;
          color: ${colors.body};
          margin-top: 8px;
          margin-bottom: 4px;
        }
        .tasks-list {
          list-style-type: disc;
          padding-${lang === 'ar' ? 'right' : 'left'}: 20px;
        }
        .tasks-list li {
          margin-bottom: 4px;
          color: ${colors.body};
          text-align: ${lang === 'ar' ? 'right' : 'left'};
        }
        .education-block {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 15px;
          text-align: ${lang === 'ar' ? 'right' : 'left'};
        }
        .edu-degree {
          font-size: 15px;
          font-weight: bold;
          color: ${colors.body};
          margin-bottom: 3px;
        }
        .edu-institution {
          font-size: 14px;
          font-weight: bold;
          color: ${colors.body};
          margin-bottom: 4px;
        }
        .edu-notes {
          font-size: 14px;
          font-style: italic;
          color: ${colors.body};
        }
        .languages-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .lang-item {
          font-size: 14px;
          color: ${colors.body};
          text-align: ${lang === 'ar' ? 'right' : 'left'};
        }
        .lang-name {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <!-- Header -->
      <div class="header">
        <h1 class="fullname">${data.fullName}</h1>
        <div class="contact-box">
          ${lang === 'ar' ? 'العنوان الرسمي' : 'Official Address'} : ${data.address} | ${data.phone} | ${data.email}
        </div>
      </div>

      <!-- Summary -->
      <div class="section-container">
        <h2 class="section-title">${text.summary}</h2>
        <p class="summary-text">${data.summary}</p>
      </div>

      <!-- Skills -->
      <div class="section-container">
        <h2 class="section-title">${text.skills}</h2>
        <table class="two-column-table">
          <tr>
            <td>
              <ul>
                ${leftSkills.map(skill => `<li>${skill}</li>`).join('')}
              </ul>
            </td>
            <td>
              <ul>
                ${rightSkills.map(skill => `<li>${skill}</li>`).join('')}
              </ul>
            </td>
          </tr>
        </table>
      </div>

      <!-- Experience -->
      <div class="section-container">
        <h2 class="section-title">${text.experience}</h2>
        <div class="experience-list">
          ${data.workExperience.map(exp => `
            <div class="job-block">
              <h3 class="job-title">${exp.jobTitle}</h3>
              <p class="job-company">${exp.companyLocation}</p>
              <p class="job-dates">${exp.dateRange}</p>
              <p class="tasks-indicator">${text.mainTasks}</p>
              <ul class="tasks-list">
                ${exp.mainTasks.map(task => `<li>${task}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Education -->
      <div class="section-container">
        <h2 class="section-title">${text.education}</h2>
        ${data.education.map(edu => `
          <div class="education-block">
            <h3 class="edu-degree">${edu.degree}</h3>
            <p class="edu-institution">${edu.institution} ${edu.year}</p>
            ${edu.notes ? `<p class="edu-notes">${edu.notes}</p>` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Courses -->
      <div class="section-container">
        <h2 class="section-title">${text.courses}</h2>
        <table class="two-column-table">
          <tr>
            <td>
              <ul>
                ${leftCourses.map(course => `<li>${course}</li>`).join('')}
              </ul>
            </td>
            <td>
              <ul>
                ${rightCourses.map(course => `<li>${course}</li>`).join('')}
              </ul>
            </td>
          </tr>
        </table>
      </div>

      <!-- Languages -->
      <div class="section-container">
        <h2 class="section-title">${text.languages}</h2>
        <div class="languages-list">
          ${data.languages.map(langItem => `
            <div class="lang-item">
              <span class="lang-name">${langItem.name}:</span> ${langItem.level}
            </div>
          `).join('')}
        </div>
      </div>
    </body>
    </html>
  `;
};
