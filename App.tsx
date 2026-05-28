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

/**
 * Main CV Builder Application.
 * Follows premium glassmorphic mobile styling.
 * Supports on-the-fly toggling between Light and OLED Dark modes.
 */
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;

  const {
    cvData,
    updateField,
    updateSkillsString,
    validationErrors,
    isLoading,
    systemError,
    handleGeneratePDF,
  } = useCV();

  const activeSkillsText = cvData.skills.join(', ');

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
          {/* Header & Theme Toggle */}
          <View style={styles.headerContainer}>
            <View>
              <Text style={[styles.appTitle, { color: theme.textPrimary }]}>
                CV BUILDER
              </Text>
              <Text style={[styles.appSubtitle, { color: theme.textSecondary }]}>
                A4 PDF Creator
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsDarkMode((prev) => !prev)}
              activeOpacity={0.8}
              style={[
                styles.themeToggle,
                { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
              ]}
            >
              <Text style={[styles.themeToggleText, { color: theme.textPrimary }]}>
                {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Validation & System Status Banners */}
          <StatusBanner
            isDarkMode={isDarkMode}
            isLoading={isLoading}
            error={systemError}
          />

          {/* Form Card: Personal Details */}
          <View style={[styles.glassCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
              Personal Details
            </Text>
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
          </View>

          {/* Form Card: Professional Profile */}
          <View style={[styles.glassCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
              Profile Summary
            </Text>
            <GlassInput
              label="Summary"
              value={cvData.summary}
              onChangeText={(val: string) => updateField('summary', val)}
              placeholder="Brief summary of professional experience..."
              multiline
              numberOfLines={4}
              isDarkMode={isDarkMode}
              error={validationErrors['summary']}
            />
          </View>

          {/* Form Card: Core Skills */}
          <View style={[styles.glassCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
              Technical Skills
            </Text>
            <GlassInput
              label="Skills (Comma Separated)"
              value={activeSkillsText}
              onChangeText={updateSkillsString}
              placeholder="e.g. Supervisor, AutoCAD, Teamwork"
              multiline
              isDarkMode={isDarkMode}
              error={validationErrors['skills']}
            />
          </View>

          {/* Work Experience Preview (Prefilled items from image.png) */}
          <View style={[styles.glassCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
              Work Experience ({cvData.workExperience.length} items)
            </Text>
            {cvData.workExperience.map((exp, idx) => {
              const isLast = idx === cvData.workExperience.length - 1;
              return (
                <View
                  key={`exp-${idx}`}
                  style={[
                    styles.experienceItem,
                    { borderBottomColor: theme.cardBorder },
                    isLast ? { borderBottomWidth: 0 } : null,
                  ]}
                >
                  <Text style={[styles.expTitle, { color: theme.textPrimary }]}>
                    {exp.jobTitle}
                  </Text>
                  <Text style={[styles.expDetails, { color: theme.textSecondary }]}>
                    {exp.companyLocation} | {exp.dateRange}
                  </Text>
                  <Text style={[styles.expTasks, { color: theme.textBody }]}>
                    Tasks: {exp.mainTasks.length} bullet points loaded
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Action Trigger Button */}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: Platform.OS === 'android' ? SPACING.md : 0,
  },
  appTitle: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: '900',
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  themeToggle: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.xs + 2,
    paddingHorizontal: SPACING.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeToggleText: {
    fontSize: TYPOGRAPHY.fontSize.xs - 2,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  glassCard: {
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionHeading: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '800',
    marginBottom: SPACING.md,
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  experienceItem: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
  },
  expTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm + 1,
    fontWeight: '700',
  },
  expDetails: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '600',
    marginTop: 2,
  },
  expTasks: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '500',
    marginTop: 4,
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
