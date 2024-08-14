import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "subtitle" | "link" | "separator" | "small";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor("text");
  const linkColor = useThemeColor("link");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "separator" ? styles.separator : undefined,
        type === "small" ? styles.small : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? { ...styles.link, color: linkColor } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 40,
    fontWeight: 300,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 600,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
  separator: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
    color: "white",
  },
  small: {
    fontSize: 14,
    lineHeight: 16,
  },
});
