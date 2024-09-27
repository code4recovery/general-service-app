import { entityName } from "./entity-name";
import { Entity, RawJsonEntity } from "./types";

export function processEntities(entities: RawJsonEntity[]): Entity[] {
  return entities.map((entity) => {
    const stories = ["news", "business", "resources"]
      .map((category) => ({
        category,
        items: entity.stories.filter((story) => story.type === category),
      }))
      .filter(({ items }) => items.length);
    return {
      ...entity,
      name: entityName(entity),
      stories,
    } as Entity;
  });
}
