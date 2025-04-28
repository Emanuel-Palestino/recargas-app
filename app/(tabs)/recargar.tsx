import { colorSchema } from '@/assets/colorSchema';
import { ATT_PRODUCTS, MOVISTAR_PRODUCTS, TELCEL_PRODUCTS } from '@/assets/products';
import { AmountSelection } from '@/components/AmountSelection';
import { CarrierSelection } from '@/components/CarrierSelection';
import { CustomerSelection } from '@/components/CustomerSelection';
import { CustomerTypeSelection } from '@/components/CustomerTypeSelection';
import { PhoneNumberInputGroup } from '@/components/PhoneNumberInputGroup';
import { RecargaCompletedModal } from '@/components/RecargaCompletedModal';
import { RecargaTypeSelection } from '@/components/RecargaTypeSelection';
import { Button } from '@/components/ui/Button';
import { recharge, RechargeRequest } from '@/services/recharge';
import { Carrier, TelcelProductType } from '@/types/Carriers';
import { CustomerType } from '@/types/CustomerType';
import { InvalidUsernameError, UsernameNotFoundError } from '@/types/errors';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Keyboard, ScrollView } from "react-native"


export default function RecargarScreen() {

  const [carrier, setCarrier] = useState<Carrier>(Carrier.TELCEL)
  const [recargaType, setRecargaType] = useState<TelcelProductType>(TelcelProductType.PAQUETE)
  const [amount, setAmount] = useState<number>(10)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [phoneNumberConfirmation, setPhoneNumberConfirmation] = useState<string>('')
  const [customerType, setCustomerType] = useState<CustomerType>(CustomerType.GUESS)
  const [customer, setCustomer] = useState<string>('1')
  const [loading, setLoading] = useState<boolean>(false)

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (carrier !== Carrier.TELCEL) {
      setRecargaType(TelcelProductType.SALDO)
    } else {
      setRecargaType(TelcelProductType.PAQUETE)
    }

    setAmount(10)
  }, [carrier])

  const getCarrierAmounts = (): Record<number, string> => {
    switch (carrier) {
      case Carrier.TELCEL:
        return TELCEL_PRODUCTS[recargaType]
      case Carrier.MOVISTAR:
        return MOVISTAR_PRODUCTS
      case Carrier.ATT:
        return ATT_PRODUCTS
      default:
        return {}
    }
  }

  const recargar = async () => {
    setLoading(true)

    if (phoneNumber !== phoneNumberConfirmation) {
      Alert.alert('Error', 'Los números de celular no coinciden')
      setLoading(false)
      return
    }

    const sanitizedNumber = phoneNumber.replace(/\D/g, '')

    if (sanitizedNumber.length !== 10) {
      Alert.alert('Error', 'El número de celular debe tener 10 dígitos')
      setLoading(false)
      return
    }

    Keyboard.dismiss()

    try {
      const request: RechargeRequest = {
        phone: sanitizedNumber,
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
    setCarrier(Carrier.TELCEL)
    setRecargaType(TelcelProductType.PAQUETE)
    setAmount(10)
    setPhoneNumber('')
    setPhoneNumberConfirmation('')
    setCustomerType(CustomerType.GUESS)
    setCustomer('1')
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <CarrierSelection setCarrier={setCarrier} carrier={carrier} />

          <RecargaTypeSelection
            setRecargaType={setRecargaType}
            recargaType={recargaType}
            disabled={carrier !== Carrier.TELCEL}
          />

          <AmountSelection
            amountsObj={getCarrierAmounts()}
            setAmount={setAmount}
            amount={amount}
          />

          <CustomerTypeSelection setCustomerType={setCustomerType} customerType={customerType} />

          {
            customerType === CustomerType.GUESS &&
            <PhoneNumberInputGroup
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              phoneNumberConfirmation={phoneNumberConfirmation}
              setPhoneNumberConfirmation={setPhoneNumberConfirmation}
            />
          }

          {
            customerType === CustomerType.REGISTERED &&
            <CustomerSelection
              setCustomer={setCustomer}
              customer={customer}
            />
          }

          <View style={{ flex: 1 }} />

          <View style={styles.actionsContainer}>
            <Button
              text="Recargar"
              onClick={recargar}
              loading={loading}
              disabled={loading}
            />
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
        carrier={carrier}
        type={recargaType}
        phoneNumber={phoneNumber}
        amount={amount}
        reference="1234567890"
      />
    </KeyboardAvoidingView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.light.base100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    rowGap: 22,
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
});
