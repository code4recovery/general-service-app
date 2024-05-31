import { Image, StyleSheet, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const news = [
  {
    title: "Open Positions in SF General Service",
    description:
      "We have openings for a Literature Rep, BTG Co-Chair, Liaison to SF Public Relations and several DCMs.  Please consider making yourself available.",
    buttons: ["I'm available!"],
  },
  {
    title: "Save the Date for SF Unity Day",
    description:
      "Saturday, October 5, 2024 at First Unitarian Universalist Church on 1187 Franklin Street at Gough!  This year will be more of a forum/assembly format in order to promote increased dialogue between SF General Service, Intergroup and H&I.",
    buttons: ["Add to calendar", "I want to help!"],
  },
  {
    title: "Area Delegate's Report",
    description:
      "Please pass along to your groups.  The Area Delegate's powerpoint presentation is now available for download.",
    buttons: ["View the presentation"],
  },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/golden-gate-bridge.jpg")}
          style={styles.goldenGateBridge}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">News</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.filterContainer}>
        <Button title="Announcements" color="gray" />
        <Button title="Events" color="gray" />
        <Button title="District 06" color="gray" />
        <Button title="Area 06" color="gray" />
        <Button title="GSO" color="gray" />
      </ThemedView>
      {news.map((story, index) => (
        <ThemedView style={styles.newsStory} key={index}>
          <ThemedText type="subtitle">{story.title}</ThemedText>
          <ThemedText>{story.description}</ThemedText>
          {story.buttons.map((button, index) => (
            <Button key={index} title={button} />
          ))}
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterContainer: {
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  newsStory: {
    gap: 8,
    marginBottom: 8,
  },
  goldenGateBridge: {
    height: 280,
    width: 1200,
    left: "50%",
    marginLeft: -600,
  },
});
