import { useCallback, useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Spacing } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { DatetimeInput } from "@/components/ui/DatetimeInput";
import { Table, Column, FooterCell } from "@/components/ui/Table";
import { getTransactions } from "@/services/recharge";
import { Transaction } from "@/types/Transaction";
import { InvalidUsernameError, UsernameNotFoundError } from "@/types/errors";
import { useFocusEffect } from "@react-navigation/native";
import { formatDate } from "@/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";

const columns: Column<Transaction>[] = [
  {
    key: "date",
    header: "Fecha",
    render: (item) => formatDate(new Date(item.date), true, true),
  },
  {
    key: "phone",
    header: "Número celular",
    render: (item) => item.phone,
  },
  {
    key: "amount",
    header: "Monto",
    render: (item) => `$${item.amount}`,
  },
];

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

  const footer = useMemo<FooterCell[]>(() => {
    const total = data.reduce<number>((prev, curr) => prev + curr.amount, 0);
    return [
      { key: "date", value: "Total" },
      { key: "phone", value: "" },
      { key: "amount", value: `$${total}` },
    ];
  }, [data]);

  const generateReport = async () => {
    setLoading(true);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    try {
      const response = await getTransactions(startDate.getTime(), endDate.getTime());
      setData(response);
    } catch (error) {
      if (error instanceof UsernameNotFoundError) {
        Alert.alert("Error", "No se encontró el nombre de usuario. Por favor, ingrese su nombre de usuario en la pantalla de inicio.");
      } else if (error instanceof InvalidUsernameError) {
        Alert.alert("Error", "Nombre de usuario inválido. Por favor, ingrese un nombre de usuario válido en la pantalla de inicio.");
      } else {
        console.error(error);
        Alert.alert("Error", "Error al obtener el reporte");
      }
    } finally {
      setLoading(false);
    }
  };

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
          <Table
            data={data}
            columns={columns}
            keyExtractor={(item) => String(item.id)}
            footer={footer}
          />
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
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
    paddingVertical: Spacing.three,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.two,
  },
  listContainer: {
    flex: 1,
    marginTop: Spacing.three,
  },
});
