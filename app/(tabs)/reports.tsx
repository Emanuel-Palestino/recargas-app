import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { colorSchema } from "@/assets/colorSchema";
import { Button } from "@/components/ui/Button";
import { getTransactions } from "@/services/recharge";
import { Transaction } from "@/types/Transaction";
import { InvalidUsernameError, UsernameNotFoundError } from "@/types/errors";
import { useFocusEffect } from "@react-navigation/native";

export default function ReportsScreen() {
  const [data, setData] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setData([]);
    }, [])
  );

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

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.cell}>{item.phone}</Text>
      <Text style={styles.cell}>${item.amount}</Text>
    </View>
  );

  const generateReport = async () => {
    setLoading(true);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    try {
      const response = await getTransactions(startDate.getTime(), endDate.getTime())
      setData(response)
    } catch (error) {
      if (error instanceof UsernameNotFoundError) {
        Alert.alert('Error', 'No se encontró el nombre de usuario. Por favor, ingrese su nombre de usuario en la pantalla de inicio.')
      } else if (error instanceof InvalidUsernameError) {
        Alert.alert('Error', 'Nombre de usuario inválido. Por favor, ingrese un nombre de usuario válido en la pantalla de inicio.')
      } else {
        console.error(error)
        Alert.alert('Error', 'Error al obtener el reporte')
      }
    } finally {
      setLoading(false)
    }
  }

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
          <Button
            text="Generar"
            size="sm"
            onClick={generateReport}
            loading={loading}
            disabled={loading}
          />
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
          keyExtractor={item => String(item.id)}
          style={styles.list}
        />

        <View style={styles.footer}>
          <Text style={[styles.cell, styles.footerText]}>Total</Text>
          <Text style={styles.cell}></Text>
          <Text style={[styles.cell, styles.footerText]}>${data.reduce<number>((prev, curr) => prev + curr.amount, 0)}</Text>
        </View>
      </SafeAreaView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSchema.light.base100,
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputContainer: {
    width: '48%',
  },
  title: {
    color: colorSchema.light.baseContent,
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor: colorSchema.light.base300,
    paddingHorizontal: 16,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: colorSchema.light.baseContent,
  },
  header: {
    backgroundColor: colorSchema.light.base200,
    flexDirection: 'row',
    paddingVertical: 6,
  },
  headerText: {
    fontWeight: 'bold',
    color: colorSchema.light.baseContent,
  },
  footer: {
    backgroundColor: colorSchema.light.base200,
    flexDirection: 'row',
    paddingVertical: 6,
  },
  footerText: {
    fontWeight: 'bold',
    color: colorSchema.light.baseContent,
  },
});