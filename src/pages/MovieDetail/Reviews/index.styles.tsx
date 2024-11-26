// pages/MovieDetail/Reviews/index.styles.tsx
import styled from '@emotion/styled';

export const MovieReviewContainer = styled.div`
  background-color: #F5F5F5;
  max-width: 393px;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 68px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #FFFFFF;
  margin-top: -16px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  position: relative;
  z-index: 100;
  margin-bottom: 8px;
  padding: 16px;
  gap: 8px;
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    align-items: center;
`;

export const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

export const DetailText = styled.div`
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    align-items: center;
`;