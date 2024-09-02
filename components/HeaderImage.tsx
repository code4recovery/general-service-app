import { ImageBackground, StyleSheet } from "react-native";

export function HeaderImage({ uri }: { uri?: string }) {
  return uri ? (
    <ImageBackground
      resizeMode="cover"
      source={{ uri }}
      style={styles.banner}
    />
  ) : null;
}

const styles = StyleSheet.create({
  banner: {
    height: 280,
  },
});
