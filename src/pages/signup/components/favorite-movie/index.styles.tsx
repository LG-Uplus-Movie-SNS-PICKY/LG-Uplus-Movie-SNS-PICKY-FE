import styled from "styled-components";
import { Checked } from "../../../../assets/svg";

// 공통 스타일
export const TextBase = styled.p`
  font-family: Pretendard;
  line-height: normal;
  text-align: left;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 24px;
`;

export const Title = styled.h2`
  color: #000;
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

export const Subtitle = styled.p<{ $small?: boolean }>`
  font-size: ${({ $small }) => ($small ? "12px" : "16px")};
  color: #c8c8c8;
  font-weight: ${({ $small }) => ($small ? "600" : "400")};
  margin: 4px 0 4px 24px;
  font-family: Pretendard;
  line-height: normal;
  text-align: left;
`;

export const PageIndicator = styled.div`
  text-align: right;
  margin-top: 43px;
  margin-right: 24px;
`;

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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  height: 400px;
`;

export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

export const MovieCard = styled.div<{ $isSelected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90px;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const MovieImage = styled.img<{ $isSelected: boolean }>`
  height: 120px;
  object-fit: cover;
  filter: ${({ $isSelected }) => ($isSelected ? "brightness(20%) blur(1.5px)": "none")};
  transition: filter 0.3s ease-in-out;
`;

export const MovieTitle = styled(TextBase)`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.64px;
`;

export const CheckIcon = styled(Checked)<{ $isVisible: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

export const PreviousButton = styled(ArrowButton)`
  left: -20px;
`;

export const NextButton = styled(ArrowButton)`
  right: -20px;
`;