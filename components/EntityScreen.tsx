import { StyleSheet, useColorScheme } from "react-native";

import { HeaderImage } from "@/components/HeaderImage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useColors } from "@/hooks/useColors";

import { entityName } from "@/helpers/entity-name";
import { addToCalendar } from "@/helpers/add-to-calendar";
import { openLink } from "@/helpers/open-link";
import { i18n } from "@/helpers/i18n";
import { Entity, LinkButton, AddToCalendarButton } from "@/helpers/types";
import { ExternalLink } from "./ExternalLink";

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
          {entityName(entity)}
        </ThemedText>
      </ThemedView>
      <ThemedView key={entity.id}>
        {!!entity.stories.length && (
          <ThemedView
            style={{
              ...styles.separator,
              backgroundColor: colors.tabBackground,
              borderBottomColor: colors.secondary,
              borderTopColor: colors.secondary,
            }}
          >
            <ThemedText type="separator" style={{ opacity: 0.8 }}>
              {i18n.t("announcementsAndEvents")}
            </ThemedText>
          </ThemedView>
        )}
        <ThemedView style={styles.stories}>
          {entity.stories.length === 0 && (
            <ThemedView style={styles.story}>
              <ThemedText>{i18n.t("noNews")}</ThemedText>
            </ThemedView>
          )}
          {entity.stories.map((story) => (
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
                        buttonType === "link"
                          ? openLink(rest as LinkButton)
                          : addToCalendar({
                              title,
                              ...rest,
                            } as AddToCalendarButton)
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
        {!!entity.links.length && (
          <>
            <ThemedView
              style={{
                ...styles.separator,
                backgroundColor: colors.tabBackground,
                borderBottomColor: colors.secondary,
                borderTopColor: colors.secondary,
              }}
            >
              <ThemedText type="separator" style={{ opacity: 0.8 }}>
                {i18n.t("links")}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.links}>
              {entity.links.map((contact, index) => (
                <ThemedView key={index}>
                  <ExternalLink href={contact.target}>
                    <ThemedText type="link">{contact.title}</ThemedText>
                  </ExternalLink>
                </ThemedView>
              ))}
            </ThemedView>
          </>
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
