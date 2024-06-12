import { Linking, StyleSheet } from "react-native";

import { HeaderImage } from "@/components/HeaderImage";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useContent } from "@/hooks/useContent";

export default function HomeScreen() {
  const { stories } = useContent();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<HeaderImage />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">News</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.filterContainer}>
        <ThemedButton title="District 06" />
        <ThemedButton title="Area 06" />
        <ThemedButton title="GSO" />
        <ThemedButton title="Announcements" />
        <ThemedButton title="Events" />
      </ThemedView>
      {stories.map((story, index) => (
        <ThemedView style={styles.newsStory} key={index}>
          <ThemedText type="subtitle">{story.title}</ThemedText>
          <ThemedText>{story.description}</ThemedText>
          <ThemedView style={styles.storyButtons}>
            {story.buttons.map(({ id, title, link }) => (
              <ThemedButton
                key={id}
                onPress={() => Linking.openURL(link)}
                primary
                title={title}
              />
            ))}
          </ThemedView>
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  newsStory: {
    gap: 8,
    marginTop: 16,
  },
  storyButtons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
