import { useState } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { CVSchema, CVData } from '../types/cv';
import { DEFAULT_CV } from '../constants/defaultCV';
import { generateCVTemplate } from '../services/cvTemplate';

/**
 * Custom hook managing the CV state, Zod validation, and PDF compilation.
 * Uses expo-print and expo-sharing to compile and share the local PDF.
 */
export const useCV = () => {
  const [cvData, setCvData] = useState<CVData>(DEFAULT_CV);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [systemError, setSystemError] = useState<string | null>(null);

  /**
   * Updates a top-level field in the CV schema.
   */
  const updateField = (field: keyof CVData, value: any) => {
    setCvData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear validation error if it exists for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  /**
   * Helper to update skills from a raw comma-separated string input.
   */
  const updateSkillsString = (skillsStr: string) => {
    const list = skillsStr
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    
    updateField('skills', list);
  };

  /**
   * Validates data with Zod and generates the PDF output.
   */
  const handleGeneratePDF = async (isDarkMode: boolean) => {
    setIsLoading(true);
    setSystemError(null);
    setValidationErrors({});

    try {
      // Validate full document data against Zod Schema
      const validation = CVSchema.safeParse(cvData);
      
      if (!validation.success) {
        const errors: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          const path = issue.path.join('.');
          errors[path] = issue.message;
        });
        setValidationErrors(errors);
        setSystemError('Validation failed. Please check the marked fields.');
        setIsLoading(false);
        return;
      }

      // Generate the production A4 html template string
      const html = generateCVTemplate(validation.data, isDarkMode);

      // Render the PDF to local storage file
      const { uri } = await Print.printToFileAsync({ html });

      // Share via system sharing panel
      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (isSharingAvailable) {
        await Sharing.shareAsync(uri);
      } else {
        setSystemError('Sharing is not available on this platform. PDF saved locally.');
      }
    } catch (err: any) {
      setSystemError(err?.message || 'An unexpected error occurred during PDF compilation.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cvData,
    updateField,
    updateSkillsString,
    validationErrors,
    isLoading,
    systemError,
    setSystemError,
    handleGeneratePDF,
  };
};
