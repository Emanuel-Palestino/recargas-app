import { colorSchema } from "@/assets/colorSchema";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inicio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.light.base100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colorSchema.light.baseContent,
  },
})