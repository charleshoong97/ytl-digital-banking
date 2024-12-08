import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedButtonProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "button");

  return (
    <Pressable
      style={[
        {
          backgroundColor: color,
          padding: 12,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        style,
      ]}
      {...rest}
    />
  );
}
