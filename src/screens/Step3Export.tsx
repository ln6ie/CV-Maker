import React from 'react';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';
import { SectionCard } from '../components/SectionCard';
import { ExportButton } from '../components/ExportButton';

export const Step3Export = () => {
  const { cvData, handleUpdateLanguage, handleExportAction, handleReShare, exportStatus, theme, isRTL, isDarkMode, t } = useCVContext();
  return (
    <>
      <SectionCard title={t.steps.language} theme={theme} isRTL={isRTL} isDarkMode={isDarkMode}>
        <GlassInput label={t.labels.arabicLevel} value={cvData.languages[0]?.level || ''}
          onChangeText={(v: string) => handleUpdateLanguage(0, v)} placeholder={t.labels.arabicLevel}
          isDarkMode={isDarkMode} isRTL={isRTL} />
        <GlassInput label={t.labels.englishLevel} value={cvData.languages[1]?.level || ''}
          onChangeText={(v: string) => handleUpdateLanguage(1, v)} placeholder={t.labels.englishLevel}
          isDarkMode={isDarkMode} isRTL={isRTL} />
      </SectionCard>
      <SectionCard title="Export PDF" theme={theme} isRTL={isRTL} isDarkMode={isDarkMode}>
        <ExportButton theme={theme} isRTL={isRTL} t={t} exportStatus={exportStatus}
          onPress={handleExportAction} onReShare={handleReShare} />
      </SectionCard>
    </>
  );
};
