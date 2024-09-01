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
  formatted_address: string;
  start: string;
  end: string;
  notes: string;
  conference_url: string;
  timezone: string;
};

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
    buttons: (LinkButton | AddToCalendarButton)[];
  }[];
  links: {
    id: number;
    entity_id: number;
    title: string;
    target: string;
  }[];
};
