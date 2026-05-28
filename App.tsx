import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from './src/constants/tokens';
import { useCV } from './src/hooks/useCV';
import { GlassInput } from './src/components/GlassInput';
import { StatusBanner } from './src/components/StatusBanner';
import { Header } from './src/components/Header';
import { SectionCard } from './src/components/SectionCard';
import { ExperiencePreview } from './src/components/ExperiencePreview';
import { EducationPreview } from './src/components/EducationPreview';
import { LanguagePreview } from './src/components/LanguagePreview';
import { Education } from './src/types/cv';

/**
 * Clean root CV Builder Application supporting dual-page layouts (image.png & Page 2).
 * Styled cleanly with modular components under the 250-line restriction.
 */
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
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

  const activeSkillsText = cvData.skills.join(', ');
  const activeCoursesText = cvData.courses.join(', ');

  /**
   * Helper to update the first education record dynamically.
   */
  const handleUpdateEducation = (field: keyof Education, val: string) => {
    const list = [...cvData.education];
    if (list[0]) {
      list[0] = { ...list[0], [field]: val };
      updateField('education', list);
    }
  };

  /**
   * Helper to update proficiency level for a specific language record.
   */
  const handleUpdateLanguage = (idx: number, level: string) => {
    const list = [...cvData.languages];
    if (list[idx]) {
      list[idx] = { ...list[idx], level };
      updateField('languages', list);
    }
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Header
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode((prev) => !prev)}
            theme={theme}
          />

          {/* Loading, Empty, and Error Handler banner */}
          <StatusBanner
            isDarkMode={isDarkMode}
            isLoading={isLoading}
            error={systemError}
          />

          {/* Section: Personal Info */}
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
          </SectionCard>

          {/* Section: Summary Profile */}
          <SectionCard title="Profile Summary" theme={theme}>
            <GlassInput
              label="Summary Details"
              value={cvData.summary}
              onChangeText={(val: string) => updateField('summary', val)}
              placeholder="Brief summary of professional experience..."
              multiline
              numberOfLines={4}
              isDarkMode={isDarkMode}
              error={validationErrors['summary']}
            />
          </SectionCard>

          {/* Section: Skills */}
          <SectionCard title="Technical Skills" theme={theme}>
            <GlassInput
              label="Skills (Comma Separated)"
              value={activeSkillsText}
              onChangeText={updateSkillsString}
              placeholder="e.g. Supervisor, AutoCAD, Teamwork"
              multiline
              isDarkMode={isDarkMode}
              error={validationErrors['skills']}
            />
          </SectionCard>

          {/* Section: Work Experience Preview */}
          <SectionCard title={`Work Experience (${cvData.workExperience.length} items)`} theme={theme}>
            <ExperiencePreview workExperience={cvData.workExperience} theme={theme} />
          </SectionCard>

          {/* Section: Education Details */}
          <SectionCard title="Education" theme={theme}>
            <GlassInput
              label="Degree Title"
              value={cvData.education[0]?.degree || ''}
              onChangeText={(val: string) => handleUpdateEducation('degree', val)}
              placeholder="e.g. Bachelors of electromechanical Engineering"
              isDarkMode={isDarkMode}
              error={validationErrors['education.0.degree']}
            />
            <GlassInput
              label="Institution Name"
              value={cvData.education[0]?.institution || ''}
              onChangeText={(val: string) => handleUpdateEducation('institution', val)}
              placeholder="e.g. Southern Technical University"
              isDarkMode={isDarkMode}
              error={validationErrors['education.0.institution']}
            />
            <GlassInput
              label="Graduation Year"
              value={cvData.education[0]?.year || ''}
              onChangeText={(val: string) => handleUpdateEducation('year', val)}
              placeholder="e.g. 2025"
              isDarkMode={isDarkMode}
              error={validationErrors['education.0.year']}
            />
            <GlassInput
              label="Academic Honors Notes"
              value={cvData.education[0]?.notes || ''}
              onChangeText={(val: string) => handleUpdateEducation('notes', val)}
              placeholder="e.g. Achieved top-tier standing..."
              isDarkMode={isDarkMode}
              error={validationErrors['education.0.notes']}
            />
          </SectionCard>

          {/* Section: Courses */}
          <SectionCard title="Training & Courses" theme={theme}>
            <GlassInput
              label="Courses (Comma Separated)"
              value={activeCoursesText}
              onChangeText={updateCoursesString}
              placeholder="e.g. HVAC, NEBOSH Complete Course"
              multiline
              isDarkMode={isDarkMode}
              error={validationErrors['courses']}
            />
          </SectionCard>

          {/* Section: Languages */}
          <SectionCard title="Languages" theme={theme}>
            <GlassInput
              label="Arabic Level"
              value={cvData.languages[0]?.level || ''}
              onChangeText={(val: string) => handleUpdateLanguage(0, val)}
              placeholder="e.g. Native language"
              isDarkMode={isDarkMode}
              error={validationErrors['languages.0.level']}
            />
            <GlassInput
              label="English Level"
              value={cvData.languages[1]?.level || ''}
              onChangeText={(val: string) => handleUpdateLanguage(1, val)}
              placeholder="e.g. Reading, writing and speaking"
              isDarkMode={isDarkMode}
              error={validationErrors['languages.1.level']}
            />
          </SectionCard>

          {/* Main Action Trigger */}
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: theme.buttonBackground }]}
            activeOpacity={0.85}
            onPress={() => handleGeneratePDF(isDarkMode)}
            disabled={isLoading}
          >
            <Text style={[styles.primaryButtonText, { color: theme.buttonText }]}>
              {isLoading ? 'GENERATING...' : 'EXPORT & SHARE PDF'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  primaryButton: {
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.md,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
