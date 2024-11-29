// pages/MovieDetail/index.styles.tsx
import styled from '@emotion/styled';

export const MovieDetailContainer = styled.div`
  background-color: #F5F5F5;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 68px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  padding: 16px 16px 12px 16px;
  gap: 8px;
  background-color: #FFFFFF;
`;

export const Title = styled.span`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    align-items: center;
`;

export const ReviewCountContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2px;
`;

export const ReviewCount = styled.div`
    font-size: 24px;
    color: #9D9D9D;
`;