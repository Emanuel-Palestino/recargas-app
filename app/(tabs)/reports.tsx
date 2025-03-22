import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function ReportsScreen() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const onChangeStartDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  };

  const showStartDatepicker = () => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: onChangeStartDate,
      mode: 'date',
      is24Hour: true,
    });
  };

  const showEndDatepicker = () => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: onChangeEndDate,
      mode: 'date',
      is24Hour: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>
            Fecha inicial
          </Text>
          <Pressable
            style={styles.input}
            onPress={showStartDatepicker}
          >
            <Text>{startDate.toDateString()}</Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.title}>
            Fecha final
          </Text>
          <Pressable
            style={styles.input}
            onPress={showEndDatepicker}
          >
            <Text>{endDate.toDateString()}</Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable onPress={() => console.log('Generar')}>
            <Text style={styles.button}>Generar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '48%',
  },
  title: {
    color: 'gray',
    marginBottom: 6,
  },
  input: {
    height: 46,
    borderRadius: 10,
    backgroundColor: '#eeeae8',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    backgroundColor: '#f78c50',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});