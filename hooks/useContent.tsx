import {
  type PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

type ContentContextType = {
  requestInProgress: boolean;
  stories: {
    title: string;
    description: string;
    effective_at: string;
    expire_at: string;
    type: string;
    buttons: {
      id: string;
      title: string;
      link: string;
      style: string;
    }[];
  }[];
};

const ContentContext = createContext<ContentContextType>({
  requestInProgress: true,
  stories: [],
});

export const ContentProvider = ({ children }: PropsWithChildren) => {
  const [requestInProgress, setRequestInProgress] = useState(true);
  const [stories, setStories] = useState<ContentContextType["stories"]>([]);

  useEffect(() => {
    fetch("https://generalservice.app/storage/area-06-district-06.json")
      .then((response) => response.json())
      .then((data) => {
        setStories(data.stories);
        setRequestInProgress(false);
      });
  }, []);

  return (
    <ContentContext.Provider value={{ requestInProgress, stories }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
