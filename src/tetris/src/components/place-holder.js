import React, { useContext } from "react";
import styled from "styled-components";
import { TetrisContext } from "../contexts/tetris-context";

const StyledPlaceHolder = styled.div`
  align-items: center;
`;

const StyledButtonRow = styled.div`
  flex: 1;
  flex-direction: row;
`;

const StyledToggleButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${(props) =>
    props.isOpen ? "rgb(234, 239, 223)" : "rgb(74, 128, 136)"};
  border: 1px solid
    ${(props) =>
      props.isOpen ? "rgba(40, 90, 107, 0.3)" : "rgba(40, 90, 107, 0.9)"};
`;

export default () => {
  const { placeHolder, togglePlaceHolder } = useContext(TetrisContext);

  return (
    <StyledPlaceHolder>
      {placeHolder.map((values, row) => (
        <StyledButtonRow key={"btnRow_" + row}>
          {values.map((value, col) => (
            <StyledToggleButton
              key={"btn_" + row + "_" + col}
              onClick={() => togglePlaceHolder(row, col)}
              isOpen={value === 1}
            >
              {/* {value} */}
            </StyledToggleButton>
          ))}
        </StyledButtonRow>
      ))}
    </StyledPlaceHolder>
  );
};
