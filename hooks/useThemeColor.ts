import { useColorScheme } from "react-native";

import { Colors } from "@/constants/Colors";

export function useThemeColor(
  colorName: string,
  group?: "separators" | "buttons"
) {
  const theme = useColorScheme() ?? "light";
  // @ts-ignore
  return group ? Colors[theme][group][colorName] : Colors[theme][colorName];
}
