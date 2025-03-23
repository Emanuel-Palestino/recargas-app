import { Picker } from "@react-native-picker/picker"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"
import { Button } from "./ui/Button"
import { colorSchema } from "@/assets/colorSchema"


interface AmountSelectionProps {
  amountsObj: Record<number, string>
  setAmount: (amount: number) => void
  amount: number
}

export const AmountSelection = ({
  amountsObj,
  setAmount,
  amount,
}: AmountSelectionProps) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Monto de recarga
      </Text>

      <View style={styles.benefitsContainer}>
        <View style={styles.picker} >
          <Picker
            selectedValue={amount}
            onValueChange={setAmount}
          >
            {Object.keys(amountsObj).map((amount) => (
              <Picker.Item key={`amount-${amount}`} label={`$${amount}`} value={amount} />
            ))}
          </Picker>
        </View>

        <Button
          size="sm"
          color="accent"
          text="Beneficios"
          onClick={() => Alert.alert('Beneficios', amountsObj[amount])}
        />
      </View>

    </View >
  )

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    rowGap: 4
  },
  title: {
    color: colorSchema.light.baseContent,
  },
  picker: {
    width: '50%',
    height: 48,
    padding: 0,
    borderRadius: 10,
    backgroundColor: colorSchema.light.base300,
    flexGrow: 1,
    justifyContent: 'center',
  },
  benefitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
})