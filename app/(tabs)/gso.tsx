import { EntityScreen } from "@/components/EntityScreen";

import { useContent } from "@/hooks/useContent";

export default function GsoScreen() {
  const { entities } = useContent();

  if (!entities) {
    return null;
  }

  const entity = entities[2];

  return <EntityScreen entity={entity} type="gso" />;
}
