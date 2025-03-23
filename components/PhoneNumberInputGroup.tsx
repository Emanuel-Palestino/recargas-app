import { colorSchema } from "@/assets/colorSchema"
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
        Número celular
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text style={[styles.title, { marginTop: 14 }]}>
        Confirmar número celular
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
    rowGap: 4
  },
  title: {
    color: colorSchema.light.baseContent,
  },
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor: colorSchema.light.base300,
    paddingHorizontal: 16,
    fontSize: 16,
  }
})