import { Colors, Spacing } from "@/constants/theme"
import { DISPLAYED_CARRIER, DISPLAYED_PRODUCT_TYPE } from "@/constants/displayedStrings"
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "./ui/Button"
import { useRechargeStore } from "@/store/rechargeStore"
import { formatDate } from "@/utils"
import { ThemedView } from "./ThemedView"


interface RecargaCompletedModalProps {
  open: boolean
  onClose: () => void
}

export const RecargaCompletedModal = ({
  open,
  onClose,
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
      visible={open}
      backdropColor="rgba(0, 0, 0, 0.2)"
      onRequestClose={onClose}
      hardwareAccelerated={true}
    //presentationStyle="pageSheet" // ios only
    >
      <ScrollView
        contentContainerStyle={{ height: '100%', justifyContent: 'flex-end' }}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.modalContent}>
          <Text style={styles.title}>
            {isScheduledRecharge ? 'Recarga Programada con Éxito' : 'Recarga Realizada con Éxito'}
          </Text>

          <Text style={styles.subtitle}>
            {isScheduledRecharge ? 'Recarga programada para:' : 'Recarga realizada el:'}
          </Text>
          <Text style={styles.value}>{
            isScheduledRecharge ? formatDate(new Date(targetDateTs)) : formatDate(new Date(), true, true)
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
        </ThemedView>
      </ScrollView>
    </Modal>
  )

}

const styles = StyleSheet.create({
  modalContent: {
    minHeight: '80%',
    height: 'auto',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.light.baseContent,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: Spacing.five,
  },
  subtitle: {
    color: 'gray',
    fontSize: 18,
  },
  value: {
    color: Colors.light.baseContent,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: Spacing.three,
  },
  actionsContainer: {
    width: '100%',
    marginTop: Spacing.five,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: Spacing.three,
    rowGap: Spacing.two,
  },
})