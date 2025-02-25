import { AmountSelection } from '@/components/AmountSelection';
import { CarrierSelection } from '@/components/CarrierSelection';
import { CustomerSelection } from '@/components/CustomerSelection';
import { CustomerTypeSelection } from '@/components/CustomerTypeSelection';
import { PhoneNumberInputGroup } from '@/components/PhoneNumberInputGroup';
import { RecargaCompletedModal } from '@/components/RecargaCompletedModal';
import { RecargaTypeSelection } from '@/components/RecargaTypeSelection';
import { Carrier } from '@/types/Carriers';
import { CustomerType } from '@/types/CustomerType';
import { useState } from 'react';
import { Text, View, StyleSheet, Alert, KeyboardAvoidingView, Platform, Pressable, Keyboard } from "react-native"


export default function RecargarScreen() {

  const [carrier, setCarrier] = useState<Carrier>(Carrier.telcel)
  const [recargaType, setRecargaType] = useState<string>('normal')
  const [amount, setAmount] = useState<string>('10')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [phoneNumberConfirmation, setPhoneNumberConfirmation] = useState<string>('')
  const [customerType, setCustomerType] = useState<CustomerType>(CustomerType.guess)
  const [customer, setCustomer] = useState<string>('1')

  const [modalOpen, setModalOpen] = useState<boolean>(false)

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

        <RecargaTypeSelection setRecargaType={setRecargaType} recargaType={recargaType} />

        <AmountSelection setAmount={setAmount} amount={amount} />

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
