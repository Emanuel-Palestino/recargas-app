import { ThemedView } from "@/components/ThemedView";
import BackIcon from "@/icons/BackIncon";
import { Spacing } from "@/constants/theme";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

export default function ExtraLayout() {
  const colors = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        // Custom header needs to be implemented due to a bug in expo, default header is not inside the safe area
        // TODO: Remove this when the bug is fixed
        header: ({ navigation, route, options }) => {
          const title = options.title ?? route.name;
          return (
            <ThemedView>
              <SafeAreaView edges={['left', 'top', 'right']} style={{}}>
                <View style={styles.headerContainer}>
                  <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <BackIcon fill={colors.baseContent} />
                  </Pressable>
                  <Text style={[styles.headerTitle, { color: colors.baseContent }]}>{title}</Text>
                </View>
              </SafeAreaView>
            </ThemedView>
          );
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="scheduled-recharges" options={{ title: 'Recargas Programadas' }} />
      <Stack.Screen name="settings" options={{ title: 'Ajustes' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  backButton: {
    marginRight: Spacing.three,
    padding: Spacing.two,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "bold",
  },
})