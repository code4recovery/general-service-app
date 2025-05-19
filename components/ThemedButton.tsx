import React, { ReactNode } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedButton({
  icon,
  onPress,
  title,
  theme,
}: {
  icon?: ReactNode;
  onPress?: () => void;
  primary?: boolean;
  title: string;
  theme: "gso" | "area" | "district";
}) {
  const backgroundColor = useThemeColor(theme, "buttons");
  const color = useThemeColor("text");

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor,
      borderRadius: 3,
      display: "flex",
      elevation: 3,
      flexDirection: "row",
      gap: 5,
      justifyContent: "center",
      paddingHorizontal: 14,
      paddingVertical: 9,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    text: {
      color,
      fontSize: 16,
      fontWeight: "semibold",
      lineHeight: 20,
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      {icon}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
