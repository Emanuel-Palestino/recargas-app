import { colorSchema } from '@/assets/colorSchema';
import { AmountSelection } from '@/components/AmountSelectionStep';
import { CarrierSelectionStep } from '@/components/CarrierSelectionStep';
import { CustomerStep } from '@/components/CustomerStep';
import { RecargaCompletedModal } from '@/components/RecargaCompletedModal';
import { RechargeResumeStep } from '@/components/RechargeResumeStep';
import { Button } from '@/components/ui/Button';
import { Stepper } from '@/components/ui/Stepper';
import { recharge, RechargeRequest } from '@/services/recharge';
import { useRechargeStore } from '@/store/rechargeStore';
import { Carrier, TelcelProductType } from '@/types/Carriers';
import { InvalidUsernameError, UsernameNotFoundError } from '@/types/errors';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Keyboard, ScrollView } from "react-native"

const rechargeSteps = [
  {
    name: 'Número celular',
  },
  {
    name: 'Compañía telefónica',
  },
  {
    name: 'Monto de recarga',
  },
  {
    name: 'Resumen',
  },
]


export default function RechargeScreen() {

  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    phoneNumber,
    setPhoneNumber,
    carrier,
    amount,
    setAmount,
    recargaType,
    setRecargaType,
    resetState,
  } = useRechargeStore()

  const [loading, setLoading] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (carrier !== Carrier.TELCEL) {
      setRecargaType(TelcelProductType.SALDO)
    } else {
      setRecargaType(TelcelProductType.PAQUETE)
    }

    setAmount(0)
  }, [carrier])

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

  const resetInputs = () => {
    resetState()
  }

  const handleNextStep = () => {
    const sanitizedNumber = phoneNumber.replace(/\D/g, '')

    if (currentStep === 0) {
      if (sanitizedNumber.length !== 10) {
        Alert.alert('Error', 'El número de celular debe tener 10 dígitos')
        return
      }

      setPhoneNumber(sanitizedNumber)
    }

    if (currentStep === 2 && amount === 0) {
      Alert.alert('Error', 'Por favor, seleccione un monto de recarga')
      return
    }

    goToNextStep()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Stepper steps={rechargeSteps} currentStep={currentStep} />

          {currentStep === 0 && (
            <CustomerStep />
          )}

          {currentStep === 1 && (
            <CarrierSelectionStep />
          )}

          {currentStep === 2 && (
            <AmountSelection />
          )}

          {currentStep === 3 && (
            <RechargeResumeStep />
          )}

          <View style={styles.actionsContainer}>
            {currentStep > 0 && (
              <Button
                text="Anterior"
                onClick={goToPreviousStep}
                color='medium'
              />
            )}

            {currentStep < rechargeSteps.length - 1 && (
              <Button
                text="Siguiente"
                onClick={handleNextStep}
              />
            )}

            {currentStep === rechargeSteps.length - 1 && (
              <Button
                text="Recargar"
                onClick={recargar}
                loading={loading}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <RecargaCompletedModal
        open={modalOpen}
        onClose={() => {
          resetInputs()
          setModalOpen(false)
        }}
        date={new Date().toLocaleString()}
      />
    </KeyboardAvoidingView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.light.base100,
    rowGap: 22,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
    width: '100%',
    paddingBottom: 20,
  },
});
