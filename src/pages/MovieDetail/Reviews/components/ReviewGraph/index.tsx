// pages/MovieDetail/Reviews/components/ReviewGraph/index.tsx
import React from 'react';
import {
  Container,
  Title,
  RatingContainer,
  StarContainer,
  Star,
  ScoreBarContainer,
  ScoreBar,
  ScorePercentage,
  GenderStats,
  GenderStat,
} from './index.styles';

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
    const count = reviews.filter(
      (review) => review.rating > index && review.rating <= index + 1
    ).length;
    return {
      range: `${5 - index}-${4 - index}`,
      percentage: (count / reviews.length) * 100, // 문자열 대신 숫자로 반환
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
      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
        <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="3"
            strokeDasharray={`${malePercentage} ${100 - malePercentage}`}
            strokeDashoffset="0"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="#F06292"
            strokeWidth="3"
            strokeDasharray={`${femalePercentage} ${100 - femalePercentage}`}
            strokeDashoffset={-malePercentage}
          />
        </svg>
        <div style={{ position: 'absolute', top: '40%', left: '30%', fontSize: '10px' }}>
          남자 {malePercentage.toFixed(0)}% <br />
          여자 {femalePercentage.toFixed(0)}%
        </div>
      </div>
    );
  };

  return (
    <Container>
      <Title>실관람객 평점</Title>
      <RatingContainer>
        <StarContainer>
          {renderStars(totalAverage)}
          <span>{totalAverage.toFixed(1)} / 5</span>
        </StarContainer>
        <GenderStats>
          <GenderStat>
            <span>남자</span>
            <span>{maleAverage.toFixed(2)}</span>
          </GenderStat>
          <GenderStat>
            <span>여자</span>
            <span>{femaleAverage.toFixed(2)}</span>
          </GenderStat>
        </GenderStats>
        <CircleChart genderStats={{ male: maleReviews.length, female: femaleReviews.length }} />
      </RatingContainer>
      <ScoreBarContainer>
        {ratingsDistribution.map((dist, index) => (
          <div key={index}>
            <Star>{dist.range}</Star>
            <ScoreBar percentage={dist.percentage} />
            <ScorePercentage>{dist.percentage.toFixed(2)}%</ScorePercentage>
          </div>
        ))}
      </ScoreBarContainer>
    </Container>
  );
};

export default ReviewGraph;