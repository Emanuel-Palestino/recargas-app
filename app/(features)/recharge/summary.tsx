import { colorSchema } from "@/assets/colorSchema"
import { DISPLAYED_CARRIER, DISPLAYED_PRODUCT_TYPE } from "@/assets/displayedStrings"
import { RecargaCompletedModal } from "@/components/RecargaCompletedModal"
import { Button } from "@/components/ui/Button"
import { recharge, RechargeRequest } from "@/services/recharge"
import { useRechargeStore } from "@/store/rechargeStore"
import { InvalidUsernameError, UsernameNotFoundError } from "@/types/errors"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, Keyboard, StyleSheet, Text, View } from "react-native"

export default function RechargeSummary() {
  const {
    carrier,
    phoneNumber,
    amount,
    recargaType,
    benefits,
    goToPreviousStep,
    resetState,
  } = useRechargeStore()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handlePreviousStep = () => {
    goToPreviousStep()
    router.navigate('/recharge/amount-selection')
  }

  const recargar = async () => {
    setLoading(true)
    Keyboard.dismiss()

    try {
      const request: RechargeRequest = {
        phone: phoneNumber,
        amount: amount,
        carrier: carrier,
        extraData: recargaType,
      }
      const response = await recharge(request)

      if (response.code === 1) {
        setModalOpen(true)
      } else if (response.code === 2) {
        Alert.alert('Error', 'Número de celular inválido')
      } else {
        Alert.alert('Error', response.message)
      }
    } catch (err) {
      if (err instanceof UsernameNotFoundError) {
        Alert.alert('Error', 'No se encontró el nombre de usuario. Por favor, ingrese su nombre de usuario en la pantalla de inicio.')
      } else if (err instanceof InvalidUsernameError) {
        Alert.alert('Error', 'Nombre de usuario inválido. Por favor, ingrese un nombre de usuario válido en la pantalla de inicio.')
      } else {
        console.log(err)
        Alert.alert('Error', 'Error al procesar la recarga')
      }
    } finally {
      setLoading(false)
    }

    return
  }

  const handleCloseModal = () => {
    resetState()
    setModalOpen(false)
    router.dismissTo('/')
  }

  return (
    <>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Compañía telefónica</Text>
        <Text style={styles.value}>{DISPLAYED_CARRIER[carrier]}</Text>

        <Text style={styles.subtitle}>Tipo de recarga</Text>
        <Text style={styles.value}>{DISPLAYED_PRODUCT_TYPE[recargaType]}</Text>

        <Text style={styles.subtitle}>Número celular</Text>
        <Text style={styles.value}>{phoneNumber}</Text>

        <Text style={styles.subtitle}>Monto</Text>
        <Text style={styles.value}>${amount}</Text>

        <Text style={styles.subtitle}>Beneficios</Text>
        <Text style={[styles.value, { fontWeight: 'semibold' }]}>{benefits}</Text>
      </View>

      <View style={styles.stepperActionsContainer}>
        <Button
          text="Recargar"
          onClick={recargar}
          loading={loading}
        />
        <Button
          text="Anterior"
          onClick={handlePreviousStep}
          color='medium'
        />
      </View>

      <RecargaCompletedModal
        open={modalOpen}
        onClose={handleCloseModal}
        date={new Date().toLocaleString()}
      />
    </>
  )

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colorSchema.light.base100,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: colorSchema.light.baseContent,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  subtitle: {
    color: 'gray',
    fontSize: 18,
  },
  value: {
    color: colorSchema.light.baseContent,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center'
  },
  stepperActionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    width: '100%',
    paddingBottom: 20,
  },
})