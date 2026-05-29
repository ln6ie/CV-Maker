import React, { useState } from 'react';
import {
  View, ScrollView, Text, TouchableOpacity, KeyboardAvoidingView,
  Platform, Modal, Animated, StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Cairo_400Regular, Cairo_700Bold, Cairo_900Black } from '@expo-google-fonts/cairo';
import { COLORS, SPACING, getFontFamily } from './src/constants/tokens';
import { CVProvider, useCVContext } from './src/context/CVContext';
import { sharedStyles, FLOATING_HEADER_HEIGHT } from './src/styles/shared.styles';
import { Header } from './src/components/Header';
import { StatusBanner } from './src/components/StatusBanner';
import { Step0Personal } from './src/screens/Step0Personal';
import { Step1Experience } from './src/screens/Step1Experience';
import { Step2Education } from './src/screens/Step2Education';
import { Step3Export } from './src/screens/Step3Export';
import { SettingsSheet } from './src/components/SettingsSheet';

function AppShell() {
  const {
    theme, isDarkMode, isRTL, t, activeStep,
    handleNext, handlePrev, handleOpenSettings,
    snackMessage, snackOpacity, snackTranslateY,
  } = useCVContext();

  const insets = useSafeAreaInsets();
  const headerTopPadding = FLOATING_HEADER_HEIGHT + insets.top + SPACING.sm;

  return (
    <View style={[sharedStyles.root, { backgroundColor: theme.background }]}>
      <StatusBar translucent style={isDarkMode ? 'light' : 'dark'} />

      <View style={[sharedStyles.floatingHeader, { top: 0 }]}>
        <BlurView intensity={90} tint={isDarkMode ? 'dark' : 'light'} style={sharedStyles.floatingBlur}>
          <View style={{ paddingTop: insets.top }}>
            <Header isDarkMode={isDarkMode} onOpenSettings={handleOpenSettings} theme={theme} isRTL={isRTL} t={t} />
            <View style={[sharedStyles.stepperInsetCard, { backgroundColor: theme.inputBackground }]}>
              <View style={[sharedStyles.stepperTrack, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                {[0, 1, 2, 3].map((i) => (
                  <View key={i} style={[sharedStyles.stepIndicator, { backgroundColor: i <= activeStep ? theme.accent : (isDarkMode ? '#2C2C2E' : '#E5E5EA') }]} />
                ))}
              </View>
            </View>
          </View>
        </BlurView>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={sharedStyles.flex}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: headerTopPadding,
            paddingBottom: insets.bottom + 20 + SPACING.lg + SPACING.md,
            paddingHorizontal: SPACING.lg,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBanner />

          {activeStep === 0 && <Step0Personal />}
          {activeStep === 1 && <Step1Experience />}
          {activeStep === 2 && <Step2Education />}
          {activeStep === 3 && <Step3Export />}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={{
        position: 'absolute', bottom: insets.bottom + SPACING.lg,
        right: SPACING.lg, left: SPACING.lg,
        flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', zIndex: 50, pointerEvents: 'box-none',
      }}>
        {activeStep > 0 && (
          <TouchableOpacity style={[sharedStyles.fab, { backgroundColor: theme.buttonBackground }]} activeOpacity={0.7} onPress={handlePrev}>
            <Ionicons name={isRTL ? 'chevron-forward' : 'chevron-back'} size={24} color={theme.buttonText} />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }} />
        {activeStep < 3 && (
          <TouchableOpacity style={[sharedStyles.fab, { backgroundColor: theme.buttonBackground }]} activeOpacity={0.7} onPress={handleNext}>
            <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={24} color={theme.buttonText} />
          </TouchableOpacity>
        )}
      </View>

      {snackMessage && (
        <Animated.View
          style={[sharedStyles.snackPill, {
            bottom: insets.bottom + 90, backgroundColor: theme.error,
            opacity: snackOpacity, transform: [{ translateY: snackTranslateY }],
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }]}
          pointerEvents="none"
        >
          <Ionicons name="alert-circle" size={18} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', flex: 1, fontFamily: getFontFamily(isRTL, 600) }} numberOfLines={1}>
            {snackMessage}
          </Text>
        </Animated.View>
      )}

      {/* Render modular settings bottom sheet */}
      <SettingsSheet />
    </View>
  );
}

function AppBoot() {
  const [fontsLoaded] = useFonts({
    'Cairo': Cairo_400Regular,
    'Cairo-Bold': Cairo_700Bold,
    'Cairo-Black': Cairo_900Black,
  });
  const [showSplash, setShowSplash] = useState(true);

  return (
    <CVProvider>
      <AppGate fontsLoaded={fontsLoaded} showSplash={showSplash} setShowSplash={setShowSplash} />
    </CVProvider>
  );
}

import { IntroScreen } from './src/screens/IntroScreen';

function AppGate({ fontsLoaded, showSplash, setShowSplash }: { fontsLoaded: boolean; showSplash: boolean; setShowSplash: (v: boolean) => void }) {
  const { themeLoaded, theme } = useCVContext();

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const initialBg = theme?.background || '#0A0A0C';

  return (
    <View style={{ flex: 1, backgroundColor: initialBg }}>
      {/* 
        AppShell renders underneath the splash overlay once themes are loaded.
        Since IntroScreen shares the same parent View from frame 1, React preserves
        its state and animations perfectly when AppShell mounts!
      */}
      {themeLoaded && <AppShell />}
      {showSplash && (
        <IntroScreen
          isThemeReady={themeLoaded && fontsLoaded}
          onFinish={handleSplashFinish}
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppBoot />
    </SafeAreaProvider>
  );
}
