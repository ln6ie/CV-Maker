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
 * Strict Zod schema for the entire CV document.
 * Mirrors the structure from image.png exactly.
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
});

export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type CVData = z.infer<typeof CVSchema>;
