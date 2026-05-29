import React from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { sharedStyles } from '../styles/shared.styles';
import { getFontFamily } from '../constants/tokens';

export const SettingsSheet = () => {
  const {
    isSettingsVisible,
    setIsSettingsVisible,
    isDarkMode,
    setIsDarkMode,
    activeLanguage,
    setActiveLanguage,
    setPdfLang,
    theme,
    t,
    isRTL,
  } = useCVContext();

  return (
    <Modal
      visible={isSettingsVisible}
      transparent={Platform.OS === 'android'}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
      onRequestClose={() => setIsSettingsVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'flex-end',
        }}
      >
        {/* Render Android only backdrop to allow click outside to close */}
        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={() => setIsSettingsVisible(false)}
          />
        )}

        <View
          style={[
            Platform.OS === 'ios'
              ? {
                  flex: 1,
                  backgroundColor: theme.background,
                  paddingHorizontal: 24,
                  paddingTop: 16,
                }
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
          {/* Grabber indicator (pure iOS style) - always visible to allow interactive iOS swipe down to dismiss */}
          <View
            style={{
              width: 40,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: isDarkMode ? '#48484A' : '#E5E5EA',
              alignSelf: 'center',
              marginBottom: 20,
            }}
          />

          {/* Modal Header Row (With Done/Save Button on Top-Right instead of Bottom Close Button) */}
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                color: theme.textPrimary,
                fontFamily: getFontFamily(isRTL, 900),
                fontSize: 22,
                letterSpacing: -0.5,
              }}
            >
              {t.preferences.title}
            </Text>
            
            <TouchableOpacity
              onPress={() => setIsSettingsVisible(false)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 99,
                backgroundColor: theme.inputBackground,
              }}
            >
              <Text style={{ color: theme.accent, fontFamily: getFontFamily(isRTL, 800), fontSize: 14 }}>
                {isRTL ? 'تم' : 'Done'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Theme Toggle Selection (System Style Switch/Button) */}
          <View style={{ width: '100%', marginBottom: 20 }}>
            <Text
              style={{
                color: theme.textSecondary,
                fontFamily: getFontFamily(isRTL, 700),
                fontSize: 13,
                marginBottom: 8,
                paddingHorizontal: 4,
                textAlign: isRTL ? 'right' : 'left',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {isRTL ? 'مظهر التطبيق' : 'App Theme'}
            </Text>
            <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                backgroundColor: theme.inputBackground,
                borderRadius: 16,
                padding: 4,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderRadius: 12,
                  backgroundColor: !isDarkMode ? theme.cardBackground : 'transparent',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: !isDarkMode ? 0.08 : 0,
                  shadowRadius: 2,
                  elevation: !isDarkMode ? 1 : 0,
                }}
                onPress={() => setIsDarkMode(false)}
              >
                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="sunny-outline" size={16} color={!isDarkMode ? theme.accent : theme.textSecondary} />
                  <Text
                    style={{
                      color: !isDarkMode ? theme.textPrimary : theme.textSecondary,
                      fontFamily: getFontFamily(isRTL, 700),
                      fontSize: 13,
                    }}
                  >
                    {isRTL ? 'فاتح' : 'Light'}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderRadius: 12,
                  backgroundColor: isDarkMode ? (isDarkMode ? '#2C2C2E' : '#FFFFFF') : 'transparent',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: isDarkMode ? 0.2 : 0,
                  shadowRadius: 2,
                  elevation: isDarkMode ? 1 : 0,
                }}
                onPress={() => setIsDarkMode(true)}
              >
                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="moon-outline" size={16} color={isDarkMode ? theme.accent : theme.textSecondary} />
                  <Text
                    style={{
                      color: isDarkMode ? theme.textPrimary : theme.textSecondary,
                      fontFamily: getFontFamily(isRTL, 700),
                      fontSize: 13,
                    }}
                  >
                    {isRTL ? 'داكن' : 'Dark'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Language Tabs Selector (iOS Segmented Tab Style) */}
          <View style={{ width: '100%', marginBottom: 28 }}>
            <Text
              style={{
                color: theme.textSecondary,
                fontFamily: getFontFamily(isRTL, 700),
                fontSize: 13,
                marginBottom: 8,
                paddingHorizontal: 4,
                textAlign: isRTL ? 'right' : 'left',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {isRTL ? 'لغة ملف الـ PDF' : 'PDF Document Language'}
            </Text>
            <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                backgroundColor: theme.inputBackground,
                borderRadius: 16,
                padding: 4,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderRadius: 12,
                  backgroundColor: activeLanguage === 'en' ? theme.cardBackground : 'transparent',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: activeLanguage === 'en' ? 0.08 : 0,
                  shadowRadius: 2,
                  elevation: activeLanguage === 'en' ? 1 : 0,
                }}
                onPress={() => {
                  setActiveLanguage('en');
                  setPdfLang('en');
                }}
              >
                <Text
                  style={{
                    color: activeLanguage === 'en' ? theme.accent : theme.textSecondary,
                    fontFamily: getFontFamily(isRTL, 800),
                    fontSize: 13,
                  }}
                >
                  English (LTR)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderRadius: 12,
                  backgroundColor: activeLanguage === 'ar' ? (isDarkMode ? '#2C2C2E' : '#FFFFFF') : 'transparent',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: activeLanguage === 'ar' ? 0.2 : 0,
                  shadowRadius: 2,
                  elevation: activeLanguage === 'ar' ? 1 : 0,
                }}
                onPress={() => {
                  setActiveLanguage('ar');
                  setPdfLang('ar');
                }}
              >
                <Text
                  style={{
                    color: activeLanguage === 'ar' ? theme.accent : theme.textSecondary,
                    fontFamily: getFontFamily(isRTL, 800),
                    fontSize: 13,
                  }}
                >
                  العربية (RTL)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
