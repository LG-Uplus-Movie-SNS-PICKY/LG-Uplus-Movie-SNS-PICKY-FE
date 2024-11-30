// pages/MovieDetail/components/MovieFooter/index.styles.tsx
import styled from '@emotion/styled';

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  background-color: #FAFBFC;
  border-top: 1px solid #D9D9D9;
  border-bottom: 1px solid #D9D9D9;
  padding: 28px 0;
  width: 100%;
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 16px; 
  border-right: 1px solid #D9D9D9;
  gap: 4px;
`;

export const FooterTitle = styled.span`
  font-size: 12px;
  color: #9DA6AD;
`;

export const FooterContent = styled.span`
  font-size: 12px;
`;