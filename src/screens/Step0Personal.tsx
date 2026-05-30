import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';
import { AIServiceSheet } from '../components/AIServiceSheet';
import { SPACING, getFontFamily } from '../constants/tokens';
import { PROMPTS } from '../constants/ai';

export const Step0Personal = () => {
  const { cvData, updateField, validationErrors, isDarkMode, isRTL, t, theme, activeLanguage } = useCVContext();
  const [aiSheetVisible, setAiSheetVisible] = useState(false);

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
        {t.steps.personal}
      </Text>
      <GlassInput label={t.labels.fullName} value={cvData.fullName} onChangeText={(v: string) => updateField('fullName', v)} placeholder={t.placeholders.fullName} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['fullName']} tip={t.tips.fullName} />
      <GlassInput label={t.labels.address} value={cvData.address} onChangeText={(v: string) => updateField('address', v)} placeholder={t.placeholders.address} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['address']} tip={t.tips.address} />
      <GlassInput label={t.labels.phone} value={cvData.phone} onChangeText={(v: string) => updateField('phone', v)} placeholder={t.placeholders.phone} keyboardType="phone-pad" isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['phone']} tip={t.tips.phone} />
      <GlassInput label={t.labels.email} value={cvData.email} onChangeText={(v: string) => updateField('email', v)} placeholder={t.placeholders.email} keyboardType="email-address" autoCapitalize="none" isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['email']} tip={t.tips.email} />
      <GlassInput label={t.labels.summary} value={cvData.summary} onChangeText={(v: string) => updateField('summary', v)} placeholder={t.placeholders.summary} multiline numberOfLines={3} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['summary']} tip={t.tips.summary} />
      {cvData.summary.trim() && (
        <TouchableOpacity
          onPress={() => setAiSheetVisible(true)}
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 9999,
            backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
            borderWidth: 0.5,
            borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.03)',
          }}
        >
          <Ionicons name="sparkles" size={16} color={theme.accent} />
          <Text style={{ fontSize: 13, fontWeight: '700', color: theme.accent, fontFamily: getFontFamily(isRTL, 700) }}>
            {isRTL ? 'حسّن الملخص بالذكاء الاصطناعي' : 'Improve Summary with AI'}
          </Text>
        </TouchableOpacity>
      )}
      <AIServiceSheet
        visible={aiSheetVisible}
        onClose={() => setAiSheetVisible(false)}
        prompt={PROMPTS.summary(cvData.summary, activeLanguage)}
      />
    </View>
  );
};