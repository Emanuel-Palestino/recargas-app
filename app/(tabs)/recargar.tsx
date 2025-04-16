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
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Keyboard } from "react-native"


export default function RecargarScreen() {

  const [carrier, setCarrier] = useState<Carrier>(Carrier.TELCEL)
  const [recargaType, setRecargaType] = useState<TelcelProductType>(TelcelProductType.PAQUETE)
  const [amount, setAmount] = useState<number>(10)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [phoneNumberConfirmation, setPhoneNumberConfirmation] = useState<string>('')
  const [customerType, setCustomerType] = useState<CustomerType>(CustomerType.GUESS)
  const [customer, setCustomer] = useState<string>('1')

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
    if (phoneNumber !== phoneNumberConfirmation) {
      Alert.alert('Error', 'Los números de celular no coinciden')
      return
    }

    const sanitizedNumber = phoneNumber.replace(/\D/g, '')

    if (sanitizedNumber.length !== 10) {
      Alert.alert('Error', 'El número de celular debe tener 10 dígitos')
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
      } else {
        Alert.alert('Error', response.message)
      }
    } catch (err) {
      console.log(err)
      Alert.alert('Error', 'Error al procesar la recarga')
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
          <Button text="Recargar" onClick={recargar} />
        </View>
      </View>

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
