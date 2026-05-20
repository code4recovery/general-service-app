import { useColorScheme } from "react-native";

import { Entity } from "@/components/Entity";
import { HeaderImage } from "@/components/HeaderImage";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Entity as EntityType } from "@/helpers/types";

export function EntityScreen({ entity }: { entity: EntityType }) {
  const colorScheme = useColorScheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <HeaderImage
          uri={colorScheme === "dark" ? entity.banner_dark : entity.banner}
        />
      }
    >
      <Entity entity={entity} />
    </ParallaxScrollView>
  );
}
