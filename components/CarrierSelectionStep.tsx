import { StyleSheet, View } from "react-native"
import { CarrierButton } from "./CarrierButton"
import { Carrier, TelcelProductType } from "@/types/Carriers"
import { colorSchema } from "@/assets/colorSchema"


const carriers: { value: Carrier, image: any }[] = [
  {
    value: Carrier.TELCEL,
    image: require('../assets/images/carrier_logos/telcel.png')
  },
  {
    value: Carrier.ATT,
    image: require('../assets/images/carrier_logos/att.png')

  },
  {
    value: Carrier.MOVISTAR,
    image: require('../assets/images/carrier_logos/movistar.png')
  },
]

interface CarrierSelectionStepProps {
  setCarrier: (carrier: Carrier) => void
  carrier: Carrier
  recargaType: TelcelProductType
  setRecargaType: (recargaType: TelcelProductType) => void
}

export const CarrierSelectionStep = ({
  setCarrier,
  carrier,
  recargaType,
  setRecargaType,
}: CarrierSelectionStepProps) => {

  return (
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
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})