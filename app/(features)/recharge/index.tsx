import { colorSchema } from "@/assets/colorSchema";
import { Button } from "@/components/ui/Button";
import { useRechargeStore } from "@/store/rechargeStore";
import { presentContactPickerAsync } from "expo-contacts";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

export default function RechargeIndex() {

  const { phoneNumber, setPhoneNumber, goToNextStep, resetState } = useRechargeStore()
  const router = useRouter()

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

  const handleNextStep = () => {
    const sanitizedNumber = phoneNumber.replace(/\D/g, '')

    if (sanitizedNumber.length !== 10) {
      Alert.alert('Error', 'El número de celular debe tener 10 dígitos')
      return
    }

    setPhoneNumber(sanitizedNumber)

    goToNextStep()
    router.navigate('/recharge/carrier-selection')
  }

  useEffect(() => {
    resetState()
  }, [])

  return (
    <>
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

      <View style={styles.stepperActionsContainer}>
        <Button
          text="Siguiente"
          onClick={handleNextStep}
        />

        {/* Empty container to maintain spacing */}
        <View style={{ height: 45 }} />
      </View>
    </>
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
  },
  stepperActionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    width: '100%',
    paddingBottom: 20,
  },
})