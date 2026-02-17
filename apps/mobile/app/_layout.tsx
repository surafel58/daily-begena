import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { getDatabase } from '../src/shared/db';
import { colors } from '../src/shared/ui/theme';

export default function RootLayout() {
  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="session/index"
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="session/tune"
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="session/drill"
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="session/ear-check"
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="session/results"
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
