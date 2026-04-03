import { ThemedView } from "@/components/ThemedView";
import { Colors, Spacing } from "@/constants/theme";
import ScheduledRechargesIcon from "@/icons/ScheduledRechargesIcon";
import ScheduleRechargeIcon from "@/icons/ScheduleRechargeIcon";
import SettingsIcon from "@/icons/SettingsIcon";
import { useRechargeStore } from "@/store/rechargeStore";
import { Link } from "expo-router";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FEATURES_LIST = [
  {
    title: "Programar Recarga",
    icon: <ScheduleRechargeIcon width={45} height={45} fill={Colors.light.primaryContent} />,
    link: "/recharge",
  },
  {
    title: "Recargas Programadas",
    icon: <ScheduledRechargesIcon width={45} height={45} fill={Colors.light.primaryContent} />,
    link: "/extra/scheduled-recharges",
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
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.featuresContainer}>
          {FEATURES_LIST.map((feature, index) => (
            <Link href={feature.link} asChild key={index} style={{ flex: 1 }}>
              <Pressable
                onPressIn={() => handlePressIn(featuresScales[index])}
                onPressOut={() => handlePressOut(featuresScales[index])}
                onPress={() => {
                  resetState()
                  setIsScheduledRecharge(feature.title === "Programar Recarga")
                }}
              >
                <Animated.View
                  style={[
                    styles.featureContainer,
                    { transform: [{ scale: featuresScales[index] }] },
                  ]}
                >
                  {feature.icon}
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
          <Link href="/extra/settings" asChild>
            <Pressable
              style={{ width: '32%' }}
              onPressIn={() => handlePressIn(settingsScale)}
              onPressOut={() => handlePressOut(settingsScale)}
            >
              <Animated.View style={[styles.optionContainer, { transform: [{ scale: settingsScale }] }]}>
                <SettingsIcon width={30} height={30} fill={Colors.light.secondaryContent} />
                <Text style={styles.optionText}>Ajustes</Text>
              </Animated.View>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  featuresContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.four,
    gap: Spacing.three,
  },
  featureContainer: {
    flexDirection: 'column',
    rowGap: Spacing.three,
    borderRadius: 24,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  featureText: {
    color: Colors.light.primaryContent,
    fontWeight: 'bold',
  },
  miscelaneousContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionContainer: {
    flexDirection: 'column',
    rowGap: Spacing.two,
    borderRadius: 24,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    backgroundColor: Colors.light.secondary,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  optionText: {
    color: Colors.light.secondaryContent,
    fontSize: 18,
    fontWeight: 'bold',
  },
})