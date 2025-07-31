import { Stack } from "expo-router";

export default function FeaturesLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="recharge" options={{ title: 'Recargar Celular' }} />
        <Stack.Screen name="reports" options={{ title: 'Reportes' }} />
      </Stack>
    </>
  );
}