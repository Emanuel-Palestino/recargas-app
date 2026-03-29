import { Colors, Spacing } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { getUsername, storeUsername } from "@/store/userStore";
import { useEffect, useState } from "react";
import { Text, StyleSheet, TextInput, KeyboardAvoidingView, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUsernameChange = async () => {
    setLoading(true);
    try {
      await storeUsername(username)
      Alert.alert("Éxito", "Nombre de usuario guardado")
    } catch (error) {
      console.error(error)
      Alert.alert("Error", "No se pudo guardar el nombre de usuario")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsername().then((username) => {
      if (username) {
        setUsername(username)
      }
    })
  }, [])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.inputGroup}>
            <Text style={styles.title}>
              Nombre de usuario
            </Text>

            <TextInput
              style={styles.input}
              keyboardType="default"
              value={username}
              onChangeText={setUsername}
            />
          </ThemedView>

          <ThemedView style={styles.buttonContainer}>
            <Button
              text="Guardar usuario"
              onClick={handleUsernameChange}
              loading={loading}
              disabled={loading}
            />
          </ThemedView>

          <ThemedView style={{ flex: 1 }} />
        </SafeAreaView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  safeArea: {
    flex: 1,
    alignItems: "flex-start",
    rowGap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.one,
  },
  inputGroup: {
    width: '100%',
    gap: Spacing.one,
  },
  text: {
    color: Colors.light.baseContent,
  },
  title: {
    color: Colors.light.baseContent,
  },
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor: Colors.light.base300,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})