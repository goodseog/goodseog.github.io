import React, { createContext, useState } from "react";
import { blockCases } from "../common/block";

const TetrisContext = createContext();

const hardCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const isInBound = (row, col) => {
  return 0 <= row && row < 9 && 0 <= col && col < 9;
};

const shuffleArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    // [array[i], array[j]] = [array[j], array[i]];
    const x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

const getAvailableList = (top) => {
  let row = Math.floor(top.cur / 9);
  let col = top.cur % 9;

  let availableList = [];

  shuffleArray(["I", "J", "L", "S", "Z", "T", "O"]).forEach((block) => {
    blockCases[block].forEach((shape) => {
      let nrow0 = row + shape[0][0];
      let ncol0 = col + shape[0][1];
      let nrow1 = row + shape[1][0];
      let ncol1 = col + shape[1][1];
      let nrow2 = row + shape[2][0];
      let ncol2 = col + shape[2][1];
      let nrow3 = row + shape[3][0];
      let ncol3 = col + shape[3][1];
      if (
        top.query[block] > 0 &&
        isInBound(nrow0, ncol0) &&
        top.ph[nrow0][ncol0] === 1 &&
        isInBound(nrow1, ncol1) &&
        top.ph[nrow1][ncol1] === 1 &&
        isInBound(nrow2, ncol2) &&
        top.ph[nrow2][ncol2] === 1 &&
        isInBound(nrow3, ncol3) &&
        top.ph[nrow3][ncol3] === 1
      ) {
        let next = hardCopy(top);
        next.ph[nrow0][ncol0] = next.color;
        next.ph[nrow1][ncol1] = next.color;
        next.ph[nrow2][ncol2] = next.color;
        next.ph[nrow3][ncol3] = next.color;
        next.query[block] -= 1;
        next.use[block] += 1;
        next.remain -= 4;
        next.color += 1;

        availableList.push(next);
      }
    });
  });

  return availableList;
};

const TetrisProvider = ({ children }) => {
  const togglePlaceHolder = (row, col) => {
    console.log("Toggle pos : " + row + ", " + col);
    setValue((prevState) => {
      let nextPlaceHolder = prevState.placeHolder.slice();
      nextPlaceHolder[row][col] ^= 1;
      return {
        ...prevState,
        placeHolder: nextPlaceHolder,
      };
    });
  };

  // const blockMapper = ["I", "J", "L", "S", "Z", "T", "O"];

  const algorithm = (placeHolder, query) => {
    let fitCases = {};
    let remain = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        remain += placeHolder[i][j];
      }
    }

    let queue = [
      {
        ph: hardCopy(placeHolder),
        cur: 0,
        use: { I: 0, J: 0, L: 0, S: 0, Z: 0, T: 0, O: 0 },
        remain: remain,
        query: hardCopy(query),
        color: 2,
      },
    ];

    while (queue.length > 0) {
      let top = queue.shift();
      console.log(JSON.stringify(top));

      // move to next
      while (
        top.cur < 81 &&
        top.remain > 0 &&
        top.ph[Math.floor(top.cur / 9)][top.cur % 9] !== 1
      ) {
        top.cur++;
      }

      if (top.remain === 0) {
        // Find answer
        let key = JSON.stringify(top.use);
        if (!fitCases.hasOwnProperty(key)) {
          fitCases[key] = top.ph;
        }
        continue;
      } else if (top.cur === 81 && top.remain > 0) {
        // Fully fill failure
        continue;
      } else {
        // Find available case
        let availableList = getAvailableList(top);

        // console.log(JSON.stringify(availableList))
        queue = queue.concat(availableList);
        // console.log(queue)
      }
    }

    return Object.values(fitCases);
  };

  const searchAvailableCases = async (query) => {
    console.log("Search avaliable cases with query : " + JSON.stringify(query));
    setValue((prevState) => {
      return {
        ...prevState,
        fitCases: [],
      };
    });
    setValue((prevState) => {
      let placeHolder = prevState.placeHolder.slice();
      return {
        ...prevState,
        fitCases: algorithm(placeHolder, query),
      };
    });
  };

  const [value, setValue] = useState({
    placeHolder: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0, 1],
      [0, 0, 1, 1, 1, 0, 0, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
    ],
    fitCases: [],
    togglePlaceHolder,
    searchAvailableCases,
  });

  return (
    <TetrisContext.Provider value={value}>{children}</TetrisContext.Provider>
  );
};

export { TetrisContext, TetrisProvider };
