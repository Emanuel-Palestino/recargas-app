import { Picker } from "@react-native-picker/picker"
import { Alert, StyleSheet, Text, View } from "react-native"
import { colorSchema } from "@/assets/colorSchema"
import { useRechargeStore } from "@/store/rechargeStore"
import { PRODUCTS } from "@/assets/products"
import { DISPLAYED_PRODUCT_TYPE } from "@/assets/displayedStrings"
import { useRouter } from "expo-router"
import { Button } from "@/components/ui/Button"


export default function AmountSelection() {

  const {
    carrier,
    recargaType,
    setRecargaType,
    amount,
    setAmount,
    setBenefits,
    goToPreviousStep,
    goToNextStep,
  } = useRechargeStore()
  const router = useRouter()

  const handleAmountChange = (value: number) => {
    setAmount(Number(value))
    setBenefits(PRODUCTS[carrier].products[recargaType].benefits[value])
  }

  const handlePreviousStep = () => {
    goToPreviousStep()
    router.navigate('/recharge/carrier-selection')
  }

  const handleNextStep = () => {
    if (amount === 0) {
      Alert.alert('Error', 'Por favor, selecciona un monto de recarga')
      return
    }
    goToNextStep()
    router.navigate('/recharge/summary')
  }

  return (
    <>
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

      <View style={styles.stepperActionsContainer}>
        <Button
          text="Anterior"
          onClick={handlePreviousStep}
          color='medium'
        />
        <Button
          text="Siguiente"
          onClick={handleNextStep}
        />
      </View>
    </>
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
  },
  stepperActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
    width: '100%',
    paddingBottom: 20,
  },
})