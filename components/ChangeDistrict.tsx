import { Modal, Pressable, StyleSheet, useColorScheme } from "react-native";

import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { DistrictPicker } from "./DistrictPicker";
import { useContent } from "@/hooks/useContent";
import { i18n } from "@/helpers/i18n";

export function ChangeDistrict() {
  const colorScheme = useColorScheme() ?? "light";
  const [modalVisible, setModalVisible] = useState(false);
  const iconColor = colorScheme === "light" ? "black" : "white";
  const { entities } = useContent();

  const name = entities?.length ? entities[0].name : i18n.t("find_district");

  return (
    <>
      <Pressable
        style={styles.triggerModal}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="location-outline" size={16} color={iconColor} />
        <ThemedText type="small">{name}</ThemedText>
        <Ionicons name="chevron-down" size={16} color={iconColor} />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <DistrictPicker
          closeButton={
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.buttonClose}
            >
              <Ionicons name="close" size={24} color={iconColor} />
            </Pressable>
          }
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerModal: {
    position: "absolute",
    top: 58,
    right: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    display: "flex",
    gap: 4,
    flexDirection: "row",
  },
  buttonClose: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    flexShrink: 1,
  },
});
