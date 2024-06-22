import { StyleSheet } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { HeaderImage } from "@/components/HeaderImage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useContent } from "@/hooks/useContent";
import { entityName } from "@/helpers/entity-name";

export default function AboutScreen() {
  const { entities } = useContent();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<HeaderImage />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About</ThemedText>
      </ThemedView>
      <ThemedText>
        This app is a resource for A.A. Group General Service Representatives
        (GSRs) to know what's going on in their District, Area, and at the
        General Service Office (GSO).
      </ThemedText>
      <ThemedText>
        District Chairs are welcome to use this service in their District at{" "}
        <ExternalLink href="https://generalservice.app">
          <ThemedText type="link">generalservice.app</ThemedText>
        </ExternalLink>
        .
      </ThemedText>
      <ThemedText>
        The following Districts are currently participating:
      </ThemedText>
      {entities
        ?.filter((e) => e.district)
        .map((entity, index) => (
          <ThemedText type="defaultSemiBold" key={index}>
            {entityName(entity)}
          </ThemedText>
        ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
