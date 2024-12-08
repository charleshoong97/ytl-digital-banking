import { TransactionInterface } from "@/interface/transaction";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, TouchableHighlight, ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import useHelper from "@/hooks/useHelper";
import { router } from "expo-router";

export type TransactionBoxProps = ViewProps & {
  item: TransactionInterface;
  show: boolean;
};

export function TransactionBox({ item, show }: TransactionBoxProps) {
  const { formatWithThousandSeparator } = useHelper();

  return (
    <TouchableHighlight
      style={styles.touchable}
      onPress={() => router.push("/details/" + item.id)}
    >
      <ThemedView style={styles.transactionItem}>
        <FontAwesome6
          name={
            item.type === "debit"
              ? "hand-holding-dollar"
              : "square-arrow-up-right"
          }
          size={24}
          color={item.type === "debit" ? "green" : "red"}
          style={styles.icon}
        />
        <ThemedView style={styles.details}>
          <ThemedText style={styles.description}>{item.description}</ThemedText>
          <ThemedText style={styles.date}>{item.date}</ThemedText>
        </ThemedView>
        <ThemedText
          style={[
            styles.amount,
            item.type === "debit" ? styles.income : styles.expense,
          ]}
        >
          {show
            ? (item.type === "debit" ? "+ " : "- ") +
              formatWithThousandSeparator(item.amount) +
              " " +
              item.currency
            : "***"}
        </ThemedText>
      </ThemedView>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 10,
    borderRadius: 8,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
    width: 24,
  },
  details: {
    flex: 1,
    backgroundColor: "inherit",
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  income: {
    color: "green",
  },
  expense: {
    color: "red",
  },
});
