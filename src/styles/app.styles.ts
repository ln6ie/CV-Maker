import { StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/tokens';

export const FLOATING_HEADER_HEIGHT = 110;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  floatingHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
  },
  floatingBlur: {
    overflow: 'hidden',
    borderBottomLeftRadius: BORDER_RADIUS.xl,
    borderBottomRightRadius: BORDER_RADIUS.xl,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  stepperInsetCard: {
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  stepperTrack: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  stepIndicator: {
    flex: 1,
    height: 4,
    borderRadius: BORDER_RADIUS.sm,
  },

  experienceSubCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.sm,
  },
  addButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '800',
    letterSpacing: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  actionSheetContainer: {
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    // Do NOT use alignItems: 'center' — it collapses children widths
    // and prevents adjustsFontSizeToFit from having a boundary to measure.
    alignItems: 'stretch',
  },
  sheetTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: SPACING.md,
    // width: '100%' ensures adjustsFontSizeToFit has a bounded box to shrink into.
    width: '100%',
    textAlign: 'center',
  },
  sheetButton: {
    width: '100%',
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sheetButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '700',
    // width: '100%' gives adjustsFontSizeToFit a definite boundary.
    width: '100%',
    textAlign: 'center',
  },
  cancelButton: {
    width: '100%',
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '800',
    width: '100%',
    textAlign: 'center',
  },
});
