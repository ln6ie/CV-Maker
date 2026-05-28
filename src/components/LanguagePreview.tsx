import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, TYPOGRAPHY } from '../constants/tokens';
import { Language } from '../types/cv';

interface LanguagePreviewProps {
  languages: Language[];
  theme: any;
}

/**
 * Preview component showing all the loaded languages and their proficiency levels in a clean list structure.
 */
export const LanguagePreview = ({ languages, theme }: LanguagePreviewProps) => {
  return (
    <>
      {languages.map((lang, idx) => {
        const isLast = idx === languages.length - 1;
        return (
          <View
            key={`lang-${idx}`}
            style={[
              styles.langItem,
              { borderBottomColor: theme.cardBorder },
              isLast ? { borderBottomWidth: 0 } : null,
            ]}
          >
            <Text style={[styles.langText, { color: theme.textBody }]}>
              <Text style={[styles.langName, { color: theme.textPrimary }]}>{lang.name}:</Text>{' '}
              {lang.level}
            </Text>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  langItem: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
  },
  langText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '500',
  },
  langName: {
    fontWeight: '700',
  },
});
