import styled from "styled-components";

export const ConsentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  padding: 8px 32px;
`;

export const ConsentContainer = styled.div<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid ${({ $isChecked }) => ($isChecked ? "#ff084a" : "#d9d9d9")};
  border-radius: 10px;
  padding: 12px 16px;
  background-color: #ffffff;
  cursor: pointer;
  width: 100%;
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