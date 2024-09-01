import Svg, { Path } from "react-native-svg";

export function TriangleIcon({
  bg,
  color,
  focused,
  type,
}: {
  bg: string;
  color: string;
  focused: boolean;
  type: "district" | "area" | "gso";
}) {
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
        fill={focused && type === "district" ? color : bg}
        fillOpacity={0.75}
      />
      <Path
        d="M42.6629 64L196.337 64L119.5 197.005L42.6629 64Z"
        fill={focused && type === "area" ? color : bg}
        fillOpacity={0.75}
      />
      <Path
        d="M78.6405 126L161.36 126L120 197.966L78.6405 126Z"
        fill={focused && type === "gso" ? color : bg}
        fillOpacity={0.75}
      />
    </Svg>
  );
}
