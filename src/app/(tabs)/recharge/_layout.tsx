import { Colors, Spacing } from "@/constants/theme";
import { Stepper } from "@/components/ui/Stepper";
import { useRechargeStore } from "@/store/rechargeStore";
import { Slot, usePathname } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemedView } from "@/components/ThemedView";

const normalSteps = [
  { name: 'Número celular' },
  { name: 'Compañía telefónica' },
  { name: 'Monto de recarga' },
  { name: 'Resumen' },
]

const scheduledSteps = [
  { name: 'Número celular' },
  { name: 'Compañía telefónica' },
  { name: 'Monto de recarga' },
  { name: 'Fecha de recarga' },
  { name: 'Resumen' },
]

const normalRouteOrder = [
  '/recharge',
  '/recharge/carrier-selection',
  '/recharge/amount-selection',
  '/recharge/summary',
]

const scheduledRouteOrder = [
  '/recharge',
  '/recharge/carrier-selection',
  '/recharge/amount-selection',
  '/recharge/date-picker',
  '/recharge/summary',
]

export default function RechargeLayout() {
  const safeAreaInsets = useSafeAreaInsets();
  const contentContainerStyle = Platform.select({
    android: {
      paddingTop: safeAreaInsets.top,
      paddingLeft: safeAreaInsets.left,
      paddingRight: safeAreaInsets.right,
    }
  });

  const theme = useTheme();
  const pathname = usePathname();
  const { isScheduledRecharge } = useRechargeStore()

  const routeOrder = isScheduledRecharge ? scheduledRouteOrder : normalRouteOrder
  const steps = isScheduledRecharge ? scheduledSteps : normalSteps
  const currentStep = Math.max(0, routeOrder.indexOf(pathname))

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.base100 }}
        contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        contentInset={safeAreaInsets}
      >
        <ThemedView style={styles.container}>
          <View>
            <Stepper steps={steps} currentStep={currentStep} />

            {isScheduledRecharge && (
              <View style={styles.scheduledBadge}>
                <Text style={styles.scheduledBadgeText}>Proceso: Recarga Programada</Text>
              </View>
            )}
          </View>

          <Slot />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    justifyContent: 'space-between',
  },
  scheduledBadge: {
    alignSelf: 'center',
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 99,
    marginTop: Spacing.two,
  },
  scheduledBadgeText: {
    color: Colors.light.secondaryContent,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
