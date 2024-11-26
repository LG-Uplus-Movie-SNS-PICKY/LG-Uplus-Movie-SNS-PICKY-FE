// pages/MovieDetail/Reviews/components/ReviewGraph/index.styles.tsx
import styled from '@emotion/styled';

export const Container = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Star = styled.span<{ filled?: boolean }>`
  color: ${props => props.filled ? '#FFCC00' : '#ccc'};
  margin-right: 5px;
`;

export const ScoreBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ScoreBar = styled.div<{ percentage: number }>`
  height: 20px;
  width: ${props => props.percentage}%;
  background-color: #007BFF;
  border-radius: 5px;
`;

export const ScorePercentage = styled.span`
  font-size: 12px;
`;

export const GenderStats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const GenderStat = styled.div`
  font-size: 14px;
`;

export const CircleChart = styled.div`
  // 여기에 실제 차트 라이브러리 또는 SVG 로직 추가
`;