import {
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { i18n } from "@/helpers/i18n";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useDistrict } from "@/hooks/useDistrict";

import * as Location from "expo-location";
import { point, polygon } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

type Area = {
  area: number;
  name: string;
  website: string;
  districts: District[];
};

type District = {
  district: number;
  name: string;
  website: string;
  language: string;
  color: string;
  boundary: number[][];
};

export const DistrictPicker = ({
  closeButton,
}: {
  closeButton?: JSX.Element;
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const { district, setDistrict } = useDistrict();

  const [geolocating, setGeolocating] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const borderColor = colorScheme === "light" ? "#ccc" : "#333";
  const backgroundColor: string = colorScheme === "light" ? "#eee" : "#222";
  const iconColor = colorScheme === "light" ? "black" : "white";
  const linkColor = useThemeColor("link");

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
          console.log("setting district", district.area, district.district);
          setDistrict(district.area + "-" + district.district);
        } else {
          // todo ui
          console.warn("District not found");
        }
        setGeolocating(false);
      })
      .catch((error) => {
        console.error(error);
        setGeolocating(false);
      });
  };

  useEffect(() => {
    fetch(`https://generalservice.app/storage/map.json?${new Date().getTime()}`)
      .then((response) => response.json())
      .then((areas) => setAreas(areas))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ThemedView style={styles.modal}>
      <ThemedView style={{ ...styles.header, backgroundColor }}>
        <ThemedText style={styles.headerText}>
          {i18n.t("changeDistrict")}
        </ThemedText>
        {closeButton}
      </ThemedView>
      <ScrollView style={styles.modalBody}>
        <Pressable
          style={{ ...styles.geoButton, borderColor: linkColor }}
          onPress={geolocate}
        >
          <Ionicons name="locate-outline" size={22} color={linkColor} />
          <ThemedText type="link" style={styles.geoButtonText}>
            {geolocating ? "Locating..." : "Use My Location"}
          </ThemedText>
        </Pressable>
        {areas.map((area) => (
          <Pressable
            key={area.area}
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
            <ThemedText>
              Area {`${area.area}`.padStart(2, "0")} {area.name}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

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
  geoButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 12,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  geoButtonText: {
    fontSize: 18,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 14,
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
