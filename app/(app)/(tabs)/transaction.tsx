import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TransactionBox } from "@/components/TransactionBox";
import { useBiometric } from "@/hooks/useBiometric";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAccountStore } from "@/store/account";
import { useAuthStore } from "@/store/auth";
import { useTransactionStore } from "@/store/transaction";
import { FontAwesome6 } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { useLayoutEffect, useMemo, useState } from "react";
import useHelper from "@/hooks/useHelper";

const Transaction = observer(() => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const color = useThemeColor({}, "icon");

  const { requireBiometricAuthorization } = useAuthStore();
  const { displayName } = useAccountStore();
  const { transaction, syncTransaction } = useTransactionStore();
  const { authorize, allowBiometrics } = useBiometric();
  const { formatWithThousandSeparator } = useHelper();

  const balance = useMemo(() => {
    if (transaction.length > 0) {
      return transaction.reduce(
        (sum, item) =>
          item.type === "debit" ? sum + item["amount"] : sum - item["amount"],
        0
      );
    }
    return 0;
  }, [transaction]);

  useLayoutEffect(() => {
    syncTransaction();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await syncTransaction();
    setRefreshing(false);
  };

  const toggleViewAmount = async () => {
    try {
      if (!show) {
        if (!requireBiometricAuthorization) {
          setShow(true);
        } else if ((await allowBiometrics()) && (await authorize())) {
          setShow(true);
        } else if (!(await allowBiometrics())) {
          Alert.alert(
            "Unsupported device",
            "You device do not support biometric authorization",
            [
              {
                text: "Understood",
                onPress: () => console.log("OK Pressed"),
              },
            ]
          );
        }
      } else {
        setShow(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Welcome back, {displayName}
      </ThemedText>

      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: 10,
        }}
      >
        <ThemedText type="defaultSemiBold">Balance: </ThemedText>
        <ThemedText type="defaultSemiBold">
          {(show ? formatWithThousandSeparator(balance) : "*****") + " MYR"}
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText type="default" style={styles.title}>
          Transaction List
        </ThemedText>
        <Pressable
          style={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
          onPress={toggleViewAmount}
        >
          <FontAwesome6
            size={20}
            name={show ? "eye" : "eye-slash"}
            color={color}
          />
        </Pressable>
      </ThemedView>
      {transaction.length > 0 ? (
        <FlatList
          data={transaction}
          renderItem={({ item }) => <TransactionBox item={item} show={show} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ThemedView
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "70%",
            }}
          >
            <ThemedText style={{ textAlign: "center" }}>
              No Transaction is found
            </ThemedText>
          </ThemedView>
        </ScrollView>
      )}
    </ThemedView>
  );
});

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
});
