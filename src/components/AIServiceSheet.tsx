import React from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useCVContext } from '../context/CVContext';
import { SPACING, getFontFamily } from '../constants/tokens';
import { openWithAI, AIService } from '../constants/ai';
import { SVG_CHATGPT, SVG_GEMINI, SVG_CLAUDE } from '../constants/svg-icons';
import { SheetHeader } from './SheetHeader';

interface AIServiceSheetProps {
  visible: boolean;
  onClose: () => void;
  prompt: string;
}

export const AIServiceSheet = ({ visible, onClose, prompt }: AIServiceSheetProps) => {
  const { isDarkMode, isRTL, theme } = useCVContext();

  const handleSelect = async (service: AIService) => {
    onClose();
    await openWithAI(prompt, service);
  };

  const services: { key: AIService; svg: string; label: string; desc: string }[] = [
    {
      key: 'chatgpt',
      svg: SVG_CHATGPT,
      label: 'ChatGPT',
      desc: isRTL ? 'ينسخ البرومت ويفتح التطبيق' : 'Copies prompt & opens app',
    },
    {
      key: 'gemini',
      svg: SVG_GEMINI,
      label: 'Gemini',
      desc: isRTL ? 'ينسخ البرومت ويفتح التطبيق' : 'Copies prompt & opens app',
    },
    {
      key: 'claude',
      svg: SVG_CLAUDE,
      label: 'Claude',
      desc: isRTL ? 'ينسخ البرومت ويفتح التطبيق' : 'Copies prompt & opens app',
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent={Platform.OS === 'android'}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
      onDismiss={onClose}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'flex-end',
        }}
      >
        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={onClose}
          />
        )}

        <View
          style={[
            Platform.OS === 'ios'
              ? { flex: 1, backgroundColor: theme.background, paddingHorizontal: 24, paddingTop: 16 }
              : {
                  backgroundColor: theme.cardBackground,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  paddingHorizontal: 24,
                  paddingVertical: 24,
                  borderWidth: 1,
                  borderColor: theme.cardBorder,
                  borderBottomWidth: 0,
                  width: '100%',
                },
          ]}
        >
          <SheetHeader title={isRTL ? 'تحسين بالذكاء الاصطناعي' : 'Improve with AI'} onClose={onClose} isRTL={isRTL} isDarkMode={isDarkMode} theme={theme} showGrabber />

          <View style={{ gap: SPACING.md, paddingTop: SPACING.lg }}>
            <Text style={{
              fontSize: 14,
              color: theme.textSecondary,
              textAlign: isRTL ? 'right' : 'left',
              fontFamily: getFontFamily(isRTL, 400),
              lineHeight: 20,
            }}>
              {isRTL ? 'اختر خدمة الذكاء الاصطناعي لتحسين النص:' : 'Choose an AI service to improve your text:'}
            </Text>

            {services.map((s) => (
              <TouchableOpacity
                key={s.key}
                onPress={() => handleSelect(s.key)}
                activeOpacity={0.7}
                style={{
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  gap: 14,
                  backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.03)',
                  borderWidth: 0.5,
                  borderRadius: 16,
                  padding: 18,
                }}
              >
                <View style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <SvgXml xml={s.svg} width={30} height={30} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: theme.textPrimary,
                    fontFamily: getFontFamily(isRTL, 700),
                  }}>
                    {s.label}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    fontFamily: getFontFamily(isRTL, 400),
                    marginTop: 2,
                  }}>
                    {s.desc}
                  </Text>
                </View>
                <Ionicons name={isRTL ? 'chevron-back-outline' : 'chevron-forward-outline'} size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};