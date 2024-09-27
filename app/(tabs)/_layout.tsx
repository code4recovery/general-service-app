import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { TriangleIcon } from "@/components/navigation/TriangleIcon";

import { i18n } from "@/helpers/i18n";
import { useColors } from "@/hooks/useColors";

export default function TabLayout() {
  const colors = useColors();

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(colors.tabBackground);
    }
  }, [colors.tabBackground]);

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
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t("districtTab"),
          tabBarIcon: ({ color, focused }) => (
            <TriangleIcon color={color} focused={focused} type="district" />
          ),
        }}
      />
      <Tabs.Screen
        name="area"
        options={{
          title: i18n.t("areaTab"),
          tabBarIcon: ({ color, focused }) => (
            <TriangleIcon color={color} focused={focused} type="area" />
          ),
        }}
      />
      <Tabs.Screen
        name="gso"
        options={{
          title: i18n.t("gsoTab"),
          tabBarIcon: ({ color, focused }) => (
            <TriangleIcon color={color} focused={focused} type="gso" />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: i18n.t("about"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
