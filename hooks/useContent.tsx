import {
  type PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { type Entity } from "@/helpers/types";

const ContentContext = createContext<{ entities?: Entity[] }>({
  entities: undefined,
});

export const ContentProvider = ({ children }: PropsWithChildren) => {
  const [entities, setEntities] = useState<Entity[]>();

  useEffect(() => {
    fetch("https://generalservice.app/storage/6-6.json")
      .then((response) => response.json())
      .then((entities) => setEntities(entities));
  }, []);

  return (
    <ContentContext.Provider value={{ entities }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
