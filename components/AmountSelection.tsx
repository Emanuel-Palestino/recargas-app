import { Picker } from "@react-native-picker/picker"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"


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
        Monto de Recarga
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

        <Pressable style={styles.benefitsButton} onPress={() => Alert.alert('Beneficios', amountsObj[amount])}>
          <Text style={styles.benefitsTextButton}>
            Beneficios
          </Text>
        </Pressable>
      </View>

    </View >
  )

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    rowGap: 6
  },
  title: {
    color: 'gray'
  },
  picker: {
    width: '50%',
    height: 54,
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#eeeae8',
    flexGrow: 1
  },
  benefitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  benefitsButton: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  benefitsTextButton: {
    color: '#000'
  }
})