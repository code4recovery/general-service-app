import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fragment, useEffect, useState } from "react";
import { i18n } from "@/helpers/i18n";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useDistrict } from "@/hooks/useDistrict";

import * as Location from "expo-location";
import { point, polygon } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { entityName } from "@/helpers/entity-name";
import type { Area } from "@/helpers/types";
import { useRouter } from "expo-router";

export const DistrictPicker = ({ closeModal }: { closeModal?: () => void }) => {
  const { districtId: selected, setDistrictId } = useDistrict();
  const [areas, setAreas] = useState<Area[]>([]);
  const [geolocating, setGeolocating] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  const linkColor = useThemeColor("link");
  const errorColor = useThemeColor("error");

  // todo move to colors
  const colorScheme = useColorScheme() ?? "light";
  const backgroundColor: string = colorScheme === "light" ? "#eee" : "#222";
  const borderColor = colorScheme === "light" ? "#ccc" : "#333";
  const highlight = colorScheme === "light" ? "#f0f0f0" : "#333";
  const iconColor = colorScheme === "light" ? "black" : "white";

  const geolocate = () => {
    setGeolocating(true);
    Location.getForegroundPermissionsAsync().then((status) => {
      if (status.status !== "granted") {
        Location.requestForegroundPermissionsAsync().then((status) => {
          if (status.status === "granted") {
            getLocation();
          } else {
            setGeolocating(false);
          }
        });
      } else {
        getLocation();
      }
    });
  };

  const getLocation = () => {
    Location.getCurrentPositionAsync({})
      .then((location) => {
        const user = point([
          location.coords.longitude,
          location.coords.latitude,
        ]);
        const districts = areas
          .map((area) =>
            area.districts.map((district) => ({ ...district, area: area.area }))
          )
          .flat();
        const district = districts.find(({ boundary }) =>
          booleanPointInPolygon(user, polygon([boundary]))
        );
        if (district) {
          setDistrictId(district.id);
          if (closeModal) {
            closeModal();
          }
        } else {
          setNotFound(true);
        }
      })
      .catch((error) => Alert.alert("Error", error.message))
      .finally(() => setGeolocating(false));
  };

  useEffect(() => {
    console.log("fetching areas");
    fetch(`https://generalservice.app/storage/map.json?${new Date().getTime()}`)
      .then((response) => response.json())
      .then((areas: Area[]) => {
        setAreas(areas);
        if (selected) {
          setSelectedAreas(
            areas
              .filter(({ districts }) =>
                districts.some(({ id }) => selected === id)
              )
              .map(({ area }) => area)
          );
        } else if (areas.length === 1) {
          setSelectedAreas([areas[0].area]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ThemedView
      style={{
        ...styles.base,
        ...(closeModal ? styles.modal : styles.nonModal),
      }}
    >
      {closeModal ? (
        <ThemedView style={{ ...styles.header, backgroundColor }}>
          <ThemedText style={styles.headerText}>
            {i18n.t("changeDistrict")}
          </ThemedText>
          <Pressable onPress={closeModal} style={styles.buttonClose}>
            <Ionicons name="close" size={24} color={iconColor} />
          </Pressable>
        </ThemedView>
      ) : (
        <ThemedView style={styles.welcome}>
          <ThemedText>{i18n.t("welcome")}</ThemedText>
        </ThemedView>
      )}
      <ScrollView style={styles.body}>
        <Pressable
          style={{ ...styles.geoButton, borderColor: linkColor }}
          onPress={geolocate}
        >
          <Ionicons name="locate-outline" size={22} color={linkColor} />
          <ThemedText type="link" style={styles.geoButtonText}>
            {geolocating ? i18n.t("locating") : i18n.t("useMyLocation")}
          </ThemedText>
        </Pressable>

        {notFound && (
          <ThemedText
            style={{
              color: errorColor,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            {i18n.t("districtNotFound")}
          </ThemedText>
        )}
        {areas.map((area) => (
          <Fragment key={area.area}>
            <Pressable
              style={{ ...styles.area, borderColor }}
              onPress={() =>
                setSelectedAreas((selectedAreas) =>
                  selectedAreas.includes(area.area)
                    ? selectedAreas.filter((a) => a !== area.area)
                    : [...selectedAreas, area.area]
                )
              }
            >
              <Ionicons
                name={
                  selectedAreas.includes(area.area)
                    ? "chevron-down"
                    : "chevron-forward"
                }
                size={16}
                color={iconColor}
              />
              <ThemedText>{entityName(area)}</ThemedText>
            </Pressable>
            {selectedAreas.includes(area.area) &&
              area.districts.map(({ id, district, name }) => (
                <Pressable
                  key={id}
                  style={{
                    ...styles.area,
                    ...styles.district,
                    borderColor,
                    backgroundColor:
                      id === selected ? highlight : "transparent",
                  }}
                  onPress={() => {
                    setDistrictId(id);
                    if (closeModal) {
                      router.push("/");
                      closeModal();
                    }
                  }}
                >
                  <ThemedText>
                    {entityName({ area: area.area, district, name })}
                  </ThemedText>
                </Pressable>
              ))}
          </Fragment>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  area: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderStyle: "solid",
    display: "flex",
    flexDirection: "row",
    gap: 4,
    padding: 16,
    width: "100%",
  },
  base: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  body: {
    width: "100%",
  },
  buttonClose: {
    alignItems: "center",
    display: "flex",
    flexShrink: 1,
    justifyContent: "center",
    padding: 14,
  },
  district: {
    paddingLeft: 34,
    paddingVertical: 12,
  },
  geoButton: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    margin: 16,
    padding: 10,
  },
  geoButtonText: {
    fontSize: 18,
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 14,
  },
  modal: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginTop: 60,
  },
  nonModal: {
    paddingTop: 60,
  },
  welcome: {
    padding: 16,
    paddingBottom: 8,
    width: "100%",
  },
});
