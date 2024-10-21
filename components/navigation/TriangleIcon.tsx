import Svg, { Path } from "react-native-svg";
import { useColors } from "@/hooks/useColors";

export function TriangleIcon({
  focused,
  type,
}: {
  focused: boolean;
  type: "district" | "area" | "gso";
}) {
  const color = "#ccc";
  const colors = useColors();
  return (
    <Svg width="22" height="19.05" viewBox="0 0 768 663">
      <Path
        d="M0.972656 0H767.5L648.973 205H119.324L0.972656 0Z"
        fill={focused && type === "district" ? colors.titles.district : color}
      />
      <Path
        d="M133.169 228.835H635.262L517 433.835L251.5 434L133.169 228.835Z"
        fill={focused && type === "area" ? colors.titles.area : color}
      />
      <Path
        d="M503 457.835L384.609 662.835L265.328 457.835H503Z"
        fill={focused && type === "gso" ? colors.titles.gso : color}
      />
    </Svg>
  );
}
