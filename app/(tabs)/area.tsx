import { EntityScreen } from "@/components/EntityScreen";

import { useContent } from "@/hooks/useContent";

export default function AreaScreen() {
  const { entities } = useContent();

  if (!entities) {
    return null;
  }

  const entity = entities[1];

  return <EntityScreen entity={entity} type="area" />;
}
