import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const DistrictContext = createContext<{
  district?: string;
  setDistrict: (district: string) => void;
}>({ district: undefined, setDistrict: () => {} });

export const DistrictProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    getData();
  }, []);
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState<string | undefined>();

  // AsyncStorage.removeItem("district");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("district");
      if (value !== null) {
        console.log("setting district from storage", value);
        setDistrict(value);
      }
    } catch (e) {
      // error reading value
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const setDistrictFromPicker = (district: string) => {
    console.log("setting district from picker", district);
    setDistrict(district);
    AsyncStorage.setItem("district", district);
  };

  return (
    <DistrictContext.Provider
      value={{ district, setDistrict: setDistrictFromPicker }}
    >
      {loading ? null : children}
    </DistrictContext.Provider>
  );
};

export const useDistrict = () => useContext(DistrictContext);
