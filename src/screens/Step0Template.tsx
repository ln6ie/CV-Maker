import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CVTemplate, TEMPLATE_NAMES, TEMPLATE_DESCRIPTIONS } from '../types/cv';
import { useCVContext } from '../context/CVContext';
import { TemplatePreviewSheet } from '../components/TemplatePreviewSheet';
import { SPACING, getFontFamily } from '../constants/tokens';

const ALL_TEMPLATES: CVTemplate[] = ['classic', 'engineering', 'hospitality', 'executive'];

export const Step0Template = () => {
  const { cvData, updateField, isDarkMode, isRTL, theme, t } = useCVContext();
  const current = cvData.template || 'classic';
  const lang = isRTL ? 'ar' : 'en';
  const [previewTarget, setPreviewTarget] = useState<CVTemplate | null>(null);

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
        {t.steps.template}
      </Text>
      <Text style={{
        color: theme.textSecondary,
        fontSize: 13,
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: getFontFamily(isRTL, 400),
        marginBottom: SPACING.xs,
      }}>
        {isRTL ? 'اختر القالب المناسب لسيرتك الذاتية. اضغط مطولاً لمعاينته.' : 'Choose your CV template. Long-press to preview.'}
      </Text>

      <View style={{
        borderRadius: 14,
        backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
        borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.03)',
        borderWidth: 0.5,
        overflow: 'hidden',
      }}>
        {ALL_TEMPLATES.map((tmpl, idx) => {
          const isActive = current === tmpl;
          const desc = TEMPLATE_DESCRIPTIONS[tmpl][lang];
          return (
            <TouchableOpacity
              key={tmpl}
              onPress={() => updateField('template', tmpl)}
              onLongPress={() => setPreviewTarget(tmpl)}
              delayLongPress={400}
              activeOpacity={0.7}
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: SPACING.md,
                paddingVertical: 16,
                backgroundColor: isActive
                  ? (isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,122,255,0.06)')
                  : 'transparent',
              }}
            >
              <View style={{
                width: 20, height: 20, borderRadius: 10,
                borderWidth: 2,
                borderColor: isActive ? theme.accent : (isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(60,60,67,0.2)'),
                alignItems: 'center', justifyContent: 'center',
              }}>
                {isActive && <View style={{
                  width: 10, height: 10, borderRadius: 5,
                  backgroundColor: theme.accent,
                }} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 15, fontWeight: '600',
                  color: isActive ? theme.accent : theme.textPrimary,
                  fontFamily: getFontFamily(isRTL, 600),
                  textAlign: isRTL ? 'right' : 'left',
                }}>
                  {TEMPLATE_NAMES[tmpl][lang]}
                </Text>
                <Text style={{
                  fontSize: 11, color: theme.textSecondary, marginTop: 2,
                  fontFamily: getFontFamily(isRTL, 400),
                  textAlign: isRTL ? 'right' : 'left',
                }} numberOfLines={1}>
                  {desc}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TemplatePreviewSheet
        template={previewTarget}
        onClose={() => setPreviewTarget(null)}
      />
    </View>
  );
};
