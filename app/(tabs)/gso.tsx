import { EntityScreen } from "@/components/EntityScreen";
import { useContent } from "@/hooks/useContent";

export default function GsoScreen() {
  const { entities } = useContent();

  if (!entities) {
    return null;
  }

  const [_district, _area, gso] = entities;

  return <EntityScreen entity={gso} />;
}
