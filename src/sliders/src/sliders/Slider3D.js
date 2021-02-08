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
  return Math.abs(x) < 1 ? 70 * (1 - Math.abs(x)) - 40 + "px" : "-40px";
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
  const [selectedIdx, setSelectedIdx] = useState(0);

  useAnimationFrame((deltaTime) => {
    setSelectedIdx(selectedIdx + deltaTime / 100);
  })

  return (
    <StyledSlider3D>
      {cards.map((idx) => (
        <StyledCard x={idx - selectedIdx}>Card #{idx}</StyledCard>
      ))}
    </StyledSlider3D>
  );
}

const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};
