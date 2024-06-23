import { useState } from "react";
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
  const [entityFilter, setEntityFilter] = useState<EntityType | undefined>();
  const [typeFilter, setTypeFilter] = useState<StoryType | undefined>();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<HeaderImage />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">News</ThemedText>
      </ThemedView>
      <ThemedView style={styles.filterContainer}>
        {entityButtons.map((filter) => (
          <ThemedButton
            key={filter}
            title={entityFilters[filter]}
            onPress={() =>
              setEntityFilter((f) => (f === filter ? undefined : filter))
            }
            highlighted={entityFilter === filter}
          />
        ))}
        {storyButtons.map((filter) => (
          <ThemedButton
            key={filter}
            title={storyFilters[filter]}
            onPress={() =>
              setTypeFilter((f) => (f === filter ? undefined : filter))
            }
            highlighted={typeFilter === filter}
          />
        ))}
      </ThemedView>
      {entities
        ?.filter((entity) => {
          if (entityFilter === "district") return entity.district;
          if (entityFilter === "area") return entity.area && !entity.district;
          if (entityFilter === "gso") return !entity.area && !entity.district;
          return true;
        })
        .map((entity) => (
          <ThemedView key={entity.id}>
            <ThemedView
              style={{
                ...styles.entityName,
                borderBottomColor: colors.secondary,
              }}
            >
              <ThemedText type="defaultSemiBold">
                {entityName(entity)}
              </ThemedText>
            </ThemedView>
            {entity.stories
              .filter((story) => {
                if (!typeFilter) return true;
                return story.type === typeFilter;
              })
              .map((story) => (
                <ThemedView style={styles.newsStory} key={story.id}>
                  <ThemedText type="subtitle">{story.title}</ThemedText>
                  <ThemedText>{story.description}</ThemedText>
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

const entityFilters = {
  district: "District 06",
  area: "Area 06",
  gso: "GSO",
} as const;

const storyFilters = {
  announcement: "Announcements",
  event: "Events",
} as const;

type EntityType = keyof typeof entityFilters;
type StoryType = keyof typeof storyFilters;

const entityButtons = Object.keys(entityFilters) as EntityType[];
const storyButtons = Object.keys(storyFilters) as StoryType[];

const styles = StyleSheet.create({
  entityName: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginBottom: 10,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
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
