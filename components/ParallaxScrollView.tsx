import type { PropsWithChildren, ReactElement } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { ChangeDistrict } from "@/components/ChangeDistrict";
import { useContent } from "@/hooks/useContent";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const { loading, setLoading } = useContent();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => setLoading(true)}
          />
        }
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" style={styles.spinner} />
          ) : (
            children
          )}
        </ThemedView>
      </Animated.ScrollView>
      <View style={styles.changeDistrict}>
        <ChangeDistrict />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  changeDistrict: {
    position: "absolute",
    top: 58,
    right: 10,
  },
  container: {
    flex: 1,
    position: "relative",
  },
  header: {
    height: 250,
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    overflow: "hidden",
  },
  spinner: {
    marginVertical: 100,
    marginHorizontal: "auto",
  },
});
