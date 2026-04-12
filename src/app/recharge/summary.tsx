import { formatDate } from "@/utils"
import { Colors } from "@/constants/theme"
import { DISPLAYED_CARRIER, DISPLAYED_PRODUCT_TYPE } from "@/constants/displayedStrings"
import { RecargaCompletedModal } from "@/components/RecargaCompletedModal"
import { Button } from "@/components/ui/Button"
import { recharge, scheduleRecharge } from "@/services/recharge"
import { useRechargeStore } from "@/store/rechargeStore"
import { InvalidUsernameError, UsernameNotFoundError } from "@/types/errors"
import { useNavigation, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, Keyboard, StyleSheet, Text, View } from "react-native"
import { RechargeRequest } from "@/types/Transaction"
import { ScheduledTransactionType } from "@/types/ScheduledTransaction"

export default function RechargeSummary() {
  const {
    carrier,
    phoneNumber,
    amount,
    recargaType,
    benefits,
    resetState,
    isScheduledRecharge,
    targetDateTs,
  } = useRechargeStore()
  const router = useRouter()
  const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    return navigation.addListener('beforeRemove', (e) => {
      if (loading) e.preventDefault()
    })
  }, [navigation, loading])

  const recargar = async () => {
    setLoading(true)
    Keyboard.dismiss()

    try {
      const request: RechargeRequest = {
        phone: phoneNumber,
        amount: amount,
        carrier: carrier,
        productType: recargaType,
      }

      let response
      if (isScheduledRecharge) {
        response = await scheduleRecharge({
          type: ScheduledTransactionType.ONE_TIME,
          rechargePayload: request,
          nextExecutionDateIso: new Date(targetDateTs).toISOString(),
        })
      } else {
        response = await recharge(request)
      }

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
  }

  const handleCloseModal = () => {
    resetState()
    setModalOpen(false)
    router.dismissTo('/recharge')
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

        {isScheduledRecharge && (
          <>
            <Text style={styles.subtitle}>Fecha Programada</Text>
            <Text style={styles.value}>{formatDate(new Date(targetDateTs))}</Text>
          </>
        )}

        <Text style={styles.subtitle}>Beneficios</Text>
        <Text style={[styles.value, { fontSize: 17, fontWeight: 'semibold' }]}>{benefits}</Text>
      </View>

      <View style={styles.stepperActionsContainer}>
        <Button
          text={isScheduledRecharge ? "PROGRAMAR RECARGA" : "RECARGAR"}
          onClick={recargar}
          loading={loading}
          disabled={loading}
        />
        <Button
          text="Anterior"
          onClick={() => router.back()}
          color='medium'
          loading={loading}
          disabled={loading}
        />
      </View>

      <RecargaCompletedModal
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  )

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.light.base100,
    display: 'flex',
    alignItems: 'center',
  },
  subtitle: {
    color: 'gray',
    fontSize: 17,
  },
  value: {
    color: Colors.light.baseContent,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  stepperActionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    width: '100%',
  },
})
