import { Picker } from "@react-native-picker/picker"
import { StyleSheet, Text, View } from "react-native"
import { colorSchema } from "@/assets/colorSchema"
import { useRechargeStore } from "@/store/rechargeStore"
import { PRODUCTS } from "@/assets/products"
import { DISPLAYED_PRODUCT_TYPE } from "@/assets/displayedStrings"


export const AmountSelection = () => {
  const {
    carrier,
    recargaType,
    setRecargaType,
    amount,
    setAmount,
    setBenefits,
  } = useRechargeStore()

  const handleAmountChange = (value: number) => {
    setAmount(value)
    setBenefits(PRODUCTS[carrier].products[recargaType].benefits[value])
  }

  return (
    <View style={styles.container}>
      {PRODUCTS[carrier].multiple && (
        <>
          <Text style={styles.title}>
            Tipo de recarga
          </Text>

          <View style={styles.picker}>
            <Picker
              selectedValue={recargaType}
              onValueChange={setRecargaType}
            >
              {PRODUCTS[carrier].productsList.map((value) => (
                <Picker.Item key={`product-type-${value}`} label={DISPLAYED_PRODUCT_TYPE[value]} value={value} />
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
          onValueChange={handleAmountChange}
        >
          <Picker.Item key={`amount-0`} label={`Selecciona un monto`} value={0} enabled={false} />
          {PRODUCTS[carrier].products[recargaType].amounts.map((value) => (
            <Picker.Item key={`amount-${value}`} label={`$${value}`} value={value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.title}>
        Beneficios
      </Text>

      <Text style={styles.benefits}>
        {PRODUCTS[carrier].products[recargaType].benefits[amount] || 'Beneficios no disponibles'}
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