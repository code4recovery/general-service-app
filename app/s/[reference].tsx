import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Entity } from "@/components/Entity";
import { i18n } from "@/helpers/i18n";
import { Entity as EntityType } from "@/helpers/types";
import { useColors } from "@/hooks/useColors";

export default function StoryView() {
  const { reference } = useLocalSearchParams();
  const [entity, setEntity] = useState<EntityType>();
  const [error, setError] = useState("");
  const colors = useColors();

  useEffect(() => {
    const url = `https://generalservice.app/api/stories/${reference}`;

    console.log(`fetching story from ${url}`);

    fetch(url)
      .then((response) => response.json())
      .then((story) => {
        setEntity({
          ...story.entity,
          stories: [{ category: story.type, items: [story] }],
        });
      })
      .catch(() => {
        setError("could not find story");
      });
  }, [reference]);

  if (error) {
    // todo error component
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>An error occurred: {error}</Text>
      </View>
    );
  }

  if (entity) {
    // todo test dark mode
    return (
      <Stack.Screen
        options={{
          headerBackTitle: i18n.t("back"),
          title: "",
          headerRight: () => (
            <Pressable
              onPress={() => {
                Sharing.shareAsync(
                  `https://generalservice.app/s/${reference}`,
                ).catch((e) => console.error(e));
              }}
            >
              <Ionicons name="share-outline" size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      >
        <ScrollView
          style={{
            backgroundColor: colors.background,
          }}
        >
          <Entity entity={entity} />
        </ScrollView>
      </Stack.Screen>
    );
  }

  return <></>;
}
