import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text>Bienvenido</Text>
      <Link href="/recharge">Recargar celular</Link>
      <Link href="/reports">Ver reportes</Link>
      <Link href="/settings">Ajustes</Link>
    </View>
  )
}