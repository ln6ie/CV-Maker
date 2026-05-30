import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Animated, useColorScheme, AppState, Platform, ActionSheetIOS } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { CVData, WorkExperience, Education } from '../types/cv';
import { CVSchema } from '../types/cv';
import { RemoteConfig, VersionCache } from '../types/version';
import { COLORS } from '../constants/tokens';
import { translations, Language } from '../constants/translations';
import { generateCVTemplate } from '../services/cvTemplate';
import { useCVState } from '../hooks/useCVState';
import { SAMPLE_CV_EN, SAMPLE_CV_AR } from '../constants/sampleCV';
import Constants from 'expo-constants';

const CURRENT_VERSION = Constants.expoConfig?.version || '1.0.0';
const VERSION_CACHE_KEY = '@Raqeem_VersionCache';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function compareVersions(a: string, b: string): number {
  const ap = a.split('.').map(Number);
  const bp = b.split('.').map(Number);
  for (let i = 0; i < Math.max(ap.length, bp.length); i++) {
    const an = ap[i] || 0;
    const bn = bp[i] || 0;
    if (an > bn) return 1;
    if (an < bn) return -1;
  }
  return 0;
}

interface CVContextType {
  cvData: CVData;
  activeStep: number;
  isDarkMode: boolean;
  activeLanguage: 'en' | 'ar';
  pdfLang: 'en' | 'ar';
  validationErrors: Record<string, string>;
  isLoading: boolean;
  systemError: string | null;
  exportStatus: 'idle' | 'generating' | 'completed';
  snackMessage: string | null;
  themeLoaded: boolean;
  remoteConfig: RemoteConfig | null;
  versionBlocked: boolean;
  updateAvailable: boolean;
  themePreference: 'light' | 'dark' | 'system';
  isSettingsVisible: boolean;
  isAIPromptVisible: boolean;
  isCVManagerVisible: boolean;
  theme: any;
  t: any;
  isRTL: boolean;

  setActiveStep: (step: number) => void;
  setThemePreference: (mode: 'light' | 'dark' | 'system') => void;
  setIsDarkMode: (dark: boolean) => void;
  setActiveLanguage: (lang: Language) => void;
  setPdfLang: (lang: Language) => void;
  setIsSettingsVisible: (v: boolean) => void;
  setIsAIPromptVisible: (v: boolean) => void;
  setValidationErrors: (errors: Record<string, string>) => void;
  setSystemError: (err: string | null) => void;
  setSnackMessage: (msg: string | null) => void;

  updateField: (field: keyof CVData, value: any) => void;
  updateSkillsString: (skillsStr: string) => void;
  updateCoursesString: (coursesStr: string) => void;
  updateWorkExperience: (index: number, field: keyof WorkExperience, value: any) => void;
  updateWorkExperienceTask: (expIdx: number, taskIdx: number, val: string) => void;
  addWorkExperienceTask: (expIdx: number) => void;
  addWorkExperience: () => void;
  removeWorkExperience: (idx: number) => void;
  handleUpdateEducation: (field: keyof Education, val: string) => void;
  handleUpdateLanguage: (idx: number, level: string) => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleExportAction: () => Promise<void>;
  handleReShare: () => Promise<void>;
  handleOpenSettings: () => void;
  handleOpenAIPrompt: () => void;
  handleOpenCVManager: () => void;
  handleCloseCVManager: () => void;
  showSnack: (msg: string) => void;
  importCVData: (data: CVData) => void;
  loadSampleCV: () => void;

  snackOpacity: Animated.Value;
  snackTranslateY: Animated.Value;
}

const CVContext = createContext<CVContextType | null>(null);

export function useCVContext(): CVContextType {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error('useCVContext must be used within CVProvider');
  return ctx;
}

export function CVProvider({ children }: { children: React.ReactNode }) {
  const { cvData, dispatch } = useCVState();
  const systemScheme = useColorScheme();

  const [activeStep, setActiveStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themePreference, setThemePreferenceState] = useState<'light' | 'dark' | 'system'>('system');
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [pdfLang, setPdfLang] = useState<Language>('en');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [systemError, setSystemError] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState<'idle' | 'generating' | 'completed'>('idle');
  const [cachedPdfUri, setCachedPdfUri] = useState<string | null>(null);
  const [snackMessage, setSnackMessage] = useState<string | null>(null);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [remoteConfig, setRemoteConfig] = useState<RemoteConfig | null>(null);
  const [versionCheckComplete, setVersionCheckComplete] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isAIPromptVisible, setIsAIPromptVisible] = useState(false);
  const [isCVManagerVisible, setIsCVManagerVisible] = useState(false);

  const snackOpacity = useRef(new Animated.Value(0)).current;
  const snackTranslateY = useRef(new Animated.Value(50)).current;
  const snackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = translations[activeLanguage];
  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;
  const isRTL = activeLanguage === 'ar';

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('@Raqeem_Theme');
        if (stored === 'dark' || stored === 'light') {
          setIsDarkMode(stored === 'dark');
          setThemePreferenceState(stored);
        } else {
          setIsDarkMode(systemScheme === 'dark');
          setThemePreferenceState('system');
        }

        const storedCV = await AsyncStorage.getItem('@Raqeem_CV_Data');
        if (storedCV) {
          const parsed = JSON.parse(storedCV);
          dispatch({ type: 'SET_CV_DATA', data: parsed });
        }
      } catch (e) {
        console.error("Failed to load initial data", e);
        setIsDarkMode(systemScheme === 'dark');
        setThemePreferenceState('system');
      } finally {
        setThemeLoaded(true);
      }
    })();
  }, [dispatch, systemScheme]);

  // Sync system scheme when in follow-system mode
  useEffect(() => {
    if (themeLoaded && themePreference === 'system') {
      setIsDarkMode(systemScheme === 'dark');
    }
  }, [systemScheme, themePreference, themeLoaded]);

  const VERSION_URL = 'https://raqeem.elcomlab.site/version.json';

  const checkVersion = useCallback(async (skipCache: boolean = false) => {
    try {
      if (!skipCache) {
        const cachedRaw = await AsyncStorage.getItem(VERSION_CACHE_KEY);
        if (cachedRaw) {
          const cached: VersionCache = JSON.parse(cachedRaw);
          if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
            setRemoteConfig(cached.data);
            setVersionCheckComplete(true);
            return;
          }
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const url = VERSION_URL + '?cb=' + Date.now();
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: RemoteConfig = await response.json();

      await AsyncStorage.setItem(VERSION_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
      setRemoteConfig(data);
    } catch (e) {
      console.error('Version check failed, using cached data if available', e);
      try {
        const cachedRaw = await AsyncStorage.getItem(VERSION_CACHE_KEY);
        if (cachedRaw) {
          const cached: VersionCache = JSON.parse(cachedRaw);
          setRemoteConfig(cached.data);
        }
      } catch {}
    } finally {
      setVersionCheckComplete(true);
    }
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;
    checkVersion();
  }, [themeLoaded, checkVersion]);

  useEffect(() => {
    if (!themeLoaded) return;
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        checkVersion(true);
      }
    });
    return () => sub.remove();
  }, [themeLoaded, checkVersion]);

  const versionBlocked = useMemo(() => {
    if (!remoteConfig) return false;
    return compareVersions(CURRENT_VERSION, remoteConfig.minimumRequiredVersion) < 0;
  }, [remoteConfig]);

  const updateAvailable = useMemo(() => {
    if (!remoteConfig) return false;
    return compareVersions(CURRENT_VERSION, remoteConfig.latestVersion) < 0 && !versionBlocked;
  }, [remoteConfig, versionBlocked]);

  useEffect(() => {
    if (!themeLoaded) return;
    (async () => {
      try {
        await AsyncStorage.setItem('@Raqeem_CV_Data', JSON.stringify(cvData));
      } catch (e) {
        console.error("Failed to save CV data", e);
      }
    })();
  }, [cvData, themeLoaded]);

  const setThemePreference = useCallback((mode: 'light' | 'dark' | 'system') => {
    // Fire both state updates synchronously before any async I/O
    setThemePreferenceState(mode);
    if (mode === 'system') {
      setIsDarkMode(systemScheme === 'dark');
    } else {
      setIsDarkMode(mode === 'dark');
    }
    // Persist async — non-blocking, won't affect render correctness
    (async () => {
      try {
        if (mode === 'system') {
          await AsyncStorage.removeItem('@Raqeem_Theme');
        } else {
          await AsyncStorage.setItem('@Raqeem_Theme', mode);
        }
      } catch (e) {
        console.error("Failed to save theme preference", e);
      }
    })();
  }, [systemScheme]);

  const toggleDarkMode = useCallback(async (dark: boolean) => {
    await setThemePreference(dark ? 'dark' : 'light');
  }, [setThemePreference]);

  const clearExportCache = useCallback(() => {
    setCachedPdfUri(null);
    setExportStatus('idle');
  }, []);

  const updateField = useCallback((field: keyof CVData, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
    setValidationErrors((prev) => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
    clearExportCache();
  }, [dispatch, clearExportCache]);

  const updateSkillsString = useCallback((skillsStr: string) => {
    const list = skillsStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
    updateField('skills', list);
  }, [updateField]);

  const updateCoursesString = useCallback((coursesStr: string) => {
    const list = coursesStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
    updateField('courses', list);
  }, [updateField]);

  const updateWorkExperience = useCallback((index: number, field: keyof WorkExperience, value: any) => {
    dispatch({ type: 'UPDATE_WORK_EXPERIENCE', index, field, value });
    clearExportCache();
  }, [dispatch, clearExportCache]);

  const updateWorkExperienceTask = useCallback((expIndex: number, taskIndex: number, value: string) => {
    dispatch({ type: 'UPDATE_WORK_TASK', expIndex, taskIndex, value });
    clearExportCache();
  }, [dispatch, clearExportCache]);

  const addWorkExperienceTask = useCallback((expIndex: number) => {
    dispatch({ type: 'ADD_WORK_TASK', expIndex });
    clearExportCache();
  }, [dispatch, clearExportCache]);

  const addWorkExperience = useCallback(() => {
    dispatch({ type: 'ADD_WORK_EXPERIENCE' });
    clearExportCache();
  }, [dispatch, clearExportCache]);

  const removeWorkExperience = useCallback((index: number) => {
    dispatch({ type: 'REMOVE_WORK_EXPERIENCE', index });
    clearExportCache();
  }, [dispatch, clearExportCache]);

  const handleUpdateEducation = useCallback((field: keyof Education, val: string) => {
    const list = [...cvData.education];
    if (list[0]) {
      list[0] = { ...list[0], [field]: val };
      updateField('education', list);
    }
  }, [cvData.education, updateField]);

  const handleUpdateLanguage = useCallback((idx: number, level: string) => {
    const list = [...cvData.languages];
    if (list[idx]) {
      list[idx] = { ...list[idx], level };
      updateField('languages', list);
    }
  }, [cvData.languages, updateField]);

  const showSnack = useCallback((msg: string) => {
    setSnackMessage(msg);
    snackOpacity.setValue(0);
    snackTranslateY.setValue(50);
    Animated.parallel([
      Animated.timing(snackOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(snackTranslateY, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
    if (snackTimer.current) clearTimeout(snackTimer.current);
    snackTimer.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(snackOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(snackTranslateY, { toValue: 50, duration: 300, useNativeDriver: true }),
      ]).start(() => setSnackMessage(null));
    }, 3500);
  }, [snackOpacity, snackTranslateY]);

  const v = translations[activeLanguage].validation;

  const validateStep = useCallback((step: number): boolean => {
    const errors: Record<string, string> = {};
    let global: string | null = null;

    if (step === 0) {
      // Template selection — no validation required
    }

    if (step === 1) {
      if (!cvData.fullName.trim()) errors.fullName = v.required;
      if (!cvData.address.trim()) errors.address = v.required;
      if (!cvData.phone.trim()) errors.phone = v.required;
      if (!cvData.email.trim()) {
        errors.email = v.required;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.email)) {
        errors.email = v.invalidEmail;
      }
      if (cvData.summary.trim().length < 20) errors.summary = v.summaryLength;
    }

    if (step === 2) {
      const valid = cvData.workExperience.filter(e => e.jobTitle.trim().length > 0);
      if (valid.length === 0) global = v.workExperienceRequired;
    }

    if (step === 3) {
      const valid = cvData.education.filter(e => e.degree.trim().length > 0);
      if (valid.length === 0) global = v.educationRequired;
    }

    if (global) showSnack(global);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0 && !global;
  }, [cvData, v, showSnack]);

  const validateAll = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    let global: string | null = null;

    if (!cvData.fullName.trim()) errors.fullName = v.required;
    if (!cvData.address.trim()) errors.address = v.required;
    if (!cvData.phone.trim()) errors.phone = v.required;
    if (!cvData.email.trim()) {
      errors.email = v.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.email)) {
      errors.email = v.invalidEmail;
    }
    if (cvData.summary.trim().length < 20) errors.summary = v.summaryLength;

    const validWE = cvData.workExperience.filter(e => e.jobTitle.trim().length > 0);
    if (validWE.length === 0) global = v.workExperienceRequired;

    const validEdu = cvData.education.filter(e => e.degree.trim().length > 0);
    if (validEdu.length === 0 && !global) global = v.educationRequired;

    if (global) showSnack(global);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0 && !global;
  }, [cvData, v, showSnack]);

  const handleNext = useCallback(() => {
    setSnackMessage(null);
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  }, [activeStep, validateStep]);

  const handlePrev = useCallback(() => {
    setActiveStep((prev) => prev - 1);
    setSnackMessage(null);
    setValidationErrors({});
  }, []);

  const handleGeneratePDF = useCallback(async (isDark: boolean, lang: Language) => {
    setExportStatus('generating');
    setIsLoading(true);
    setSystemError(null);
    setValidationErrors({});

    try {
      const validation = CVSchema.safeParse(cvData);
      if (!validation.success) {
        const errors: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          errors[issue.path.join('.')] = issue.message;
        });
        setValidationErrors(errors);
        setSystemError(t.errors.validationFailed);
        setExportStatus('idle');
        setIsLoading(false);
        return;
      }

      const html = generateCVTemplate(validation.data, isDark, lang);
      const { uri } = await Print.printToFileAsync({ html });
      setCachedPdfUri(uri);

      const available = await Sharing.isAvailableAsync();
      if (available) {
        await Sharing.shareAsync(uri);
      } else {
        setSystemError(t.errors.sharingUnavailable);
      }
      setExportStatus('completed');
    } catch (err: any) {
      setSystemError(err?.message || t.errors.compilationError);
      setExportStatus('idle');
    } finally {
      setIsLoading(false);
    }
  }, [cvData, t]);

  const handleExportAction = useCallback(async () => {
    setSnackMessage(null);
    if (!validateAll()) return;
    await handleGeneratePDF(isDarkMode, pdfLang);
  }, [validateAll, handleGeneratePDF, isDarkMode, pdfLang]);

  const handleReShare = useCallback(async () => {
    if (!cachedPdfUri) return;
    try {
      const available = await Sharing.isAvailableAsync();
      if (available) {
        await Sharing.shareAsync(cachedPdfUri);
      } else {
        setSystemError(t.errors.sharingUnavailable);
      }
    } catch (err: any) {
      setSystemError(err?.message || t.errors.sharingFailed);
    }
  }, [cachedPdfUri, t]);

  const handleOpenSettings = useCallback(() => {
    setIsSettingsVisible(true);
  }, []);

  const handleOpenAIPrompt = useCallback(() => {
    setIsAIPromptVisible(true);
  }, []);

  const handleOpenCVManager = useCallback(() => {
    setIsCVManagerVisible(true);
  }, []);

  const handleCloseCVManager = useCallback(() => {
    setIsCVManagerVisible(false);
  }, []);

  const importCVData = useCallback((data: CVData) => {
    dispatch({ type: 'SET_CV_DATA', data });
    clearExportCache();
  }, [dispatch, clearExportCache]);

  const loadSampleCV = useCallback(() => {
    const sample = activeLanguage === 'ar' ? SAMPLE_CV_AR : SAMPLE_CV_EN;
    dispatch({ type: 'SET_CV_DATA', data: sample });
    clearExportCache();
    showSnack(activeLanguage === 'ar' ? 'تم تحميل نموذج السيرة الذاتية!' : 'Sample CV loaded!');
  }, [dispatch, clearExportCache, activeLanguage, showSnack]);

  const ctx = useMemo<CVContextType>(() => ({
    cvData,
    activeStep,
    isDarkMode,
    activeLanguage,
    pdfLang,
    validationErrors,
    isLoading,
    systemError,
    exportStatus,
    snackMessage,
    themeLoaded,
    remoteConfig,
    versionBlocked,
    updateAvailable,
    themePreference,
    isSettingsVisible,
    isAIPromptVisible,
    isCVManagerVisible,
    theme,
    t,
    isRTL,
    setActiveStep,
    setThemePreference,
    setIsDarkMode: toggleDarkMode,
    setActiveLanguage,
    setPdfLang,
    setIsSettingsVisible,
    setIsAIPromptVisible,
    setValidationErrors,
    setSystemError,
    setSnackMessage,
    updateField,
    updateSkillsString,
    updateCoursesString,
    updateWorkExperience,
    updateWorkExperienceTask,
    addWorkExperienceTask,
    addWorkExperience,
    removeWorkExperience,
    handleUpdateEducation,
    handleUpdateLanguage,
    handleNext,
    handlePrev,
    handleExportAction,
    handleReShare,
    handleOpenSettings,
    handleOpenAIPrompt,
    handleOpenCVManager,
    handleCloseCVManager,
    showSnack,
    importCVData,
    loadSampleCV,
    snackOpacity,
    snackTranslateY,
  }), [
    cvData, activeStep, isDarkMode, activeLanguage, pdfLang,
    validationErrors, isLoading, systemError, exportStatus,
    snackMessage, themeLoaded, remoteConfig, versionBlocked, updateAvailable, themePreference,
    isSettingsVisible, isAIPromptVisible, isCVManagerVisible, theme, t, isRTL,
    updateField, updateSkillsString, updateCoursesString,
    updateWorkExperience, updateWorkExperienceTask,
    addWorkExperienceTask, addWorkExperience, removeWorkExperience,
    handleUpdateEducation, handleUpdateLanguage,
    handleNext, handlePrev, handleExportAction, handleReShare,
    handleOpenSettings, handleOpenAIPrompt, handleOpenCVManager, handleCloseCVManager, showSnack, importCVData, loadSampleCV, snackOpacity, snackTranslateY,
  ]);

  return <CVContext.Provider value={ctx}>{children}</CVContext.Provider>;
}
