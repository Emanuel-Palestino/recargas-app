import { Colors, Spacing } from "@/constants/theme";
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";

interface InputProps extends Omit<TextInputProps, 'style' | 'keyboardType'> {
  label: string;
  type?: 'text' | 'number';
  style?: ViewStyle;
}

export const Input = ({ label, type = 'text', style, ...rest }: InputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        keyboardType={type === 'number' ? 'numeric' : 'default'}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  label: {
    color: Colors.light.baseContent,
  },
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor: Colors.light.base300,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
});
