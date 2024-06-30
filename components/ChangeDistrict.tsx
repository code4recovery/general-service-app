import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export function ChangeDistrict() {
  const colorScheme = useColorScheme() ?? "light";
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const areas = Array.from({ length: 100 }, (_, i) => i + 1);
  const iconColor = colorScheme === "light" ? "black" : "white";
  const borderColor = colorScheme === "light" ? "#ccc" : "#333";
  const backgroundColor: string = colorScheme === "light" ? "#eee" : "#222";

  return (
    <>
      <Pressable
        style={styles.triggerModal}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="location-outline" size={16} color={iconColor} />
        <ThemedText type="small">San Francisco</ThemedText>
        <Ionicons name="chevron-down" size={16} color={iconColor} />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <ThemedView style={styles.modal}>
          <ThemedView style={{ ...styles.header, backgroundColor }}>
            <ThemedText style={styles.headerText}>Change District</ThemedText>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.buttonClose}
            >
              <Ionicons name="close" size={24} color={iconColor} />
            </Pressable>
          </ThemedView>
          <ScrollView style={styles.modalBody}>
            {areas.map((area) => (
              <Pressable
                key={area}
                style={{ ...styles.area, borderColor }}
                onPress={() =>
                  setSelectedAreas((selectedAreas) =>
                    selectedAreas.includes(area)
                      ? selectedAreas.filter((a) => a !== area)
                      : [...selectedAreas, area]
                  )
                }
              >
                <Ionicons
                  name={
                    selectedAreas.includes(area)
                      ? "chevron-down"
                      : "chevron-forward"
                  }
                  size={16}
                  color={iconColor}
                />
                <ThemedText>Area {`${area}`.padStart(2, "0")}</ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </ThemedView>
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
  modal: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 60,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 14,
  },
  buttonClose: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    flexShrink: 1,
  },
  modalBody: {
    width: "100%",
  },
  area: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    padding: 14,
    borderStyle: "solid",
    borderBottomWidth: 1,
    width: "100%",
  },
});
