import { Linking, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { PROMPTS as PROMPTS_ORIGINAL } from './prompts';

export { PROMPTS_ORIGINAL as PROMPTS };

export type AIService = 'chatgpt' | 'gemini' | 'claude';

export const AI_SERVICE_META: Record<AIService, { name: string; nameAr: string; description: string; descriptionAr: string }> = {
  chatgpt: {
    name: 'ChatGPT',
    nameAr: 'ChatGPT',
    description: 'Copies prompt, then opens app',
    descriptionAr: 'ينسخ البرومت ثم يفتح التطبيق',
  },
  gemini: {
    name: 'Gemini',
    nameAr: 'جيميناي',
    description: 'Copies prompt, then opens app',
    descriptionAr: 'ينسخ البرومت ثم يفتح التطبيق',
  },
  claude: {
    name: 'Claude',
    nameAr: 'Claude',
    description: 'Copies prompt, then opens app',
    descriptionAr: 'ينسخ البرومت ثم يفتح التطبيق',
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

async function tryOpen(appUrl: string, fallbackUrl: string): Promise<void> {
  try {
    const canOpen = await Linking.canOpenURL(appUrl);
    if (canOpen) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(fallbackUrl);
    }
  } catch {
    await Linking.openURL(fallbackUrl);
  }
}

// ── Main function ─────────────────────────────────────────────────────────────

export async function openWithAI(prompt: string, service: AIService): Promise<void> {
  // Always copy the prompt to clipboard first — all services need a paste
  await Clipboard.setStringAsync(prompt);

  if (service === 'chatgpt') {
    // chatgpt:// opens the app but cannot pre-fill text — user pastes manually
    // iOS: chatgpt:// scheme is registered by the official app
    // Android: com.openai.chat via intent
    if (Platform.OS === 'android') {
      const intentUrl = 'intent://chat.openai.com#Intent;scheme=https;package=com.openai.androidapp;end';
      await tryOpen(intentUrl, 'https://chatgpt.com');
    } else {
      await tryOpen('chatgpt://', 'https://chatgpt.com');
    }
  } else if (service === 'gemini') {
    // Gemini has no official public URL scheme for iOS.
    // Android: use intent to open the Bard/Gemini package directly.
    // iOS: fall back to universal link which opens in app if installed.
    if (Platform.OS === 'android') {
      const intentUrl = 'intent://#Intent;scheme=https;package=com.google.android.apps.bard;end';
      await tryOpen(intentUrl, 'https://gemini.google.com/app');
    } else {
      // On iOS, universal links: if app installed, iOS routes this to the app
      await Linking.openURL('https://gemini.google.com/app');
    }
  } else if (service === 'claude') {
    // claude:// is a registered scheme on iOS by the official Claude app.
    // The "new chat" route with ?q= can pre-fill the composer.
    // Note: requires Claude Code access for the code route; plain claude:// opens home.
    const encodedPrompt = encodeURIComponent(prompt);
    if (Platform.OS === 'android') {
      const intentUrl = `intent://claude.ai#Intent;scheme=https;package=com.anthropic.claude;end`;
      await tryOpen(intentUrl, 'https://claude.ai');
    } else {
      // Try new chat with prompt pre-filled (works if Claude Code available)
      const deepLink = `claude://new?q=${encodedPrompt}`;
      await tryOpen(deepLink, `https://claude.ai`);
    }
  }
}