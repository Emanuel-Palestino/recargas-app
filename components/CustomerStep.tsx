import { colorSchema } from "@/assets/colorSchema"
import { Alert, StyleSheet, Text, TextInput, View } from "react-native"
import { Button } from "./ui/Button"
import { presentContactPickerAsync } from "expo-contacts"
import { useRechargeStore } from "@/store/rechargeStore"

export const CustomerStep = () => {

  const { phoneNumber, setPhoneNumber } = useRechargeStore()

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
      Alert.alert('Error', 'El contacto no tiene un número de teléfono primario o tiene múltiples números de teléfono.')
      return
    }

    const phoneNumber = primaryPhoneNumber.number.replace(/\D/g, '')
    const sanitizedPhoneNumber = phoneNumber.startsWith('52') ? phoneNumber.slice(2) : phoneNumber
    setPhoneNumber(sanitizedPhoneNumber)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Número celular
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text style={styles.description}>Ejemplo: 951 123 1234</Text>

      <View style={styles.actionsContainer}>
        {/* <Button
          text="Buscar cliente"
          onClick={() => console.log('Buscar cliente')}
          color="secondary"
          size="sm"
        /> */}

        <Button
          text="Seleccionar desde contactos"
          onClick={handleContactSelection}
          color="accent"
          size="sm"
        />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: -24,
  },
  title: {
    color: colorSchema.light.baseContent,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: colorSchema.light.base300,
    paddingHorizontal: 16,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 28,
  },
  actionsContainer: {
    rowGap: 6,
  }
})