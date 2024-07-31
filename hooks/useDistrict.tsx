import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const DistrictContext = createContext<{
  districtId?: number;
  setDistrictId: (district: number) => void;
}>({ districtId: undefined, setDistrictId: () => {} });

export const DistrictProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    getData();
  }, []);
  const [loading, setLoading] = useState(true);
  const [districtId, setDistrictId] = useState<number | undefined>();

  // AsyncStorage.removeItem("districtId");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("districtId");
      if (value !== null) {
        console.log("setting district from storage", value);
        setDistrictId(parseInt(value));
      }
    } catch (e) {
      // error reading value
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const setDistrictFromPicker = (districtId: number) => {
    console.log("setting district from picker", districtId);
    setDistrictId(districtId);
    AsyncStorage.setItem("districtId", districtId.toString());
  };

  return (
    <DistrictContext.Provider
      value={{ districtId, setDistrictId: setDistrictFromPicker }}
    >
      {loading ? null : children}
    </DistrictContext.Provider>
  );
};

export const useDistrict = () => useContext(DistrictContext);
