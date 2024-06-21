import { useColorScheme } from "./useColorScheme";

import { Colors } from "@/constants/Colors";

export function useColors() {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? "light"];
}
