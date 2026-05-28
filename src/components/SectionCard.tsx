import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/tokens';

interface SectionCardProps {
  title: string;
  theme: any;
  children: React.ReactNode;
}

/**
 * Reusable card wrapper displaying a premium glassmorphic border,
 * dynamic theme matching, and drop shadow.
 */
export const SectionCard = ({ title, theme, children }: SectionCardProps) => {
  return (
    <View style={[styles.glassCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
      <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
