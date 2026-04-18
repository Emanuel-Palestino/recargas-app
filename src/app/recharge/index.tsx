import { Button } from "@/components/ui/Button";
import { useRechargeStore } from "@/store/rechargeStore";
import { PermissionStatus, presentContactPickerAsync, requestPermissionsAsync } from "expo-contacts";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useAlert } from "@/hooks/useAlert";

export default function RechargeIndex() {
  const { phoneNumber, setPhoneNumber, resetState, setIsScheduledRecharge } = useRechargeStore()
  const router = useRouter()
  const { scheduled } = useLocalSearchParams<{ scheduled?: string }>()
  const colors = useTheme()
  const { AlertContainer, showAlert } = useAlert()

  useFocusEffect(
    useCallback(() => {
      resetState()
      setIsScheduledRecharge(scheduled === 'true')
    }, [scheduled])
  )

  const handleContactSelection = async () => {
    const response = await requestPermissionsAsync()

    if (response.status !== PermissionStatus.GRANTED) {
      showAlert('Permiso denegado', 'No se pudo acceder a los contactos. Para seleccionar un número de contacto, por favor otorgue permisos de acceso a contactos a la aplicación.')
      return
    }
    const contact = await presentContactPickerAsync()

    if (!contact) {
      return
    }

    if (!contact.phoneNumbers || contact.phoneNumbers.length === 0) {
      showAlert('Error', 'El contacto no tiene números de teléfono')
      return
    }

    const primaryPhoneNumber = contact.phoneNumbers.find(phoneNumber => phoneNumber.isPrimary)

    if (!primaryPhoneNumber || !primaryPhoneNumber.number) {
      showAlert('Error', 'El contacto no tiene un número de teléfono primario o tiene múltiples números de teléfono.')
      return
    }

    const sanitizedPhoneNumber = sanitizePhoneNumber(primaryPhoneNumber.number)
    setPhoneNumber(sanitizedPhoneNumber)
  }

  const handleNextStep = () => {
    const sanitizedNumber = sanitizePhoneNumber(phoneNumber)

    if (sanitizedNumber.length !== 10) {
      showAlert('Error', 'El número de celular debe tener 10 dígitos')
      return
    }

    setPhoneNumber(sanitizedNumber)
    router.navigate('/recharge/carrier-selection')
  }

  const sanitizePhoneNumber = (phoneNumber: string) => {
    const onlyDigits = phoneNumber.replace(/\D/g, '')
    const noCountryCodeNumber = onlyDigits.startsWith('52') ? onlyDigits.slice(2) : onlyDigits
    return noCountryCodeNumber
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.baseContent }]}>
          Número celular
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.base300, color: colors.baseContent }]}
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

        <AlertContainer />
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    width: '90%',
    height: 64,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 32,
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
    width: '90%',
  },
  stepperActionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    width: '100%',
  },
})
