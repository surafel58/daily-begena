import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, colors, spacing, typography } from '../../src/shared/ui';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

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

      {/* About the App */}
      <Card style={styles.card} pressable={false}>
        <Text style={styles.cardTitle}>About Daily Begena</Text>
        <Text style={styles.aboutText}>
          Daily Begena is a practice coach designed to help you build
          consistent Begena playing habits. Complete a short daily session —
          tune your strings, run a finger drill with a metronome, and test
          your ear — all in under 15 minutes.
        </Text>
        <Text style={styles.aboutText}>
          Track your streak, watch your timing improve, and grow your
          confidence one session at a time.
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
    paddingBottom: spacing['4xl'],
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
  aboutText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.md,
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
