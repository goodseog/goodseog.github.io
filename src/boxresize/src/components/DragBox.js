import * as BoxConfig from "components/BoxConfig";

export default function DragBox({ isAdding, x1, y1, x2, y2 }) {
  if (x1 > x2) {
    [x1, x2] = [x2, x1];
  }

  if (y1 > y2) {
    [y1, y2] = [y2, y1];
  }

  let width = x2 - x1;
  let height = y2 - y1;
  let color = BoxConfig.isAvailable(width, height) ? "black" : "red";

  return isAdding ? (
    <rect
      id="dragbox"
      x={x1}
      y={y1}
      width={width}
      height={height}
      style={{
        fill: "transparent",
        stroke: color,
        strokeDasharray: "4 2",
      }}
    />
  ) : (
    <></>
  );
}
