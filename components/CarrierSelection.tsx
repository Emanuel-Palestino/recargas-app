import { StyleSheet, Text, View } from "react-native"
import { CarrierButton } from "./CarrierButton"


const carriers: { value: string, image: any }[] = [
  {
    value: 'telcel',
    image: require('../assets/images/carrier_logos/telcel.png')
  },
  {
    value: 'movistar',
    image: require('../assets/images/carrier_logos/movistar.png')
  },
  {
    value: 'att',
    image: require('../assets/images/carrier_logos/att.png')
  }
]

interface CarrierSelectionProps {
  setCarrier: (carrier: string) => void
  carrier: string
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
        Compañía Telefónica
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
    rowGap: 6
  },
  title: {
    color: 'gray'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  }
})