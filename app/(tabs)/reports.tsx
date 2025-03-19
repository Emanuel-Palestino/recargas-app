import { StyleSheet, Text, View } from "react-native";

export default function ReportsScreen() {

  return (
    <View style={styles.container}>
      <Text>Reports</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 16,
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
});