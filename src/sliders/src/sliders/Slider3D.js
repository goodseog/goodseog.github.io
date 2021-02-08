import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const StyledSlider3D = styled.div`
  display: flex;
  position: relative;
  height: 300px;
  transform-style: preserve-3d;
  perspective: 300px;
`;

function transX(x) {
  return 130 * x + "px";
}

function transZ(x) {
  return Math.abs(x) < 1 ? 150 * (1 - Math.abs(x)) - 70 + "px" : "-70px";
}

function rotY(x) {
  return -80 * Math.tanh(x) + "deg";
}

const StyledCard = styled.div`
  position: absolute;
  display: block;
  top: 75px;
  left: calc(50% - 50px);
  width: 100px;
  height: 150px;
  background-color: white;
  border: 1px solid black;
  transform: translateX(${({ x }) => transX(x)}) translateZ(${({ x }) => transZ(x)})
    rotateY(${({ x }) => rotY(x)});
`;

export default function () {
  const cards = [...Array(54).keys()];
  const [selectedIdx, setSelectedIdx] = useState(11);

  return (
    <StyledSlider3D>
      {cards.map((idx) => {
        let x = idx - selectedIdx;
        return <StyledCard x={x}>Card #{idx}</StyledCard>;
      })}
    </StyledSlider3D>
  );
}
