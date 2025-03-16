import { TelcelProductType } from "@/types/Carriers"
import { Picker } from "@react-native-picker/picker"
import { StyleSheet, Text, View } from "react-native"


interface RecargaTypeSelectionProps {
  setRecargaType: (recargaType: TelcelProductType) => void
  recargaType: TelcelProductType
  disabled?: boolean
}

export const RecargaTypeSelection = ({
  setRecargaType,
  recargaType,
  disabled = false
}: RecargaTypeSelectionProps) => {

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
      >
        Tipo de Recarga
      </Text>

      <View style={styles.picker} >
        <Picker
          selectedValue={recargaType}
          onValueChange={setRecargaType}
          enabled={!disabled}
        >
          {Object.values(TelcelProductType).map((value) => (
            <Picker.Item key={`telcel-type-${value}`} label={value} value={value} />
          ))}
        </Picker>
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
  picker: {
    width: '100%',
    height: 54,
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#eeeae8'
  }
})