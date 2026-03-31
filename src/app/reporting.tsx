import { useCallback, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Colors, Spacing } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { DatetimeInput } from "@/components/ui/DatetimeInput";
import { getTransactions } from "@/services/recharge";
import { Transaction } from "@/types/Transaction";
import { InvalidUsernameError, UsernameNotFoundError } from "@/types/errors";
import { useFocusEffect } from "@react-navigation/native";
import { formatDate } from "@/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";

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

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{formatDate(new Date(item.date), true, true)}</Text>
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
    <ThemedView style={styles.container}>
      <SafeAreaView edges={["left", "top", "right"]} style={styles.safeArea}>
        <DatetimeInput
          mode="range"
          startLabel="Fecha inicial"
          endLabel="Fecha final"
          startValue={startDate}
          endValue={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
        />

        <View style={styles.buttonContainer}>
          <Button
            text="Generar"
            size="sm"
            onClick={generateReport}
            loading={loading}
            disabled={loading}
          />
        </View>

        <ThemedView style={styles.listContainer}>
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
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  listContainer: {
    flex: 1,
    marginTop: Spacing.three,
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
    color: Colors.light.baseContent,
  },
  header: {
    backgroundColor: Colors.light.base200,
    flexDirection: 'row',
    paddingVertical: 6,
  },
  headerText: {
    fontWeight: 'bold',
    color: Colors.light.baseContent,
  },
  footer: {
    backgroundColor: Colors.light.base200,
    flexDirection: 'row',
    paddingVertical: 6,
  },
  footerText: {
    fontWeight: 'bold',
    color: Colors.light.baseContent,
  },
});