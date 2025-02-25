import { CustomerType } from "@/types/CustomerType"
import { Picker } from "@react-native-picker/picker"
import { StyleSheet, Text, View } from "react-native"


interface CustomerTypeSelectionProps {
  setCustomerType: (customerType: CustomerType) => void
  customerType: CustomerType
}

export const CustomerTypeSelection = ({
  customerType,
  setCustomerType,
}: CustomerTypeSelectionProps) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tipo de Cliente
      </Text>

      <View style={styles.picker}>
        <Picker
          selectedValue={customerType}
          onValueChange={setCustomerType}
        >
          <Picker.Item label="Cliente Nuevo" value={CustomerType.guess} />
          <Picker.Item label="Cliente Registrado" value={CustomerType.registered} />
        </Picker>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    rowGap: 7
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