import * as LocalAuthentication from "expo-local-authentication";

export function useBiometric() {
  const allowBiometrics: () => Promise<boolean> = async () => {
    return await LocalAuthentication.hasHardwareAsync();
  };

  const authorize = async () => {
    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: "Verify your identity",
      fallbackLabel: "Try again with your device credential",
      requireConfirmation: false,
    });

    return success;
  };

  return {
    allowBiometrics,
    authorize,
  };
}
