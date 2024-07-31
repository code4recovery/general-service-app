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
import { i18n } from "@/helpers/i18n";

export default function HomeScreen() {
  const { entities } = useContent();
  const colors = useColors();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<HeaderImage />}
    >
      <ThemedView style={styles.heading}>
        <ThemedText type="title">{i18n.t("news")}</ThemedText>
      </ThemedView>
      {entities?.map((entity) => (
        <ThemedView key={entity.id}>
          <ThemedView
            style={{
              ...styles.entitySeparator,
              backgroundColor: colors.secondary,
            }}
          >
            <ThemedText type="defaultSemiBold">{entityName(entity)}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.stories}>
            {entity.stories.length === 0 && (
              <ThemedView style={styles.newsStory}>
                <ThemedText>{i18n.t("noNews")}</ThemedText>
              </ThemedView>
            )}
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
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  entitySeparator: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  heading: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  newsStory: {
    gap: 8,
    paddingHorizontal: 24,
  },
  stories: {
    gap: 30,
    paddingVertical: 30,
  },
  storyButtons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
});
