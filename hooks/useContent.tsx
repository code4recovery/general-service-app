import {
  type PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { type Entity } from "@/helpers/types";
import { useLocation } from "@/hooks/useLocation";

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
  const { area, district } = useLocation();

  useEffect(() => {
    if (!loading) return;
    const url = `https://generalservice.app/storage/${area}-${district}.json?${new Date().getTime()}`;
    fetch(url)
      .then((response) => response.json())
      .then((entities) => setEntities(entities))
      .finally(() => setLoading(false));
  }, [loading, area, district]);

  return (
    <ContentContext.Provider value={{ entities, loading, setLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
