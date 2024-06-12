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
      paddingHorizontal: primary ? 20 : 18,
      paddingVertical: primary ? 12 : 10,
    },
    text: {
      color,
      fontSize: primary ? 16 : 14,
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