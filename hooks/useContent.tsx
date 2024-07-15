import {
  type PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { type Entity } from "@/helpers/types";
import { useDistrict } from "@/hooks/useDistrict";
import { DistrictPicker } from "@/components/DistrictPicker";

const ContentContext = createContext<{
  entities?: Entity[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  entities: undefined,
  loading: true,
  setLoading: () => {},
});

export const ContentProvider = ({ children }: PropsWithChildren) => {
  const [entities, setEntities] = useState<Entity[]>();
  const [loading, setLoading] = useState(true);
  const { district } = useDistrict();

  useEffect(() => {
    if (!loading || !district) return;
    const url = `https://generalservice.app/storage/${district}.json?${new Date().getTime()}`;
    fetch(url)
      .then((response) => response.json())
      .then((entities) => setEntities(entities))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [loading, district]);

  return (
    <ContentContext.Provider value={{ entities, loading, setLoading }}>
      {district ? children : <DistrictPicker />}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
