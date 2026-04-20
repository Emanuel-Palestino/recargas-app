import { Spacing } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getUsername, storeUsername } from "@/store/userStore";
import { useEffect, useState } from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useAlert } from "@/hooks/useAlert";

export default function Settings() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { AlertContainer, showAlert } = useAlert()

  const handleUsernameChange = async () => {
    setLoading(true);
    try {
      await storeUsername(username)
      showAlert("Éxito", "Nombre de usuario guardado")
    } catch (error) {
      console.error(error)
      showAlert("Error", "No se pudo guardar el nombre de usuario")
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
      style={styles.container}
      behavior="padding"
    >
      <ThemedView style={styles.themedView}>
        <Input
          type="text"
          label="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.inputGroup}
        />

        <ThemedView style={styles.buttonContainer}>
          <Button
            text="Guardar usuario"
            onClick={handleUsernameChange}
            loading={loading}
            disabled={loading}
          />
        </ThemedView>

        <ThemedView style={{ flex: 1 }} />
      </ThemedView>
      <AlertContainer />
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  themedView: {
    flex: 1,
    alignItems: "flex-start",
    rowGap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  inputGroup: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
