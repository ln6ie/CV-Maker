import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActionSheetIOS,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './src/constants/tokens';
import { useCV } from './src/hooks/useCV';
import { GlassInput } from './src/components/GlassInput';
import { StatusBanner } from './src/components/StatusBanner';
import { Header } from './src/components/Header';
import { SectionCard } from './src/components/SectionCard';
import { ExperiencePreview } from './src/components/ExperiencePreview';
import { EducationPreview } from './src/components/EducationPreview';
import { LanguagePreview } from './src/components/LanguagePreview';
import { Splash } from './src/components/Splash';
import { Education } from './src/types/cv';
import { styles } from './src/styles/app.styles';

/**
 * Root CV Builder Wizard.
 * Cross-platform: Native iOS ActionSheetIOS on iPhone, custom glass modal on Android.
 * Highly structured and strictly kept under 250 lines.
 */
export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [pdfLang, setPdfLang] = useState<'en' | 'ar'>('en');
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);

  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;

  const {
    cvData,
    updateField,
    updateSkillsString,
    updateCoursesString,
    validationErrors,
    isLoading,
    systemError,
    handleGeneratePDF,
  } = useCV();

  // 1.5-second introductory vector logo display
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
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

  /**
   * ActionSheet controller.
   * Invokes AppleUIKit ActionSheetIOS on iPhone, falls back to modal on Android.
   */
  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            'Cancel',
            `Toggle ${isDarkMode ? 'Light' : 'Dark'} Theme`,
            'Render PDF: English (LTR)',
            'Render PDF: Arabic (RTL)',
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
          } else if (buttonIndex === 3) {
            setPdfLang('ar');
          }
        }
      );
    } else {
      setIsSettingsVisible(true);
    }
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        {/* Apple Nav Header with Gear settings button */}
        <Header
          isDarkMode={isDarkMode}
          onOpenSettings={handleOpenSettings}
          theme={theme}
        />

        {/* Wizard Segmented Indicator Track */}
        <View style={styles.stepperTrack}>
          {[0, 1, 2, 3].map((stepIdx) => (
            <View
              key={stepIdx}
              style={[
                styles.stepIndicator,
                {
                  backgroundColor: stepIdx <= activeStep ? theme.textPrimary : theme.borderMuted,
                },
              ]}
            />
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <StatusBanner isDarkMode={isDarkMode} isLoading={isLoading} error={systemError} />

          {/* STEP 1: Personal Summary */}
          {activeStep === 0 && (
            <SectionCard title="Personal Details" theme={theme}>
              <GlassInput
                label="Full Name"
                value={cvData.fullName}
                onChangeText={(val: string) => updateField('fullName', val)}
                placeholder="e.g. Abdullah Karim Hussein"
                isDarkMode={isDarkMode}
                error={validationErrors['fullName']}
              />
              <GlassInput
                label="Official Address"
                value={cvData.address}
                onChangeText={(val: string) => updateField('address', val)}
                placeholder="e.g. Basra, Iraq"
                isDarkMode={isDarkMode}
                error={validationErrors['address']}
              />
              <GlassInput
                label="Phone Number"
                value={cvData.phone}
                onChangeText={(val: string) => updateField('phone', val)}
                placeholder="e.g. 07729375972"
                keyboardType="phone-pad"
                isDarkMode={isDarkMode}
                error={validationErrors['phone']}
              />
              <GlassInput
                label="Email Address"
                value={cvData.email}
                onChangeText={(val: string) => updateField('email', val)}
                placeholder="e.g. barkiq.2002@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                isDarkMode={isDarkMode}
                error={validationErrors['email']}
              />
              <GlassInput
                label="Summary Description"
                value={cvData.summary}
                onChangeText={(val: string) => updateField('summary', val)}
                placeholder="Brief professional profile..."
                multiline
                numberOfLines={3}
                isDarkMode={isDarkMode}
                error={validationErrors['summary']}
              />
            </SectionCard>
          )}

          {/* STEP 2: Work Experience preview list */}
          {activeStep === 1 && (
            <SectionCard title={`Work Experience (${cvData.workExperience.length} items)`} theme={theme}>
              <ExperiencePreview workExperience={cvData.workExperience} theme={theme} />
            </SectionCard>
          )}

          {/* STEP 3: Education & Skills */}
          {activeStep === 2 && (
            <View>
              <SectionCard title="Education" theme={theme}>
                <GlassInput
                  label="Degree Title"
                  value={cvData.education[0]?.degree || ''}
                  onChangeText={(val: string) => handleUpdateEducation('degree', val)}
                  placeholder="e.g. Bachelors"
                  isDarkMode={isDarkMode}
                />
                <GlassInput
                  label="Institution"
                  value={cvData.education[0]?.institution || ''}
                  onChangeText={(val: string) => handleUpdateEducation('institution', val)}
                  placeholder="e.g. Southern University"
                  isDarkMode={isDarkMode}
                />
                <GlassInput
                  label="Graduation Year"
                  value={cvData.education[0]?.year || ''}
                  onChangeText={(val: string) => handleUpdateEducation('year', val)}
                  placeholder="e.g. 2025"
                  isDarkMode={isDarkMode}
                />
                <GlassInput
                  label="Academic Honors Notes"
                  value={cvData.education[0]?.notes || ''}
                  onChangeText={(val: string) => handleUpdateEducation('notes', val)}
                  placeholder="e.g. Graduated top of class..."
                  isDarkMode={isDarkMode}
                />
              </SectionCard>
              <SectionCard title="Skills & Training" theme={theme}>
                <GlassInput
                  label="Technical Skills (Comma Separated)"
                  value={activeSkillsText}
                  onChangeText={updateSkillsString}
                  placeholder="e.g. Supervisor, AutoCAD"
                  isDarkMode={isDarkMode}
                />
                <GlassInput
                  label="Courses (Comma Separated)"
                  value={activeCoursesText}
                  onChangeText={updateCoursesString}
                  placeholder="e.g. HVAC, NEBOSH Course"
                  isDarkMode={isDarkMode}
                />
              </SectionCard>
            </View>
          )}

          {/* STEP 4: Settings & Print */}
          {activeStep === 3 && (
            <View>
              <SectionCard title="Language Details" theme={theme}>
                <GlassInput
                  label="Arabic Level"
                  value={cvData.languages[0]?.level || ''}
                  onChangeText={(val: string) => handleUpdateLanguage(0, val)}
                  placeholder="e.g. Native language"
                  isDarkMode={isDarkMode}
                />
                <GlassInput
                  label="English Level"
                  value={cvData.languages[1]?.level || ''}
                  onChangeText={(val: string) => handleUpdateLanguage(1, val)}
                  placeholder="e.g. Reading, writing"
                  isDarkMode={isDarkMode}
                />
              </SectionCard>

              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: theme.buttonBackground }]}
                activeOpacity={0.85}
                onPress={() => handleGeneratePDF(isDarkMode, pdfLang)}
                disabled={isLoading}
              >
                <Text style={[styles.primaryButtonText, { color: theme.buttonText }]}>
                  {isLoading ? 'GENERATING...' : 'COMPILE & EXPORT PDF'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Stepper Navigation Buttons */}
          <View style={styles.navRow}>
            {activeStep > 0 && (
              <TouchableOpacity
                style={[styles.navButton, { backgroundColor: theme.borderMuted }]}
                onPress={() => setActiveStep((prev) => prev - 1)}
              >
                <Text style={[styles.navButtonText, { color: theme.textSecondary }]}>BACK</Text>
              </TouchableOpacity>
            )}
            {activeStep < 3 && (
              <TouchableOpacity
                style={[styles.navButton, { backgroundColor: theme.buttonBackground, flex: 1 }]}
                onPress={() => setActiveStep((prev) => prev + 1)}
              >
                <Text style={[styles.navButtonText, { color: theme.buttonText }]}>NEXT</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Android/Web Fallback Bottom Action Sheet Modal */}
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
            <Text style={[styles.sheetTitle, { color: theme.textPrimary }]}>PREFERENCES</Text>
            <TouchableOpacity
              style={[styles.sheetButton, { backgroundColor: theme.inputBackground }]}
              onPress={() => setIsDarkMode((prev) => !prev)}
            >
              <Text style={[styles.sheetButtonText, { color: theme.textPrimary }]}>
                TOGGLE {isDarkMode ? 'LIGHT' : 'DARK'} MODE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sheetButton, { backgroundColor: theme.inputBackground }]}
              onPress={() => setPdfLang((prev) => (prev === 'en' ? 'ar' : 'en'))}
            >
              <Text style={[styles.sheetButtonText, { color: theme.textPrimary }]}>
                PDF LANGUAGE: {pdfLang.toUpperCase()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: theme.buttonBackground }]}
              onPress={() => setIsSettingsVisible(false)}
            >
              <Text style={[styles.cancelButtonText, { color: theme.buttonText }]}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
