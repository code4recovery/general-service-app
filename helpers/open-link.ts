import { Linking, Platform, Alert } from "react-native";
import { LinkButton } from "./types";

export async function openLink({ link }: LinkButton) {
  if (link.includes("@") && !link.startsWith("mailto:")) {
    link = `mailto:${link}`;
  }

  if (Platform.OS === "web") {
    window.open(link, "_blank");
    return Promise.resolve();
  }

  return await Linking.openURL(encodeURI(link)).catch(() => {
    const message = link.startsWith("mailto:")
      ? "Failed to open email. Is an email app installed?"
      : `Failed to open link: ${link}`;
    Alert.alert("Error", message, [{ text: "OK" }]);
  });
}
