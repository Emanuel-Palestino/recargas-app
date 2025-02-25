import { Picker } from "@react-native-picker/picker"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"


interface AmountSelectionProps {
  setAmount: (amount: string) => void
  amount: string
}

export const AmountSelection = ({
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
            <Picker.Item label="$10" value="10" />
            <Picker.Item label="$20" value="20" />
            <Picker.Item label="$30" value="30" />
            <Picker.Item label="$50" value="50" />
            <Picker.Item label="$80" value="80" />
            <Picker.Item label="$100" value="100" />
            <Picker.Item label="$150" value="150" />
            <Picker.Item label="$200" value="200" />
            <Picker.Item label="$270" value="270" />
            <Picker.Item label="$300" value="300" />
            <Picker.Item label="$400" value="400" />
            <Picker.Item label="$500" value="500" />
          </Picker>
        </View>

        <Pressable style={styles.benefitsButton} onPress={() => Alert.alert('Beneficios', 'beneficios')}>
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