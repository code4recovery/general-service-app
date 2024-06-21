import { type Entity } from "./types";

export function entityName({ area, district, name }: Entity) {
  const zeropad = (n: number) => n.toString().padStart(2, "0");
  if (!area) {
    return name;
  }
  if (!district) {
    return `Area ${zeropad(area)}: ${name}`;
  }
  return `District ${zeropad(district)}: ${name}`;
}
