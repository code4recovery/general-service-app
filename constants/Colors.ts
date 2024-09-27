/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#687076";
const tintColorDark = "#fff";

const lightGold = "#D1B000";
const darkGold = "#927B00";

const lightBlue = "#99ccff";
const darkBlue = "#0066cc";

const lightGreen = "#b3d2bf";
const darkGreen = "#03692C";

const lightRed = "#FF7A7A";
const darkRed = "#B00020";

export const Colors = {
  light: {
    background: "#fff",
    error: darkRed,
    icon: tintColorLight,
    link: "#007AFF",
    primary: "#99ccff",
    secondary: "#ddd",
    tabBackground: "#eee",
    tabIconDefault: tintColorLight,
    tabIconSelected: tintColorLight,
    text: "#11181C",
    tint: tintColorLight,
    titles: {
      gso: darkGold,
      area: darkGreen,
      district: darkBlue,
    },
    buttons: {
      gso: lightGold,
      area: lightGreen,
      district: lightBlue,
    },
  },
  dark: {
    background: "#151718",
    error: lightRed,
    icon: "#9BA1A6",
    link: "#3A9CFF",
    primary: "#0066cc",
    secondary: "#3c3c3c",
    tabBackground: "#272727",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    text: "#ECEDEE",
    tint: tintColorDark,
    titles: {
      gso: lightGold,
      area: lightGreen,
      district: lightBlue,
    },
    buttons: {
      gso: darkGold,
      area: darkGreen,
      district: darkBlue,
    },
  },
};
