// pages/MovieDetail/Reviews/components/ReviewGraph/index.tsx
import React from 'react';
import {
  GraphWrapper,
  GraphContainer,
  TitleWrapper,
  Title,
  StarTextContainer,
  StarText,
  TotalStarText,
  RatingContainer,
  StarContainer,
  Star,
  PeopleCountText,
  ScoreWrapper,
  GenderContainer,
  ScoreContainer,
  GenderScoreText,
  ScoreBarWrapper,
  ScoreItemContainer,
  ScoreText,
  ScoreBar,
  PercentageText,
  GenderStats,
  GenderStat,
  TitleBorder,
  PercentageWrapper,
  PercentageContainer
} from './index.styles';
import MaleSvg from '@assets/icons/male.svg?react';
import FemaleSvg from '@assets/icons/female.svg?react';

interface Review {
  rating: number;
  gender: string;
}

interface Props {
  reviews: Array<Review>;
}

const ReviewGraph: React.FC<Props> = ({ reviews }) => {
  // 전체 평균 평점 계산
  const totalAverage = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // 남성/여성 리뷰 분리 및 평균 평점 계산
  const maleReviews = reviews.filter((review) => review.gender === 'male');
  const femaleReviews = reviews.filter((review) => review.gender === 'female');

  const maleAverage =
    maleReviews.reduce((acc, review) => acc + review.rating, 0) / maleReviews.length || 0;
  const femaleAverage =
    femaleReviews.reduce((acc, review) => acc + review.rating, 0) / femaleReviews.length || 0;

  // 점수대별 분포 계산
  const ratingsDistribution = new Array(5).fill(0).map((_, index) => {
    const score = 5 - index; // 점수를 5부터 1까지 역순으로 계산
    const count = reviews.filter(
      (review) => Math.ceil(review.rating) === score // 점수가 해당 범위에 포함되는지 확인
    ).length;
    return {
      score: score, // 역순으로 점수를 표시
      percentage: (count / reviews.length) * 100,
    };
  });


  // 별 렌더링 함수
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} filled={index < Math.round(rating)}>
        {index < rating ? '★' : '☆'}
      </Star>
    ));
  };

  // 원형 차트 렌더링
  const CircleChart = ({ genderStats }: { genderStats: { male: number; female: number } }) => {
    // 남성과 여성 비율 계산
    const total = genderStats.male + genderStats.female;
    const malePercentage = (genderStats.male / total) * 100;
    const femalePercentage = (genderStats.female / total) * 100;

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="#72B8FF"
            strokeWidth="3"
            strokeDasharray={`${malePercentage} ${100 - malePercentage}`}
            strokeDashoffset="0"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="#F383B0"
            strokeWidth="3"
            strokeDasharray={`${femalePercentage} ${100 - femalePercentage}`}
            strokeDashoffset={-malePercentage}
          />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)"}}>
          <PercentageWrapper>
            <PercentageContainer>
              <ScoreText>남자</ScoreText>
              <GenderScoreText>{malePercentage.toFixed(0)}%</GenderScoreText>
            </PercentageContainer>
            <PercentageContainer>
              <ScoreText>여자</ScoreText>
              <GenderScoreText>{femalePercentage.toFixed(0)}%</GenderScoreText>
            </PercentageContainer>
          </PercentageWrapper>
        </div>
      </div>
    );
  };

  return (
    <GraphWrapper>
      <GraphContainer>
        <TitleWrapper>
          <Title>실관람객 평점</Title>
          <RatingContainer>
            <StarTextContainer>
              <StarText>{totalAverage.toFixed(1)}</StarText>
              <TotalStarText>/</TotalStarText>
              <TotalStarText>5.0</TotalStarText>
            </StarTextContainer>
            <StarContainer>
              {renderStars(totalAverage)}
            </StarContainer>
            <PeopleCountText>{reviews.length}명 참여</PeopleCountText>
          </RatingContainer>
        </TitleWrapper>
        <ScoreWrapper>
          <GenderContainer>
            <GenderScoreText>남자</GenderScoreText>
            <ScoreContainer>
              <MaleSvg />
              <GenderScoreText>{maleAverage.toFixed(1)}</GenderScoreText>
            </ScoreContainer>
          </GenderContainer>
          <GenderContainer>
            <GenderScoreText>여자</GenderScoreText>
            <ScoreContainer>
              <FemaleSvg />
              <GenderScoreText>{femaleAverage.toFixed(1)}</GenderScoreText>
            </ScoreContainer>
          </GenderContainer>
        </ScoreWrapper>
      </GraphContainer>
      <GraphContainer>
        <TitleBorder>점수별 비율</TitleBorder>
        <ScoreBarWrapper>
          {ratingsDistribution.map((dist, index) => (
            <ScoreItemContainer key={index}>
              <ScoreText>★</ScoreText>
              <ScoreText>{dist.score}</ScoreText>
              <ScoreBar percentage={dist.percentage} />
              <PercentageText>{dist.percentage.toFixed(1)}%</PercentageText>
            </ScoreItemContainer>
          ))}
        </ScoreBarWrapper>
      </GraphContainer>
      <GraphContainer>
        <TitleBorder>성별 비율</TitleBorder>
        <CircleChart genderStats={{ male: maleReviews.length, female: femaleReviews.length }} />
      </GraphContainer>
    </GraphWrapper>
  );
};

export default ReviewGraph;