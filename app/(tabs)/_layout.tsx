import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColors } from "@/hooks/useColors";

export default function TabLayout() {
  const colors = useColors();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.tabBackground,
          borderTopColor: colors.secondary,
          borderStyle: "solid",
          borderTopWidth: 1,
          paddingTop: 4,
        },
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "News",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "newspaper" : "newspaper-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chatbubble" : "chatbubble-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
