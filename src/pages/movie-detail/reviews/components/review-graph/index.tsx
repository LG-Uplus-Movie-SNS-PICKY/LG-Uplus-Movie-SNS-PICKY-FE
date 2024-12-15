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
  TitleBorder,
  PercentageWrapper,
  PercentageContainer,
} from './index.styles';
import MaleSvg from '@assets/icons/male.svg?react';
import FemaleSvg from '@assets/icons/female.svg?react';

interface RatingsData {
  totalCount: number;
  oneCount: number;
  twoCount: number;
  threeCount: number;
  fourCount: number;
  fiveCount: number;
}

interface GendersData {
  totalCount: number;
  maleCount: number;
  femaleCount: number;
  manAverage: number;
  womanAverage: number;
}

interface Props {
  ratings: RatingsData;
  genders: GendersData;
}

const ReviewGraph = ({ ratings, genders }: Props) => {
  // // 전체 평균 평점 계산
  // const totalAverage = reviews.length
  // ? Math.round((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) * 10) / 10
  // : 0; // 리뷰가 없을 경우 0 반환

  // // 남성/여성 리뷰 분리 및 평균 평점 계산
  // const maleReviews = reviews.filter((review) => review.gender === 'male');
  // const femaleReviews = reviews.filter((review) => review.gender === 'female');

  // const maleAverage =
  //   maleReviews.reduce((acc, review) => acc + review.rating, 0) / maleReviews.length || 0;
  // const femaleAverage =
  //   femaleReviews.reduce((acc, review) => acc + review.rating, 0) / femaleReviews.length || 0;

  // // 점수대별 분포 계산
  // const ratingsDistribution = new Array(5).fill(0).map((_, index) => {
  //   const score = 5 - index; // 점수를 5부터 1까지 역순으로 계산
  //   const count = reviews.filter(
  //     (review) =>
  //       review.rating <= score && review.rating > score - 1 // 범위를 명확히 정의
  //   ).length;
  //   return {
  //     score: score,
  //     percentage: (count / reviews.length) * 100,
  //   };
  // });

  const totalCount = ratings.totalCount;

  // 점수별 비율 계산
  const ratingsDistribution = [
    { score: 5, count: ratings.fiveCount },
    { score: 4, count: ratings.fourCount },
    { score: 3, count: ratings.threeCount },
    { score: 2, count: ratings.twoCount },
    { score: 1, count: ratings.oneCount },
  ].map((rating) => ({
    ...rating,
    percentage: totalCount > 0 ? (rating.count / totalCount) * 100 : 0,
  }));

  // 전체 평균 평점 계산
  const totalAverage =
    totalCount > 0
      ? (5 * ratings.fiveCount +
          4 * ratings.fourCount +
          3 * ratings.threeCount +
          2 * ratings.twoCount +
          1 * ratings.oneCount) /
        totalCount
      : 0;

  // 성별 비율 계산
  const malePercentage =
    genders.totalCount > 0
      ? (genders.maleCount / genders.totalCount) * 100
      : 0;
  const femalePercentage = 100 - malePercentage;


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
    const malePercentage = total > 0 ? (genderStats.male / total) * 100 : 0;
    const femalePercentage = total > 0 ? (genderStats.female / total) * 100 : 0;

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
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
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
            <PeopleCountText>{totalCount}명 참여</PeopleCountText>
          </RatingContainer>
        </TitleWrapper>
        <ScoreWrapper>
          <GenderContainer>
            <GenderScoreText>남자</GenderScoreText>
            <ScoreContainer>
              <MaleSvg />
              <GenderScoreText>{genders.manAverage.toFixed(1)}</GenderScoreText>
            </ScoreContainer>
          </GenderContainer>
          <GenderContainer>
            <GenderScoreText>여자</GenderScoreText>
            <ScoreContainer>
              <FemaleSvg />
              <GenderScoreText>{genders.womanAverage.toFixed(1)}</GenderScoreText>
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
        <CircleChart
          genderStats={{
            male: genders.maleCount,
            female: genders.femaleCount,
          }}
        />
      </GraphContainer>
    </GraphWrapper>
  );
};

export default ReviewGraph;