import { DISPLAYED_CARRIER, DISPLAYED_TELCEL_PRODUCT_TYPE } from "@/assets/displayedStrings"
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
        <Text style={styles.title}>Recarga Realizada con Éxito</Text>

        <Text style={styles.subtitle}>Fecha y hora</Text>
        <Text style={styles.label}>{date}</Text>

        <Text style={styles.subtitle}>Compañía telefónica</Text>
        <Text style={styles.label}>{DISPLAYED_CARRIER[carrier]}</Text>

        <Text style={styles.subtitle}>Tipo de recarga</Text>
        <Text style={styles.label}>{DISPLAYED_TELCEL_PRODUCT_TYPE[type]}</Text>

        <Text style={styles.subtitle}>Número celular</Text>
        <Text style={styles.label}>{phoneNumber}</Text>

        <Text style={styles.subtitle}>Monto</Text>
        <Text style={styles.label}>${amount}</Text>

        <Text style={styles.subtitle}>Número de referencia</Text>
        <Text style={styles.label}>{reference}</Text>

        <View style={styles.actionsContainer}>
          <Pressable onPress={onClose}>
            <Text style={styles.button}>Finalizar</Text>
          </Pressable>

          <Pressable onPress={() => { }}>
            <Text style={styles.button}>Guardar Cliente</Text>
          </Pressable>

          <Pressable onPress={() => { }}>
            <Text style={styles.button}>Compartir</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )

}

const styles = StyleSheet.create({
  modalContent: {
    height: '68%',
    width: '100%',
    backgroundColor: '#464c55',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
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
  actionsContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    width: 150,
    backgroundColor: '#f78c50',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
})