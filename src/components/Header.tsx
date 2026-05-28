import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/tokens';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  theme: any;
}

/**
 * Top application header containing the brand name and the OLED-optimized Light/Dark toggle.
 */
export const Header = ({ isDarkMode, onToggleTheme, theme }: HeaderProps) => {
  return (
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
        onPress={onToggleTheme}
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
  );
};

const styles = StyleSheet.create({
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
});
