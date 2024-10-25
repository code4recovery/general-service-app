import { StyleSheet, useColorScheme } from "react-native";

import { HeaderImage } from "@/components/HeaderImage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useColors } from "@/hooks/useColors";

import { addToCalendar } from "@/helpers/add-to-calendar";
import { openLink } from "@/helpers/open-link";
import { i18n } from "@/helpers/i18n";
import { Entity, AddToCalendarButton } from "@/helpers/types";
import { Fragment } from "react";

export function EntityScreen({
  entity,
  type,
}: {
  entity: Entity;
  type: "district" | "area" | "gso";
}) {
  const colors = useColors();
  const colorScheme = useColorScheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <HeaderImage
          uri={colorScheme === "dark" ? entity.banner_dark : entity.banner}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={{ color: colors.titles[type] }}>
          {entity.name}
        </ThemedText>
      </ThemedView>
      <ThemedView key={entity.id}>
        {entity.stories.length ? (
          entity.stories.map(({ category, items }, index) => (
            <Fragment key={index}>
              <ThemedView
                style={{
                  ...styles.separator,
                  backgroundColor: colors.tabBackground,
                  borderBottomColor: colors.secondary,
                  borderTopColor: colors.secondary,
                }}
              >
                <ThemedText type="separator" style={{ opacity: 0.8 }}>
                  {i18n.t(category)}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.stories}>
                {items.map((story) => (
                  <ThemedView style={styles.story} key={story.id}>
                    <ThemedText type="subtitle">{story.title}</ThemedText>
                    {story.description
                      .split("\r\n")
                      .filter((text) => text.trim())
                      .map((text, index) => (
                        <ThemedText key={index}>{text}</ThemedText>
                      ))}
                    <ThemedView style={styles.storyButtons}>
                      {story.buttons.map(
                        ({ id, title, type: buttonType, ...rest }) => (
                          <ThemedButton
                            key={id}
                            onPress={() =>
                              buttonType === "link" && "link" in rest
                                ? openLink(rest.link as string)
                                : addToCalendar(rest as AddToCalendarButton)
                            }
                            theme={type}
                            title={title}
                          />
                        )
                      )}
                    </ThemedView>
                  </ThemedView>
                ))}
              </ThemedView>
            </Fragment>
          ))
        ) : (
          <ThemedView style={{ ...styles.stories, paddingTop: 0 }}>
            <ThemedView style={styles.story}>
              <ThemedText key="title" type="subtitle">
                {i18n.t("notParticipatingTitle", { entity: type })}
              </ThemedText>
              <ThemedText key="content">
                {i18n.t("notParticipatingDescription")}
              </ThemedText>
              <ThemedView style={{ ...styles.storyButtons, paddingTop: 16 }}>
                <ThemedButton
                  onPress={() => openLink("https://generalservice.app")}
                  theme={type}
                  title={i18n.t("learnMore")}
                />
              </ThemedView>
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const space = 24;

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: space,
    paddingVertical: space / 2,
  },
  container: {
    padding: space,
  },
  story: {
    gap: space / 2,
  },
  stories: {
    padding: space,
    paddingBottom: space * 2,
    gap: space * 1.5,
  },
  links: {
    padding: space,
    paddingBottom: space * 2,
  },
  storyButtons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space / 3,
  },
});
