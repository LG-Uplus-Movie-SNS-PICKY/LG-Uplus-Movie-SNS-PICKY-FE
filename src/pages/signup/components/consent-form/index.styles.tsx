import styled from "styled-components";

export const ConsentContainer = styled.div<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ $isChecked }) => ($isChecked ? "#ff084a" : "#d9d9d9")};
  border-radius: 10px;
  padding: 10px 15px;
  background-color: #ffffff;
  cursor: pointer;
  max-width: 400px;
`;

export const CustomCheckbox = styled.div<{ $isChecked: boolean }>`
  width: 20px;
  height: 20px;
`;

export const ConsentText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #ff084a;

  & > span {
    font-size: 14px;
    font-weight: normal;
    color: #333333;
  }
`;