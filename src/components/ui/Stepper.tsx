import { Colors } from "@/constants/theme";
import { FC, useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { ThemedView } from "../ThemedView";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface StepperProps {
  steps: { name: string }[];
  currentStep: number;
}

export const Stepper: FC<StepperProps> = ({ steps, currentStep }) => {
  const currentStepName = steps[currentStep].name;
  const nextStepName = currentStep + 1 < steps.length ? steps[currentStep + 1].name : null;

  const totalSteps = steps.length;
  const circumference = 2 * Math.PI * 45;

  const animatedProgress = useRef(new Animated.Value((currentStep + 1) / totalSteps)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: (currentStep + 1) / totalSteps,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [currentStep, totalSteps]);

  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.currentStepText}>{currentStepName}</Text>
        {nextStepName && (
          <Text style={styles.nextStepText}>Siguiente: {nextStepName}</Text>
        )}
      </View>

      {/* Progress circle */}
      <View style={styles.circleContainer}>
        <Svg width={50} height={50} viewBox="0 0 100 100">
          {/* Background stroke */}
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke={Colors.light.base300}
            strokeWidth="10"
            fill="none"
          />
          {/* Stroke */}
          <AnimatedCircle
            cx="50"
            cy="50"
            r="45"
            stroke={Colors.light.success}
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </Svg>
        <Text style={styles.circleText}>
          {currentStep + 1}/{totalSteps}
        </Text>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  leftContainer: {
    flex: 1,
  },
  currentStepText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  nextStepText: {
    fontSize: 14,
    color: "#888",
  },
  circleContainer: {
    position: "relative",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    position: "absolute",
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
});
