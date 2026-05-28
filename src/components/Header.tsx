import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/tokens';

interface HeaderProps {
  isDarkMode: boolean;
  onOpenSettings: () => void;
  theme: any;
}

/**
 * Top application header containing the brand name and the iOS gear button for Action Sheet settings.
 */
export const Header = ({ isDarkMode, onOpenSettings, theme }: HeaderProps) => {
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
        onPress={onOpenSettings}
        activeOpacity={0.85}
        style={[
          styles.settingsButton,
          { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
        ]}
      >
        <Ionicons name="settings-outline" size={22} color={theme.textPrimary} />
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
  settingsButton: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.full,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
