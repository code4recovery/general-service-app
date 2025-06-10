import { entityName } from "./entity-name";
import { i18n } from "./i18n";
import { Entity, RawJsonEntity } from "./types";

export function processEntities(entities: RawJsonEntity[]): Entity[] {
  return entities.map((entity) => {
    const languages = entity.stories
      .map(({ language }) => language)
      .filter((lang, index, self) => self.indexOf(lang) === index);

    if (languages.length > 1) {
      const targetLanguage = languages.includes(i18n.locale)
        ? i18n.locale
        : languages.includes(entity.language)
        ? entity.language
        : languages[0];
      entity.stories = entity.stories.filter(
        ({ language }) => language === targetLanguage
      );
    }

    const stories = ["news", "business", "resources"]
      .map((category) => ({
        category,
        items: entity.stories.filter(
          ({ type, start_at, end_at }) =>
            type === category && isBetween(start_at, end_at)
        ),
      }))
      .filter(({ items }) => items.length);
    return {
      ...entity,
      name: entityName(entity),
      stories,
    } as Entity;
  });
}

const today = new Date();

const isBetween = (start_at: string, end_at: string): boolean =>
  today < new Date(end_at) && today > new Date(start_at);
