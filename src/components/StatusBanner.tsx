import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/tokens';

interface StatusBannerProps {
  isDarkMode: boolean;
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
}

/**
 * Handles three critical component states: Loading, Empty, and Error.
 * Renders glassmorphic containers with styled messaging.
 */
export const StatusBanner = ({
  isDarkMode,
  isLoading = false,
  error = null,
  isEmpty = false,
  emptyMessage = 'No details added yet.',
}: StatusBannerProps) => {
  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;

  if (isLoading) {
    return (
      <View style={[styles.container, styles.overlay, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={[styles.statusText, { color: theme.textPrimary, marginTop: SPACING.md }]}>
          Generating PDF...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? 'rgba(207, 102, 121, 0.1)' : 'rgba(213, 47, 47, 0.08)', borderColor: theme.error }]}>
        <Text style={[styles.title, { color: theme.error }]}>Validation Error</Text>
        <Text style={[styles.body, { color: theme.textBody }]}>{error}</Text>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={[styles.container, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
        <Text style={[styles.title, { color: theme.textSecondary }]}>No Data Found</Text>
        <Text style={[styles.body, { color: theme.textSecondary }]}>{emptyMessage}</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.md,
    width: '100%',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  overlay: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  body: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    lineHeight: 20,
  },
});
