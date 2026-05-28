import { useState } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { CVSchema, CVData, WorkExperience } from '../types/cv';
import { DEFAULT_CV } from '../constants/defaultCV';
import { generateCVTemplate } from '../services/cvTemplate';

export const useCV = () => {
  const [cvData, setCvData] = useState<CVData>(DEFAULT_CV);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [systemError, setSystemError] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState<'idle' | 'generating' | 'completed'>('idle');
  const [cachedPdfUri, setCachedPdfUri] = useState<string | null>(null);

  const clearExportCache = () => {
    setCachedPdfUri(null);
    setExportStatus('idle');
  };

  const updateField = (field: keyof CVData, value: any) => {
    setCvData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    clearExportCache();
  };

  const updateSkillsString = (skillsStr: string) => {
    const list = skillsStr
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    updateField('skills', list);
  };

  const updateCoursesString = (coursesStr: string) => {
    const list = coursesStr
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    updateField('courses', list);
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: any) => {
    setCvData((prev) => {
      const list = [...prev.workExperience];
      if (list[index]) {
        list[index] = { ...list[index], [field]: value };
      }
      return { ...prev, workExperience: list };
    });
    clearExportCache();
  };

  const updateWorkExperienceTask = (expIndex: number, taskIndex: number, value: string) => {
    setCvData((prev) => {
      const list = [...prev.workExperience];
      if (list[expIndex]) {
        const tasks = [...list[expIndex].mainTasks];
        tasks[taskIndex] = value;
        list[expIndex] = { ...list[expIndex], mainTasks: tasks };
      }
      return { ...prev, workExperience: list };
    });
    clearExportCache();
  };

  const addWorkExperienceTask = (expIndex: number) => {
    setCvData((prev) => {
      const list = [...prev.workExperience];
      if (list[expIndex]) {
        list[expIndex] = {
          ...list[expIndex],
          mainTasks: [...list[expIndex].mainTasks, ''],
        };
      }
      return { ...prev, workExperience: list };
    });
    clearExportCache();
  };

  const addWorkExperience = () => {
    const empty: WorkExperience = {
      jobTitle: '',
      companyLocation: '',
      dateRange: '',
      mainTasks: [''],
    };
    setCvData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, empty],
    }));
    clearExportCache();
  };

  const removeWorkExperience = (index: number) => {
    setCvData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
    clearExportCache();
  };

  const handleGeneratePDF = async (isDarkMode: boolean, lang: 'en' | 'ar' = 'en') => {
    setExportStatus('generating');
    setIsLoading(true);
    setSystemError(null);
    setValidationErrors({});

    try {
      const validation = CVSchema.safeParse(cvData);

      if (!validation.success) {
        const errors: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          const path = issue.path.join('.');
          errors[path] = issue.message;
        });
        setValidationErrors(errors);
        setSystemError('Validation failed. Please check the marked fields.');
        setExportStatus('idle');
        setIsLoading(false);
        return;
      }

      const html = generateCVTemplate(validation.data, isDarkMode, lang);

      const { uri } = await Print.printToFileAsync({ html });

      setCachedPdfUri(uri);

      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (isSharingAvailable) {
        await Sharing.shareAsync(uri);
      } else {
        setSystemError('Sharing is not available on this platform. PDF saved locally.');
      }

      setExportStatus('completed');
    } catch (err: any) {
      setSystemError(err?.message || 'An unexpected error occurred during PDF compilation.');
      setExportStatus('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReShare = async () => {
    if (!cachedPdfUri) return;
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(cachedPdfUri);
      } else {
        setSystemError('Sharing is not available on this platform.');
      }
    } catch (err: any) {
      setSystemError(err?.message || 'Sharing failed.');
    }
  };

  return {
    cvData,
    updateField,
    updateSkillsString,
    updateCoursesString,
    updateWorkExperience,
    updateWorkExperienceTask,
    addWorkExperienceTask,
    addWorkExperience,
    removeWorkExperience,
    validationErrors,
    setValidationErrors,
    isLoading,
    systemError,
    setSystemError,
    handleGeneratePDF,
    handleReShare,
    exportStatus,
    cachedPdfUri,
  };
};
