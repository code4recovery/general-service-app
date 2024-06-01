import { Image, StyleSheet } from "react-native";

export function HeaderImage() {
  return (
    <Image
      source={require("@/assets/images/golden-gate-bridge.jpg")}
      style={styles.goldenGateBridge}
    />
  );
}

const styles = StyleSheet.create({
  goldenGateBridge: {
    height: 280,
    left: "50%",
    marginLeft: -600,
    width: 1200,
  },
});
