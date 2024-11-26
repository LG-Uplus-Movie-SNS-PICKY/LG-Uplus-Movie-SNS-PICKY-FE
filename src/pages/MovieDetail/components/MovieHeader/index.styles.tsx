// pages/MovieDetail/components/MovieHeader/index.tsx
import styled from '@emotion/styled';

export const MovieHeaderContainer = styled.div`
  display: flex;
  padding: 0 16px;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.01);
  top: 0;
  z-index: 10000;
  position: absolute;
`;

export const HeaderIconContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;