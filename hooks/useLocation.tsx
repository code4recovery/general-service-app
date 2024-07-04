import { type PropsWithChildren, createContext, useContext } from "react";

const LocationContext = createContext<{
  area: number;
  district: number;
}>({
  area: 6,
  district: 6,
});

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const area = 6;
  const district = 6;
  return (
    <LocationContext.Provider value={{ area, district }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
