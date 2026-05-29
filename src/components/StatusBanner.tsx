import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS, TYPOGRAPHY, getFontFamily } from '../constants/tokens';
import { useCVContext } from '../context/CVContext';

export const StatusBanner = () => {
  const { theme, isRTL, t, isLoading, systemError, isDarkMode } = useCVContext();
  const error = systemError;
  const textAlign = isRTL ? 'right' as const : 'left' as const;

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? 'rgba(207, 102, 121, 0.1)' : 'rgba(213, 47, 47, 0.08)', borderColor: theme.error }]}>
        <Text style={[styles.title, { color: theme.error, textAlign, fontFamily: getFontFamily(isRTL, 700) }]}>
          {t.status.validationError}
        </Text>
        <Text style={[styles.body, { color: theme.textBody, textAlign, fontFamily: getFontFamily(isRTL, 400) }]}>{error}</Text>
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
