import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { requestPermissionsAsync } from 'expo-contacts';


export default function RootLayout() {
  useEffect(() => {
    (async () => {
      const { status } = await requestPermissionsAsync();
      if (status === 'granted') {

      }
    })();
  }, []);
  return (
    <>
      <StatusBar style='dark' />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
