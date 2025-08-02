import { StyleSheet, View } from "react-native"
import { CarrierButton } from "@/components/CarrierButton"
import { Carrier, TelcelProductType } from "@/types/Carriers"
import { useRechargeStore } from "@/store/rechargeStore"
import { Button } from "@/components/ui/Button"
import { useRouter } from "expo-router"
import { useEffect, useRef } from "react"

const carriers: { value: Carrier, image: any }[] = [
  {
    value: Carrier.TELCEL,
    image: require('@/assets/images/carrier_logos/telcel.png')
  },
  {
    value: Carrier.ATT,
    image: require('@/assets/images/carrier_logos/att.png')

  },
  {
    value: Carrier.MOVISTAR,
    image: require('@/assets/images/carrier_logos/movistar.png')
  },
  {
    value: Carrier.BAIT,
    image: require('@/assets/images/carrier_logos/bait.png')
  }
]
export default function CarrierSelection() {

  const {
    carrier,
    setCarrier,
    goToPreviousStep,
    goToNextStep,
    setRecargaType,
    setAmount,
    setCurrentStep,
  } = useRechargeStore()
  const router = useRouter()
  const prevCarrierRef = useRef<Carrier>(carrier)

  const handlePreviousStep = () => {
    goToPreviousStep()
    router.navigate('/recharge')
  }

  const handleNextStep = () => {
    goToNextStep()
    router.navigate('/recharge/amount-selection')
  }

  useEffect(() => {
    if (prevCarrierRef.current !== carrier) {
      if (carrier !== Carrier.TELCEL) {
        setRecargaType(TelcelProductType.SALDO)
      } else {
        setRecargaType(TelcelProductType.PAQUETE)
      }

      setAmount(0)
      
      prevCarrierRef.current = carrier
    }
  }, [carrier, setRecargaType, setAmount])

  useEffect(() => {
    setCurrentStep(1) // steps start from 0
  }, [])

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          {
            carriers.map(carr => (
              <CarrierButton
                key={carr.value}
                onSelect={setCarrier}
                selected={carr.value === carrier}
                image={carr.image}
                value={carr.value}
              />
            ))
          }
        </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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