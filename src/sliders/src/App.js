import styled from "styled-components";
import Slider3D from "./sliders/Slider3D";

const StyledSliderWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

export default function () {
  return (
    <StyledSliderWrapper>
      <Slider3D></Slider3D>
    </StyledSliderWrapper>
  );
}
