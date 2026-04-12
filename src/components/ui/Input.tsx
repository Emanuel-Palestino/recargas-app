import { Colors, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";

interface InputProps extends Omit<TextInputProps, 'style' | 'keyboardType'> {
  label: string;
  type?: 'text' | 'number';
  style?: ViewStyle;
}

export const Input = ({ label, type = 'text', style, ...rest }: InputProps) => {
  const colors = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Text style={{ color: colors.baseContent }}>{label}</Text>
      <TextInput
        {...rest}
        keyboardType={type === 'number' ? 'numeric' : 'default'}
        style={[styles.input, { backgroundColor: colors.base300, color: colors.baseContent }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  input: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
});
