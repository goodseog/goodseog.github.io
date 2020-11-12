import "./Box.css";
import { RESIZE_LENGTH, RESIZE_MARGIN } from "./BoxConfig";

export default function Box({ x, y, width, height, fill }) {
  let points = `
    ${x + width - RESIZE_MARGIN},${y + height - RESIZE_MARGIN}
    ${x + width - (RESIZE_MARGIN + RESIZE_LENGTH)},${y + height - RESIZE_MARGIN}
    ${x + width - RESIZE_MARGIN},${y + height - (RESIZE_MARGIN + RESIZE_LENGTH)}
    `;
  return (
    <>
      <rect
        className="box"
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
      />
      <polygon points={points} fill={"white"} />
    </>
  );
}
