import {
  Alert,
  Appearance,
  ColorSchemeName,
  StyleSheet,
  Switch,
} from "react-native";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useBiometric } from "@/hooks/useBiometric";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAccountStore } from "@/store/account";
import { useAuthStore } from "@/store/auth";
import { Avatar } from "@kolking/react-native-avatar";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useTransactionStore } from "@/store/transaction";

const Account = observer(() => {
  const colorScheme_2 = useColorScheme();
  const {
    requireBiometricAuthorization,
    toggleRequireBiometricAuthorization,
    logout,
  } = useAuthStore();
  const { displayName, clearAccount } = useAccountStore();
  const { clearTransaction } = useTransactionStore();
  const { allowBiometrics, authorize } = useBiometric();

  const [colorScheme, setColorSc] = useState<ColorSchemeName>(colorScheme_2);

  const color = useThemeColor({}, "icon");

  const toggleColorMode = (value: boolean) => {
    setColorSc(value ? "dark" : "light");
    Appearance.setColorScheme(value ? "dark" : "light");
  };

  const toggleBiometricValidation = async (value: boolean) => {
    try {
      if ((await allowBiometrics()) && (await authorize())) {
        toggleRequireBiometricAuthorization(value);
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
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    clearAccount();
    clearTransaction();
    logout();
    router.replace("/login");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <Avatar size={100} name={displayName} />

        <ThemedText type="title" style={{ textAlign: "center" }}>
          {displayName}
        </ThemedText>

        <ThemedView style={styles.toggle}>
          <ThemedText type="defaultSemiBold">Dark Mode</ThemedText>
          <Switch
            style={{ backgroundColor: "transparent" }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={color}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleColorMode}
            value={colorScheme === "dark"}
          />
        </ThemedView>

        <ThemedView style={styles.toggle}>
          <ThemedView>
            <ThemedText type="defaultSemiBold">Biometric Validation</ThemedText>
            <ThemedText type="caption">(eg. FaceID, TouchID)</ThemedText>
          </ThemedView>
          <Switch
            style={{ backgroundColor: "transparent" }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={color}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleBiometricValidation}
            value={requireBiometricAuthorization}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedButton onPress={handleLogout}>
          <ThemedText
            style={{ textAlign: "center", color: "white" }}
            type="subtitle"
          >
            Logout
          </ThemedText>
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
});

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 50,
    justifyContent: "space-between",
  },
  contentContainer: {
    gap: 16,
    overflow: "hidden",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
