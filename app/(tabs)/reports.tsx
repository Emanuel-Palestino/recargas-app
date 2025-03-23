import { useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

const data = [
  { id: '1', fecha: '2025-03-20', celular: '0991234567', monto: '$50.00' },
];

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

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.fecha}</Text>
      <Text style={styles.cell}>{item.celular}</Text>
      <Text style={styles.cell}>{item.monto}</Text>
    </View>
  );

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

      <SafeAreaView style={styles.listContainer}>
        <View style={styles.header}>
          <Text style={[styles.cell, styles.headerText]}>Fecha</Text>
          <Text style={[styles.cell, styles.headerText]}>Número celular</Text>
          <Text style={[styles.cell, styles.headerText]}>Monto</Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
        <View style={styles.footer}>
          <Text style={[styles.cell, styles.footerText]}>Total</Text>
          <Text style={styles.cell}></Text>
          <Text style={[styles.cell, styles.footerText]}>${1000}</Text>
        </View>
      </SafeAreaView>
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
    marginBottom: 4,
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
    marginBottom: 12,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    backgroundColor: '#f78c50',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },
  header: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    paddingVertical: 6,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    paddingVertical: 6,
  },
  footerText: {
    fontWeight: 'bold',
    color: '#000',
  },
});