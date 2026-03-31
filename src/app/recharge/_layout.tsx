import { Colors, Spacing } from "@/constants/theme";
import { Stepper } from "@/components/ui/Stepper";
import { useRechargeStore } from "@/store/rechargeStore";
import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemedView } from "@/components/ThemedView";

const rechargeSteps = [
  {
    name: 'Número celular',
  },
  {
    name: 'Compañía telefónica',
  },
  {
    name: 'Monto de recarga',
  },
  {
    name: 'Fecha de recarga',
  },
  {
    name: 'Resumen',
  },
]

export default function RechargeLayout() {
  const safeAreaInsets = useSafeAreaInsets();
  const contentContainerStyle = Platform.select({
    android: {
      paddingTop: safeAreaInsets.top,
      paddingBottom: safeAreaInsets.bottom,
      paddingLeft: safeAreaInsets.left,
      paddingRight: safeAreaInsets.right,
    }
  });

  const theme = useTheme();

  const { currentStep, isScheduledRecharge } = useRechargeStore()

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
          <Stepper
            steps={rechargeSteps.filter((step) => step.name !== 'Fecha de recarga' || isScheduledRecharge)}
            currentStep={currentStep}
          />

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
});
