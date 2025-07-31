import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { requestPermissionsAsync } from 'expo-contacts';
import { colorSchema } from '@/assets/colorSchema';


export default function RootLayout() {
  useEffect(() => {
    (async () => {
      await requestPermissionsAsync();
    })();
  }, []);

  return (
    <>
      <StatusBar style='dark' />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorSchema.light.base100,
          },
          headerShadowVisible: false,
          headerTintColor: colorSchema.light.baseContent,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(features)" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: 'Ajustes' }} />
        <Stack.Screen name="+not-found" options={{ title: 'No encontrado' }} />
      </Stack>
    </>
  );
}
