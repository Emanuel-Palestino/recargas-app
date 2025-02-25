import { Picker } from "@react-native-picker/picker"
import { StyleSheet, Text, View } from "react-native"


interface CustomerSelectionProps {
  setCustomer: (customer: string) => void
  customer: string
}

export const CustomerSelection = ({
  setCustomer,
  customer,
}: CustomerSelectionProps) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tipo de Cliente
      </Text>

      <View style={styles.picker}>
        <Picker
          selectedValue={customer}
          onValueChange={setCustomer}
        >
          <Picker.Item label="cliente 1" value="1" />
        </Picker>
      </View>
    </View>
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
    width: '100%',
    height: 54,
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#eeeae8'
  }
})