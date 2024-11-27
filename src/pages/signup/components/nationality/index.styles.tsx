import styled from "styled-components";

export const NationalityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 4px;
`;

export const NationalityButton = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  padding: 10px 0;
  height: 53px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? "red" : "#d9d9d9")};
  background-color: #ffffff;
  color: ${({ $isSelected }) => ($isSelected ? "#FF084A" : "#d9d9d9")};
  font-size: 16px;
  font-weight: ${({ $isSelected }) => ($isSelected ? "bold" : "normal")};
  border-radius: 10px;
  cursor: pointer;
  outline: none;
`;

export const NationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 768px;
  width: 100%;
  padding: 8px 32px;
  align-items: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-left: 16px;
`;