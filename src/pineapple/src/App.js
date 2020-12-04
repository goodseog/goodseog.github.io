import { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

const StyledMobileDiv = styled.div`
  flex: 1;
  background-color: white;
`;

export default function App() {
  const [windowWidth, windowHeight] = useWindowSize();

  useAnimationFrame((deltaTime) => {
    // animate
  });

  return <StyledMobileDiv windowHeight={windowHeight} />;
}

const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  function animate(time) {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  });
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
