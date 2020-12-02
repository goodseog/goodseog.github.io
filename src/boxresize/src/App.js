import { useState, useEffect } from "react";
import DragBox from "components/DragBox";
import Box from "components/Box";
import BoxTrash from "components/BoxTrash";
import * as Setting from "components/BoxConfig";
import AboutText from "components/AboutText";
import "./App.css";

const BUTTON_LEFT = 0;
const BUTTON_RIGHT = 2;

export default function App() {
  const [boxes, setBoxes] = useState([]);

  const [touches, setTouches] = useState([]);

  const [isAdding, setIsAdding] = useState(false);
  const [clickStart, setClickStart] = useState({ x: 0, y: 0 });
  const [clickEnd, setClickEnd] = useState({ x: 0, y: 0 });

  const [isShifting, setIsShifting] = useState(false);
  const [shiftIndex, setShiftIndex] = useState(-1);
  const [showTrash, setShowTrash] = useState(false);

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

  function handleTouchStart(evt) {
    evt.preventDefault();
    evt.changedTouches.forEach((touch) =>
      setTouches((prev) => {
        let next = [...prev];
        next.push(copyTouch(touch));
        if (next.length === 2) {
          setIsAdding(true);
          setClickStart({ identifier: next[0].identifier, x: next[0].x, y: next[0].y });
          setClickEnd({ identifier: next[1].identifier, x: next[1].x, y: next[1].y });
        }
        return next;
      })
    );
  }

  function handleTouchMove(evt) {
    evt.preventDefault();
    evt.changedTouches.forEach((ctouch) => {
      let idx = touchIndexById(ctouch.identifier);
      setTouches((prev) => {
        let next = [...prev];
        next[idx] = copyTouch(ctouch);
        if (clickStart.identifier === ctouch.identifier) {
          setClickStart({ identifier: next[idx].identifier, x: next[idx].x, y: next[idx].y });
        } else if (clickEnd.identifier === ctouch.identifier) {
          setClickEnd({ identifier: next[idx].identifier, x: next[idx].x, y: next[idx].y });
        }
        return next;
      });
    });
  }

  function handleTouchEnd(evt) {
    evt.changedTouches.forEach((ctouch) => {
      let idx = touchIndexById(ctouch.identifier);
      setTouches((prev) => {
        let next = [...prev];
        next.splice(idx, 1);
        if (next.length !== 2) {
          setIsAdding(false);
        }
        return next;
      });
    });
  }

  function copyTouch(touch) {
    return {
      identifier: touch.identifier,
      x: touch.x,
      y: touch.y,
    };
  }

  function touchIndexById(idToFind) {
    touches.findIndex((touch) => touch.identifier === idToFind);
  }

  function handleDoubleClick(evt) {
    if (evt.button === BUTTON_LEFT) {
      const [selected] = getZIndex(evt.clientX, evt.clientY);
      BringToFront(selected);
    }
  }

  function handleMouseDown(evt) {
    if (evt.button === BUTTON_LEFT) {
      const [selectedIndex, pickCorner] = getZIndex(evt.clientX, evt.clientY);
      if (selectedIndex !== undefined) {
        if (pickCorner) {
          // Resize
          setIsResizing(true);
          setResizeIndex(selectedIndex);
        } else {
          // Shift
          setIsShifting(true);
          setShiftIndex(selectedIndex);
          setClickStart({ x: evt.clientX, y: evt.clientY });
          setClickEnd({ x: evt.clientX, y: evt.clientY });
        }
      }
    }
    if (evt.button === BUTTON_RIGHT) {
      setIsAdding(true);
      setClickStart({ x: evt.clientX, y: evt.clientY });
      setClickEnd({ x: evt.clientX, y: evt.clientY });
    }
  }

  function handleMouseMove(evt) {
    isResizing && resizeBox(resizingIndex, evt.movementX, evt.movementY);
    isShifting && shiftBox(shiftIndex, evt.movementX, evt.movementY);
    isAdding && setClickEnd({ x: evt.clientX, y: evt.clientY });

    let pickAndMove = isShifting && (clickStart.x !== evt.clientX || clickStart.y !== evt.clientY);
    pickAndMove && setShowTrash(true);
  }

  function handleMouseUp(evt) {
    // console.log(`Drag end on : (${evt.clientX}, ${evt.clientY})`);
    if (evt.button === BUTTON_LEFT) {
      if (isShifting && evt.clientX <= 80 && evt.clientY <= 80) {
        removeBox(shiftIndex);
      }
      setIsShifting(false);
      setShowTrash(false);
      setIsResizing(false);
    }
    if (evt.button === BUTTON_RIGHT) {
      setIsAdding(false);
      addNewBox(clickStart.x, clickStart.y, evt.clientX, evt.clientY);
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

    if (Setting.isAvailable(width, height)) {
      setBoxes((prev) => {
        let newBox = {
          key: Setting.guid(),
          x: x1,
          y: y1,
          width: width,
          height: height,
          fill: Setting.getRandomColor(),
        };
        return [...prev, newBox];
      });
    }
  }

  function getZIndex(x, y) {
    for (let i = boxes.length - 1; i >= 0; i--) {
      if (
        boxes[i].x < x &&
        x < boxes[i].x + boxes[i].width &&
        boxes[i].y < y &&
        y < boxes[i].y + boxes[i].height
      ) {
        let startX = boxes[i].x + boxes[i].width - Setting.RESIZE_LENGTH - Setting.RESIZE_MARGIN;
        let startY = boxes[i].y + boxes[i].height - Setting.RESIZE_LENGTH - Setting.RESIZE_MARGIN;
        let endX = startX + Setting.RESIZE_LENGTH + Setting.RESIZE_MARGIN;
        let endY = startY + Setting.RESIZE_LENGTH + Setting.RESIZE_MARGIN;
        let pickCorner = startX < x && startY < y && x < endX && y < endY;
        return [i, pickCorner];
      }
    }
    return [undefined, false];
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
            width: Math.max(box.width + dx, Setting.MIN_WIDTH),
            height: Math.max(box.height + dy, Setting.MIN_HEIGHT),
          };
        } else {
          return box;
        }
      });
      return next;
    });
  }

  function removeBox(targetIndex) {
    setBoxes((prev) => {
      let next = [...prev];
      next.splice(targetIndex, 1);
      return next;
    });
  }

  function BringToFront(targetIndex) {
    if (-1 < targetIndex && targetIndex < boxes.length - 1) {
      setBoxes((prev) => {
        let next = [...prev];
        let bringUpBox = next.splice(targetIndex, 1);
        return next.concat(bringUpBox);
      });
    }
  }

  return (
    <svg
      className="App"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
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
      <BoxTrash visible={showTrash} windowWidth={windowWidth} />
      <AboutText windowWidth={windowWidth} windowHeight={windowHeight} />
      <DragBox
        isAdding={isAdding}
        x1={clickStart.x}
        y1={clickStart.y}
        x2={clickEnd.x}
        y2={clickEnd.y}
      />
    </svg>
  );
}
