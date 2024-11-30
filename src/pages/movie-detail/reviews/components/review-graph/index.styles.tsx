// pages/MovieDetail/Reviews/components/ReviewGraph/index.styles.tsx
import styled from '@emotion/styled';
import { TitleContainer } from '../review-regist/index.styles';
import { colors } from '@styles/colors';

export const GraphWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid #D9D9D9;
  background-color: #FFFFFF;
`;

export const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 12px 12px 12px;
  border: 0.5px solid #D9D9D9;
  border-radius: 12px;
  background-color: #FAFBFC;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0;
  align-items: center;
  border-bottom: 0.5px solid #D9D9D9;
`;

export const StarTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
  justify-content: center;
`;

export const StarText = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
`;

export const TotalStarText = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #D9D9D9;
`;

export const Title = styled.span`
  font-size: 10px;
  font-weight: 600;
`;

export const TitleBorder = styled.div`
  font-size: 10px;
  font-weight: 600;
  width: 100%;
  padding: 4px 0;
  border-bottom: 0.5px solid #D9D9D9;
  text-align: center;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
`;

export const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Star = styled.span<{ filled?: boolean }>`
  font-size: 12px;
  text-align: center;
  color: ${props => props.filled ? '#FC4C4E' : '#C8C8C8'};
  margin: 0 2px;
`;

export const PeopleCountText = styled.span`
  font-size: 8px;
  font-weight: 400;
  color: #756262;
  text-align: center;
`;

export const ScoreWrapper =  styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const GenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
`

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const GenderScoreText = styled.span`
  font-size: 8px;
  font-weight: 600;
  text-align: center;
  color: ${colors.black};
`;

export const ScoreBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const ScoreItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
`;

export const ScoreText = styled.span`
  font-size: 8px;
  font-weight: 400;
  text-align: left;
`;

export const ScoreBar = styled.div<{ percentage: number }>`
  height: 10px;
  width: 100%;
  background-color: #E9E9EC;  // 기본 배경색을 회색으로 설정
  border-radius: 8px;
  overflow: hidden;  // 내부의 채워진 바가 라운드 테두리를 벗어나지 않게 하기 위해

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => `${props.percentage}%`};
    background-color: ${props => props.percentage < 50 ? '#F6A6A8' : '#FC4C4E'};  // 채워질 색을 조건에 따라 변경
    border-radius: 8px;  // 채워진 바의 라운드 적용
  }
`;

export const PercentageText = styled.div`
  display: flex;
  font-size: 8px;
  font-weight: 400;
  text-align: right;
  align-items: center;
  width: 28px;
`;

// export const ScoreBarContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// export const ScoreBar = styled.div<{ percentage: number }>`
//   height: 20px;
//   width: ${props => props.percentage}%;
//   background-color: #007BFF;
//   border-radius: 5px;
// `;

// export const ScorePercentage = styled.span`
//   font-size: 12px;
// `;

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

export const PercentageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

export const PercentageContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap:4px;
      justify-content: center;
      align-items: center;
`;