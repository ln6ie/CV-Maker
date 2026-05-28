import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

/**
 * Minimalist procedural introductory splash screen.
 * Displays the high-end Royal Blue continuous curve gear box logo.
 */
export const Splash = () => {
  return (
    <SafeAreaView style={styles.splashRoot}>
      <StatusBar style="light" />
      <View style={styles.splashLogoContainer}>
        <View style={styles.splashLogoBox}>
          <Text style={styles.splashLogoText}>CV</Text>
        </View>
        <Text style={styles.splashSub}>A4 PROFESSIONAL BUILDER</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  splashRoot: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogoContainer: {
    alignItems: 'center',
  },
  splashLogoBox: {
    backgroundColor: '#002060',
    width: 90,
    height: 90,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#002060',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  splashLogoText: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1,
  },
  splashSub: {
    color: '#8E8E93',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 20,
  },
});
