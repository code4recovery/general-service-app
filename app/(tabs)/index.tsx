import { EntityScreen } from "@/components/EntityScreen";

import { useContent } from "@/hooks/useContent";

export default function DistrictScreen() {
  const { entities } = useContent();

  if (!entities) {
    return null;
  }

  const entity = entities[0];

  return <EntityScreen entity={entity} type="district" />;
}
