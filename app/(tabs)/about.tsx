import { Image, Pressable, StyleSheet } from "react-native";
import * as Sharing from "expo-sharing";

import { Collapsible } from "@/components/Collapsible";
import { HeaderImage } from "@/components/HeaderImage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { openLink } from "@/helpers/open-link";
import { i18n } from "@/helpers/i18n";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function AboutScreen() {
  const [sharingIsAvailable, setSharingIsAvailable] = useState(false);
  useEffect(() => {
    Sharing.isAvailableAsync().then((result) => {
      setSharingIsAvailable(result);
    });
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<HeaderImage />}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{i18n.t("about")}</ThemedText>
        </ThemedView>

        <Collapsible title={i18n.t("aboutMeetings")}>
          <Pressable
            onPress={() => openLink("https://meetingguide.org/download")}
          >
            <ThemedView style={styles.downloadPanel}>
              <Image
                source={require("../../assets/images/meeting-guide.png")}
                style={styles.downloadIcon}
              />
              <ThemedView style={styles.downloadText}>
                <ThemedText>{i18n.t("aboutDownload")}</ThemedText>
                <ThemedView style={styles.downloadButton}>
                  <ThemedText style={styles.downloadButtonText}>
                    {i18n.t("download")}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </Pressable>
        </Collapsible>

        <ThemedText>{i18n.t("aboutDescription")}</ThemedText>
        <ThemedText>{i18n.t("aboutLogin")}</ThemedText>
        <ThemedView style={styles.ctaButtons}>
          <Pressable
            onPress={() => openLink("https://generalservice.app")}
            style={styles.ctaButton}
          >
            <Ionicons name="globe-outline" size={20} color="#007AFF" />
            <ThemedText style={styles.ctaButtonText}>
              {i18n.t("aboutLoginButton", { site: "generalservice.app" })}
            </ThemedText>
          </Pressable>
          {sharingIsAvailable && (
            <Pressable
              onPress={() => Sharing.shareAsync("https://generalservice.app")}
              style={styles.ctaButton}
            >
              <Ionicons name="share-outline" size={20} color="#007AFF" />
              <ThemedText style={styles.ctaButtonText}>
                {i18n.t("share")}
              </ThemedText>
            </Pressable>
          )}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  ctaButton: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#007AFF",
    display: "flex",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
  },
  ctaButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  ctaButtons: {
    gap: 24,
    marginTop: 12,
  },
  downloadButton: {
    backgroundColor: "#007AFF",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  downloadButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "semibold",
    textTransform: "uppercase",
  },
  downloadIcon: {
    width: 80,
    height: 80,
  },
  downloadPanel: {
    flexDirection: "row",
    gap: 14,
    marginTop: 7,
  },
  downloadText: {
    alignItems: "flex-start",
    gap: 5,
    marginRight: 80,
  },
  titleContainer: {
    flexDirection: "row",
  },
  container: {
    padding: 24,
    gap: 24,
  },
});
