import { colorSchema } from "@/assets/colorSchema"
import { DISPLAYED_CARRIER, DISPLAYED_TELCEL_PRODUCT_TYPE } from "@/assets/displayedStrings"
import { Carrier, TelcelProductType } from "@/types/Carriers"
import Ionicons from "@expo/vector-icons/MaterialIcons"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { Button } from "./ui/Button"


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
          <Button text="Finalizar" onClick={onClose} />
          <Button text="Compartir" color="accent" onClick={() => { }} />
          <Button text="Guardar Cliente" color="secondary" onClick={() => { }} />
        </View>
      </View>
    </Modal>
  )

}

const styles = StyleSheet.create({
  modalContent: {
    height: '68%',
    width: '100%',
    backgroundColor: colorSchema.light.base200,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: colorSchema.light.baseContent,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    color: 'gray',
    fontSize: 16,
  },
  label: {
    color: colorSchema.light.baseContent,
    fontSize: 18,
    fontWeight: 'bold',
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
})