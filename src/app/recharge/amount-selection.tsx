import { Picker } from "@react-native-picker/picker"
import { StyleSheet, Text, View } from "react-native"
import { useRechargeStore } from "@/store/rechargeStore"
import { PRODUCTS } from "@/constants/products"
import { DISPLAYED_PRODUCT_TYPE } from "@/constants/displayedStrings"
import { useRouter } from "expo-router"
import { Button } from "@/components/ui/Button"
import { useTheme } from "@/hooks/useTheme"
import { useAlert } from "@/hooks/useAlert"


export default function AmountSelection() {
  const {
    carrier,
    recargaType,
    setRecargaType,
    amount,
    setAmount,
    setBenefits,
    isScheduledRecharge,
  } = useRechargeStore()
  const router = useRouter()
  const colors = useTheme()
  const { AlertContainer, showAlert } = useAlert()

  const handleAmountChange = (value: number) => {
    setAmount(Number(value))
    setBenefits(PRODUCTS[carrier].products[recargaType].benefits[value])
  }

  const handleNextStep = () => {
    if (amount === 0) {
      showAlert('Error', 'Por favor, selecciona un monto de recarga')
      return
    }
    if (isScheduledRecharge) {
      router.navigate('/recharge/date-picker')
    } else {
      router.navigate('/recharge/summary')
    }
  }

  return (
    <>
      <View style={styles.container}>
        {PRODUCTS[carrier].multiple && (
          <>
            <Text style={{ color: colors.baseContent }}>
              Tipo de recarga
            </Text>

            <View style={[styles.picker, { backgroundColor: colors.base300 }]}>
              <Picker
                selectedValue={recargaType}
                onValueChange={setRecargaType}
                style={{ color: colors.baseContent }}
              >
                {PRODUCTS[carrier].productsList.map((value) => (
                  <Picker.Item key={`product-type-${value}`} label={DISPLAYED_PRODUCT_TYPE[value]} value={value} />
                ))}
              </Picker>
            </View>
          </>
        )}

        <Text style={{ color: colors.baseContent }}>
          Monto
        </Text>

        <View style={[styles.picker, { backgroundColor: colors.base300 }]}>
          <Picker
            selectedValue={amount}
            onValueChange={handleAmountChange}
            style={{ color: colors.baseContent }}
          >
            <Picker.Item key={`amount-0`} label={`Selecciona un monto`} value={0} />
            {PRODUCTS[carrier].products[recargaType].amounts.map((value) => (
              <Picker.Item key={`amount-${value}`} label={`$${value}`} value={value} />
            ))}
          </Picker>
        </View>

        <Text style={{ color: colors.baseContent }}>
          Beneficios
        </Text>

        <Text style={[styles.benefits, { color: colors.baseContent }]}>
          {PRODUCTS[carrier].products[recargaType].benefits[amount] || 'Beneficios no disponibles'}
        </Text>

        <AlertContainer />
      </View>

      <View style={styles.stepperActionsContainer}>
        <Button
          text="Siguiente"
          onClick={handleNextStep}
        />
        <Button
          text="Anterior"
          onClick={() => router.back()}
          color='medium'
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
  picker: {
    height: 48,
    padding: 0,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 12,
  },
  benefits: {
    fontSize: 18,
  },
  stepperActionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    width: '100%',
  },
})
