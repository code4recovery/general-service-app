import { i18n } from "./i18n";
import { type Entity } from "./types";

export function entityName({ area, district, name }: Entity) {
  const zeropad = (n: number) => n.toString().padStart(2, "0");
  if (!area) {
    return i18n.t("gso");
  }
  if (!district) {
    return i18n.t("area", { number: zeropad(area), name });
  }
  return i18n.t("district", { number: zeropad(district), name });
}
