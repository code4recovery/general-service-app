import Svg, { Path } from "react-native-svg";
import { useColors } from "@/hooks/useColors";

export function TriangleIcon({
  color,
  focused,
  type,
}: {
  color: string;
  focused: boolean;
  type: "district" | "area" | "gso";
}) {
  const colors = useColors();
  return (
    <Svg
      width="22"
      height="19.05"
      viewBox="0 0 240 209"
      stroke={color}
      strokeWidth="14"
    >
      <Path
        d="M8.66025 5.16476L231.34 5.16478L120 198.011L8.66025 5.16476Z"
        fill={
          type === "district"
            ? focused
              ? colors.titles.district
              : color
            : colors.tabBackground
        }
        fillOpacity={0.75}
      />
      <Path
        d="M42.6629 64L196.337 64L119.5 197.005L42.6629 64Z"
        fill={
          focused && type === "area" ? colors.titles.area : colors.tabBackground
        }
        fillOpacity={0.75}
      />
      <Path
        d="M78.6405 126L161.36 126L120 197.966L78.6405 126Z"
        fill={
          focused && type === "gso" ? colors.titles.gso : colors.tabBackground
        }
        fillOpacity={0.75}
      />
    </Svg>
  );
}
