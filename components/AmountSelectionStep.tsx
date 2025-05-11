import { Picker } from "@react-native-picker/picker"
import { StyleSheet, Text, View } from "react-native"
import { colorSchema } from "@/assets/colorSchema"
import { Carrier, TelcelProductType } from "@/types/Carriers"
import { DISPLAYED_TELCEL_PRODUCT_TYPE } from "@/assets/displayedStrings"


interface AmountSelectionProps {
  carrier: Carrier,
  recargaType: TelcelProductType,
  setRecargaType: (recargaType: TelcelProductType) => void
  amountsAndBenefits: Record<number, string>
  setAmount: (amount: number) => void
  amount: number
}

export const AmountSelection = ({
  carrier,
  recargaType,
  setRecargaType,
  amountsAndBenefits,
  setAmount,
  amount,
}: AmountSelectionProps) => {

  return (
    <View style={styles.container}>
      {carrier === Carrier.TELCEL && (
        <>
          <Text style={styles.title}>
            Tipo de recarga
          </Text>

          <View style={styles.picker}>
            <Picker
              selectedValue={recargaType}
              onValueChange={setRecargaType}
            >
              {Object.values(TelcelProductType).map((value) => (
                <Picker.Item key={`telcel-type-${value}`} label={DISPLAYED_TELCEL_PRODUCT_TYPE[value]} value={value} />
              ))}
            </Picker>
          </View>
        </>
      )}

      <Text style={styles.title}>
        Monto
      </Text>

      <View style={styles.picker} >
        <Picker
          selectedValue={amount}
          onValueChange={setAmount}
        >
          {Object.keys(amountsAndBenefits).map((amount) => (
            <Picker.Item key={`amount-${amount}`} label={`$${amount}`} value={amount} />
          ))}
        </Picker>
      </View>

      <Text style={styles.title}>
        Beneficios
      </Text>

      <Text style={styles.benefits}>
        {amountsAndBenefits[amount]}
      </Text>

    </View >
  )

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    rowGap: 4,
    flexGrow: 1,
  },
  title: {
    color: colorSchema.light.baseContent,
  },
  picker: {
    height: 48,
    padding: 0,
    borderRadius: 10,
    backgroundColor: colorSchema.light.base300,
    justifyContent: 'center',
    marginBottom: 12,
  },
  benefits: {
    color: colorSchema.light.baseContent,
    fontSize: 18,
  }
})