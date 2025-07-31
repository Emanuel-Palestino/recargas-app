import { colorSchema } from "@/assets/colorSchema";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <View style={styles.featuresContainer}>
        <Link href="/recharge" asChild>
          <Pressable style={styles.featureContainer}>
            <Image
              source={require('../assets/images/icons/coin-stack.png')}
              style={styles.featureImage}
            />
            <Text style={styles.featureText}>Recargar</Text>
          </Pressable>
        </Link>
        <Link href="/reports" asChild>
          <Pressable style={styles.featureContainer}>
            <Image
              source={require('../assets/images/icons/file.png')}
              style={styles.featureImage}
            />
            <Text style={styles.featureText}>Reportes</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.miscelaneousContainer}>
        <Link href="/settings" asChild>
          <Pressable style={styles.optionContainer}>
            <Image
              source={require('../assets/images/icons/cogwheel.png')}
              style={styles.optionImage}
            />
            <Text style={styles.optionText}>Ajustes</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.light.base100,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colorSchema.light.baseContent,
    marginTop: 26,
    marginBottom: 20,
  },
  featuresContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureContainer: {
    flexDirection: 'column',
    rowGap: 10,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 30,
    backgroundColor: colorSchema.light.primary,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '47%',
  },
  featureText: {
    color: colorSchema.light.primaryContent,
    fontSize: 20,
    fontWeight: 'bold',
  },
  featureImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  miscelaneousContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionContainer: {
    flexDirection: 'column',
    rowGap: 8,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: colorSchema.light.secondary,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '32%',
  },
  optionImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  optionText: {
    color: colorSchema.light.secondaryContent,
    fontSize: 18,
    fontWeight: 'bold',
  },
})