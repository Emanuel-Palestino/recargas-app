import { StyleSheet, Text, TextInput, View } from "react-native"


interface PhoneNumberInputGroupProps {
  setPhoneNumber: (numero: string) => void
  setPhoneNumberConfirmation: (numero: string) => void
}

export const PhoneNumberInputGroup = ({
  setPhoneNumber,
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
        onChangeText={setPhoneNumber}
      />

      <Text style={[styles.title, { marginTop: 14 }]}>
        Confirmar Número Celular
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
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