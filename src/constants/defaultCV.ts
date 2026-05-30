import { CVData } from '../types/cv';

/**
 * Initial empty CV state with zero prefilled data, ready for clean user entry.
 * Supported by beautiful localized placeholders.
 */
export const DEFAULT_CV: CVData = {
  fullName: '',
  address: '',
  phone: '',
  email: '',
  summary: '',
  skills: [],
  workExperience: [],
  education: [
    {
      degree: '',
      institution: '',
      year: '',
      notes: '',
    }
  ],
  courses: [],
  languages: [
    {
      name: 'Arabic',
      level: '',
    },
    {
      name: 'English',
      level: '',
    }
  ],
  template: 'classic',
};
