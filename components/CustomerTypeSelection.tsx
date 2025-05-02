import { colorSchema } from "@/assets/colorSchema"
import { DISPLAYED_CUSTOMER_TYPE } from "@/assets/displayedStrings"
import { CustomerType } from "@/types/CustomerType"
import { Picker } from "@react-native-picker/picker"
import { Alert, StyleSheet, Text, View } from "react-native"
import { Button } from "./ui/Button"
import { presentContactPickerAsync } from "expo-contacts"


interface CustomerTypeSelectionProps {
  setCustomerType: (customerType: CustomerType) => void
  customerType: CustomerType
  setPhoneNumber: (phoneNumber: string) => void
  setPhoneNumberConfirmation: (phoneNumberConfirmation: string) => void
}

export const CustomerTypeSelection = ({
  customerType,
  setCustomerType,
  setPhoneNumber,
  setPhoneNumberConfirmation
}: CustomerTypeSelectionProps) => {

  const handleContactSelection = async () => {
    const contact = await presentContactPickerAsync()

    if (!contact) {
      return
    }

    if (!contact.phoneNumbers || contact.phoneNumbers.length === 0) {
      Alert.alert('Error', 'El contacto no tiene números de teléfono')
      return
    }

    const primaryPhoneNumber = contact.phoneNumbers.find(phoneNumber => phoneNumber.isPrimary)

    if (!primaryPhoneNumber || !primaryPhoneNumber.number) {
      Alert.alert('Error', 'El contacto no tiene un número de teléfono primario')
      return
    }

    const phoneNumber = primaryPhoneNumber.number.replace(/\D/g, '')
    const sanitizedPhoneNumber = phoneNumber.startsWith('52') ? phoneNumber.slice(2) : phoneNumber
    setPhoneNumber(sanitizedPhoneNumber)
    setPhoneNumberConfirmation(sanitizedPhoneNumber)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tipo de cliente
      </Text>

      <View style={styles.inputContainer}>
        <View style={styles.picker}>
          <Picker
            selectedValue={customerType}
            onValueChange={setCustomerType}
          >
            <Picker.Item label={DISPLAYED_CUSTOMER_TYPE[CustomerType.GUESS]} value={CustomerType.GUESS} />
            <Picker.Item label={DISPLAYED_CUSTOMER_TYPE[CustomerType.REGISTERED]} value={CustomerType.REGISTERED} />
          </Picker>
        </View>

        <Button
          size="sm"
          color="accent"
          text="Contactos"
          onClick={handleContactSelection}
        />
      </View>
    </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
})