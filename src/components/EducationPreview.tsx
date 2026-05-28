import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, TYPOGRAPHY } from '../constants/tokens';
import { Education } from '../types/cv';

interface EducationPreviewProps {
  education: Education[];
  theme: any;
}

/**
 * Preview component showing all the loaded education records inside a clean list structure.
 */
export const EducationPreview = ({ education, theme }: EducationPreviewProps) => {
  return (
    <>
      {education.map((edu, idx) => {
        const isLast = idx === education.length - 1;
        return (
          <View
            key={`edu-${idx}`}
            style={[
              styles.educationItem,
              { borderBottomColor: theme.cardBorder },
              isLast ? { borderBottomWidth: 0 } : null,
            ]}
          >
            <Text style={[styles.eduTitle, { color: theme.textPrimary }]}>
              {edu.degree}
            </Text>
            <Text style={[styles.eduDetails, { color: theme.textSecondary }]}>
              {edu.institution} | {edu.year}
            </Text>
            {edu.notes && (
              <Text style={[styles.eduNotes, { color: theme.textBody }]}>
                {edu.notes}
              </Text>
            )}
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  educationItem: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
  },
  eduTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm + 1,
    fontWeight: '700',
  },
  eduDetails: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '600',
    marginTop: 2,
  },
  eduNotes: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontStyle: 'italic',
    marginTop: 4,
  },
});
