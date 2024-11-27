import styled from "styled-components";
import { Checked } from "../../../../assets/svg";


export const ConsentWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  padding: 8px 32px; */

`;

export const TextBase = styled.p`
  font-family: Pretendard;
  line-height: normal;
  text-align: left;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  padding-bottom: 40px;
  width: 300px;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 300px;
`;

export const Title = styled.h2`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

export const RequiredBadge = styled.span`
  padding: 4px 8px;
  background-color: #2e2e2e;
  color: #fff;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
`;

export const Subtitle = styled.div`
  font-size: 16px;
  color: #c8c8c8;
  font-weight: "400";
  text-align: left;
`;

export const PageIndicator = styled.div`
  text-align: right;
  padding: 0 24px;
`;

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 363px;
  margin: 0 auto;
`

export const CurrentPage = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: 600;
`;

export const TotalPages = styled.span`
  color: #c8c8c8;
  font-size: 16px;
  font-weight: 400;
`;

export const MovieGridWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 363px;
  margin: 0 auto; */
  /* left: 50; */
  /* padding: 0 24px; */
`;

export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  flex: 1;
  /* max-width: 40%; */
  /* width: 363px;
  margin: 0 auto; */
  justify-items: center;
  align-items: center;
`;

export const MovieCard = styled.div<{ $isSelected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90px;
  height: 140px;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? "transparent" : "transparent")};
  /* background-color: ${({ $isSelected }) => ($isSelected ? "rgba(0, 0, 0, 0.5)" : "#fff")}; */
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

export const MovieImage = styled.img<{ $isSelected: boolean }>`
  position: relative;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  filter: ${({ $isSelected }) =>
    $isSelected ? "brightness(40%) blur(0.6px)" : "none"};
  transition: filter 0.3s ease-in-out;
`;

export const MovieTitle = styled(TextBase)`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.4px;
  margin-top: 4px;
`;

export const CheckIcon = styled(Checked)<{ $isVisible: boolean }>`
  position: absolute;
  top: 42.9%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  align-items: center;
  justify-content: center;
`;

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 40px;
  height: 40px; */
  border: none;
  background: none;
  cursor: pointer;
  z-index: 1;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PreviousButton = styled(ArrowButton)`
  /* margin-right: 16px; */
`;

export const NextButton = styled(ArrowButton)`
  /* margin-left: 16px; */
`;