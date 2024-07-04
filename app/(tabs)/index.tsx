import { StyleSheet } from "react-native";

import { HeaderImage } from "@/components/HeaderImage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useContent } from "@/hooks/useContent";
import { useColors } from "@/hooks/useColors";

import { entityName } from "@/helpers/entity-name";
import { openLink } from "@/helpers/open-link";

export default function HomeScreen() {
  const { entities } = useContent();
  const colors = useColors();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<HeaderImage />}
    >
      <ThemedView>
        <ThemedText type="title">News</ThemedText>
      </ThemedView>
      {entities?.map((entity) => (
        <ThemedView key={entity.id}>
          <ThemedView
            style={{
              ...styles.entityName,
              borderBottomColor: colors.secondary,
            }}
          >
            <ThemedText type="defaultSemiBold">{entityName(entity)}</ThemedText>
          </ThemedView>
          {entity.stories.map((story) => (
            <ThemedView style={styles.newsStory} key={story.id}>
              <ThemedText type="subtitle">{story.title}</ThemedText>
              {story.description.split("\r\n").map((text, index) => (
                <ThemedText key={index}>{text}</ThemedText>
              ))}
              <ThemedView style={styles.storyButtons}>
                {story.buttons.map(({ id, title, link }) => (
                  <ThemedButton
                    key={id}
                    onPress={() => openLink(link)}
                    primary
                    title={title}
                  />
                ))}
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  entityName: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginBottom: 10,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  newsStory: {
    gap: 8,
    marginVertical: 16,
  },
  storyButtons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
});
