import { colorSchema } from "@/assets/colorSchema";
import { Stepper } from "@/components/ui/Stepper";
import { useRechargeStore } from "@/store/rechargeStore";
import { Slot } from "expo-router";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";

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
    name: 'Resumen',
  },
]

export default function RechargeLayout() {

  const { currentStep } = useRechargeStore()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Stepper steps={rechargeSteps} currentStep={currentStep} />

          <Slot />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.light.base100,
    rowGap: 22,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
});
