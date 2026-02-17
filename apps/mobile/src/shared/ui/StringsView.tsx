import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useCallback } from 'react';
import { colors } from './theme';

const TOTAL_STRINGS = 10;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface StringsViewProps {
  activeStrings?: number[];
  highlightedString?: number | null;
  highlightColor?: string;
  onStringPress?: (stringNumber: number) => void;
  interactive?: boolean;
}

function BegenaString({
  stringNumber,
  isActive,
  highlightColor,
  isHighlighted,
  onPress,
  interactive,
}: {
  stringNumber: number;
  isActive: boolean;
  highlightColor?: string;
  isHighlighted: boolean;
  onPress?: () => void;
  interactive: boolean;
}) {
  const vibration = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: isActive ? 3 + vibration.value : 1.5,
    backgroundColor: isHighlighted
      ? highlightColor || colors.goldBright
      : isActive
        ? colors.goldMuted
        : colors.stringInactive,
    shadowColor: isActive ? colors.goldMuted : colors.transparent,
    shadowOpacity: isActive ? 0.6 : 0,
    shadowRadius: isActive ? 8 : 0,
  }));

  const triggerVibration = useCallback(() => {
    vibration.value = withRepeat(
      withSequence(
        withTiming(2, { duration: 30, easing: Easing.inOut(Easing.sin) }),
        withTiming(-2, { duration: 30, easing: Easing.inOut(Easing.sin) }),
      ),
      6,
      true,
    );
    vibration.value = withSequence(
      withRepeat(
        withSequence(
          withTiming(2, { duration: 30, easing: Easing.inOut(Easing.sin) }),
          withTiming(-2, { duration: 30, easing: Easing.inOut(Easing.sin) }),
        ),
        6,
        true,
      ),
      withTiming(0, { duration: 100 }),
    );
  }, [vibration]);

  const handlePress = () => {
    if (!interactive) return;
    triggerVibration();
    onPress?.();
  };

  return (
    <Animated.View
      style={[styles.string, animatedStyle]}
      onTouchEnd={handlePress}
    />
  );
}

export function StringsView({
  activeStrings = [],
  highlightedString = null,
  highlightColor,
  onStringPress,
  interactive = false,
}: StringsViewProps) {
  const stringSpacing = SCREEN_WIDTH / (TOTAL_STRINGS + 1);

  return (
    <View style={styles.container}>
      {Array.from({ length: TOTAL_STRINGS }, (_, i) => {
        const stringNum = i + 1;
        return (
          <BegenaString
            key={stringNum}
            stringNumber={stringNum}
            isActive={activeStrings.includes(stringNum)}
            isHighlighted={highlightedString === stringNum}
            highlightColor={highlightColor}
            onPress={() => onStringPress?.(stringNum)}
            interactive={interactive}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    paddingHorizontal: 20,
  },
  string: {
    height: '100%',
    borderRadius: 1,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
});
