import { Image, Pressable, StyleSheet } from "react-native"


interface CarrierButtonProps {
  onSelect: (operadora: string) => void
  image: any
  value: string
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
    padding: 6,
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