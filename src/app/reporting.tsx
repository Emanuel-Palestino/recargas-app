import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
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
import { useAlert } from "@/hooks/useAlert";

const columns: Column<Transaction>[] = [
  {
    key: "date",
    header: "Fecha",
    render: (item) => formatDate(new Date(item.createdAtIso), true, true),
  },
  {
    key: "phone",
    header: "Número celular",
    render: (item) => item.rechargePayload.phone,
  },
  {
    key: "amount",
    header: "Monto",
    render: (item) => `$${item.rechargePayload.amount}`,
  },
];

export default function ReportsScreen() {
  const [data, setData] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
  const [endDate, setEndDate] = useState<Date>(new Date(new Date().setHours(23, 59, 59, 999)));
  const [loading, setLoading] = useState<boolean>(false);

  const { AlertContainer, showAlert } = useAlert()

  useFocusEffect(
    useCallback(() => {
      setData([]);
    }, [])
  );

  const footer = useMemo<FooterCell[]>(() => {
    const total = data.reduce<number>((prev, curr) => prev + curr.rechargePayload.amount, 0);
    return [
      { key: "date", value: "Total" },
      { key: "phone", value: "" },
      { key: "amount", value: `$${total}` },
    ];
  }, [data]);

  const generateReport = async () => {
    setLoading(true);
    console.log("Generating report with dates:", startDate.toISOString(), endDate.toISOString());

    try {
      const response = await getTransactions(startDate.toISOString(), endDate.toISOString());
      setData(response);
    } catch (error) {
      if (error instanceof UsernameNotFoundError) {
        showAlert("Error", "No se encontró el nombre de usuario. Por favor, ingrese su nombre de usuario en la pantalla de ajustes.");
      } else if (error instanceof InvalidUsernameError) {
        showAlert("Error", "Nombre de usuario inválido. Por favor, ingrese un nombre de usuario válido en la pantalla de ajustes.");
      } else {
        console.error(error);
        showAlert("Error", "Error al obtener el reporte");
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
      <AlertContainer />
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
