import { StyleSheet } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { HeaderImage } from "@/components/HeaderImage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useContent } from "@/hooks/useContent";
import { entityName } from "@/helpers/entity-name";

export default function ContactScreen() {
  const { entities } = useContent();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<HeaderImage />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Contact</ThemedText>
      </ThemedView>
      <ThemedText>
        Have a question? These people may be able to help:
      </ThemedText>
      {entities?.map((entity, index) => (
        <Collapsible title={entityName(entity)} key={index}>
          {entity.links.map((contact, index) => (
            <ThemedView key={index}>
              <ExternalLink href={contact.target}>
                <ThemedText type="link">{contact.title}</ThemedText>
              </ExternalLink>
            </ThemedView>
          ))}
        </Collapsible>
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
