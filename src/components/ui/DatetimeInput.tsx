import { Colors, Spacing } from "@/constants/theme";
import { formatDate } from "@/utils";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
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
  const [showIosPicker, setShowIosPicker] = useState(false);

  const displayText = formatDate(value, includeTime);

  const openAndroid = () => {
    DateTimePickerAndroid.open({
      value,
      mode: 'date',
      is24Hour: true,
      minimumDate: minDate,
      onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type !== 'set' || !selectedDate) return;

        if (!includeTime) {
          onChange(selectedDate);
          return;
        }

        DateTimePickerAndroid.open({
          value: selectedDate,
          mode: 'time',
          is24Hour: true,
          onChange: (timeEvent: DateTimePickerEvent, selectedTime?: Date) => {
            if (timeEvent.type === 'set' && selectedTime) {
              onChange(selectedTime);
            }
          },
        });
      },
    });
  };

  const handlePress = () => {
    if (Platform.OS === 'android') {
      openAndroid();
    } else {
      setShowIosPicker((prev) => !prev);
    }
  };

  const handleIosChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={[styles.fieldContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={[styles.input, inputStyle]} onPress={handlePress}>
        <Text style={[styles.inputText, inputTextStyle]}>{displayText}</Text>
      </Pressable>
      {Platform.OS === 'ios' && showIosPicker && (
        <DateTimePicker
          value={value}
          mode={includeTime ? 'datetime' : 'date'}
          display="spinner"
          onChange={handleIosChange}
          minimumDate={minDate}
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

  const {
    label,
    value,
    onChange,
    includeTime,
    style,
    inputStyle,
    inputTextStyle,
    minDate,
  } = props;
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
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 16,
    color: Colors.light.baseContent,
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
