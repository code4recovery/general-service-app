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
import { Ionicons } from "@expo/vector-icons";

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
                      .split("\r\n\r\n")
                      .map((text) => text.trim())
                      .filter((text) => text)
                      .map((text, index) => (
                        <ThemedView style={styles.paragraph} key={index}>
                          {text.split("\r\n").map((text, index) => (
                            <ThemedText key={index}>{text}</ThemedText>
                          ))}
                        </ThemedView>
                      ))}
                    <ThemedView style={styles.storyButtons}>
                      {story.buttons.map(
                        ({ id, title, type: buttonType, ...rest }) => (
                          <ThemedButton
                            icon={
                              buttonType === "link" &&
                              "link" in rest &&
                              fileExtensions.some((extension) =>
                                rest.link.endsWith(extension)
                              ) ? (
                                <Ionicons
                                  name="document"
                                  size={18}
                                  color={colors.text}
                                />
                              ) : null
                            }
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

const fileExtensions = [
  ".doc",
  ".docx",
  ".key",
  ".pdf",
  ".ppt",
  ".pptx",
  ".xls",
  "xlsx",
];

const space = 24;

const styles = StyleSheet.create({
  container: {
    padding: space,
  },
  links: {
    padding: space,
    paddingBottom: space * 2,
  },
  paragraph: {
    display: "flex",
    flexDirection: "column",
  },
  separator: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: space,
    paddingVertical: space / 2,
  },
  stories: {
    padding: space,
    paddingBottom: space * 2,
    gap: space * 1.5,
  },
  story: {
    gap: space / 1.5,
  },
  storyButtons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space / 3,
    marginTop: space / 4,
  },
});
