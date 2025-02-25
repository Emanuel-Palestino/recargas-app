import { AmountSelection } from '@/components/AmountSelection';
import { CarrierSelection } from '@/components/CarrierSelection';
import { CustomerSelection } from '@/components/CustomerSelection';
import { CustomerTypeSelection } from '@/components/CustomerTypeSelection';
import { PhoneNumberInputGroup } from '@/components/PhoneNumberInputGroup';
import { RecargaCompletedModal } from '@/components/RecargaCompletedModal';
import { RecargaTypeSelection } from '@/components/RecargaTypeSelection';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View, StyleSheet, Alert, KeyboardAvoidingView, Platform, Pressable, Keyboard } from "react-native"


export default function RecargarScreen() {

  const [carrier, setCarrier] = useState<string>('telcel')
  const [recargaType, setRecargaType] = useState<string>('normal')
  const [amount, setAmount] = useState<string>('10')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [phoneNumberConfirmation, setPhoneNumberConfirmation] = useState<string>('')
  const [customerType, setCustomerType] = useState<string>('nuevo')
  const [customer, setCustomer] = useState<string>('1')

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const realizarRecarga = () => {
    // Comprobar que los números de celular coincidan
    if (phoneNumber !== phoneNumberConfirmation) {
      Alert.alert('Error', 'Los números de celular no coinciden')
      return
    }

    const numeroSanitizado = phoneNumber.replace(/\D/g, '')

    // Comprobar que el número de celular tenga 10 dígitos
    if (numeroSanitizado.length !== 10) {
      Alert.alert('Error', 'El número de celular debe tener 10 dígitos')
      return
    }

    // Ocultar el teclado
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
        <Text style={styles.title}>Realizar Recarga</Text>

        <CarrierSelection setCarrier={setCarrier} carrier={carrier} />

        <RecargaTypeSelection setRecargaType={setRecargaType} recargaType={recargaType} />

        <AmountSelection setAmount={setAmount} amount={amount} />

        <CustomerTypeSelection setCustomerType={setCustomerType} customerType={customerType} />

        {
          customerType === 'nuevo' &&
          <PhoneNumberInputGroup
            setPhoneNumber={setPhoneNumber}
            setPhoneNumberConfirmation={setPhoneNumberConfirmation}
          />
        }

        {
          customerType === 'cliente' &&
          <CustomerSelection
            setCustomer={setCustomer}
            customer={customer}
          />
        }

        <View style={{ flex: 1 }} />

        <View style={styles.actionsContainer}>
          <Link href="/" style={styles.backButton}>Volver</Link>

          <Pressable onPress={realizarRecarga}>
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
    rowGap: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    color: '#f78c50',
    fontSize: 16,
  },
  recargarButton: {
    width: 150,
    backgroundColor: '#f78c50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
