import { openLink } from "./open-link";
import { AddToCalendarButton } from "./types";

export function addToCalendar({
  formatted_address,
  start,
  end,
  notes,
  conference_url,
  timezone,
}: AddToCalendarButton) {
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    notes
  )}&dates=${start}/${end}&details=${encodeURIComponent(
    conference_url
  )}&location=${encodeURIComponent(formatted_address)}&sf=true&output=xml`;
  openLink({ link: url });
}
