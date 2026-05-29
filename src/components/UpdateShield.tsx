import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCVContext } from '../context/CVContext';
import { getFontFamily } from '../constants/tokens';
import { RaqeemLogo } from './RaqeemLogo';

export const UpdateShield = () => {
  const { remoteConfig, versionBlocked, updateAvailable, isDarkMode, isRTL, theme } = useCVContext();
  const insets = useSafeAreaInsets();
  const [dismissed, setDismissed] = useState(false);

  if (!remoteConfig) return null;
  if (dismissed) return null;

  const showShield = versionBlocked || updateAvailable;
  if (!showShield) return null;

  const isForced = versionBlocked;
  const cfg = remoteConfig;
  const features = isRTL ? cfg.features.ar : cfg.features.en;

  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: 99999, backgroundColor: theme.background }]} pointerEvents="auto">
      <StatusBar translucent barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

      {!isForced && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setDismissed(true)}
          style={{
            position: 'absolute',
            top: insets.top + 16,
            right: isRTL ? undefined : 20,
            left: isRTL ? 20 : undefined,
            width: 40,
            height: 40,
            borderRadius: 9999,
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100000,
          }}
        >
          <Ionicons name="close-outline" size={22} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
      )}

      <View style={styles.container}>
        <View style={styles.logoSection}>
          <RaqeemLogo
            width={240}
            height={200}
            isDarkMode={isDarkMode}
            layout="vertical"
          />
        </View>

        <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000', fontFamily: getFontFamily(isRTL, 900) }]}>
          {isRTL ? 'يتوفر تحديث جديد' : 'New Update Available'}
        </Text>

        <Text style={[styles.versionLabel, { color: theme.accent, fontFamily: getFontFamily(isRTL, 800) }]}>
          {isRTL ? `الإصدار ${cfg.latestVersion}` : `Version ${cfg.latestVersion}`}
        </Text>

        {features.length > 0 && (
          <View style={styles.featuresContainer}>
            {features.map((f, i) => (
              <View key={i} style={[styles.featureRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <View style={[styles.bullet, { backgroundColor: theme.accent }]} />
                <Text style={[styles.featureText, { color: isDarkMode ? '#EBEBF5' : '#3C3C43', fontFamily: getFontFamily(isRTL, 400) }]}>
                  {f}
                </Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.actionButton, { backgroundColor: theme.accent, shadowColor: theme.accent }]}
          onPress={() => Linking.openURL(cfg.updateUrl).catch(() => {})}
        >
          <Ionicons name="cloud-download-outline" size={20} color="#FFFFFF" />
          <Text style={[styles.actionButtonText, { fontFamily: getFontFamily(isRTL, 800) }]}>
            {isRTL ? 'تحديث الآن' : 'Update Now'}
          </Text>
        </TouchableOpacity>

        {!isForced && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setDismissed(true)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.laterText, { color: isDarkMode ? '#636366' : '#8E8E93', fontFamily: getFontFamily(isRTL, 400) }]}>
              {isRTL ? 'ربما لاحقاً' : 'Maybe Later'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  logoSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 8,
  },
  versionLabel: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
    marginBottom: 28,
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    maxWidth: 340,
    marginBottom: 36,
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    flexShrink: 0,
  },
  featureText: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    flex: 1,
  },
  actionButton: {
    width: '100%',
    maxWidth: 340,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 9999,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  laterText: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
});
