import { Button } from "@/components/ui/Button";
import { useRechargeStore } from "@/store/rechargeStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DatetimeInput } from "@/components/ui/DatetimeInput";
import { useTheme } from "@/hooks/useTheme";

export default function DatePicker() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { targetDateTs, setTargetDateTs } = useRechargeStore()
  const router = useRouter()

  const colors = useTheme()

  useEffect(() => {
    if (targetDateTs === 0) {
      setTargetDateTs(tomorrow.getTime());
    }
  }, [])

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.baseContent }]}>
          Selecciona la fecha en la que deseas que se realice la recarga
        </Text>
        <DatetimeInput
          label=""
          value={new Date(targetDateTs)}
          onChange={(date) => setTargetDateTs(date.getTime())}
          style={{width: '100%'}}
          inputStyle={styles.input}
          inputTextStyle={styles.inputText}
          minDate={tomorrow}
        />
      </View>

      <View style={styles.stepperActionsContainer}>
        <Button
          text="Siguiente"
          onClick={() => router.navigate('/recharge/summary')}
        />
        <Button
          text="Anterior"
          onClick={() => router.back()}
          color='medium'
        />
      </View>
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 20,
  },
  input: {
    height: 70,
    borderRadius: 12,
  },
  inputText: {
    fontSize: 26,
    textAlign: 'center',
  },
  stepperActionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    width: '100%',
  },
})
