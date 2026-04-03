import { Colors, Spacing } from "@/constants/theme";
import { getScheduledRecharges } from "@/services/recharge";
import { ScheduledTransaction } from "@/types/ScheduledTransaction";
import { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, StyleSheet, View } from "react-native";
import { formatDate } from "@/utils";
import { Column, Table } from "@/components/ui/Table";
import { ThemedView } from "@/components/ThemedView";

const columns: Column<ScheduledTransaction>[] = [
  {
    key: "date",
    header: "Fecha Programada",
    render: (item) => formatDate(new Date(item.targetYear, item.targetMonth - 1, item.targetDay)),
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
    minWidth: 30,
  },
];

export default function ScheduledRecharges() {

  const [data, setData] = useState<ScheduledTransaction[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const fetchScheduledRecharges = async () => {
    const scheduledRecharges = await getScheduledRecharges()
    const filteredRecharges = scheduledRecharges.filter(recharge => !recharge.success)
    setData(filteredRecharges)
  }

  const onRefreshHandler = () => {
    setRefreshing(true);
    fetchScheduledRecharges()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }

  useEffect(() => {
    fetchScheduledRecharges()
      .then(() => setLoading(false))
      .catch(error => {
        console.error('Error fetching scheduled recharges:', error);
      })
  }, [])

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    )
  }

  return (
    <ThemedView style={styles.container}>
      <Table
        data={data}
        columns={columns}
        keyExtractor={(item) => String(item.id)}
        emptyText="No hay recargas programadas."
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />
        }
      />
    </ThemedView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})