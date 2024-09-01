import { ImageBackground, StyleSheet } from "react-native";

export function HeaderImage({ uri }: { uri: string }) {
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
