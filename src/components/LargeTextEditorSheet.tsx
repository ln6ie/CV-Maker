import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { sharedStyles } from '../styles/shared.styles';
import { getFontFamily } from '../constants/tokens';

import { LargeTextEditorSheetProps } from '../types/components';

export const LargeTextEditorSheet = ({
  visible,
  onClose,
  label,
  value,
  onSave,
  placeholder,
}: LargeTextEditorSheetProps) => {
  const { theme, isRTL, isDarkMode } = useCVContext();
  const [tempValue, setTempValue] = useState(value);

  // Sync state when sheet opens
  React.useEffect(() => {
    if (visible) {
      setTempValue(value);
    }
  }, [visible, value]);

  const handleSave = () => {
    onSave(tempValue);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={Platform.OS === 'android'}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: theme.background }}
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
                  height: '80%',
                  position: 'absolute',
                  bottom: 0,
                },
          ]}
        >
          {/* iOS top drag bar indicator */}
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

          {/* Action Row */}
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <TouchableOpacity onPress={onClose} style={{ paddingVertical: 6, paddingHorizontal: 12, borderRadius: 99, backgroundColor: theme.inputBackground }}>
              <Text style={{ color: theme.textSecondary, fontFamily: getFontFamily(isRTL, 700), fontSize: 14 }}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Text>
            </TouchableOpacity>

            <Text style={{ color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 900), fontSize: 18 }}>
              {label}
            </Text>

            <TouchableOpacity onPress={handleSave} style={{ paddingVertical: 6, paddingHorizontal: 16, borderRadius: 99, backgroundColor: theme.accent }}>
              <Text style={{ color: '#FFFFFF', fontFamily: getFontFamily(isRTL, 800), fontSize: 14 }}>
                {isRTL ? 'حفظ' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Text Area Card - borderless, stretches to margins naturally */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                flex: 1,
                minHeight: 180,
                paddingVertical: 12,
                paddingHorizontal: 4,
              }}
            >
              <TextInput
                value={tempValue}
                onChangeText={setTempValue}
                placeholder={placeholder || label}
                placeholderTextColor={isDarkMode ? '#636366' : '#C7C7CC'}
                multiline
                autoFocus
                textAlignVertical="top"
                style={{
                  flex: 1,
                  color: theme.textBody,
                  fontSize: 17,
                  lineHeight: 25,
                  fontFamily: getFontFamily(isRTL, 400),
                  textAlign: isRTL ? 'right' : 'left',
                }}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
