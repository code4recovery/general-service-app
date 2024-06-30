import {
  type PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { type Entity } from "@/helpers/types";

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

  useEffect(() => {
    if (!loading) return;
    fetch("https://generalservice.app/storage/6-6.json")
      .then((response) => response.json())
      .then((entities) => setEntities(entities))
      .finally(() => setLoading(false));
  }, [loading]);

  return (
    <ContentContext.Provider value={{ entities, loading, setLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
