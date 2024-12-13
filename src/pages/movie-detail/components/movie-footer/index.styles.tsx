// pages/MovieDetail/components/MovieFooter/index.styles.tsx
import styled from "@emotion/styled";

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  background-color: #fafbfc;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  padding: 28px 0;
  width: 100%;
  /* margin-bottom: 60px; */
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 16px;
  border-right: 1px solid #d9d9d9;
  gap: 4px;
`;

export const FooterTitle = styled.span`
  font-size: 12px;
  color: #9da6ad;
`;

export const FooterContent = styled.span`
  font-size: 12px;
`;
