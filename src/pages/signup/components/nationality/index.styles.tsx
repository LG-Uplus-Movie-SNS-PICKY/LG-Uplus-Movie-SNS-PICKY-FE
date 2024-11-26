import styled from "styled-components";

export const NationalityContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const NationalityButton = styled.button<{ $isSelected: boolean }>`
  padding: 10px 60px;
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