import { Colors } from "@/constants/theme";
import { getScheduledRecharges } from "@/services/recharge";
import { ScheduledTransaction } from "@/types/ScheduledTransaction";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { formatDate } from "@/utils";

export default function ScheduledRecharges() {

  const [data, setData] = useState<ScheduledTransaction[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const fetchScheduledRecharges = async () => {
    const scheduledRecharges = await getScheduledRecharges()
    const filteredRecharges = scheduledRecharges.filter(recharge => !recharge.success)
    setData(filteredRecharges)
  }

  const renderItem = ({ item }: { item: ScheduledTransaction }) => {
    const targetDate = new Date(item.targetYear, item.targetMonth - 1, item.targetDay);
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{formatDate(targetDate)}</Text>
        <Text style={styles.cell}>{item.phone}</Text>
        <Text style={styles.cell}></Text>
      </View>
    )
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

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.cell, styles.headerText]}>Fecha Programada</Text>
      <Text style={[styles.cell, styles.headerText]}>Número celular</Text>
      <Text style={[styles.cell, styles.headerText]}>Detalles</Text>
    </View>
  )

  const renderEmptyComponent = () => (
    <Text style={styles.emptyListText}>
      No hay recargas programadas.
    </Text>
  )

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      style={styles.container}
      ListHeaderComponent={data.length > 0 ? renderHeader : null}
      ListEmptyComponent={renderEmptyComponent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />
      }
      contentContainerStyle={data.length === 0 ? styles.emptyContainer : undefined}
    />
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.base100,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyListText: {
    textAlign: 'center',
    color: Colors.light.baseContent,
    fontSize: 18,
    marginTop: -25,
  },
})