import { Carrier, TelcelProductType } from "@/types/Carriers"
import Ionicons from "@expo/vector-icons/MaterialIcons"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"


interface RecargaCompletedModalProps {
  open: boolean
  onClose: () => void
  date: string
  carrier: Carrier
  type: TelcelProductType
  phoneNumber: string
  amount: number
  reference: string
}

export const RecargaCompletedModal = ({
  open,
  onClose,
  date,
  carrier,
  type,
  phoneNumber,
  amount,
  reference,
}: RecargaCompletedModalProps) => {

  return (
    <Modal animationType="slide" transparent={true} visible={open} /* backdropColor="red" */>
      <View style={styles.modalContent}>
        <View style={styles.barContainer}>
          <Pressable onPress={onClose}>
            <Ionicons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>Recarga Realizada con Éxito</Text>

          <Text style={styles.subtitle}>Fecha y hora</Text>
          <Text style={styles.label}>{date}</Text>

          <Text style={styles.subtitle}>Compañía telefónica</Text>
          <Text style={styles.label}>{carrier}</Text>

          <Text style={styles.subtitle}>Tipo de recarga</Text>
          <Text style={styles.label}>{type}</Text>

          <Text style={styles.subtitle}>Número celular</Text>
          <Text style={styles.label}>{phoneNumber}</Text>

          <Text style={styles.subtitle}>Monto</Text>
          <Text style={styles.label}>${amount}</Text>

          <Text style={styles.subtitle}>Número de referencia</Text>
          <Text style={styles.label}>{reference}</Text>
        </View>
      </View>
    </Modal>
  )

}

const styles = StyleSheet.create({
  modalContent: {
    height: '70%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  barContainer: {
    height: 40,
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bodyContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: 'gray',
    fontSize: 16,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
})