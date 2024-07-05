import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { en, es, fr } from "@/i18n";

const i18n = new I18n({ en, es, fr });

const supported = Object.keys(i18n.translations);

i18n.locale =
  getLocales()
    .map(({ languageCode }) => languageCode)
    .filter((l) => supported.includes(`${l}`))[0] || "en";

export { i18n };
