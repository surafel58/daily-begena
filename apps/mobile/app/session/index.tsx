import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Button, colors, spacing, typography } from '../../src/shared/ui';

const steps = [
  {
    number: 1,
    title: 'Quick Tune',
    description: 'Tune today\'s strings with reference tones',
    icon: '🎵',
  },
  {
    number: 2,
    title: 'Finger Drill',
    description: 'Pattern practice with tempo ramp',
    icon: '🎯',
  },
  {
    number: 3,
    title: 'Ear Check',
    description: 'Identify strings by sound',
    icon: '👂',
  },
];

export default function SessionOverviewScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing['3xl'] }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Today's Session</Text>
        <Text style={styles.subtitle}>3 steps · Strings 1 & 3</Text>
      </View>

      {/* Steps */}
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={step.number}>
            <Card style={styles.stepCard} pressable={false}>
              <View style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.number}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.description}</Text>
                </View>
                <Text style={styles.stepIcon}>{step.icon}</Text>
              </View>
            </Card>
            {index < steps.length - 1 && (
              <View style={styles.connector}>
                <View style={styles.connectorLine} />
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Begin Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Button
          label="Begin"
          onPress={() => router.push('/session/tune')}
          variant="primary"
          style={styles.beginButton}
        />
        <Button
          label="Back"
          onPress={() => router.back()}
          variant="outline"
          style={styles.backButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.xl,
  },
  header: {
    marginBottom: spacing['3xl'],
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  stepsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  stepCard: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  stepDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  stepIcon: {
    fontSize: 24,
  },
  connector: {
    alignItems: 'center',
    height: 24,
  },
  connectorLine: {
    width: 2,
    height: '100%',
    backgroundColor: colors.surfaceLight,
  },
  footer: {
    gap: spacing.md,
  },
  beginButton: {
    width: '100%',
  },
  backButton: {
    width: '100%',
  },
});
