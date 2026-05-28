import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, TYPOGRAPHY } from '../constants/tokens';
import { WorkExperience } from '../types/cv';

interface ExperiencePreviewProps {
  workExperience: WorkExperience[];
  theme: any;
}

/**
 * Preview component showing all the loaded work experiences inside a clean list structure.
 */
export const ExperiencePreview = ({ workExperience, theme }: ExperiencePreviewProps) => {
  return (
    <>
      {workExperience.map((exp, idx) => {
        const isLast = idx === workExperience.length - 1;
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
    </>
  );
};

const styles = StyleSheet.create({
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
});
