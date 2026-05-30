import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCVContext } from '../context/CVContext';
import { CVSummary, CVData } from '../types/cv';
import { SPACING, getFontFamily } from '../constants/tokens';
import { DEFAULT_CV } from '../constants/defaultCV';
import { SheetHeader } from './SheetHeader';

const CV_LIST_KEY = '@Raqeem_CV_List';
const CV_DATA_PREFIX = '@Raqeem_CV_Data_';

export const CVManager = () => {
  const { cvData, isDarkMode, isRTL, theme, t, importCVData, isCVManagerVisible, handleCloseCVManager } = useCVContext();
  const [cvList, setCvList] = useState<CVSummary[]>([]);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState('');
  const [loading, setLoading] = useState(false);

  const loadCVList = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(CV_LIST_KEY);
      const list: CVSummary[] = raw ? JSON.parse(raw) : [];
      setCvList(list);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isCVManagerVisible) loadCVList();
  }, [isCVManagerVisible, loadCVList]);

  const saveCVList = async (list: CVSummary[]) => {
    await AsyncStorage.setItem(CV_LIST_KEY, JSON.stringify(list));
    setCvList(list);
  };

  const saveCurrentCV = async (id: string, name: string) => {
    await AsyncStorage.setItem(CV_DATA_PREFIX + id, JSON.stringify({ ...cvData }));
  };

  const loadCVById = async (id: string) => {
    try {
      const raw = await AsyncStorage.getItem(CV_DATA_PREFIX + id);
      if (raw) {
        const data: CVData = JSON.parse(raw);
        importCVData(data);
      }
    } catch {}
  };

  const handleCreateNew = async () => {
    const id = Date.now().toString();
    const name = isRTL ? 'سيرة جديدة' : 'New CV';
    const summary: CVSummary = { id, name, updatedAt: Date.now(), template: 'classic' };
    const newList = [...cvList, summary];
    await saveCVList(newList);
    await saveCurrentCV(id, name);
    importCVData(DEFAULT_CV);
    handleCloseCVManager();
  };

  const handleSelect = async (id: string) => {
    const currentSummary = cvList.find(c => c.id === id);
    if (currentSummary) {
      await saveCurrentCV(id, currentSummary.name);
    }
    await loadCVById(id);
    handleCloseCVManager();
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      t.cvManager.delete,
      t.cvManager.confirmDelete,
      [
        { text: t.buttons.close, style: 'cancel' as const },
        {
          text: t.cvManager.delete,
          style: 'destructive' as const,
          onPress: async () => {
            const newList = cvList.filter(c => c.id !== id);
            await saveCVList(newList);
            await AsyncStorage.removeItem(CV_DATA_PREFIX + id);
            if (newList.length > 0) {
              await loadCVById(newList[0].id);
            } else {
              importCVData(DEFAULT_CV);
            }
          },
        },
      ]
    );
  };

  const handleDuplicate = async (id: string) => {
    const source = cvList.find(c => c.id === id);
    if (!source) return;
    const newId = Date.now().toString();
    const newName = `${source.name} (${isRTL ? 'نسخة' : 'Copy'})`;
    const summary: CVSummary = { id: newId, name: newName, updatedAt: Date.now(), template: source.template };
    try {
      const raw = await AsyncStorage.getItem(CV_DATA_PREFIX + id);
      if (raw) {
        await AsyncStorage.setItem(CV_DATA_PREFIX + newId, raw);
      }
    } catch {}
    const newList = [...cvList, summary];
    await saveCVList(newList);
  };

  const handleRename = async (id: string) => {
    if (!renameText.trim()) return;
    const newList = cvList.map(c => c.id === id ? { ...c, name: renameText.trim() } : c);
    await saveCVList(newList);
    setRenamingId(null);
    setRenameText('');
  };

  return (
    <Modal
      visible={isCVManagerVisible}
      transparent={Platform.OS === 'android'}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
      onDismiss={() => handleCloseCVManager()}
      onRequestClose={() => handleCloseCVManager()}
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
            onPress={() => handleCloseCVManager()}
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
          <SheetHeader title={t.cvManager.title} onClose={() => handleCloseCVManager()} isRTL={isRTL} isDarkMode={isDarkMode} theme={theme} showGrabber />

          {loading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color={theme.accent} />
            </View>
          ) : (
            <ScrollView style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={handleCreateNew}
                style={{
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  gap: 10,
                  borderRadius: 14,
                  backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.03)',
                  borderWidth: 0.5,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  marginBottom: SPACING.md,
                }}
              >
                <View style={{
                  width: 36, height: 36, borderRadius: 18,
                  backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center',
                }}>
                  <Ionicons name="add" size={20} color="#FFFFFF" />
                </View>
                <Text style={{
                  fontSize: 15, fontWeight: '600', color: theme.accent,
                  fontFamily: getFontFamily(isRTL, 600),
                }}>
                  {t.cvManager.newCV}
                </Text>
              </TouchableOpacity>

              {cvList.map((cv) => (
                <TouchableOpacity
                  key={cv.id}
                  onPress={() => handleSelect(cv.id)}
                  style={{
                    borderRadius: 14,
                    backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.03)',
                    borderWidth: 0.5,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    marginBottom: 10,
                  }}
                >
                  {renamingId === cv.id ? (
                    <TextInput
                      value={renameText}
                      onChangeText={setRenameText}
                      onSubmitEditing={() => handleRename(cv.id)}
                      onBlur={() => { setRenamingId(null); setRenameText(''); }}
                      autoFocus
                      style={{
                        fontSize: 15,
                        color: theme.textPrimary,
                        fontFamily: getFontFamily(isRTL, 600),
                        borderBottomWidth: 1,
                        borderBottomColor: theme.accent,
                        paddingVertical: 2,
                        textAlign: isRTL ? 'right' : 'left',
                      }}
                      placeholderTextColor={theme.placeholderText}
                    />
                  ) : (
                    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
                      <Ionicons name="document-text" size={20} color={theme.accent} style={{ marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }} />
                      <Text style={{
                        flex: 1,
                        fontSize: 15,
                        fontWeight: '600',
                        color: theme.textPrimary,
                        fontFamily: getFontFamily(isRTL, 600),
                        textAlign: isRTL ? 'right' : 'left',
                      }}>
                        {cv.name}
                      </Text>
                      <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: 6 }}>
                        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          onPress={() => { setRenamingId(cv.id); setRenameText(cv.name); }}>
                          <Ionicons name="pencil-outline" size={16} color={theme.textSecondary} />
                        </TouchableOpacity>
                        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          onPress={() => handleDuplicate(cv.id)}>
                          <Ionicons name="copy-outline" size={16} color={theme.textSecondary} />
                        </TouchableOpacity>
                        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          onPress={() => handleDelete(cv.id)}>
                          <Ionicons name="trash-outline" size={16} color={theme.error} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};