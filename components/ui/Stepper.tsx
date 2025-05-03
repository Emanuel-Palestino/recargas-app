import { colorSchema } from "@/assets/colorSchema";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface StepperProps {
  steps: { name: string }[];
  currentStep: number;
}

export const Stepper: FC<StepperProps> = ({ steps, currentStep }) => {
  const currentStepName = steps[currentStep].name;
  const nextStepName = steps[currentStep + 1].name;

  const totalSteps = steps.length;
  const progress = (currentStep + 1) / totalSteps;
  const circumference = 2 * Math.PI * 45; // Circle circumference (radius = 45)
  const strokeDashoffset = circumference * (1 - progress); // Offset for linear progress

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.currentStepText}>{currentStepName}</Text>
        <Text style={styles.nextStepText}>Siguiente: {nextStepName}</Text>
      </View>

      {/* Progress circle */}
      <View style={styles.circleContainer}>
        <Svg width={50} height={50} viewBox="0 0 100 100">
          {/* Background stroke */}
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke={colorSchema.light.base300}
            strokeWidth="10"
            fill="none"
          />
          {/* Stroke */}
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke={colorSchema.light.success}
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)" // Rotate to start from the top
          />
        </Svg>
        <Text style={styles.circleText}>
          {currentStep + 1}/{totalSteps}
        </Text>
      </View>
    </View>
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
