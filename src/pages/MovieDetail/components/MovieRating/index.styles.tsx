// pages/MovieDetail/components/MovieRating/index.styles.tsx
import styled from '@emotion/styled';

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  margin-top: -16px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  position: relative;
  z-index: 100;
  margin-bottom: 8px;
`;

export const RatingTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;
  align-items: center;
  padding: 12px 16px;
  justify-content: flex-start;
  width: 100%;
`;

export const RatingText = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #5E5E5E;
`;

export const PeopleText = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: rgba(94, 94, 94, 0.5);
`;

export const RatingStarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 67px;
    gap: 8px;
    border-top: solid 1px #D9D9D9;
`;

export const Star = styled.div<{ filled: boolean, filledHalf?: boolean }>`
  width: 45px;
  height: 45px;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  background-color: ${props => props.filled ? '#FFEB00' : props.filledHalf ? 'linear-gradient(to right, #FFEB00 50%, #C8C8C8 50%)' : '#C8C8C8'};
`;

export const TabBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 64px);
    height: 86px;
    margin: 0 32px;
    box-sizing: border-box;
    border-top: solid 1px #D9D9D9;
`;

export const IconContainer = styled.div<{ active?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 12px;
    cursor: pointer;
`;

export const LikeText = styled.span<{ active?: boolean }>`
    font-weight: ${props => props.active ? '600' : '400'};
    color: ${props => props.active ? '#FF084A' : '#000000'};
`;