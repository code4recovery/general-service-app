import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedButton({
  onPress,
  primary = false,
  title,
}: {
  onPress?: () => void;
  primary?: boolean;
  title: string;
}) {
  const backgroundColor = useThemeColor({}, primary ? "primary" : "secondary");
  const color = useThemeColor({}, "text");

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor,
      borderRadius: 3,
      elevation: 3,
      justifyContent: "center",
      paddingHorizontal: primary ? 24 : 14,
      paddingVertical: primary ? 8 : 5,
    },
    text: {
      color,
      fontSize: primary ? 14 : 12,
      fontWeight: 600,
      lineHeight: primary ? 20 : 16,
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
