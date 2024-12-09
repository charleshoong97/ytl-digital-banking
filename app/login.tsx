import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useBiometric } from "@/hooks/useBiometric";
import { LoginInterface } from "@/interface/login";
import { useAccountStore } from "@/store/account";
import { useAuthStore } from "@/store/auth";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export default function Login() {
  const [error, setError] = useState<string>("");
  const { login } = useAuthStore();
  const { authorizeAccess } = useAccountStore();
  const { allowBiometrics, authorize } = useBiometric();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInterface) => {
    try {
      if (data.username !== "admin" && data.password !== "admin") {
        setError("Invalid username or password");
        return;
      } else if (await allowBiometrics()) {
        if (await authorize()) {
          login("charles");
          authorizeAccess(data.username);
          router.replace("(app)");
        } else {
          setError("Unable to validate your biometric");
        }
      } else if (!(await allowBiometrics())) {
        setError("You device do not support biometric login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        YTL Digital Banking
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Login to your account
      </ThemedText>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...rest } }) => (
          <ThemedTextInput
            {...rest}
            autoCapitalize="none"
            onChangeText={rest.onChange}
            placeholder="Username"
          />
        )}
        name="username"
      />
      {errors.username && (
        <ThemedText style={styles.errorText}>Username is required.</ThemedText>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...rest } }) => (
          <ThemedTextInput
            {...rest}
            autoCapitalize="none"
            onChangeText={rest.onChange}
            secureTextEntry={true}
            placeholder="Password"
          />
        )}
        name="password"
      />
      {errors.password && (
        <ThemedText style={styles.errorText}>Password is required.</ThemedText>
      )}

      <ThemedButton
        style={styles.loginButton}
        onPress={(event) => {
          setError("");
          handleSubmit(onSubmit)(event);
        }}
      >
        <ThemedText style={styles.loginButtonText} type="subtitle">
          Login
        </ThemedText>
      </ThemedButton>

      {error && (
        <ThemedText
          style={[{ paddingTop: 20, textAlign: "center" }, styles.errorText]}
        >
          {error}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: "50%",
  },
  title: {
    marginBottom: 30,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 30,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    paddingBottom: 20,
  },
  loginButton: {
    marginTop: 50,
    width: 150,
    alignSelf: "center",
  },
  loginButtonText: {
    textAlign: "center",
  },
});
