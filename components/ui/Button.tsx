import { colorSchema } from "@/assets/colorSchema";
import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
  text: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
}

export const Button = ({
  text,
  onClick,
  loading = false,
  disabled = false,
  size = 'md',
  color = 'primary'
}: ButtonProps) => (
  <Pressable onPress={onClick}>
    <Text
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        size === 'sm' && styles.buttonSm,
        size === 'lg' && styles.buttonLg,
        color === 'secondary' && styles.buttonSecondary,
        color === 'accent' && styles.buttonAccent,
      ]}
    >
      {loading ? 'Cargando...' : text}
    </Text>
  </Pressable>
)

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
    backgroundColor: colorSchema.light.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    color: colorSchema.light.primaryContent,
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonSm: {
    minWidth: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  buttonLg: {
    minWidth: 150,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
  },
  buttonSecondary: {
    backgroundColor: colorSchema.light.secondary,
    color: colorSchema.light.secondaryContent,
  },
  buttonAccent: {
    backgroundColor: colorSchema.light.accent,
    color: colorSchema.light.accentContent,
  },
});