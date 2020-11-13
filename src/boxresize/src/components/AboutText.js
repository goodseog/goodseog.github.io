import styled from "styled-components";

export default function AboutText({ windowWidth, windowHeight }) {
  const xRD = windowWidth * 0.99;
  const xLD = windowWidth * 0.01;
  const y = (idx) => windowHeight * (1 + 0.01 * idx);

  return (
    <>
      <text fontSize={11} x={xLD} y={y(-4.9)} textAnchor="start">
        R-Drag : Create box
      </text>
      <text fontSize={11} x={xLD} y={y(-3.6)} textAnchor="start">
        L-Drag on Box : Box Shift
      </text>
      <text fontSize={11} x={xLD} y={y(-2.3)} textAnchor="start">
        L-Drag on Tip : Box Resize
      </text>
      <text fontSize={11} x={xLD} y={y(-1)} textAnchor="start">
        DBL L-Click : Bring to front
      </text>
      <text fontSize={13} x={xRD} y={y(-1)} textAnchor="end">
        Box Resize@goodseog.yoo
      </text>
    </>
  );
}
