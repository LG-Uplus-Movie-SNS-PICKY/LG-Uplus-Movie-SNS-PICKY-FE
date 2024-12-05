// pages/MovieDetail/Reviews/index.styles.tsx
import styled from '@emotion/styled';

export const MovieReviewContainer = styled.div`
  background-color: #F5F5F5;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 8px;
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

export const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 16px 4px 20px;
`;

export const SortContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export const SortOption = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 8px;
  color: ${props => props.active ? '#000000' : '#9D9D9D'};
  font-weight: ${props => props.active ? '600' : '400'};
  padding-left: 6px;
  cursor: pointer;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    top: 40%;
    transform: translateY(-50%);
    font-size: 10px;
    color: ${props => props.active ? '#000000' : '#9D9D9D'};
  }
`;

export const SpoilerToggleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;
`;

export const SpoilerToggleText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8px;
    font-weight: 400;
`;

export const SpoilerToggleButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;