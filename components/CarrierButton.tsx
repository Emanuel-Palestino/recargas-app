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
        selected ? { backgroundColor: '#f8eee8', borderColor: '#f78c50' } : {}
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
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 0,
    flexGrow: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#eeeae8',
  },
  image: {
    width: 'auto',
    height: 60,
    resizeMode: 'contain'
  }
})