/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#687076";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    background: "#fff",
    icon: tintColorLight,
    primary: "#99ccff",
    secondary: "#ddd",
    tabBackground: "#eee",
    tabIconDefault: tintColorLight,
    tabIconSelected: tintColorLight,
    text: "#11181C",
    tint: tintColorLight,
  },
  dark: {
    background: "#151718",
    icon: "#9BA1A6",
    primary: "#0066cc",
    secondary: "#3c3c3c",
    tabBackground: "#272727",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    text: "#ECEDEE",
    tint: tintColorDark,
  },
};
