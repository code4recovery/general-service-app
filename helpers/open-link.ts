import { Linking, Platform, Alert } from "react-native";

export async function openLink(href: string) {
  if (href.includes("@") && !href.startsWith("mailto:")) {
    href = `mailto:${href}`;
  }

  if (Platform.OS === "web") {
    window.open(href, "_blank");
    return Promise.resolve();
  }

  return await Linking.openURL(encodeURI(href)).catch(() => {
    const message = href.startsWith("mailto:")
      ? "Failed to open email. Is an email app installed?"
      : `Failed to open link: ${href}`;
    Alert.alert("Error", message, [{ text: "OK" }]);
  });
}
