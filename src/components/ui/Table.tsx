import React, { useMemo } from "react";
import { FlatList, RefreshControlProps, StyleSheet, Text, View } from "react-native";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

export type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => string;
  minWidth?: number;
};

export type FooterCell = {
  key: string;
  value: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  footer?: FooterCell[];
  emptyText?: string;
  refreshControl?: React.ReactElement<RefreshControlProps>;
};

export function Table<T>({
  data,
  columns,
  keyExtractor,
  footer,
  emptyText = "Sin resultados",
  refreshControl,
}: TableProps<T>) {
  const theme = useTheme();

  const flexValues = useMemo(() => {
    return columns.map((col) => {
      const maxDataLen = data.reduce((max, item) => {
        return Math.max(max, col.render(item).length);
      }, 0);
      return Math.max(1, col.header.length, maxDataLen);
    });
  }, [columns, data]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: "row",
          paddingVertical: 12,
        },
        bandedRow: {
          backgroundColor: theme.base200,
        },
        cell: {
          textAlign: "center",
          color: theme.baseContent,
          paddingHorizontal: Spacing.two,
        },
        stripe: {
          flexDirection: "row",
          paddingVertical: 6,
          backgroundColor: theme.base300,
        },
        stripeText: {
          fontWeight: "bold",
          textAlign: "center",
          color: theme.baseContent,
          paddingHorizontal: Spacing.two,
        },
        empty: {
          paddingVertical: Spacing.four,
          textAlign: "center",
          color: theme.baseContent,
        },
      }),
    [theme]
  );

  const renderItem = ({ item, index }: { item: T; index: number }) => (
    <View style={[styles.row, index % 2 !== 0 && styles.bandedRow]}>
      {columns.map((col, i) => (
        <Text key={col.key} style={[styles.cell, { flex: flexValues[i], minWidth: col.minWidth }]}>
          {col.render(item)}
        </Text>
      ))}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.stripe}>
      {columns.map((col, i) => (
        <Text key={col.key} style={[styles.stripeText, { flex: flexValues[i], minWidth: col.minWidth }]}>
          {col.header}
        </Text>
      ))}
    </View>
  );

  const renderFooter = () => footer && footer.length > 0 ? (
    <View style={styles.stripe}>
      {columns.map((col, i) => {
        const cell = footer.find((f) => f.key === col.key);
        return (
          <Text key={col.key} style={[styles.stripeText, { flex: flexValues[i], minWidth: col.minWidth }]}>
            {cell?.value ?? ""}
          </Text>
        );
      })}
    </View>
  ) : null;

  const renderEmpty = () => (
    <Text style={styles.empty}>{emptyText}</Text>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      refreshControl={refreshControl}
    />
  );
}
