import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<TextStyle>;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const colorScheme = useColorScheme();

  return (
    <TextInput
      {...rest}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colorScheme === "dark" ? "#fff" : "white",
          padding: 12,
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 8,
          marginBottom: 10,
        },
        style,
      ]}
    />
  );
}
