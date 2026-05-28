import { CVData } from '../types/cv';
import { COLORS } from '../constants/tokens';

/**
 * Generates an A4 optimized HTML/CSS template for expo-print.
 * Supports complete toggle between Light and Dark mode options.
 *
 * @param data Strict CVData validated by Zod
 * @param isDarkMode Flag for Dark Mode rendering
 * @returns Production-ready HTML string
 */
export const generateCVTemplate = (data: CVData, isDarkMode: boolean): string => {
  const colors = isDarkMode ? COLORS.pdf.dark : COLORS.pdf.light;

  // Split skills list evenly into two columns to mirror the exact dual-column layout of image.png
  const halfSkills = Math.ceil(data.skills.length / 2);
  const leftSkills = data.skills.slice(0, halfSkills);
  const rightSkills = data.skills.slice(halfSkills);

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
          width: 210mm; /* A4 standard width */
          min-height: 297mm; /* A4 standard height */
          margin-left: auto;
          margin-right: auto;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
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
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: ${colors.primaryHeader};
          border-bottom: 2px solid ${colors.border};
          padding-bottom: 4px;
          margin-top: 25px;
          margin-bottom: 12px;
          text-transform: capitalize;
          letter-spacing: 0.5px;
        }
        .summary-text {
          text-align: justify;
          margin-bottom: 15px;
          color: ${colors.body};
        }
        .skills-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 15px;
        }
        .skills-column {
          width: 48%;
        }
        .skills-column ul {
          list-style-type: disc;
          padding-left: 20px;
        }
        .skills-column li {
          margin-bottom: 5px;
          color: ${colors.body};
        }
        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .job-block {
          page-break-inside: avoid; /* Essential page rule to prevent vertical split cuts */
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
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="fullname">${data.fullName}</h1>
        <div class="contact-box">
          Official Address : ${data.address} | ${data.phone} | ${data.email}
        </div>
      </div>

      <div>
        <h2 class="section-title">Summary</h2>
        <p class="summary-text">${data.summary}</p>
      </div>

      <div>
        <h2 class="section-title">Skills</h2>
        <div class="skills-container">
          <div class="skills-column">
            <ul>
              ${leftSkills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
          <div class="skills-column">
            <ul>
              ${rightSkills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <div>
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
    </body>
    </html>
  `;
};
