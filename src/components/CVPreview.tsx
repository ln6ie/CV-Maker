import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { generateCVTemplate } from '../services/cvTemplate';
import { PreviewCVSchema } from '../types/cv';
import { SPACING, getFontFamily } from '../constants/tokens';
import { SheetHeader } from './SheetHeader';

interface CVPreviewProps {
  visible: boolean;
  onClose: () => void;
  onExport: () => void;
}

export const CVPreview = ({ visible, onClose, onExport }: CVPreviewProps) => {
  const { cvData, isDarkMode, pdfLang, isRTL, theme, t } = useCVContext();
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (visible) {
      const result = PreviewCVSchema.safeParse(cvData);
      setHtml(generateCVTemplate(result.data as any, isDarkMode, pdfLang));
    }
  }, [visible, cvData, isDarkMode, pdfLang]);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" transparent={false} onDismiss={onClose} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <View style={{ paddingHorizontal: 20 }}>
          <SheetHeader
            title={isRTL ? "معاينة السيرة الذاتية" : "CV Preview"}
            onClose={onClose}
            isDarkMode={isDarkMode}
            isRTL={isRTL}
            theme={theme}
            headerAction={
              <TouchableOpacity
                onPress={onExport}
                style={{
                  backgroundColor: theme.accent,
                  borderRadius: 9999,
                  width: 36,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="share-outline" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            }
          />
        </View>

        {html ? (
          <WebView
            source={{ html }}
            style={{ flex: 1, backgroundColor: '#FFFFFF' }}
            originWhitelist={['*']}
            scalesPageToFit={Platform.OS === 'android'}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Ionicons name="alert-circle-outline" size={48} color={theme.textSecondary} />
            <Text style={{
              marginTop: 12, fontSize: 15, color: theme.textSecondary,
              textAlign: 'center', fontFamily: getFontFamily(isRTL, 400),
            }}>
              {t.errors.validationFailed}
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};
