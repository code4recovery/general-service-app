import { i18n } from "./i18n";

export function entityName({
  area,
  district,
  name,
}: {
  area?: number | null;
  district?: string | null;
  name?: string | null;
}) {
  const zeropad = (n: string) => n.padStart(2, "0");
  if (!area) {
    return i18n.t("gso");
  }
  if (!district) {
    return i18n.t("area", { number: zeropad(`${area}`), name });
  }
  return name
    ? i18n.t("districtNumberName", {
        number: zeropad(district as string),
        name,
      })
    : i18n.t("districtNumber", { number: zeropad(district as string) });
}
