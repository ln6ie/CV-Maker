import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActionSheetIOS,
  Animated,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Cairo_400Regular, Cairo_700Bold, Cairo_900Black } from '@expo-google-fonts/cairo';
import { COLORS, getFontFamily, SPACING } from './src/constants/tokens';
import { translations } from './src/constants/translations';
import { useCV } from './src/hooks/useCV';
import { GlassInput } from './src/components/GlassInput';
import { StatusBanner } from './src/components/StatusBanner';
import { Header } from './src/components/Header';
import { SectionCard } from './src/components/SectionCard';
import { Splash } from './src/components/Splash';
import { ExportButton } from './src/components/ExportButton';
import { Education } from './src/types/cv';
import { styles, FLOATING_HEADER_HEIGHT } from './src/styles/app.styles';

function AppContent() {
  const insets = useSafeAreaInsets();
  const [showSplash, setShowSplash] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pdfLang, setPdfLang] = useState<'en' | 'ar'>('en');
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ar'>('en');
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const systemScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('@Raqeem_Theme');
        if (stored !== null) {
          setIsDarkMode(stored === 'dark');
        } else {
          setIsDarkMode(systemScheme === 'dark');
        }
      } catch {
        setIsDarkMode(systemScheme === 'dark');
      }
      setThemeLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (themeLoaded) {
      AsyncStorage.setItem('@Raqeem_Theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, themeLoaded]);

  const [fontsLoaded] = useFonts({
    'Cairo': Cairo_400Regular,
    'Cairo-Bold': Cairo_700Bold,
    'Cairo-Black': Cairo_900Black,
  });

  const isRTL = activeLanguage === 'ar';
  const t = translations[activeLanguage];
  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;

  const snackOpacity = useRef(new Animated.Value(0)).current;
  const snackTranslateY = useRef(new Animated.Value(50)).current;
  const snackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [snackMessage, setSnackMessage] = useState<string | null>(null);

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
      ]).start(() => {
        setSnackMessage(null);
      });
    }, 3500);
  }, []);

  const {
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
    handleGeneratePDF,
    handleReShare,
    exportStatus,
  } = useCV();

  const v = t.validation;

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    let global: string | null = null;

    if (step === 0) {
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

    if (step === 1) {
      const validEntries = cvData.workExperience.filter(e => e.jobTitle.trim().length > 0);
      if (validEntries.length === 0) global = v.workExperienceRequired;
    }

    if (step === 2) {
      const validEducation = cvData.education.filter(e => e.degree.trim().length > 0);
      if (validEducation.length === 0) global = v.educationRequired;
    }

    if (global) showSnack(global);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0 && !global;
  };

  const validateAll = (): boolean => {
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

    const validEntries = cvData.workExperience.filter(e => e.jobTitle.trim().length > 0);
    if (validEntries.length === 0) global = v.workExperienceRequired;

    const validEducation = cvData.education.filter(e => e.degree.trim().length > 0);
    if (validEducation.length === 0 && !global) global = v.educationRequired;

    if (global) showSnack(global);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0 && !global;
  };

  const handleNext = () => {
    setSnackMessage(null);
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleExportAction = async () => {
    setSnackMessage(null);
    if (!validateAll()) return;
    await handleGeneratePDF(isDarkMode, pdfLang);
  };

  if (showSplash || !fontsLoaded || !themeLoaded) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  const activeSkillsText = cvData.skills.join(', ');
  const activeCoursesText = cvData.courses.join(', ');

  const handleUpdateEducation = (field: keyof Education, val: string) => {
    const list = [...cvData.education];
    if (list[0]) {
      list[0] = { ...list[0], [field]: val };
      updateField('education', list);
    }
  };

  const handleUpdateLanguage = (idx: number, level: string) => {
    const list = [...cvData.languages];
    if (list[idx]) {
      list[idx] = { ...list[idx], level };
      updateField('languages', list);
    }
  };

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            t.actionSheet.cancel,
            t.actionSheet.toggleTheme,
            t.actionSheet.pdfEnglish,
            t.actionSheet.pdfArabic,
          ],
          cancelButtonIndex: 0,
          title: 'CV Builder Preferences',
          message: 'Configure your layout settings',
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            setIsDarkMode((prev) => !prev);
          } else if (buttonIndex === 2) {
            setPdfLang('en');
            setActiveLanguage('en');
          } else if (buttonIndex === 3) {
            setPdfLang('ar');
            setActiveLanguage('ar');
          }
        }
      );
    } else {
      setIsSettingsVisible(true);
    }
  };

  const rtlRow = isRTL
    ? { flexDirection: 'row-reverse' as const }
    : { flexDirection: 'row' as const };

  const headerTopPadding = FLOATING_HEADER_HEIGHT + insets.top + SPACING.sm;
  const FAB_SIZE = 56;
  const bottomPadding = insets.bottom + FAB_SIZE + SPACING.lg + SPACING.md;

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar translucent={true} style={isDarkMode ? 'light' : 'dark'} />

      {/* Edge-to-edge Glass Header (extends under Status Bar) */}
      <View style={[styles.floatingHeader, { top: 0 }]}>
        <BlurView intensity={90} tint={isDarkMode ? 'dark' : 'light'} style={styles.floatingBlur}>
          <View style={{ paddingTop: insets.top }}>
            <Header isDarkMode={isDarkMode} onOpenSettings={handleOpenSettings} theme={theme} isRTL={isRTL} t={t} />

          <View style={[styles.stepperInsetCard, { backgroundColor: theme.inputBackground }]}>
            <View style={[styles.stepperTrack, rtlRow]}>
              {[0, 1, 2, 3].map((stepIdx) => (
                <View
                  key={stepIdx}
                  style={[
                    styles.stepIndicator,
                    { backgroundColor: stepIdx <= activeStep ? theme.accent : (isDarkMode ? '#2C2C2E' : '#E5E5EA') },
                  ]}
                />
              ))}
            </View>
          </View>
          </View>
        </BlurView>
      </View>

      {/* Main Scrollable Content */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView
          contentContainerStyle={{ paddingTop: headerTopPadding, paddingBottom: bottomPadding, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBanner
            isDarkMode={isDarkMode}
            isLoading={isLoading}
            error={systemError}
            isRTL={isRTL}
            translations={t.status}
          />

          {/* STEP 0: Personal Summary */}
          {activeStep === 0 && (
            <SectionCard title={t.steps.personal} theme={theme} isRTL={isRTL} isDarkMode={isDarkMode}>
              <GlassInput
                label={t.labels.fullName}
                value={cvData.fullName}
                onChangeText={(val: string) => updateField('fullName', val)}
                placeholder={t.labels.fullName}
                isDarkMode={isDarkMode}
                isRTL={isRTL}
                error={validationErrors['fullName']}
              />
              <GlassInput
                label={t.labels.address}
                value={cvData.address}
                onChangeText={(val: string) => updateField('address', val)}
                placeholder={t.labels.address}
                isDarkMode={isDarkMode}
                isRTL={isRTL}
                error={validationErrors['address']}
              />
              <GlassInput
                label={t.labels.phone}
                value={cvData.phone}
                onChangeText={(val: string) => updateField('phone', val)}
                placeholder={t.labels.phone}
                keyboardType="phone-pad"
                isDarkMode={isDarkMode}
                isRTL={isRTL}
                error={validationErrors['phone']}
              />
              <GlassInput
                label={t.labels.email}
                value={cvData.email}
                onChangeText={(val: string) => updateField('email', val)}
                placeholder={t.labels.email}
                keyboardType="email-address"
                autoCapitalize="none"
                isDarkMode={isDarkMode}
                isRTL={isRTL}
                error={validationErrors['email']}
              />
              <GlassInput
                label={t.labels.summary}
                value={cvData.summary}
                onChangeText={(val: string) => updateField('summary', val)}
                placeholder={t.labels.summary}
                multiline
                numberOfLines={3}
                isDarkMode={isDarkMode}
                isRTL={isRTL}
                error={validationErrors['summary']}
              />
            </SectionCard>
          )}

          {/* STEP 1: Dynamic Work Experience */}
          {activeStep === 1 && (
            <View>
              <SectionCard
                title={`${t.steps.experience} (${cvData.workExperience.length} items)`}
                theme={theme}
                isRTL={isRTL}
                isDarkMode={isDarkMode}
              >
                {cvData.workExperience.length === 0 && (
                  <Text style={{ color: theme.textSecondary, textAlign: 'center', marginVertical: SPACING.lg, fontFamily: getFontFamily(isRTL, 400) }}>
                    No experience entries yet. Add one below.
                  </Text>
                )}

                {cvData.workExperience.map((exp, expIdx) => (
                  <View
                    key={`exp-form-${expIdx}`}
                    style={[
                      styles.experienceSubCard,
                      { backgroundColor: theme.inputBackground },
                      expIdx < cvData.workExperience.length - 1 && { marginBottom: SPACING.md },
                    ]}
                  >
                    <View style={[rtlRow, { justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm }]}>
                      <Text style={{ color: theme.textSecondary, fontSize: 12, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: getFontFamily(isRTL, 700) }}>
                        #{expIdx + 1}
                      </Text>
                      <TouchableOpacity
                        style={[styles.removeButton, { backgroundColor: isDarkMode ? 'rgba(255,69,58,0.15)' : 'rgba(255,59,48,0.1)' }]}
                        onPress={() => removeWorkExperience(expIdx)}
                      >
                        <Ionicons name="trash-outline" size={16} color={theme.error} />
                      </TouchableOpacity>
                    </View>

                    <GlassInput
                      label="Job Title"
                      value={exp.jobTitle}
                      onChangeText={(val: string) => updateWorkExperience(expIdx, 'jobTitle', val)}
                      placeholder="e.g. Software Engineer"
                      isDarkMode={isDarkMode}
                      isRTL={isRTL}
                    />
                    <GlassInput
                      label="Company / Location"
                      value={exp.companyLocation}
                      onChangeText={(val: string) => updateWorkExperience(expIdx, 'companyLocation', val)}
                      placeholder="e.g. Tech Corp - New York"
                      isDarkMode={isDarkMode}
                      isRTL={isRTL}
                    />
                    <GlassInput
                      label="Date Range"
                      value={exp.dateRange}
                      onChangeText={(val: string) => updateWorkExperience(expIdx, 'dateRange', val)}
                      placeholder="e.g. Jan 2020 - Present"
                      isDarkMode={isDarkMode}
                      isRTL={isRTL}
                    />

                    <Text
                      style={{
                        color: theme.textSecondary,
                        fontSize: 12,
                        fontWeight: '600',
                        letterSpacing: 0.5,
                        marginBottom: SPACING.xs,
                        paddingLeft: SPACING.xs,
                        textTransform: 'uppercase',
                        fontFamily: getFontFamily(isRTL, 600),
                      }}
                    >
                      Main Tasks
                    </Text>

                    {exp.mainTasks.map((task, taskIdx) => (
                      <GlassInput
                        key={`task-${expIdx}-${taskIdx}`}
                        label={`Task ${taskIdx + 1}`}
                        value={task}
                        onChangeText={(val: string) => updateWorkExperienceTask(expIdx, taskIdx, val)}
                        placeholder="Describe a responsibility or achievement"
                        isDarkMode={isDarkMode}
                        isRTL={isRTL}
                        multiline
                        numberOfLines={2}
                      />
                    ))}

                    <TouchableOpacity
                      style={{
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        gap: SPACING.xs,
                        paddingVertical: SPACING.sm,
                      }}
                      onPress={() => addWorkExperienceTask(expIdx)}
                    >
                      <Ionicons name="add-circle-outline" size={18} color={theme.accent} />
                      <Text style={{ color: theme.accent, fontSize: 13, fontWeight: '700', fontFamily: getFontFamily(isRTL, 700) }}>
                        Add Task
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: theme.accent }]}
                  onPress={addWorkExperience}
                >
                  <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: SPACING.xs }}>
                    <Ionicons name="add" size={18} color="#FFFFFF" />
                    <Text style={[styles.addButtonText, { color: '#FFFFFF', fontFamily: getFontFamily(isRTL, 800) }]}>
                      Add New Experience
                    </Text>
                  </View>
                </TouchableOpacity>
              </SectionCard>
            </View>
          )}

          {/* STEP 2: Education & Skills */}
          {activeStep === 2 && (
            <View>
              <SectionCard title={t.steps.education} theme={theme} isRTL={isRTL} isDarkMode={isDarkMode}>
                <GlassInput
                  label={t.labels.degree}
                  value={cvData.education[0]?.degree || ''}
                  onChangeText={(val: string) => handleUpdateEducation('degree', val)}
                  placeholder={t.labels.degree}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
                <GlassInput
                  label={t.labels.institution}
                  value={cvData.education[0]?.institution || ''}
                  onChangeText={(val: string) => handleUpdateEducation('institution', val)}
                  placeholder={t.labels.institution}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
                <GlassInput
                  label={t.labels.graduationYear}
                  value={cvData.education[0]?.year || ''}
                  onChangeText={(val: string) => handleUpdateEducation('year', val)}
                  placeholder={t.labels.graduationYear}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
                <GlassInput
                  label={t.labels.honors}
                  value={cvData.education[0]?.notes || ''}
                  onChangeText={(val: string) => handleUpdateEducation('notes', val)}
                  placeholder={t.labels.honors}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
              </SectionCard>
              <SectionCard title={t.steps.skills} theme={theme} isRTL={isRTL} isDarkMode={isDarkMode}>
                <GlassInput
                  label={t.labels.skills}
                  value={activeSkillsText}
                  onChangeText={updateSkillsString}
                  placeholder={t.labels.skills}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
                <GlassInput
                  label={t.labels.courses}
                  value={activeCoursesText}
                  onChangeText={updateCoursesString}
                  placeholder={t.labels.courses}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
              </SectionCard>
            </View>
          )}

          {/* STEP 3: Language & Export */}
          {activeStep === 3 && (
            <View>
              <SectionCard title={t.steps.language} theme={theme} isRTL={isRTL} isDarkMode={isDarkMode}>
                <GlassInput
                  label={t.labels.arabicLevel}
                  value={cvData.languages[0]?.level || ''}
                  onChangeText={(val: string) => handleUpdateLanguage(0, val)}
                  placeholder={t.labels.arabicLevel}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
                <GlassInput
                  label={t.labels.englishLevel}
                  value={cvData.languages[1]?.level || ''}
                  onChangeText={(val: string) => handleUpdateLanguage(1, val)}
                  placeholder={t.labels.englishLevel}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
              </SectionCard>

              <SectionCard title="Export PDF" theme={theme} isRTL={isRTL} isDarkMode={isDarkMode}>
                <ExportButton
                  theme={theme}
                  isRTL={isRTL}
                  t={t}
                  exportStatus={exportStatus}
                  onPress={handleExportAction}
                  onReShare={handleReShare}
                />
              </SectionCard>

            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Floating Bottom Navigation — Circular FABs */}
      <View
        style={{
          position: 'absolute',
          bottom: insets.bottom + SPACING.lg,
          right: SPACING.lg,
          left: SPACING.lg,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          alignItems: 'center',
          zIndex: 50,
          pointerEvents: 'box-none',
        }}
      >
        {activeStep > 0 && (
          <TouchableOpacity
            style={{
              width: FAB_SIZE,
              height: FAB_SIZE,
              borderRadius: 9999,
              backgroundColor: theme.buttonBackground,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 4,
            }}
            activeOpacity={0.7}
            onPress={() => {
              setActiveStep((prev) => prev - 1);
              setSnackMessage(null);
              setValidationErrors({});
            }}
          >
            <Ionicons name={isRTL ? 'chevron-forward' : 'chevron-back'} size={24} color={theme.buttonText} />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }} />
        {activeStep < 3 && (
          <TouchableOpacity
            style={{
              width: FAB_SIZE,
              height: FAB_SIZE,
              borderRadius: 9999,
              backgroundColor: theme.buttonBackground,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 4,
            }}
            activeOpacity={0.7}
            onPress={handleNext}
          >
            <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={24} color={theme.buttonText} />
          </TouchableOpacity>
        )}
      </View>

      {/* Floating Snackbar — Validation Error Pill */}
      {snackMessage && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: insets.bottom + 90,
            left: SPACING.lg,
            right: SPACING.lg,
            backgroundColor: theme.error,
            borderRadius: 9999,
            paddingVertical: SPACING.sm + 2,
            paddingHorizontal: SPACING.lg,
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: SPACING.sm,
            zIndex: 60,
            opacity: snackOpacity,
            transform: [{ translateY: snackTranslateY }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}
          pointerEvents="none"
        >
          <Ionicons name="alert-circle" size={18} color="#FFFFFF" />
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 14,
              fontWeight: '600',
              flex: 1,
              fontFamily: getFontFamily(isRTL, 600),
            }}
            numberOfLines={1}
          >
            {snackMessage}
          </Text>
        </Animated.View>
      )}

      {/* Settings Modal */}
      <Modal
        visible={isSettingsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsSettingsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setIsSettingsVisible(false)}
        >
          <View
            style={[
              styles.actionSheetContainer,
              { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
            ]}
          >
            <Text
              style={[styles.sheetTitle, { color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 800) }]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.6}
            >
              {t.preferences.title}
            </Text>
            <TouchableOpacity
              style={[styles.sheetButton, { backgroundColor: theme.inputBackground }]}
              onPress={() => setIsDarkMode((prev) => !prev)}
            >
              <Text
                style={[styles.sheetButtonText, { color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 700) }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              >
                {t.preferences.toggleTheme}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sheetButton, { backgroundColor: theme.inputBackground }]}
              onPress={() => {
                const nextLang = activeLanguage === 'en' ? 'ar' : 'en';
                setActiveLanguage(nextLang);
                setPdfLang(nextLang);
              }}
            >
              <Text
                style={[styles.sheetButtonText, { color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 700) }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              >
                {isRTL ? t.preferences.pdfLangAr : t.preferences.pdfLang}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: theme.buttonBackground }]}
              onPress={() => setIsSettingsVisible(false)}
            >
              <Text
                style={[styles.cancelButtonText, { color: theme.buttonText, fontFamily: getFontFamily(isRTL, 800) }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              >
                {t.buttons.close}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
