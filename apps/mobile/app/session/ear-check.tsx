import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../src/shared/ui';

const TOTAL_STRINGS = 10;
const TODAY_STRINGS = [1, 3];

type RoundState = 'listening' | 'answered';

export default function EarCheckScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentRound, setCurrentRound] = useState(0);
  const [roundState, setRoundState] = useState<RoundState>('listening');
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedString, setSelectedString] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalRounds = TODAY_STRINGS.length;
  const targetString = TODAY_STRINGS[currentRound];

  const playSound = useCallback(() => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1500);
  }, []);

  const handleStringPress = useCallback((stringNum: number) => {
    if (roundState !== 'listening') return;

    setSelectedString(stringNum);
    setRoundState('answered');

    const isCorrect = stringNum === targetString;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentRound < totalRounds - 1) {
        setCurrentRound((prev) => prev + 1);
        setRoundState('listening');
        setSelectedString(null);
      } else {
        router.replace('/session/results');
      }
    }, 2000);
  }, [roundState, currentRound, totalRounds, targetString]);

  const getStringColor = (stringNum: number) => {
    if (roundState !== 'answered' || selectedString === null) {
      return colors.stringInactive;
    }
    if (stringNum === targetString) return colors.goldBright;
    if (stringNum === selectedString && selectedString !== targetString) return colors.error;
    return colors.stringInactive;
  };

  const getStringWidth = (stringNum: number) => {
    if (roundState === 'answered') {
      if (stringNum === targetString) return 4;
      if (stringNum === selectedString) return 3;
    }
    return 1.5;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <Text style={styles.roundText}>
          Round {currentRound + 1} of {totalRounds}
        </Text>
        <Text style={styles.scoreText}>
          {correctCount}/{currentRound + (roundState === 'answered' ? 1 : 0)} correct
        </Text>
      </View>

      {/* Strings — full screen height, with listen button overlaid in center */}
      <View style={styles.stringsArea}>
        {Array.from({ length: TOTAL_STRINGS }, (_, i) => {
          const stringNum = i + 1;
          const stringColor = getStringColor(stringNum);
          const stringWidth = getStringWidth(stringNum);

          return (
            <View key={stringNum} style={styles.stringColumn}>
              <Pressable
                style={styles.stringTouchArea}
                onPress={() => handleStringPress(stringNum)}
                disabled={roundState !== 'listening'}
              >
                <View
                  style={[
                    styles.string,
                    {
                      width: stringWidth,
                      backgroundColor: stringColor,
                      shadowColor: stringColor !== colors.stringInactive ? stringColor : 'transparent',
                      shadowOpacity: stringColor !== colors.stringInactive ? 0.8 : 0,
                      shadowRadius: stringColor !== colors.stringInactive ? 10 : 0,
                    },
                  ]}
                />
              </Pressable>
              {/* String number */}
              <View style={[
                styles.stringLabel,
                stringColor !== colors.stringInactive && { borderColor: stringColor },
              ]}>
                <Text style={[
                  styles.stringLabelText,
                  { color: stringColor !== colors.stringInactive ? stringColor : colors.textSecondary },
                ]}>
                  {stringNum}
                </Text>
              </View>
              {/* Checkmark on correct */}
              {roundState === 'answered' && stringNum === targetString && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Center overlay: question + listen button + label */}
        <View style={styles.centerOverlay} pointerEvents="box-none">
          {roundState === 'listening' && !isPlaying && (
            <>
              <Text style={styles.promptText}>Which string was that?</Text>
              <Pressable onPress={playSound} style={styles.listenButton}>
                <Text style={styles.listenIcon}>▶</Text>
              </Pressable>
              <Text style={styles.listenLabel}>Listen</Text>
            </>
          )}
          {roundState === 'listening' && isPlaying && (
            <Text style={styles.playingText}>Playing...</Text>
          )}
          {roundState === 'answered' && selectedString === targetString && (
            <Text style={[styles.feedbackText, { color: colors.goldBright }]}>Correct!</Text>
          )}
          {roundState === 'answered' && selectedString !== targetString && (
            <View style={styles.feedbackContainer}>
              <Text style={[styles.feedbackText, { color: colors.error }]}>Not quite</Text>
              <Text style={styles.correctAnswer}>It was String {targetString}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Skip */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Pressable onPress={() => router.replace('/session/results')}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundText: {
    ...typography.caption,
    color: colors.goldBright,
  },
  scoreText: {
    ...typography.caption,
    color: colors.goldBright,
  },
  stringsArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  stringColumn: {
    flex: 1,
    alignItems: 'center',
  },
  stringTouchArea: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  string: {
    height: '100%',
    borderRadius: 1,
    elevation: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  stringLabel: {
    position: 'absolute',
    bottom: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  stringLabelText: {
    ...typography.small,
    fontWeight: 'bold',
  },
  checkmark: {
    position: 'absolute',
    top: '35%',
    backgroundColor: colors.goldBright,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Center overlay on top of strings
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  promptText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  listenButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.teal,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 10,
  },
  listenIcon: {
    fontSize: 22,
    color: colors.textPrimary,
  },
  listenLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  playingText: {
    ...typography.subtitle,
    color: colors.tealLight,
  },
  feedbackText: {
    ...typography.title,
    fontWeight: 'bold',
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    overflow: 'hidden',
  },
  feedbackContainer: {
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.lg,
    borderRadius: 16,
  },
  correctAnswer: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footer: {
    alignItems: 'center',
  },
  skipText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
