import { z } from 'zod';

/**
 * Strict Zod schema for a single Work Experience item.
 */
export const WorkExperienceSchema = z.object({
  jobTitle: z.string().min(1, { message: 'Job title is required' }),
  companyLocation: z.string().min(1, { message: 'Company name and location are required' }),
  dateRange: z.string().min(1, { message: 'Date range is required' }),
  mainTasks: z.array(z.string().min(1, { message: 'Task detail cannot be empty' }))
    .min(1, { message: 'At least one main task or achievement is required' }),
});

/**
 * Strict Zod schema for a single Education item.
 */
export const EducationSchema = z.object({
  degree: z.string().min(1, { message: 'Degree or certificate title is required' }),
  institution: z.string().min(1, { message: 'Institution name is required' }),
  year: z.string().min(1, { message: 'Graduation year or date range is required' }),
  notes: z.string().optional(),
});

/**
 * Strict Zod schema for a single Language item.
 */
export const LanguageSchema = z.object({
  name: z.string().min(1, { message: 'Language name is required' }),
  level: z.string().min(1, { message: 'Proficiency level is required' }),
});

/**
 * Strict Zod schema for the entire CV document.
 * Includes all Page 1 & Page 2 requirements.
 */
export const CVSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  summary: z.string().min(1, { message: 'Summary is required' }),
  skills: z.array(z.string().min(1, { message: 'Skill cannot be empty' }))
    .min(1, { message: 'At least one skill is required' }),
  workExperience: z.array(WorkExperienceSchema)
    .min(1, { message: 'At least one work experience item is required' }),
  education: z.array(EducationSchema)
    .min(1, { message: 'At least one education item is required' }),
  courses: z.array(z.string().min(1, { message: 'Course name cannot be empty' }))
    .min(1, { message: 'At least one course is required' }),
  languages: z.array(LanguageSchema)
    .min(1, { message: 'At least one language is required' }),
});

export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type CVData = z.infer<typeof CVSchema>;
