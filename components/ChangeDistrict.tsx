import { useEffect, useState } from "react";

import {
  Modal,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DistrictPicker } from "./DistrictPicker";
import { useContent } from "@/hooks/useContent";
import { i18n } from "@/helpers/i18n";

export function ChangeDistrict() {
  const colorScheme = useColorScheme() ?? "light";
  const [modalVisible, setModalVisible] = useState(false);
  const iconColor = colorScheme === "light" ? "black" : "white";
  const { entities, loading } = useContent();

  const name = entities?.length ? entities[0].name : i18n.t("find_district");

  useEffect(() => {
    if (loading && modalVisible) {
      setModalVisible(false);
    }
  }, [loading]);

  return (
    <>
      <Pressable
        style={styles.triggerModal}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="location-outline" size={16} color={iconColor} />
        <View style={styles.triggerModalText}>
          <ThemedText type="small">{name}</ThemedText>
        </View>
        <Ionicons name="chevron-down" size={16} color={iconColor} />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <DistrictPicker closeModal={() => setModalVisible(false)} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerModal: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    position: "absolute",
    right: 10,
    top: 58,
  },
  triggerModalText: {
    flexShrink: 1,
    maxWidth: 250,
  },
});
