import * as Calendar from "expo-calendar";
import { DateTime } from "luxon";

import { Alert, Platform } from "react-native";

import { AddToCalendarButton } from "./types";
import { i18n } from "@/helpers/i18n";

export async function addToCalendar({
  title,
  formatted_address,
  start,
  end,
  notes,
  conference_url,
  timezone,
}: AddToCalendarButton) {
  const calendarId = await getCalendarId();
  if (!calendarId) {
    Alert.alert(i18n.t("success"), i18n.t("errorCalendarNoAccess"), [
      { text: "OK" },
    ]);
  }
  try {
    const startDate = DateTime.fromSQL(start)
      .setZone(timezone, { keepLocalTime: true })
      .toJSDate();
    const endDate = DateTime.fromSQL(end)
      .setZone(timezone, { keepLocalTime: true })
      .toJSDate();

    console.log({ startDate, start, timezone });

    await Calendar.createEventAsync(calendarId, {
      title,
      location: conference_url || formatted_address,
      startDate,
      endDate,
      notes,
      timeZone: timezone,
      endTimeZone: timezone,
    });
    Alert.alert(i18n.t("success"), "Event added to calendar", [{ text: "OK" }]);
  } catch (error) {
    console.error(error);
    Alert.alert(i18n.t("error"), i18n.t("errorCalendarEvent"), [
      { text: "OK" },
    ]);
  }
}

async function getCalendarId() {
  const permission = await Calendar.requestCalendarPermissionsAsync();

  if (permission.status !== "granted") {
    console.error("Calendar permission not granted");
    return "";
  }

  return Platform.OS === "ios"
    ? Calendar.getDefaultCalendarAsync()
        .then(({ id }) => Promise.resolve(id))
        .catch(() => Promise.reject(""))
    : Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT).then(
        (calendars) => {
          const writableCalendars = calendars.filter(
            (calendar) => calendar.allowsModifications && calendar.isVisible
          );
          return !writableCalendars.length
            ? Promise.reject("")
            : Promise.resolve(writableCalendars[0].id);
        }
      );
}
