export type Entity = {
  id: number;
  area: number | null;
  district: number | null;
  name: string;
  banner: string;
  banner_dark: string;
  website: string;
  language: string;
  stories: {
    id: number;
    entity_id: number;
    title: string;
    description: string;
    type: string;
    reference: string;
    language: string;
    start_at: string;
    end_at: string;
    buttons: {
      id: number;
      story_id: number;
      title: string;
      link: string;
    }[];
  }[];
  links: {
    id: number;
    entity_id: number;
    title: string;
    target: string;
  }[];
};
