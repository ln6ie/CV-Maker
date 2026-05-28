import { StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/tokens';

/**
 * Centered layout stylesheet for the CV Builder progressive wizard.
 * Uses design token constants for spacing, typography, and pill curves.
 */
export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  stepperTrack: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  stepIndicator: {
    flex: 1,
    height: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  navRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  navButton: {
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  navButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '800',
    letterSpacing: 1,
  },
  primaryButton: {
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.md,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '800',
    letterSpacing: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // iOS standard dim backdrop
    justifyContent: 'flex-end',
  },
  actionSheetContainer: {
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  sheetButton: {
    width: '100%',
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sheetButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '700',
  },
  cancelButton: {
    width: '100%',
    borderRadius: BORDER_RADIUS.xl, // Pill rounded cancels
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '800',
  },
});
