import { useRechargeStore } from "@/store/rechargeStore";
import { Stack } from "expo-router";

export default function FeaturesLayout() {

  const { isScheduledRecharge } = useRechargeStore();

  return (
    <>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="recharge" options={{ title: isScheduledRecharge ? 'Programar Recarga' : 'Recargar Celular' }} />
        <Stack.Screen name="scheduled-recharges" options={{ title: 'Recargas Programadas' }} />
        <Stack.Screen name="reports" options={{ title: 'Reportes' }} />
      </Stack>
    </>
  );
}