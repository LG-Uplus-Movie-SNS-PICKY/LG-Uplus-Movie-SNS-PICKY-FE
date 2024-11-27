import styled from "styled-components";

export const Wrapper = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  left: 50; */
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 768px;
  width: 100%;
  padding: 8px 16px;
  align-items: center;
`

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  gap: 16px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const Title = styled.h2`
  color: #5E5E5E;
  font-size: 16px;
  font-weight: 600;
`;

export const Subtitle = styled.span`
  font-size: 12px;
  color: #c8c8c8;
  font-weight: 400;
  text-align: left;
`;

export const GenreGroup = styled.div`
  
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
  padding: 4px 8px;
  border: ${({ $isSelected }) => ($isSelected ? "1px solid #ff084a" : "0.5px solid #F1F1F1")};
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ $isSelected }) => ($isSelected ? "#ffffff" : "#ffffff")};
  color: ${({ $isSelected }) => ($isSelected ? "#000000" : "#5E5E5E")};
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;