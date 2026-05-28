import { CVData } from '../types/cv';
import { COLORS } from '../constants/tokens';

/**
 * Generates a standard A4 optimized HTML/CSS template for expo-print.
 * Fully supports Page 1 and Page 2 multi-page layout structures.
 *
 * @param data Strict CVData validated by Zod
 * @param isDarkMode Flag for Dark Mode rendering
 * @returns Production-ready HTML string
 */
export const generateCVTemplate = (data: CVData, isDarkMode: boolean): string => {
  const colors = isDarkMode ? COLORS.pdf.dark : COLORS.pdf.light;

  // Split skills list evenly into two columns using a rigid table layout
  const halfSkills = Math.ceil(data.skills.length / 2);
  const leftSkills = data.skills.slice(0, halfSkills);
  const rightSkills = data.skills.slice(halfSkills);

  // Split courses list evenly into two columns
  const halfCourses = Math.ceil(data.courses.length / 2);
  const leftCourses = data.courses.slice(0, halfCourses);
  const rightCourses = data.courses.slice(halfCourses);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>${data.fullName} - Professional CV</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          background-color: ${colors.background};
          color: ${colors.body};
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
          padding: 40px;
          width: 210mm; /* Standard A4 width */
          min-height: 297mm; /* Standard A4 height */
          margin-left: auto;
          margin-right: auto;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .fullname {
          font-size: 32px;
          font-weight: bold;
          color: ${colors.body};
          margin-bottom: 12px;
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
          text-transform: capitalize;
          letter-spacing: 0.5px;
        }
        .summary-text {
          text-align: justify;
          margin-bottom: 15px;
          color: ${colors.body};
        }
        .two-column-table {
          width: 100%;
          border-collapse: collapse;
          border: none;
          margin-bottom: 10px;
        }
        .two-column-table td {
          width: 50%;
          vertical-align: top;
          border: none;
          padding: 0 10px 0 0;
        }
        .two-column-table ul {
          list-style-type: disc;
          padding-left: 20px;
        }
        .two-column-table li {
          margin-bottom: 5px;
          color: ${colors.body};
        }
        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .job-block {
          page-break-inside: avoid; /* Prevent job blocks splitting across pages */
          break-inside: avoid;
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
          padding-left: 20px;
        }
        .tasks-list li {
          margin-bottom: 4px;
          color: ${colors.body};
        }
        .education-block {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 15px;
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
        }
        .lang-item {
          font-size: 14px;
          color: ${colors.body};
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
          Official Address : ${data.address} | ${data.phone} | ${data.email}
        </div>
      </div>

      <!-- Summary Section -->
      <div class="section-container">
        <h2 class="section-title">Summary</h2>
        <p class="summary-text">${data.summary}</p>
      </div>

      <!-- Skills Section -->
      <div class="section-container">
        <h2 class="section-title">Skills</h2>
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

      <!-- Work Experience Section -->
      <div class="section-container">
        <h2 class="section-title">Work Experience</h2>
        <div class="experience-list">
          ${data.workExperience.map(exp => `
            <div class="job-block">
              <h3 class="job-title">${exp.jobTitle}</h3>
              <p class="job-company">${exp.companyLocation}</p>
              <p class="job-dates">${exp.dateRange}</p>
              <p class="tasks-indicator">Main Tasks:</p>
              <ul class="tasks-list">
                ${exp.mainTasks.map(task => `<li>${task}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Education Section -->
      <div class="section-container">
        <h2 class="section-title">Education</h2>
        ${data.education.map(edu => `
          <div class="education-block">
            <h3 class="edu-degree">${edu.degree}</h3>
            <p class="edu-institution">${edu.institution} ${edu.year}</p>
            ${edu.notes ? `<p class="edu-notes">${edu.notes}</p>` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Courses Section -->
      <div class="section-container">
        <h2 class="section-title">Courses</h2>
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

      <!-- Languages Section -->
      <div class="section-container">
        <h2 class="section-title">Languages</h2>
        <div class="languages-list">
          ${data.languages.map(lang => `
            <div class="lang-item">
              <span class="lang-name">${lang.name}:</span> ${lang.level}
            </div>
          `).join('')}
        </div>
      </div>
    </body>
    </html>
  `;
};
