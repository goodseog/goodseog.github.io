import React from "react";
import styled from "styled-components";

import { TetrisProvider } from "./contexts/tetris-context";

import PlaceHolder from "./components/place-holder";
import BlockQuery from "./components/block-query";
import ResultViewer from "./components/result-viewer";

const StyledApp = styled.div`
  gap: 50px;
  align-items: center;
`;

export default () => {
  return (
    <StyledApp className="App">
      <TetrisProvider>
        <PlaceHolder />
        <BlockQuery />
        <ResultViewer />
      </TetrisProvider>
    </StyledApp>
  );
};
