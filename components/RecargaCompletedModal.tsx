import { Modal, StyleSheet, Text, View } from "react-native"


interface RecargaCompletedModalProps {
  open: boolean
  onClose: () => void
}

export const RecargaCompletedModal = ({
  open,
  onClose,
}: RecargaCompletedModalProps) => {

  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View style={styles.modalContent}>
        <Text>Recarga realizada</Text>
      </View>
    </Modal>
  )

}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
})