import { colorSchema } from "@/assets/colorSchema"
import { DISPLAYED_CARRIER, DISPLAYED_TELCEL_PRODUCT_TYPE } from "@/assets/displayedStrings"
import { Carrier, TelcelProductType } from "@/types/Carriers"
import { StyleSheet, Text, View } from "react-native"

interface RechargeResumeStepProps {
  carrier: Carrier
  type: TelcelProductType
  phoneNumber: string
  amount: number
  benefits: string
}

export const RechargeResumeStep = ({
  carrier,
  type,
  phoneNumber,
  amount,
  benefits,
}: RechargeResumeStepProps) => {

  return (
    <View style={styles.content}>
      <Text style={styles.subtitle}>Compañía telefónica</Text>
      <Text style={styles.value}>{DISPLAYED_CARRIER[carrier]}</Text>

      <Text style={styles.subtitle}>Tipo de recarga</Text>
      <Text style={styles.value}>{DISPLAYED_TELCEL_PRODUCT_TYPE[type]}</Text>

      <Text style={styles.subtitle}>Número celular</Text>
      <Text style={styles.value}>{phoneNumber}</Text>

      <Text style={styles.subtitle}>Monto</Text>
      <Text style={styles.value}>${amount}</Text>

      <Text style={styles.subtitle}>Beneficios</Text>
      <Text style={[styles.value, {fontWeight: 'semibold'}]}>{benefits}</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colorSchema.light.base100,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: colorSchema.light.baseContent,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  subtitle: {
    color: 'gray',
    fontSize: 18,
  },
  value: {
    color: colorSchema.light.baseContent,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center'
  },
})