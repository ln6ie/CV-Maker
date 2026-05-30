import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { CVTemplate, PreviewCVSchema, TEMPLATE_NAMES, TEMPLATE_DESCRIPTIONS } from '../types/cv';
import { useCVContext } from '../context/CVContext';
import { generateCVTemplate } from '../services/cvTemplate';
import { getFontFamily } from '../constants/tokens';
import { SheetHeader } from './SheetHeader';

interface Props {
  template: CVTemplate | null;
  onClose: () => void;
}

export const TemplatePreviewSheet = ({ template, onClose }: Props) => {
  const { cvData, isDarkMode, pdfLang, isRTL, theme, updateField } = useCVContext();
  const [html, setHtml] = useState('');
  const prevTemplate = useRef<CVTemplate | null>(null);
  const lang = isRTL ? 'ar' : 'en';

  useEffect(() => {
    if (!template) return;
    prevTemplate.current = template;
    const previewData = { ...cvData, template };
    const result = PreviewCVSchema.safeParse(previewData);
    setHtml(generateCVTemplate(result.data as any, isDarkMode, pdfLang));
  }, [template, cvData, isDarkMode, pdfLang]);

  const visible = template !== null;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" transparent={false} onDismiss={onClose} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <SheetHeader
          title={template ? TEMPLATE_NAMES[template][lang] : ''}
          onClose={onClose}
          isDarkMode={isDarkMode}
          isRTL={isRTL}
          theme={theme}
          showGrabber={false}
          headerAction={
            <TouchableOpacity
              onPress={() => { if (template) { updateField('template', template); onClose(); } }}
              style={{
                backgroundColor: theme.accent,
                borderRadius: 9999,
                paddingHorizontal: 14,
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '700', fontFamily: getFontFamily(isRTL, 700) }}>
                {isRTL ? 'اختيار' : 'Select'}
              </Text>
            </TouchableOpacity>
          }
        />

        {template && (
          <View style={{ paddingHorizontal: 20, paddingVertical: 8, backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,122,255,0.04)' }}>
            <Text style={{
              fontSize: 12, color: theme.textSecondary,
              fontFamily: getFontFamily(isRTL, 400),
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {TEMPLATE_DESCRIPTIONS[template][lang]}
            </Text>
          </View>
        )}

        {html ? (
          <WebView
            source={{ html }}
            style={{ flex: 1, backgroundColor: '#FFFFFF' }}
            originWhitelist={['*']}
            scalesPageToFit={Platform.OS === 'android'}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: theme.textSecondary, textAlign: 'center', fontFamily: getFontFamily(isRTL, 400) }}>
              {isRTL ? 'جارٍ التحميل...' : 'Loading...'}
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};
