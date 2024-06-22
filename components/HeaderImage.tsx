import { ImageBackground, StyleSheet } from "react-native";
import { useContent } from "@/hooks/useContent";
import { useColorScheme } from "@/hooks/useColorScheme";

export function HeaderImage() {
  const { entities } = useContent();
  const colorScheme = useColorScheme();

  const uri = entities
    ?.map(({ banner, banner_dark }) =>
      colorScheme === "dark" ? banner_dark : banner
    )
    .filter((e) => e)[0];

  return (
    <ImageBackground
      resizeMode="cover"
      source={{ uri }}
      style={styles.banner}
    />
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 280,
  },
});
