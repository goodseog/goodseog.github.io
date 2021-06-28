import React, { useContext } from "react";
import styled from "styled-components";
import { TetrisContext } from "../contexts/tetris-context";

const ColorMapper = {
  0: "rgba(74, 128, 136, 0.2)",
  1: "rgba(74, 128, 136, 0.2)",
  2: "black",
  3: "red",
  4: "blue",
  5: "green",
  6: "pink",
  7: "skyblue",
  8: "brown",
  9: "gray",
  10: "white",
}

const StyledResultViewer = styled.div`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  width: 800px;
  justify-content: center;
  align-items: flex-start;
`;

const FitCaseContainer = styled.div`
  flex: 0 0 150px;
  height: 150px;
  /* background-color: black; */
`;

const FitCaseRow = styled.div`
  flex-direction: row;
`;

const ColorBlock = styled.div`
  background-color: ${(props) => ColorMapper[props.colorIdx]};
  border: 1px solid rgba(40, 90, 107, 0.4);
`;

const FitCase = (answer, aidx) => {
  return (
    <FitCaseContainer key={"answer_" + aidx}>
      {answer.map((row, ridx) => (
        <FitCaseRow key={"fitCaseRow_" + ridx}>
          {row.map((colorIdx, cidx) => (
            <ColorBlock key={"coloredBlock_" + ridx + "_" + cidx} colorIdx={colorIdx} />
          ))}
        </FitCaseRow>
      ))}
    </FitCaseContainer>
  );
};

export default () => {
  const { fitCases } = useContext(TetrisContext);
  return (
    <StyledResultViewer>
      {fitCases.map((fitCase, aidx) => {
        return FitCase(fitCase, aidx);
      })}
    </StyledResultViewer>
  );
};
