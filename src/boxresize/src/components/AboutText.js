export default function AboutText({ windowWidth, windowHeight }) {
  const xRD = windowWidth * 0.99;
  const xLD = windowWidth * 0.01;
  const y = (dy) => windowHeight + dy;

  return (
    <>
      <text fontSize={11} x={xLD} y={y(-46)} textAnchor="start">
        R-Drag : Create box
      </text>
      <text fontSize={11} x={xLD} y={y(-34)} textAnchor="start">
        L-Drag on Box : Box Shift
      </text>
      <text fontSize={11} x={xLD} y={y(-22)} textAnchor="start">
        L-Drag on Tip : Box Resize
      </text>
      <text fontSize={11} x={xLD} y={y(-10)} textAnchor="start">
        DBL L-Click : Bring to front
      </text>
      <text fontSize={13} x={xRD} y={y(-10)} textAnchor="end">
        Box Resize@goodseog.yoo
      </text>
    </>
  );
}
