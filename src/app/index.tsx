import { colorSchema } from "@/assets/colorSchema";
import { useRechargeStore } from "@/store/rechargeStore";
import { Link } from "expo-router";
import { useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FEATURES_LIST = [
  {
    title: "Recargar",
    image: require('@/assets/images/icons/coin-stack.png'),
    link: "/recharge",
  },
  {
    title: "Programar Recarga",
    image: require('@/assets/images/icons/calendar.png'),
    link: "/recharge",
  },
  {
    title: "Recargas Programadas",
    image: require('@/assets/images/icons/schedule.png'),
    link: "/scheduled-recharges",
  },
  {
    title: "Reportes",
    image: require('@/assets/images/icons/financial-plan.png'),
    link: "/reports",
  },
] as const;

export default function Index() {

  const { setIsScheduledRecharge, resetState } = useRechargeStore();
  const featuresScales = useRef(FEATURES_LIST.map(() => new Animated.Value(1))).current;
  const settingsScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start()
  }

  const handlePressOut = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <View style={styles.featuresContainer}>
        {FEATURES_LIST.map((feature, index) => (
          <Link href={feature.link} asChild key={index}>
            <Pressable
              onPressIn={() => handlePressIn(featuresScales[index])}
              onPressOut={() => handlePressOut(featuresScales[index])}
              onPress={() => {
                resetState()
                setIsScheduledRecharge(feature.title === "Programar Recarga")
              }}
              style={{ width: '47%' }}
            >
              <Animated.View
                style={[
                  styles.featureContainer,
                  { transform: [{ scale: featuresScales[index] }] },
                ]}
              >
                <Image
                  source={feature.image}
                  style={styles.featureImage}
                />
                <Text
                  style={[
                    styles.featureText,
                    feature.title.length > 10 ? { fontSize: 18 } : { fontSize: 20 },
                  ]}
                >
                  {feature.title}
                </Text>
              </Animated.View>
            </Pressable>
          </Link>
        ))}
      </View>

      <View style={styles.miscelaneousContainer}>
        <Link href="/settings" asChild>
          <Pressable
            style={styles.optionContainer}
            onPressIn={() => handlePressIn(settingsScale)}
            onPressOut={() => handlePressOut(settingsScale)}
          >
            <Animated.View style={{ transform: [{ scale: settingsScale }] }}>
              <Image
                source={require('@/assets/images/icons/settings.png')}
                style={styles.optionImage}
              />
              <Text style={styles.optionText}>Ajustes</Text>
            </Animated.View>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.light.base100,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colorSchema.light.baseContent,
    marginBottom: 20,
  },
  featuresContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 16,
  },
  featureContainer: {
    width: '100%',
    height: 160,
    flexDirection: 'column',
    rowGap: 16,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 22,
    backgroundColor: colorSchema.light.primary,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  featureText: {
    color: colorSchema.light.primaryContent,
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
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: colorSchema.light.secondary,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '32%',
  },
  optionImage: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
  },
  optionText: {
    color: colorSchema.light.secondaryContent,
    fontSize: 18,
    fontWeight: 'bold',
  },
})