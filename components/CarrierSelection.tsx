import { StyleSheet, Text, View } from "react-native"
import { CarrierButton } from "./CarrierButton"
import { Carrier } from "@/types/Carriers"
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

interface CarrierSelectionProps {
  setCarrier: (carrier: Carrier) => void
  carrier: Carrier
}

export const CarrierSelection = ({
  setCarrier,
  carrier,
}: CarrierSelectionProps) => {

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
      >
        Compañía telefónica
      </Text>

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
    rowGap: 4
  },
  title: {
    color: colorSchema.light.baseContent,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  }
})