import { useState } from "react";
import { Alert, Platform } from "react-native";
import { AlertDialog, TextButton, Text, Host } from '@expo/ui/jetpack-compose';

export function useAlert() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const show = (alertTitle: string, alertText: string) => {
    if (Platform.OS === "android") {
      console.log("Showing alert:", alertTitle, alertText);
      setTitle(alertTitle);
      setText(alertText);
      setVisible(true);
    } else {
      Alert.alert(alertTitle, alertText);
    }
  };
  const hide = () => setVisible(false);

  const AlertContainer = () => {
    console.log("Rendering AlertContainer with visible:", visible, "title:", title, "text:", text);
    if (!visible) return null;

    return (
      <Host matchContents>
        <AlertDialog onDismissRequest={hide} properties={{ dismissOnClickOutside: false }}>
          <AlertDialog.Title>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
          </AlertDialog.Title>
          <AlertDialog.Text>
            <Text>{text}</Text>
          </AlertDialog.Text>
          {/* <AlertDialog.ConfirmButton>
            <TextButton onClick={() => setVisible(false)}>
              <Text>Confirm</Text>
            </TextButton>
          </AlertDialog.ConfirmButton> */}
          <AlertDialog.DismissButton>
            <TextButton onClick={hide}>
              <Text>Ok</Text>
            </TextButton>
          </AlertDialog.DismissButton>
        </AlertDialog>
      </Host>
    )
  }

  return {
    AlertContainer,
    showAlert: show,
  };
}