import { ATT_PRODUCTS, MOVISTAR_PRODUCTS, TELCEL_PRODUCTS } from '@/assets/products';
import { AmountSelection } from '@/components/AmountSelection';
import { CarrierSelection } from '@/components/CarrierSelection';
import { CustomerSelection } from '@/components/CustomerSelection';
import { CustomerTypeSelection } from '@/components/CustomerTypeSelection';
import { PhoneNumberInputGroup } from '@/components/PhoneNumberInputGroup';
import { RecargaCompletedModal } from '@/components/RecargaCompletedModal';
import { RecargaTypeSelection } from '@/components/RecargaTypeSelection';
import { Carrier, TelcelProductType } from '@/types/Carriers';
import { CustomerType } from '@/types/CustomerType';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert, KeyboardAvoidingView, Platform, Pressable, Keyboard } from "react-native"


export default function RecargarScreen() {

  const [carrier, setCarrier] = useState<Carrier>(Carrier.telcel)
  const [recargaType, setRecargaType] = useState<TelcelProductType>(TelcelProductType.paquete)
  const [amount, setAmount] = useState<number>(10)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [phoneNumberConfirmation, setPhoneNumberConfirmation] = useState<string>('')
  const [customerType, setCustomerType] = useState<CustomerType>(CustomerType.guess)
  const [customer, setCustomer] = useState<string>('1')

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (carrier !== Carrier.telcel) {
      setRecargaType(TelcelProductType.saldo)
    } else {
      setRecargaType(TelcelProductType.paquete)
    }

    setAmount(10)
  }, [carrier])

  const getCarrierAmounts = (): Record<number, string> => {
    switch (carrier) {
      case Carrier.telcel:
        return TELCEL_PRODUCTS[recargaType]
      case Carrier.movistar:
        return MOVISTAR_PRODUCTS
      case Carrier.att:
        return ATT_PRODUCTS
      default:
        return {}
    }
  }

  const recargar = () => {
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

    setModalOpen(true)

    console.log({
      carrier,
      recargaType,
      amount,
      phoneNumber,
      phoneNumberConfirmation,
      customerType,
      customer,
    })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <CarrierSelection setCarrier={setCarrier} carrier={carrier} />

        <RecargaTypeSelection
          setRecargaType={setRecargaType}
          recargaType={recargaType}
          disabled={carrier !== Carrier.telcel}
        />

        <AmountSelection
          amountsObj={getCarrierAmounts()}
          setAmount={setAmount}
          amount={amount}
        />

        <CustomerTypeSelection setCustomerType={setCustomerType} customerType={customerType} />

        {
          customerType === CustomerType.guess &&
          <PhoneNumberInputGroup
            setPhoneNumber={setPhoneNumber}
            setPhoneNumberConfirmation={setPhoneNumberConfirmation}
          />
        }

        {
          customerType === CustomerType.registered &&
          <CustomerSelection
            setCustomer={setCustomer}
            customer={customer}
          />
        }

        <View style={{ flex: 1 }} />

        <View style={styles.actionsContainer}>
          <Pressable onPress={recargar}>
            <Text style={styles.recargarButton}>Recargar</Text>
          </Pressable>
        </View>
      </View>

      <RecargaCompletedModal open={modalOpen} onClose={() => { }} />
    </KeyboardAvoidingView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'flex-end',
    alignItems: 'center',
    rowGap: 16,
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
  recargarButton: {
    width: 150,
    backgroundColor: '#f78c50',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
