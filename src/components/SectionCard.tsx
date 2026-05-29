import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS, TYPOGRAPHY, getFontFamily } from '../constants/tokens';

import { SectionCardProps } from '../types/components';

export const SectionCard = ({ title, theme, children, isRTL = false, isDarkMode = false }: SectionCardProps) => {
  return (
    <View
      style={[
        styles.baseCard,
        isDarkMode
          ? { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder, borderWidth: 1 }
          : {
              backgroundColor: theme.cardBackground,
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 4 },
              elevation: 2,
            },
      ]}
    >
      <Text
        style={[
          styles.sectionHeading,
          { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 800) },
        ]}
      >
        {title}
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  baseCard: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionHeading: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '800',
    marginBottom: SPACING.md,
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
});
