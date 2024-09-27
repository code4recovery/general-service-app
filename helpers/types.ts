export type LinkButton = {
  id: number;
  story_id: number;
  title: string;
  type: "link";
  link: string;
};

export type AddToCalendarButton = {
  id: number;
  story_id: number;
  title: string;
  type: "calendar";
  event_title: string;
  formatted_address: string;
  start: string;
  end: string;
  notes: string;
  conference_url: string;
  timezone: string;
};

export type RawJsonEntity = {
  id: number;
  area: number | null;
  district: string | null;
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
    buttons: (LinkButton | AddToCalendarButton)[];
  }[];
};

export type Entity = {
  id: number;
  name: string;
  banner: string;
  banner_dark: string;
  language: string;
  stories: {
    category: string;
    items: {
      id: number;
      title: string;
      description: string;
      language: string;
      buttons: (LinkButton | AddToCalendarButton)[];
    }[];
  }[];
};

export type Area = {
  area: number;
  name: string;
  website: string;
  districts: District[];
};

export type District = {
  id: number;
  district: string;
  name: string;
  website: string;
  language: string;
  color: string;
  boundary: number[][];
  story_max: number | null;
};
