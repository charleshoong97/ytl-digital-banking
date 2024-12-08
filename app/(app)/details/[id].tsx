import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useHelper from "@/hooks/useHelper";
import { useTransactionStore } from "@/store/transaction";
import { FontAwesome6 } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { observer } from "mobx-react-lite";
import { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";

const TransactionDetails = observer(() => {
  const { id } = useLocalSearchParams();

  const { formatWithThousandSeparator } = useHelper();

  const { transaction } = useTransactionStore();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: id,
    });
  }, [navigation]);

  const details = transaction.find((trans) => trans.id === id);

  if (!details) {
    return <Redirect href={"/+not-found"} />;
  }

  return (
    <ThemedView style={styles.container}>
      <FontAwesome6
        name={
          details.type === "debit"
            ? "hand-holding-dollar"
            : "square-arrow-up-right"
        }
        size={100}
        color={details.type === "debit" ? "green" : "red"}
      />

      <ThemedView style={[{ marginTop: 50 }, styles.informationContainer]}>
        <ThemedText type="default" style={styles.label}>
          Ref No
        </ThemedText>
        <ThemedText type="default" style={styles.value}>
          {details.id}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.informationContainer}>
        <ThemedText type="default" style={styles.label}>
          Date
        </ThemedText>
        <ThemedText type="default" style={styles.value}>
          {details.date}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.informationContainer}>
        <ThemedText type="default" style={styles.label}>
          Type
        </ThemedText>
        <ThemedText
          type="default"
          style={[
            { color: details.type === "debit" ? "green" : "red" },
            styles.value,
          ]}
        >
          {details.type.toUpperCase()}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.informationContainer}>
        <ThemedText type="default" style={styles.label}>
          Amount
        </ThemedText>
        <ThemedText type="default" style={styles.value}>
          {formatWithThousandSeparator(details.amount)}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.informationContainer}>
        <ThemedText type="default" style={styles.label}>
          Currency
        </ThemedText>
        <ThemedText type="default" style={styles.value}>
          {details.currency}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.informationContainer}>
        <ThemedText type="default" style={styles.label}>
          Description
        </ThemedText>
        <ThemedText type="default" style={styles.value}>
          {details.description}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
});

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
  informationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    width: "100%",
  },
  label: {
    fontWeight: 300,
  },
  value: {
    fontWeight: 800,
  },
});
