import { z } from 'zod';

/**
 * Strict Zod schema for a single Work Experience item.
 */
const WorkExperienceSchema = z.object({
  jobTitle: z.string().min(1, { message: 'Job title is required' }),
  companyLocation: z.string().min(1, { message: 'Company name and location are required' }),
  dateRange: z.string().min(1, { message: 'Date range is required' }),
  mainTasks: z.array(z.string().min(1, { message: 'Task detail cannot be empty' }))
    .min(1, { message: 'At least one main task or achievement is required' }),
});

/**
 * Strict Zod schema for a single Education item.
 */
const EducationSchema = z.object({
  degree: z.string().min(1, { message: 'Degree or certificate title is required' }),
  institution: z.string().min(1, { message: 'Institution name is required' }),
  year: z.string().min(1, { message: 'Graduation year or date range is required' }),
  notes: z.string().optional(),
});

/**
 * Strict Zod schema for a single Language item.
 */
const LanguageSchema = z.object({
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
  template: z.enum(['classic', 'engineering', 'hospitality', 'executive']).optional().default('classic'),
});

export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type CVData = z.infer<typeof CVSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type CVTemplate = 'classic' | 'engineering' | 'hospitality' | 'executive';

/** Lightweight metadata for CV saved in the list */
export interface CVSummary {
  id: string;
  name: string;
  updatedAt: number;
  template: CVTemplate;
}

/**
 * Relaxed schema for preview — makes all fields optional with empty defaults
 * so partial CV data still renders. Normalises old `modern`/`creative` values.
 */
const normalizeTemplate = (v: unknown): 'classic' | 'engineering' | 'hospitality' | 'executive' => {
  if (v === 'engineering' || v === 'hospitality' || v === 'executive') return v;
  return 'classic';
};

export const PreviewCVSchema = z.object({
  fullName: z.string().optional().default(''),
  address: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  email: z.string().optional().default(''),
  summary: z.string().optional().default(''),
  skills: z.array(z.string()).optional().default([]),
  workExperience: z.array(z.object({
    jobTitle: z.string().optional().default(''),
    companyLocation: z.string().optional().default(''),
    dateRange: z.string().optional().default(''),
    mainTasks: z.array(z.string()).optional().default(['']),
  })).optional().default([]),
  education: z.array(z.object({
    degree: z.string().optional().default(''),
    institution: z.string().optional().default(''),
    year: z.string().optional().default(''),
    notes: z.string().optional().default(''),
  })).optional().default([{ degree: '', institution: '', year: '', notes: '' }]),
  courses: z.array(z.string()).optional().default([]),
  languages: z.array(z.object({
    name: z.string().optional().default(''),
    level: z.string().optional().default(''),
  })).optional().default([{ name: 'Arabic', level: '' }] as { name: string; level: string }[]),
  template: z.string().optional().default('classic').transform(normalizeTemplate),
});

export const TEMPLATE_NAMES: Record<CVTemplate, { en: string; ar: string }> = {
  classic: { en: 'Classic Professional', ar: 'احترافي كلاسيكي' },
  engineering: { en: 'Engineering & Technical', ar: 'هندسي وتقني' },
  hospitality: { en: 'Hospitality & Cafe', ar: 'ضيافة ومقاهي' },
  executive: { en: 'Executive Premium', ar: 'تنفيذي ممتاز' },
};

export const TEMPLATE_DESCRIPTIONS: Record<CVTemplate, { en: string; ar: string }> = {
  classic: { en: 'Clean traditional layout, perfect for all industries', ar: 'تصميم نظيف تقليدي، مناسب لجميع المجالات' },
  engineering: { en: 'Technical layout with skills sidebar, blue/gray tones', ar: 'تصميم تقني مع شريط جانبي للمهارات، درجات أزرق/رمادي' },
  hospitality: { en: 'Warm design with rounded elements, service-focused', ar: 'تصميم دافئ مع عناصر دائرية، موجه للخدمة' },
  executive: { en: 'Premium dark header with gold accents, management focus', ar: 'رأس غامق فاخر مع لمسات ذهبية، موجه للإدارة' },
};
