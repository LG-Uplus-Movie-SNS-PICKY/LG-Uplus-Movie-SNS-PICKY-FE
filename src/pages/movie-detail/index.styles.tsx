// pages/MovieDetail/index.styles.tsx
import styled from "@emotion/styled";

export const MovieDetailContainer = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  /* min-height: 100vh; */
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 8px;

  scrollbar-width: none; /* Firefox: 스크롤바 숨김 */
  -ms-overflow-style: none; /* IE: 스크롤바 숨김 */

  &::-webkit-scrollbar {
    display: none; /* Webkit (Chrome, Safari): 스크롤바 숨김 */
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  padding: 16px 16px 12px 16px;
  gap: 8px;
  background-color: #ffffff;
`;

export const Title = styled.span`
  font-size: 22px;
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
  font-size: 22px;
  color: #9d9d9d;
`;

export const EmptyText = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 20px 0 36px 0;
`;
