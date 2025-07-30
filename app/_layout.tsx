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
        //tabBarActiveTintColor: colorSchema.light.primary,
        headerStyle: {
          backgroundColor: colorSchema.light.base100,
          //height: 110,
        },
        headerShadowVisible: false,
        headerTintColor: colorSchema.light.baseContent,
        /* tabBarStyle: {
          backgroundColor: colorSchema.light.base100,
          height: 60,
          paddingTop: 4,
        }, */
      }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(features)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
