import { colorSchema } from "@/assets/colorSchema"
import { Carrier } from "@/types/Carriers"
import { Image, Pressable, StyleSheet } from "react-native"


interface CarrierButtonProps {
  onSelect: (carrier: Carrier) => void
  image: any
  value: Carrier
  selected?: boolean
}

export const CarrierButton = ({
  onSelect,
  image,
  value,
  selected = false,
}: CarrierButtonProps) => {

  return (
    <Pressable
      style={[
        styles.button,
        selected && styles.buttonSelected,
      ]}
      onPress={() => onSelect(value)}
    >
      {/* Select image from assets folder */}
      <Image
        source={image}
        style={styles.image}
      />
    </Pressable>
  )

}

const styles = StyleSheet.create({
  button: {
    width: '48%',
    backgroundColor: colorSchema.light.base100,
    padding: 12,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: colorSchema.light.base300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: '1%',
  },
  buttonSelected: {
    backgroundColor: colorSchema.light.base300,
    borderColor: colorSchema.light.secondary,
  },
  image: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
})