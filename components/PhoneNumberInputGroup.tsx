import { StyleSheet, Text, TextInput, View } from "react-native"


interface PhoneNumberInputGroupProps {
  phoneNumber: string
  setPhoneNumber: (numero: string) => void
  phoneNumberConfirmation: string
  setPhoneNumberConfirmation: (numero: string) => void
}

export const PhoneNumberInputGroup = ({
  phoneNumber,
  setPhoneNumber,
  phoneNumberConfirmation,
  setPhoneNumberConfirmation,
}: PhoneNumberInputGroupProps) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Número Celular
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text style={[styles.title, { marginTop: 14 }]}>
        Confirmar Número Celular
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={phoneNumberConfirmation}
        onChangeText={setPhoneNumberConfirmation}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    rowGap: 6
  },
  title: {
    color: 'gray'
  },
  input: {
    height: 54,
    borderRadius: 10,
    backgroundColor: '#eeeae8',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  }
})