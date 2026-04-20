import { Colors } from "@/constants/theme";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
  text: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'medium';
}

export const Button = ({
  text,
  onClick,
  loading = false,
  disabled = false,
  size = 'md',
  color = 'primary'
}: ButtonProps) => {

  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start()
  }

  return (
    <Pressable
      onPress={onClick}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={{ width: '100%' }}
    >
      <Animated.View
        style={[
          styles.buttonContainer,
          { transform: [{ scale }] },
          disabled && styles.buttonDisabledContainer,
          size === 'sm' && styles.buttonSmContainer,
          size === 'lg' && styles.buttonLgContainer,
          color === 'secondary' && styles.buttonSecondaryContainer,
          color === 'accent' && styles.buttonAccentContainer,
          color === 'medium' && styles.buttonMediumContainer,
        ]}
      >

        <Text
          style={[
            styles.buttonText,
            size === 'sm' && styles.buttonSmText,
            size === 'lg' && styles.buttonLgText,
            color === 'secondary' && styles.buttonSecondaryText,
            color === 'accent' && styles.buttonAccentText,
            color === 'medium' && styles.buttonMediumText,
          ]}
        >
          {loading ? 'Cargando...' : text}
        </Text>
      </Animated.View>
    </Pressable>
  )

}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
    height: 45,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: Colors.light.primaryContent,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonDisabledContainer: {
    opacity: 0.5,
  },
  buttonSmContainer: {
    minWidth: 80,
    height: 'auto',
  },
  buttonSmText: {
    fontSize: 14,
  },
  buttonLgContainer: {
    minWidth: 150,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonLgText: {
    fontSize: 18,
  },
  buttonSecondaryContainer: {
    backgroundColor: Colors.light.secondary,
  },
  buttonSecondaryText: {
    color: Colors.light.secondaryContent,
  },
  buttonAccentContainer: {
    backgroundColor: Colors.light.accent,
  },
  buttonAccentText: {
    color: Colors.light.accentContent,
  },
  buttonMediumContainer: {
    backgroundColor: Colors.light.medium,
  },
  buttonMediumText: {
    color: Colors.light.mediumContent,
  },
});