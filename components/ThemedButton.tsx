import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedButton({
  onPress,
  title,
  theme,
}: {
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
      elevation: 3,
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
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
