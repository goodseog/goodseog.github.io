import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { TetrisContext } from "../contexts/tetris-context";

const BlockQueryContainer = styled.div`
  flex: 1;
  flex-direction: column;
  width: 800px;
`;

const BlockQueryRow = styled.div`
  flex: 1;
  flex-direction: row;
`;

const BlockQueryBox = styled.div`
  flex: 1;
  border: 1px solid black;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  /* align-items: center;*/
`;

const StyledBlockShape = styled.div``;

const StyledBlockCnt = styled.input`
  flex: 0 0 10px;
  text-align: center;
  /* font-size: 20px; */
  /* width: 10px; */
`;

const StyledSubmitButton = styled.button`
  flex: 1;
`;

export default () => {
  const { searchAvailableCases } = useContext(TetrisContext);
  const refBlockCntI = useRef();
  const refBlockCntJ = useRef();
  const refBlockCntL = useRef();
  const refBlockCntS = useRef();
  const refBlockCntZ = useRef();
  const refBlockCntT = useRef();
  const refBlockCntO = useRef();

  const handleOnClick = () => {
    searchAvailableCases({
      I: refBlockCntI.current.value === "*" ? 99 : Number(refBlockCntI.current.value),
      J: refBlockCntJ.current.value === "*" ? 99 : Number(refBlockCntJ.current.value),
      L: refBlockCntL.current.value === "*" ? 99 : Number(refBlockCntL.current.value),
      S: refBlockCntS.current.value === "*" ? 99 : Number(refBlockCntS.current.value),
      Z: refBlockCntZ.current.value === "*" ? 99 : Number(refBlockCntZ.current.value),
      T: refBlockCntT.current.value === "*" ? 99 : Number(refBlockCntT.current.value),
      O: refBlockCntO.current.value === "*" ? 99 : Number(refBlockCntO.current.value),
    });
  };

  return (
    <div>
      <BlockQueryContainer>
        <BlockQueryRow>
          <BlockQueryBox>
            <StyledBlockShape> I Block </StyledBlockShape>
            <StyledBlockCnt ref={refBlockCntI} defaultValue="*" />
          </BlockQueryBox>

          <BlockQueryBox>
            <StyledBlockShape> J Block </StyledBlockShape>
            <StyledBlockCnt ref={refBlockCntJ} defaultValue="*" />
          </BlockQueryBox>

          <BlockQueryBox>
            <StyledBlockShape> L Block </StyledBlockShape>
            <StyledBlockCnt ref={refBlockCntL} defaultValue="*" />
          </BlockQueryBox>

          <BlockQueryBox>
            <StyledBlockShape> S Block </StyledBlockShape>
            <StyledBlockCnt ref={refBlockCntS} defaultValue="*" />
          </BlockQueryBox>
        </BlockQueryRow>
        <BlockQueryRow>
          <BlockQueryBox>
            <StyledBlockShape> Z Block </StyledBlockShape>
            <StyledBlockCnt ref={refBlockCntZ} defaultValue="*" />
          </BlockQueryBox>

          <BlockQueryBox>
            <StyledBlockShape> T Block </StyledBlockShape>
            <StyledBlockCnt ref={refBlockCntT} defaultValue="*" />
          </BlockQueryBox>

          <BlockQueryBox>
            <StyledBlockShape> O Block</StyledBlockShape>
            <StyledBlockCnt ref={refBlockCntO} defaultValue="*" />
          </BlockQueryBox>

          <BlockQueryBox>
            <StyledSubmitButton onClick={handleOnClick}>
              츄라이
            </StyledSubmitButton>
          </BlockQueryBox>
        </BlockQueryRow>
      </BlockQueryContainer>
    </div>
  );
};
