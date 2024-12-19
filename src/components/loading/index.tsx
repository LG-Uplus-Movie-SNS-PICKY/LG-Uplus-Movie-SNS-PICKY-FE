import Lottie from "lottie-react";
import LoadingLottie from "@assets/lottie/test2LoadingLottie.json";
import styled from "@emotion/styled";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(320px / 2);
  width: 150px;
`;

function Loading() {
  return (
    <LoadingContainer>
      <Lottie animationData={LoadingLottie} />
    </LoadingContainer>
  );
}

export default Loading;
