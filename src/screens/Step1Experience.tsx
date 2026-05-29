import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';
import { SectionCard } from '../components/SectionCard';
import { sharedStyles } from '../styles/shared.styles';
import { SPACING, getFontFamily } from '../constants/tokens';

export const Step1Experience = () => {
  const {
    cvData, updateWorkExperience, updateWorkExperienceTask,
    addWorkExperienceTask, addWorkExperience, removeWorkExperience,
    theme, isRTL, isDarkMode, t,
  } = useCVContext();

  const rtlRow = isRTL ? { flexDirection: 'row-reverse' as const } : { flexDirection: 'row' as const };
  const textAlign = isRTL ? 'right' : 'left';

  return (
    <View style={{ gap: SPACING.md }}>
      {cvData.workExperience.length === 0 && (
        <SectionCard
          title={`${t.steps.experience} (0)`}
          theme={theme} isRTL={isRTL} isDarkMode={isDarkMode}
        >
          <Text style={{ color: theme.textSecondary, textAlign: 'center', marginVertical: SPACING.lg, fontFamily: getFontFamily(isRTL, 400) }}>
            No experience entries yet. Add one below.
          </Text>
        </SectionCard>
      )}

      {cvData.workExperience.map((exp, expIdx) => {
        const cardContent = (
          <View key={`exp-inner-${expIdx}`}>
            <View style={[rtlRow, { justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md }]}>
              <Text style={{ color: theme.accent, fontSize: 13, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: getFontFamily(isRTL, 800) }}>
                {isRTL ? `الخبرة المهنية #${expIdx + 1}` : `Work Experience #${expIdx + 1}`}
              </Text>
              {cvData.workExperience.length > 1 && (
                <TouchableOpacity
                  style={[sharedStyles.removeButton, { backgroundColor: isDarkMode ? 'rgba(255,69,58,0.15)' : 'rgba(255,59,48,0.08)' }]}
                  onPress={() => removeWorkExperience(expIdx)}
                >
                  <Ionicons name="trash-outline" size={16} color={theme.error} />
                </TouchableOpacity>
              )}
            </View>

            <GlassInput label="Job Title" value={exp.jobTitle} onChangeText={(v: string) => updateWorkExperience(expIdx, 'jobTitle', v)} placeholder="e.g. Software Engineer" isDarkMode={isDarkMode} isRTL={isRTL} />
            <GlassInput label="Company / Location" value={exp.companyLocation} onChangeText={(v: string) => updateWorkExperience(expIdx, 'companyLocation', v)} placeholder="e.g. Tech Corp - New York" isDarkMode={isDarkMode} isRTL={isRTL} />
            <GlassInput label="Date Range" value={exp.dateRange} onChangeText={(v: string) => updateWorkExperience(expIdx, 'dateRange', v)} placeholder="e.g. Jan 2020 - Present" isDarkMode={isDarkMode} isRTL={isRTL} />

            <Text style={{
              color: theme.textSecondary, fontSize: 12, fontWeight: '700', letterSpacing: 0.5,
              marginBottom: SPACING.xs, paddingHorizontal: 4, textTransform: 'uppercase',
              textAlign, fontFamily: getFontFamily(isRTL, 700),
            }}>
              {isRTL ? 'المهام والإنجازات الرئيسية' : 'Main Tasks & Achievements'}
            </Text>

            {exp.mainTasks.map((task, taskIdx) => (
              <GlassInput key={`t-${expIdx}-${taskIdx}`} label={`Task ${taskIdx + 1}`} value={task}
                onChangeText={(v: string) => updateWorkExperienceTask(expIdx, taskIdx, v)}
                placeholder="Describe a responsibility or achievement" isDarkMode={isDarkMode} isRTL={isRTL} multiline numberOfLines={2}
              />
            ))}

            <TouchableOpacity
              style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: SPACING.xs, paddingVertical: SPACING.sm }}
              onPress={() => addWorkExperienceTask(expIdx)}
            >
              <Ionicons name="add-circle-outline" size={18} color={theme.accent} />
              <Text style={{ color: theme.accent, fontSize: 13, fontWeight: '700', fontFamily: getFontFamily(isRTL, 700) }}>
                {isRTL ? 'إضافة مهمة' : 'Add Task'}
              </Text>
            </TouchableOpacity>
          </View>
        );

        if (expIdx === 0) {
          return (
            <SectionCard
              key={`exp-card-${expIdx}`}
              title={`${t.steps.experience} (${cvData.workExperience.length})`}
              theme={theme} isRTL={isRTL} isDarkMode={isDarkMode}
            >
              {cardContent}
            </SectionCard>
          );
        }

        return (
          <View
            key={`exp-card-${expIdx}`}
            style={[
              isDarkMode
                ? { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder, borderWidth: 1 }
                : {
                    backgroundColor: theme.cardBackground,
                    shadowColor: '#000',
                    shadowOpacity: 0.04,
                    shadowRadius: 16,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 2,
                  },
              { borderRadius: 20, padding: SPACING.md },
            ]}
          >
            {cardContent}
          </View>
        );
      })}

      <TouchableOpacity 
        style={[
          sharedStyles.addButton, 
          { 
            backgroundColor: theme.accent, 
            borderRadius: 14, 
            paddingVertical: 14, 
            shadowColor: theme.accent,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 3,
            marginTop: SPACING.xs,
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
    </View>
  );
};
