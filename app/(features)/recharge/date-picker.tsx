import { formatDate } from "@/utils";
import { colorSchema } from "@/assets/colorSchema";
import { Button } from "@/components/ui/Button";
import { useRechargeStore } from "@/store/rechargeStore";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function DatePicker() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { targetDateTs, setTargetDateTs } = useRechargeStore()

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date(targetDateTs);
    setTargetDateTs(currentDate.getTime());
  };

  const showStartDatepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(targetDateTs),
      onChange: onChangeDate,
      mode: 'date',
      minimumDate: tomorrow,
    });
  };

  const {
    goToPreviousStep,
    goToNextStep,
  } = useRechargeStore()
  const router = useRouter()

  const handlePreviousStep = () => {
    goToPreviousStep()
    if (router.canGoBack()) {
      router.back()
    } else {
      router.navigate('/recharge/amount-selection')
    }
  }

  const handleNextStep = () => {
    goToNextStep()
    router.navigate('/recharge/summary')
  }

  useEffect(() => {
    if (targetDateTs === 0) {
      setTargetDateTs(tomorrow.getTime());
    }
  }, [])

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>
          Selecciona la fecha en la que deseas que se realice la recarga
        </Text>
        <Pressable
          style={styles.input}
          onPress={showStartDatepicker}
        >
          <Text style={styles.inputText}>{formatDate(new Date(targetDateTs))}</Text>
        </Pressable>
      </View >

      <View style={styles.stepperActionsContainer}>
        <Button
          text="Siguiente"
          onClick={handleNextStep}
        />
        <Button
          text="Anterior"
          onClick={handlePreviousStep}
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
    color: colorSchema.light.baseContent,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 20,
  },
  input: {
    width: '100%',
    height: 70,
    borderRadius: 12,
    backgroundColor: colorSchema.light.base300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    color: colorSchema.light.baseContent,
    fontSize: 26,
    textAlign: 'center',
  },
  stepperActionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    width: '100%',
    paddingBottom: 20,
  },
})