import { useEffect, useState } from "react";

import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import * as Sharing from "expo-sharing";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { openLink } from "@/helpers/open-link";
import { i18n } from "@/helpers/i18n";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen() {
  const [sharingIsAvailable, setSharingIsAvailable] = useState(false);
  useEffect(() => {
    if (Platform.OS !== "ios") {
      return;
    }
    Sharing.isAvailableAsync().then((result) => {
      setSharingIsAvailable(result);
    });
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <View style={styles.header}>
          <Svg width={400.5} height={178} viewBox="0 0 2304 1024">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1151.57 843.263C1334.9 843.263 1483.52 694.644 1483.52 511.314C1483.52 327.983 1334.9 179.365 1151.57 179.365C968.241 179.365 819.623 327.983 819.623 511.314C819.623 694.644 968.241 843.263 1151.57 843.263ZM1151.57 858.511C1343.32 858.511 1498.77 703.066 1498.77 511.314C1498.77 319.562 1343.32 164.116 1151.57 164.116C959.82 164.116 804.374 319.562 804.374 511.314C804.374 703.066 959.82 858.511 1151.57 858.511Z"
              fill="white"
            />
            <Path
              d="M868.444 348.126L1434.79 348.126L1151.61 838.593L868.444 348.126Z"
              fill="#0066CC"
              stroke="white"
              strokeWidth="19"
            />
            <Path
              d="M961.743 508.129L1341.96 508.129L1151.85 837.404L961.743 508.129Z"
              fill="#03692C"
              stroke="white"
              strokeWidth="19"
            />
            <Path
              d="M1056.91 674.124L1246.17 674.124L1151.54 838.026L1056.91 674.124Z"
              fill="#D1B000"
              stroke="white"
              strokeWidth="19"
            />
          </Svg>
        </View>
      }
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
              onPress={() =>
                Sharing.shareAsync("https://generalservice.app").catch((e) =>
                  console.error(e)
                )
              }
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
  header: {
    backgroundColor: "#00437C",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
  },
  container: {
    padding: 24,
    gap: 24,
  },
});
