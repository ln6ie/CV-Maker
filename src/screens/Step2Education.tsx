import React from 'react';
import { View, Text } from 'react-native';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';
import { SPACING, getFontFamily } from '../constants/tokens';

export const Step2Education = () => {
  const { cvData, handleUpdateEducation, updateSkillsString, updateCoursesString, isDarkMode, isRTL, t, theme } = useCVContext();
  return (
    <View style={{ gap: SPACING.md }}>
      <Text style={{
        color: theme.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: getFontFamily(isRTL, 700),
      }}>
        {t.steps.education}
      </Text>
      <GlassInput label={t.labels.degree} value={cvData.education[0]?.degree || ''}
        onChangeText={(v: string) => handleUpdateEducation('degree', v)} placeholder={t.placeholders.degree}
        isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.degree} />
      <GlassInput label={t.labels.institution} value={cvData.education[0]?.institution || ''}
        onChangeText={(v: string) => handleUpdateEducation('institution', v)} placeholder={t.placeholders.institution}
        isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.institution} />
      <GlassInput label={t.labels.graduationYear} value={cvData.education[0]?.year || ''}
        onChangeText={(v: string) => handleUpdateEducation('year', v)} placeholder={t.placeholders.graduationYear}
        isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.graduationYear} />
      <GlassInput label={t.labels.honors} value={cvData.education[0]?.notes || ''}
        onChangeText={(v: string) => handleUpdateEducation('notes', v)} placeholder={t.placeholders.honors}
        isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.honors} />

      <Text style={{
        color: theme.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
        marginTop: SPACING.sm,
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: getFontFamily(isRTL, 700),
      }}>
        {t.steps.skills}
      </Text>
      <GlassInput label={t.labels.skills} value={cvData.skills.join(', ')} onChangeText={updateSkillsString}
        placeholder={t.placeholders.skills} isDarkMode={isDarkMode} isRTL={isRTL} />
      <GlassInput label={t.labels.courses} value={cvData.courses.join(', ')} onChangeText={updateCoursesString}
        placeholder={t.placeholders.courses} isDarkMode={isDarkMode} isRTL={isRTL} />
    </View>
  );
};
