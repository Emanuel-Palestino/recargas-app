import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { formatDate } from "@/utils";
import DateTimePicker, { DateTimePickerChangeEvent } from "@expo/ui/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

// ─── Internal single-field picker ────────────────────────────────────────────

interface FieldProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  includeTime?: boolean;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  inputTextStyle?: TextStyle;
  minDate?: Date;
}

const PickerField = ({
  label,
  value,
  onChange,
  includeTime = false,
  style,
  inputStyle,
  inputTextStyle,
  minDate,
}: FieldProps) => {
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);

  const mode = includeTime ? 'datetime' : 'date';
  const colors = useTheme();

  return (
    <View style={[styles.fieldContainer, style]}>
      <Text style={[{ color: colors.baseContent }]}>{label}</Text>
      {Platform.OS === 'android' ? (
        <>
          <Pressable style={[styles.input, { backgroundColor: colors.base300 }, inputStyle]} onPress={() => setShowAndroidPicker(true)}>
            <Text style={[styles.inputText, {color: colors.baseContent}, inputTextStyle]}>{formatDate(value, includeTime)}</Text>
          </Pressable>
          {showAndroidPicker && (
            <DateTimePicker
              value={value}
              mode={mode}
              presentation="dialog"
              onValueChange={(_event: DateTimePickerChangeEvent, selectedDate: Date) => {
                setShowAndroidPicker(false);
                const mexOffset = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
                const mexicanDate = new Date(selectedDate.getTime() + mexOffset);
                onChange(mexicanDate);
              }}
              onDismiss={() => setShowAndroidPicker(false)}
              minimumDate={minDate}
              timeZoneName="America/Mexico_City"
            />
          )}
        </>
      ) : (
        <DateTimePicker
          value={value}
          mode={mode}
          display="compact"
          onValueChange={(_event: DateTimePickerChangeEvent, selectedDate: Date) => {
            const mexOffset = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
            const mexicanDate = new Date(selectedDate.getTime() + mexOffset);
            onChange(mexicanDate);
          }}
          minimumDate={minDate}
          timeZoneName="America/Mexico_City"
        />
      )}
    </View>
  );
};

// ─── Public API ───────────────────────────────────────────────────────────────

interface SingleProps {
  mode?: 'single';
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  includeTime?: boolean;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  inputTextStyle?: TextStyle;
  minDate?: Date;
}

interface RangeProps {
  mode: 'range';
  startLabel: string;
  endLabel: string;
  startValue: Date;
  endValue: Date;
  onStartChange: (date: Date) => void;
  onEndChange: (date: Date) => void;
  includeTime?: boolean;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  inputTextStyle?: TextStyle;
  minDate?: Date;
}

type DatetimeInputProps = SingleProps | RangeProps;

export const DatetimeInput = (props: DatetimeInputProps) => {
  if (props.mode === 'range') {
    const {
      startLabel,
      endLabel,
      startValue,
      endValue,
      onStartChange,
      onEndChange,
      includeTime,
      style,
      inputTextStyle,
      inputStyle,
      minDate,
    } = props;
    return (
      <View style={[styles.rangeContainer, style]}>
        <PickerField
          label={startLabel}
          value={startValue}
          onChange={onStartChange}
          includeTime={includeTime}
          style={styles.rangeField}
          inputStyle={inputStyle}
          inputTextStyle={inputTextStyle}
          minDate={minDate}
        />
        <PickerField
          label={endLabel}
          value={endValue}
          onChange={onEndChange}
          includeTime={includeTime}
          style={styles.rangeField}
          inputStyle={inputStyle}
          inputTextStyle={inputTextStyle}
          minDate={minDate}
        />
      </View>
    );
  }

  const { label, value, onChange, includeTime, style, inputStyle, inputTextStyle, minDate } = props;
  return (
    <PickerField
      label={label}
      value={value}
      onChange={onChange}
      includeTime={includeTime}
      style={style}
      inputStyle={inputStyle}
      inputTextStyle={inputTextStyle}
      minDate={minDate}
    />
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    //gap: Spacing.one,
  },
  input: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 16,
  },
  rangeContainer: {
    flexDirection: 'row',
    gap: Spacing.two,
    width: '100%',
  },
  rangeField: {
    flex: 1,
  },
});
