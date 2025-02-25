import { Picker } from "@react-native-picker/picker"
import { StyleSheet, Text, View } from "react-native"


interface RecargaTypeSelectionProps {
  setRecargaType: (recargaType: string) => void
  recargaType: string
}

export const RecargaTypeSelection = ({
  setRecargaType,
  recargaType,
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
        >
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Plan Amigo" value="amigo" />
          <Picker.Item label="Internet" value="internet" />
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