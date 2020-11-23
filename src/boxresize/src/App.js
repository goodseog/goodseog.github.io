import { useState, useEffect } from "react";
import DragBox from "components/DragBox";
import Box from "components/Box";
import * as BoxConfig from "components/BoxConfig";
import AboutText from "components/AboutText";
import "./App.css";

const BUTTON_LEFT = 0;
const BUTTON_RIGHT = 2;

export default function App() {
  const [boxes, setBoxes] = useState([]);

  const [isAdding, setIsAdding] = useState(false);
  const [addStart, setAddStart] = useState({ x: 0, y: 0 });
  const [addEnd, setAddEnd] = useState({ x: 0, y: 0 });

  const [isShifting, setIsShifting] = useState(false);
  const [shiftIndex, setShiftIndex] = useState(-1);

  const [isResizing, setIsResizing] = useState(false);
  const [resizingIndex, setResizeIndex] = useState(-1);

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  function handleDoubleClick(evt) {
    if (evt.button === BUTTON_LEFT) {
      let BringToFrontIndex = getIndex(evt.clientX, evt.clientY);
      BringToFront(BringToFrontIndex);
    }
  }

  function handleMouseDown(evt) {
    if (evt.button === BUTTON_LEFT) {
      let selectedIndex = getIndex(evt.clientX, evt.clientY);
      if (selectedIndex !== undefined && selectedIndex !== -1) {
        let startX =
          boxes[selectedIndex].x +
          boxes[selectedIndex].width -
          BoxConfig.RESIZE_LENGTH -
          BoxConfig.RESIZE_MARGIN;
        let endX = startX + BoxConfig.RESIZE_LENGTH + BoxConfig.RESIZE_MARGIN;
        let startY =
          boxes[selectedIndex].y +
          boxes[selectedIndex].height -
          BoxConfig.RESIZE_LENGTH -
          BoxConfig.RESIZE_MARGIN;
        let endY = startY + BoxConfig.RESIZE_LENGTH + BoxConfig.RESIZE_MARGIN;
        if (
          startX < evt.clientX &&
          evt.clientX < endX &&
          startY < evt.clientY &&
          evt.clientY < endY
        ) {
          // Resize
          setIsResizing(true);
          setResizeIndex(selectedIndex);
        } else {
          // Shift
          setIsShifting(true);
          setShiftIndex(selectedIndex);
        }
      }
    }
    if (evt.button === BUTTON_RIGHT) {
      setIsAdding(true);
      setAddStart({ x: evt.clientX, y: evt.clientY });
      setAddEnd({ x: evt.clientX, y: evt.clientY });
    }
  }

  function handleMouseOver(evt) {
    isResizing && resizeBox(resizingIndex, evt.movementX, evt.movementY);
    isShifting && shiftBox(shiftIndex, evt.movementX, evt.movementY);
    isAdding && setAddEnd({ x: evt.clientX, y: evt.clientY });
  }

  function handleMouseUp(evt) {
    // console.log(`Drag end on : (${evt.clientX}, ${evt.clientY})`);
    if (evt.button === BUTTON_LEFT) {
      setIsShifting(false);
      setIsResizing(false);
    }
    if (evt.button === BUTTON_RIGHT) {
      setIsAdding(false);
      addNewBox(addStart.x, addStart.y, evt.clientX, evt.clientY);
    }
  }

  function addNewBox(x1, y1, x2, y2) {
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
    }
    if (y1 > y2) {
      [y1, y2] = [y2, y1];
    }
    let width = x2 - x1;
    let height = y2 - y1;

    if (BoxConfig.isAvailable(width, height)) {
      setBoxes((prev) => {
        let newBox = {
          key: BoxConfig.guid(),
          x: x1,
          y: y1,
          width: width,
          height: height,
          fill: BoxConfig.getRandomColor(),
        };
        return [...prev, newBox];
      });
    }
  }

  function getIndex(x, y) {
    for (let i = boxes.length - 1; i >= 0; i--) {
      if (
        boxes[i].x < x &&
        x < boxes[i].x + boxes[i].width &&
        boxes[i].y < y &&
        y < boxes[i].y + boxes[i].height
      )
        return i;
    }
  }

  function shiftBox(targetIndex, dx, dy) {
    setBoxes((prev) => {
      return prev.map((box, index) => {
        return index === targetIndex
          ? {
              ...box,
              x: box.x + dx,
              y: box.y + dy,
            }
          : box;
      });
    });
  }

  function resizeBox(targetIndex, dx, dy) {
    setBoxes((prev) => {
      let next = prev.map((box, index) => {
        if (index === targetIndex) {
          return {
            ...box,
            width: Math.max(box.width + dx, BoxConfig.MIN_WIDTH),
            height: Math.max(box.height + dy, BoxConfig.MIN_HEIGHT),
          };
        } else {
          return box;
        }
      });
      return next;
    });
  }

  function BringToFront(targetIndex) {
    if (-1 < targetIndex && targetIndex < boxes.length - 1) {
      setBoxes((prev) => {
        let next = prev
          .slice(0, targetIndex)
          .concat(prev.slice(targetIndex + 1));
        next.push(prev[targetIndex]);
        return next;
      });
    }
  }

  return (
    <svg
      className="App"
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseOver}
      onMouseUp={handleMouseUp}
    >
      {boxes.map((box) => (
        <Box
          key={box.key}
          x={box.x}
          y={box.y}
          width={box.width}
          height={box.height}
          fill={box.fill}
        />
      ))}
      <AboutText windowWidth={windowWidth} windowHeight={windowHeight} />
      <DragBox
        isDragging={isAdding}
        x1={addStart.x}
        y1={addStart.y}
        x2={addEnd.x}
        y2={addEnd.y}
      />
    </svg>
  );
}
