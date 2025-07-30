import { colorSchema } from "@/assets/colorSchema";
import { Button } from "@/components/ui/Button";
import { getUsername, storeUsername } from "@/store/userStore";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Alert } from "react-native";

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
      <View style={styles.container}>
        <View style={{ width: '100%', rowGap: 4 }}>
          <Text style={styles.title}>
            Nombre de usuario
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="default"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            text="Guardar usuario"
            onClick={handleUsernameChange}
            loading={loading}
            disabled={loading}
          />
        </View>

        <View style={{ flex: 1 }} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.light.base100,
    justifyContent: "flex-end",
    alignItems: "center",
    rowGap: 22,
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  text: {
    color: colorSchema.light.baseContent,
  },
  title: {
    color: colorSchema.light.baseContent,
  },
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor: colorSchema.light.base300,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})