import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { WorkExperience } from '../types/cv';
import { GlassInput } from '../components/GlassInput';
import { AIServiceSheet } from '../components/AIServiceSheet';
import { sharedStyles } from '../styles/shared.styles';
import { SPACING, getFontFamily } from '../constants/tokens';
import { PROMPTS } from '../constants/ai';

export const Step1Experience = () => {
  const {
    cvData, addWorkExperience, removeWorkExperience,
    updateWorkExperience, updateWorkExperienceTask,
    addWorkExperienceTask,
    theme, isRTL, isDarkMode, t, activeLanguage,
  } = useCVContext();

  const [aiSheetVisible, setAiSheetVisible] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const openAI = (prompt: string) => {
    setAiPrompt(prompt);
    setAiSheetVisible(true);
  };

  return (
    <View style={{ gap: SPACING.md }}>
      <Text style={{
        color: theme.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: getFontFamily(isRTL, 700),
      }}>
        {`${t.steps.experience} (${cvData.workExperience.length})`}
      </Text>

      {cvData.workExperience.length === 0 && (
        <Text style={{ color: theme.textSecondary, textAlign: 'center', marginVertical: SPACING.lg, fontFamily: getFontFamily(isRTL, 400) }}>
          No experience entries yet. Add one below.
        </Text>
      )}

      {cvData.workExperience.map((exp, expIdx) => (
        <View key={`exp-card-${expIdx}`} style={{ gap: SPACING.md }}>
          <View style={[{
            flexDirection: isRTL ? 'row-reverse' as const : 'row' as const,
            justifyContent: 'space-between',
            alignItems: 'center',
          }]}>
            <Text style={{ color: theme.accent, fontSize: 13, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: getFontFamily(isRTL, 800) }}>
              {isRTL ? `الخبرة المهنية #${expIdx + 1}` : `Work Experience #${expIdx + 1}`}
            </Text>
            {cvData.workExperience.length > 1 && (
              <TouchableOpacity onPress={() => removeWorkExperience(expIdx)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="trash-outline" size={18} color={theme.error} />
              </TouchableOpacity>
            )}
          </View>

          <GlassInput label={isRTL ? 'المسمى الوظيفي' : 'Job Title'} value={exp.jobTitle} onChangeText={(v: string) => updateWorkExperience(expIdx, 'jobTitle', v)} placeholder={t.placeholders.jobTitle} isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.jobTitle} />
          <GlassInput label={isRTL ? 'الشركة / الموقع' : 'Company / Location'} value={exp.companyLocation} onChangeText={(v: string) => updateWorkExperience(expIdx, 'companyLocation', v)} placeholder={t.placeholders.companyLocation} isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.companyLocation} />
          <GlassInput label={isRTL ? 'الفترة الزمنية' : 'Date Range'} value={exp.dateRange} onChangeText={(v: string) => updateWorkExperience(expIdx, 'dateRange', v)} placeholder={t.placeholders.dateRange} isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.dateRange} />

          <Text style={{
            color: theme.textSecondary, fontSize: 12, fontWeight: '700', letterSpacing: 0.5,
            textTransform: 'uppercase',
            textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 700),
          }}>
            {isRTL ? 'المهام والإنجازات الرئيسية' : 'Main Tasks & Achievements'}
          </Text>

          <View
            style={{
              borderRadius: 14,
              backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
              borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.03)',
              borderWidth: 0.5,
              overflow: 'hidden',
            }}
          >
            {exp.mainTasks.map((task: string, taskIdx: number) => (
              <View key={`t-${expIdx}-${taskIdx}`}>
                {taskIdx > 0 && (
                  <View
                    style={{
                      height: 0.5,
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(60,60,67,0.06)',
                    }}
                  />
                )}
                <View style={{ paddingHorizontal: SPACING.md, paddingVertical: 2 }}>
                  <GlassInput label={isRTL ? `المهمة ${taskIdx + 1}` : `Task ${taskIdx + 1}`} value={task}
                    onChangeText={(v: string) => updateWorkExperienceTask(expIdx, taskIdx, v)}
                    placeholder={t.placeholders.task} isDarkMode={isDarkMode} isRTL={isRTL} multiline numberOfLines={2}
                    noCard tip={t.tips.task}
                  />
                  {task.trim() && (
                    <TouchableOpacity
                      onPress={() => openAI(PROMPTS.task(task, exp.jobTitle || 'N/A', activeLanguage))}
                      style={{
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 4,
                        paddingVertical: 4,
                        paddingHorizontal: 4,
                      }}
                    >
                      <Ionicons name="sparkles" size={14} color={theme.accent} />
                      <Text style={{ fontSize: 11, fontWeight: '600', color: theme.accent, fontFamily: getFontFamily(isRTL, 600) }}>
                        {isRTL ? 'تحسين' : 'Improve'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: SPACING.xs, paddingVertical: 4 }}
            onPress={() => addWorkExperienceTask(expIdx)}
          >
            <Ionicons name="add-circle-outline" size={18} color={theme.accent} />
            <Text style={{ color: theme.accent, fontSize: 13, fontWeight: '700', fontFamily: getFontFamily(isRTL, 700) }}>
              {isRTL ? 'إضافة مهمة' : 'Add Task'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity 
        style={[
          sharedStyles.addButton, 
          { 
            backgroundColor: theme.accent, 
            borderRadius: 9999,
            paddingVertical: 12,
            paddingHorizontal: 20,
            shadowColor: theme.accent,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 3,
            marginTop: SPACING.xs,
            alignSelf: 'center',
            width: 'auto',
          }
        ]} 
        onPress={addWorkExperience}
      >
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: SPACING.xs }}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={[sharedStyles.addButtonText, { color: '#FFFFFF', fontFamily: getFontFamily(isRTL, 800), fontSize: 14 }]}>
            {isRTL ? 'إضافة خبرة مهنية جديدة' : 'Add New Experience'}
          </Text>
        </View>
      </TouchableOpacity>

      <AIServiceSheet
        visible={aiSheetVisible}
        onClose={() => setAiSheetVisible(false)}
        prompt={aiPrompt}
      />
    </View>
  );
};