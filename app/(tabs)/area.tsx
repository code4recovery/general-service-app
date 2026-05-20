import { EntityScreen } from "@/components/EntityScreen";
import { useContent } from "@/hooks/useContent";

export default function AreaScreen() {
  const { entities } = useContent();

  if (!entities) {
    return null;
  }

  const [_district, area] = entities;

  return <EntityScreen entity={area} />;
}
