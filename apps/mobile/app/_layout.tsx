import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getDatabase } from '../src/shared/db';

export default function RootLayout() {
  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a2e' },
          headerTintColor: '#e0e0e0',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#16213e' },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="session/drill"
          options={{ title: 'Finger Drill' }}
        />
        <Stack.Screen
          name="session/results"
          options={{ title: 'Results' }}
        />
      </Stack>
    </>
  );
}
