import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';

import { ExportButton } from '../components/ExportButton';
import { CVPreview } from '../components/CVPreview';
import { SPACING, getFontFamily } from '../constants/tokens';

export const Step3Export = () => {
  const { cvData, handleUpdateLanguage, handleExportAction, handleReShare, exportStatus, theme, isDarkMode, isRTL, t } = useCVContext();
  const [previewVisible, setPreviewVisible] = useState(false);

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
        {t.steps.language}
      </Text>
      <GlassInput label={t.labels.arabicLevel} value={cvData.languages[0]?.level || ''}
        onChangeText={(v: string) => handleUpdateLanguage(0, v)} placeholder={t.placeholders.arabicLevel}
        isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.arabicLevel} />
      <GlassInput label={t.labels.englishLevel} value={cvData.languages[1]?.level || ''}
        onChangeText={(v: string) => handleUpdateLanguage(1, v)} placeholder={t.placeholders.englishLevel}
        isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.englishLevel} />

      <TouchableOpacity
        onPress={() => setPreviewVisible(true)}
        style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: theme.accent,
          paddingVertical: 14,
          marginTop: SPACING.sm,
        }}
      >
        <Ionicons name="eye-outline" size={20} color={theme.accent} />
        <Text style={{
          color: theme.accent, fontSize: 15, fontWeight: '700',
          fontFamily: getFontFamily(isRTL, 700),
        }}>
          {isRTL ? 'معاينة السيرة الذاتية' : 'Preview CV'}
        </Text>
      </TouchableOpacity>

      <Text style={{
        color: theme.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
        marginTop: SPACING.sm,
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: getFontFamily(isRTL, 700),
      }}>
        {t.steps.export}
      </Text>
      <ExportButton theme={theme} isRTL={isRTL} t={t} exportStatus={exportStatus}
        onPress={handleExportAction} onReShare={handleReShare} />

      <CVPreview
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        onExport={handleExportAction}
      />
    </View>
  );
};
