import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  max-width: 429px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
`;

export const Title = styled.h2`
  color: #000;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

export const Subtitle = styled.p<{ $small?: boolean }>`
  font-size: ${({ $small }) => ($small ? "12px" : "16px")};
  color: #c8c8c8;
  font-weight: ${({ $small }) => ($small ? "600" : "400")};
  margin-left: 16px;
  margin-top: 2px;
  margin-bottom: ${({ $small }) => ($small ? "16px" : "0")};
  font-family: Pretendard;
  line-height: normal;
  text-align: left;
`;

export const GenreGroup = styled.div`
  margin-bottom: 16px;
`;

export const RequiredBadge = styled.span`
  padding: 4px 8px;
  background-color: #2e2e2e;
  color: #fff;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
`;

export const GenreGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

export const GenreButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? "#ff084a" : "#d9d9d9")};
  border-radius: 4px;
  /* box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25); */
  background-color: ${({ $isSelected }) => ($isSelected ? "#ffffff" : "#ffffff")};
  color: #000;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #f1f1f1;
    border-color: #ff084a;
  }
`;
