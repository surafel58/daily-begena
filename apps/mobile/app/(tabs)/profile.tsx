import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, colors, spacing, typography } from '../../src/shared/ui';

type NumberingScheme = 'standard' | 'traditional';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [numberingScheme, setNumberingScheme] = useState<NumberingScheme>('standard');

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + spacing.lg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Profile</Text>

      {/* Level Preset */}
      <Card style={styles.card} pressable={false}>
        <Text style={styles.cardTitle}>Level Preset</Text>
        <View style={styles.presetRow}>
          <View style={styles.presetBadge}>
            <Text style={styles.presetNumber}>1</Text>
          </View>
          <View style={styles.presetInfo}>
            <Text style={styles.presetName}>Beginner</Text>
            <Text style={styles.presetDesc}>
              2-3 strings · Basic patterns · Slow tempo
            </Text>
          </View>
        </View>
        <Text style={styles.lockedNote}>
          More levels coming in future updates
        </Text>
      </Card>

      {/* String Numbering Scheme */}
      <Card style={styles.card} pressable={false}>
        <Text style={styles.cardTitle}>String Numbering</Text>
        <Text style={styles.numberingDesc}>
          Choose how strings are labeled during practice
        </Text>
        <View style={styles.toggleRow}>
          <Pressable
            style={[
              styles.toggleOption,
              numberingScheme === 'standard' && styles.toggleActive,
            ]}
            onPress={() => setNumberingScheme('standard')}
          >
            <Text
              style={[
                styles.toggleText,
                numberingScheme === 'standard' && styles.toggleTextActive,
              ]}
            >
              Standard (1-10)
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.toggleOption,
              numberingScheme === 'traditional' && styles.toggleActive,
            ]}
            onPress={() => setNumberingScheme('traditional')}
          >
            <Text
              style={[
                styles.toggleText,
                numberingScheme === 'traditional' && styles.toggleTextActive,
              ]}
            >
              Traditional
            </Text>
          </Pressable>
        </View>
      </Card>

      {/* About the App */}
      <Card style={styles.card} pressable={false}>
        <Text style={styles.cardTitle}>About Daily Begena</Text>
        <Text style={styles.aboutText}>
          The Begena (በገና) is a sacred 10-string box lyre used in Ethiopian
          Orthodox devotional music. Daily Begena is a practice coach that helps
          you build consistent playing habits through short daily sessions —
          tune, drill, and train your ear.
        </Text>
      </Card>

      {/* App Info */}
      <Card style={styles.card} pressable={false}>
        <Text style={styles.cardTitle}>App Info</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Build</Text>
          <Text style={styles.infoValue}>Milestone 1</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Platform</Text>
          <Text style={styles.infoValue}>Android</Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing['2xl'],
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    ...typography.body,
    color: colors.goldMuted,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  presetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  presetBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetNumber: {
    ...typography.title,
    color: colors.textPrimary,
  },
  presetInfo: {
    flex: 1,
  },
  presetName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  presetDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  lockedNote: {
    ...typography.small,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  numberingDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  toggleActive: {
    borderColor: colors.goldMuted,
    backgroundColor: 'rgba(212, 163, 115, 0.1)',
  },
  toggleText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: colors.goldMuted,
  },
  aboutText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  infoValue: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceLight,
  },
});
