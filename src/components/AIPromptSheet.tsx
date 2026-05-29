import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useCVContext } from '../context/CVContext';
import { sharedStyles } from '../styles/shared.styles';
import { getFontFamily, SPACING } from '../constants/tokens';
import { SheetHeader } from './SheetHeader';

export const AIPromptSheet = () => {
  const {
    isAIPromptVisible,
    setIsAIPromptVisible,
    isDarkMode,
    theme,
    isRTL,
    cvData,
    importCVData,
    showSnack,
  } = useCVContext();

  const [activeTab, setActiveTab] = useState<'prompt' | 'import'>('prompt');
  const [copied, setCopied] = useState(false);
  const [jsonText, setJsonText] = useState('');

  const promptText = isRTL 
    ? `أنت خبير محترف ومستشار كتابة سير ذاتية متوافقة مع أنظمة ATS. ستقوم بإجراء مقابلة تفاعلية ذكية وسلسة معي خطوة بخطوة باللغة العربية لجمع وتنسيق تفاصيل سيرتي الذاتية بالكامل.

التعليمات الهامة:
1. اطرح عليّ سؤالاً واحداً في كل دور فقط (ابدأ بالاسم الكامل، ثم بعد أن أجيبك اسأل عن تفاصيل التواصل، ثم الملخص المهني، ثم الخبرات، ثم التعليم، ثم المهارات واللغات).
2. ساعدني في تحسين صياغة المهام والخبرات والملخص المهني لتكون قوية واحترافية ومقنعة لمسؤولي التوظيف.

💡 مثال لكيفية توسيع إجاباتي البسيطة:
إجابتي: "اشتغلت في اللحام والحدادة في ورشة خاصة من 2014 لـ 2021"
صياغتك المقترحة:
- المسمى الوظيفي: فني لحام وتشكيل معادن
- جهة العمل: ورشة أعمال ميكانيكية خاصة - البصرة، العراق
- المهام: "نفّذت عمليات لحام وتشكيل الهياكل المعدنية المعقدة بدقة متناهية وتوافق تام مع مخططات التصميم"، "أشرفت على صيانة ومراقبة جودة المنتجات الحديدية لضمان متانتها وأمانها".

3. بمجرد اكتمال جميع التفاصيل، قم بتنسيق وصياغة النتيجة النهائية ككود JSON نظيف ومطابق تماماً للبنية التالية، ولا تقم بكتابة أي نصوص تفسيرية خارج كود الـ JSON عند تسليمه لتسهيل نسخه:

{
  "fullName": "الاسم الكامل",
  "address": "العنوان بالتفصيل",
  "phone": "رقم الهاتف",
  "email": "البريد الإلكتروني",
  "summary": "ملخص مهني احترافي ومقنع لا يقل عن 20 حرفاً",
  "skills": ["مهارة 1", "مهارة 2"],
  "workExperience": [
    {
      "jobTitle": "المسمى الوظيفي",
      "companyLocation": "الشركة والمدينة",
      "dateRange": "مثال: 2019 - 2022",
      "mainTasks": [
        "إنجاز أو مهمة 1 بصيغة قوية واحترافية وبليغة",
        "إنجاز أو مهمة 2 بصيغة قوية واحترافية وبليغة"
      ]
    }
  ],
  "education": [
    {
      "degree": "المؤهل الدراسي",
      "institution": "الجامعة أو المعهد",
      "year": "سنة التخرج",
      "notes": "أي تقدير أو تفوق أكاديمي"
    }
  ],
  "courses": ["دورة تدريبية 1", "دورة تدريبية 2"],
  "languages": [
    {"name": "Arabic", "level": "مستوى اللغة العربية"},
    {"name": "English", "level": "مستوى اللغة الإنجليزية"}
  ]
}

ابدأ الآن بالترحيب بي بحرارة باسم تطبيق "رَقيم CV" واطرح السؤال الأول باللغة العربية!`
    : `You are a professional CV writing expert and ATS-compliance consultant. You will conduct a friendly, interactive step-by-step interview with me in English to gather all my professional details and help me build the perfect CV.

Important Instructions:
1. Ask me only one question at a time (start with my full name, then contact details, then professional summary, then work experience, then education, then skills/languages).
2. Help me refine and optimize the wording of my tasks, summary, and achievements so they look polished, high-impact, and appealing to recruiters.

💡 Example of how to expand my simple inputs:
My input: "I welded metal parts in a private workshop from 2014 to 2021"
Your suggested phrasing:
- Job Title: Welder and Metal Fabricator
- Location: Private Mechanical Workshop - Basra, Iraq
- Tasks: "Executed high-quality welding operations on structural steel frames, ensuring 100% adherence to design specifications", "Operated various industrial fabrication tools safely, delivering durable and custom metal works".

3. Once all information is gathered, output the final result as a clean, valid JSON block matching the structure below. Do not output any conversational text outside of the JSON block once generated:

{
  "fullName": "Full Name",
  "address": "Address Details",
  "phone": "Phone Number",
  "email": "Email Address",
  "summary": "Professional and compelling summary description",
  "skills": ["Skill 1", "Skill 2"],
  "workExperience": [
    {
      "jobTitle": "Job Title",
      "companyLocation": "Company & Location",
      "dateRange": "e.g. 2019 - 2022",
      "mainTasks": [
        "Strong, action-oriented achievement or responsibility 1",
        "Strong, action-oriented achievement or responsibility 2"
      ]
    }
  ],
  "education": [
    {
      "degree": "Degree Title",
      "institution": "University / College",
      "year": "Graduation Year",
      "notes": "Academic honors or top ranking details"
    }
  ],
  "courses": ["Course 1", "Course 2"],
  "languages": [
    {"name": "Arabic", "level": "Arabic proficiency"},
    {"name": "English", "level": "English proficiency"}
  ]
}

Start now by welcoming me warmly on behalf of "Raqeem CV" and asking the first question!`;

  const handleCopy = async () => {
    await Clipboard.setStringAsync(promptText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const handleImport = () => {
    if (!jsonText.trim()) {
      showSnack(isRTL ? "الرجاء إدخال كود الـ JSON أولاً!" : "Please paste the JSON code first!");
      return;
    }

    try {
      let cleanedText = jsonText.trim();
      
      // Auto-extract JSON inside conversational texts (between first { and last })
      const firstCurly = cleanedText.indexOf('{');
      const lastCurly = cleanedText.lastIndexOf('}');
      if (firstCurly !== -1 && lastCurly !== -1) {
        cleanedText = cleanedText.substring(firstCurly, lastCurly + 1);
      }

      const parsed = JSON.parse(cleanedText);

      // Deeply merge with safety overrides so we never lose fields or get invalid states
      const merged = {
        fullName: parsed.fullName ?? cvData.fullName,
        address: parsed.address ?? cvData.address,
        phone: parsed.phone ?? cvData.phone,
        email: parsed.email ?? cvData.email,
        summary: parsed.summary ?? cvData.summary,
        skills: Array.isArray(parsed.skills) ? parsed.skills : cvData.skills,
        courses: Array.isArray(parsed.courses) ? parsed.courses : cvData.courses,
        workExperience: Array.isArray(parsed.workExperience) ? parsed.workExperience : cvData.workExperience,
        education: Array.isArray(parsed.education) ? parsed.education : cvData.education,
        languages: Array.isArray(parsed.languages) ? parsed.languages : cvData.languages,
      };

      importCVData(merged);
      showSnack(isRTL ? " تم استيراد وتعبئة السيرة الذاتية بنجاح!" : "  Successfully importedCV data imported and populated successfully!");
      setIsAIPromptVisible(false); // Close modal
      setJsonText(''); // Reset field
    } catch (err) {
      showSnack(isRTL ? " خطأ: كود الـ JSON المدخل غير صالح" : " Error: Invalid JSON code entered");
    }
  };

  return (
    <Modal
      visible={isAIPromptVisible}
      transparent={Platform.OS === 'android'}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
      onRequestClose={() => setIsAIPromptVisible(false)}
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
            onPress={() => setIsAIPromptVisible(false)}
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
                  maxHeight: '90%',
                },
          ]}
        >
          {/* iOS Grabber */}
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

          <SheetHeader title={isRTL ? 'مساعد رقيم الذكي (AI)' : 'Raqeem AI Assistant'} onClose={() => setIsAIPromptVisible(false)} isRTL={isRTL} isDarkMode={isDarkMode} theme={theme} />

          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#E5E5EA',
              borderRadius: 9999,
              padding: 4,
              marginBottom: 20,
            }}
          >
            {([['prompt', 'sparkles', isRTL ? 'البرومبت ' : ' Prompt'] as const,
              ['import', 'cloud-download-outline', isRTL ? 'استيراد البيانات' : 'Import JSON'] as const]).map(([key, icon, label]) => {
              const isActive = activeTab === key;
              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.7}
                  style={{
                    flex: 1,
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    paddingVertical: 10,
                    borderRadius: 9999,
                    backgroundColor: isActive ? theme.cardBackground : 'transparent',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: isActive ? 0.08 : 0,
                    shadowRadius: 2,
                    elevation: isActive ? 1 : 0,
                  }}
                  onPress={() => setActiveTab(key)}
                >
                  <Ionicons name={icon} size={16} color={isActive ? theme.accent : theme.textSecondary} />
                  <Text style={{
                    color: isActive ? theme.accent : theme.textSecondary,
                    fontFamily: getFontFamily(isRTL, 800),
                    fontSize: 13,
                  }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {activeTab === 'prompt' ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
              {/* Guide Card */}
              <View
                style={{
                  backgroundColor: theme.inputBackground,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: theme.cardBorder,
                }}
              >
                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Ionicons name="sparkles" size={18} color={theme.accent} />
                  <Text style={{ color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 700), fontSize: 15 }}>
                    {isRTL ? 'كيف تستخدم مساعد رقيم الذكي؟' : 'How to use Raqeem AI Assistant?'}
                  </Text>
                </View>
                <Text style={{ color: theme.textSecondary, fontFamily: getFontFamily(isRTL, 400), fontSize: 13, lineHeight: 20, textAlign: isRTL ? 'right' : 'left' }}>
                  {isRTL
                    ? 'انسخ البرومبت المخصص أدناه، ثم قم بلصقه في أي نموذج ذكاء اصطناعي (مثل ChatGPT أو Claude أو Gemini). سيقوم الذكاء الاصطناعي بإجراء مقابلة تفاعلية ذكية معك، وتجهيز النصوص وصياغتها باحترافية كاملة، ثم سيعطيك كود جاهز يمكنك استخدامه لتعبئة سيرتك الذاتية بلمسة واحدة!'
                    : 'Copy the custom prompt below and paste it into any AI model (like ChatGPT, Claude, or Gemini). The AI will interview you interactively, write professional descriptions for your CV, and generate a clean code format you can copy and use immediately!'}
                </Text>
              </View>

              {/* Prompt View Box — tappable to copy */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleCopy}
                style={{
                  backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7',
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: theme.cardBorder,
                }}
              >
                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <Ionicons name={copied ? 'checkmark-circle' : 'copy-outline'} size={16} color={copied ? theme.success : theme.accent} />
                  <Text style={{ color: copied ? theme.success : theme.accent, fontFamily: getFontFamily(isRTL, 700), fontSize: 13 }}>
                    {copied ? (isRTL ? 'تم النسخ' : 'Copied') : (isRTL ? 'اضغط للنسخ' : 'Tap to copy')}
                  </Text>
                </View>
                <Text style={{ color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 400), fontSize: 12, lineHeight: 18, textAlign: isRTL ? 'right' : 'left' }}>
                  {promptText}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
              {/* Paste JSON Box */}
              <View style={{ position: 'relative', marginBottom: 16 }}>
                <TextInput
                  multiline
                  numberOfLines={12}
                  value={jsonText}
                  onChangeText={setJsonText}
                  placeholder={isRTL ? 'الصق كود الـ JSON أو رد الذكاء الاصطناعي هنا...' : 'Paste JSON or AI response here...'}
                  placeholderTextColor={isDarkMode ? '#636366' : '#C7C7CC'}
                  style={{
                    backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
                    color: theme.textPrimary,
                    fontFamily: getFontFamily(isRTL, 400),
                    fontSize: 13,
                    lineHeight: 18,
                    padding: 16,
                    borderRadius: 16,
                    minHeight: 200,
                    textAlignVertical: 'top',
                    textAlign: isRTL ? 'right' : 'left',
                    borderWidth: 1,
                    borderColor: theme.cardBorder,
                  }}
                />
                {!jsonText.trim() && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={async () => {
                      const text = await Clipboard.getStringAsync();
                      if (text.trim()) setJsonText(text.trim());
                    }}
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: isRTL ? undefined : 12,
                      left: isRTL ? 12 : undefined,
                      backgroundColor: theme.accent,
                      borderRadius: 9999,
                      paddingVertical: 8,
                      paddingHorizontal: 14,
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Ionicons name="clipboard-outline" size={14} color="#FFFFFF" />
                    <Text style={{ color: '#FFFFFF', fontFamily: getFontFamily(isRTL, 700), fontSize: 12 }}>
                      {isRTL ? 'لصق' : 'Paste'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleImport}
                style={{
                  backgroundColor: theme.accent,
                  borderRadius: 9999,
                  paddingVertical: 14,
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  shadowColor: theme.accent,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Ionicons name="download-outline" size={18} color="#FFFFFF" />
                <Text style={{ color: '#FFFFFF', fontFamily: getFontFamily(isRTL, 800), fontSize: 15 }}>
                  {isRTL ? 'توليد ' : 'Auto-Fill CV'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};
