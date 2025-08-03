import { colorSchema } from "@/assets/colorSchema"
import { DISPLAYED_CARRIER, DISPLAYED_PRODUCT_TYPE } from "@/assets/displayedStrings"
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "./ui/Button"
import { useRechargeStore } from "@/store/rechargeStore"


interface RecargaCompletedModalProps {
  open: boolean
  onClose: () => void
  date: string
}

export const RecargaCompletedModal = ({
  open,
  onClose,
  date,
}: RecargaCompletedModalProps) => {
  const {
    carrier,
    recargaType,
    phoneNumber,
    amount,
    isScheduledRecharge,
    targetDateTs,
  } = useRechargeStore()

  return (
    <Modal
      animationType="slide"
      //transparent={true}
      visible={open}
      /* backdropColor="red" */
      onRequestClose={onClose}
      hardwareAccelerated={true}
      presentationStyle="overFullScreen"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

        <View style={styles.modalContent}>
          <Text style={styles.title}>
            {isScheduledRecharge ? 'Recarga Programada con Éxito' : 'Recarga Realizada con Éxito'}
          </Text>

          <Text style={styles.subtitle}>
            {isScheduledRecharge ? 'Recarga programada para:' : 'Recarga realizada el:'}
          </Text>
          <Text style={styles.value}>{
            isScheduledRecharge ? new Date(targetDateTs).toDateString() : date
          }</Text>

          <Text style={styles.subtitle}>Compañía telefónica</Text>
          <Text style={styles.value}>{DISPLAYED_CARRIER[carrier]}</Text>

          <Text style={styles.subtitle}>Tipo de recarga</Text>
          <Text style={styles.value}>{DISPLAYED_PRODUCT_TYPE[recargaType]}</Text>

          <Text style={styles.subtitle}>Número celular</Text>
          <Text style={styles.value}>{phoneNumber}</Text>

          <Text style={styles.subtitle}>Monto</Text>
          <Text style={styles.value}>${amount}</Text>

          <View style={styles.actionsContainer}>
            <Button text="Finalizar" onClick={onClose} />
            {/* <Button text="Compartir" color="accent" onClick={() => { }} />
            <Button text="Guardar Cliente" color="secondary" onClick={() => { }} /> */}
          </View>
        </View>
      </ScrollView>
    </Modal>
  )

}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colorSchema.light.base100,
    position: 'absolute',
    top: 0,
    padding: 10,
    paddingVertical: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colorSchema.light.baseContent,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  subtitle: {
    color: 'gray',
    fontSize: 18,
  },
  value: {
    color: colorSchema.light.baseContent,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  actionsContainer: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: 8,
  },
})