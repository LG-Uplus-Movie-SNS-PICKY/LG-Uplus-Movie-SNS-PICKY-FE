// pages/MovieDetail/components/MovieInfo/index.tsx
import React from 'react';
import {
  MovieInfoContainer,
  AdBannerContainer,
  InfoContainer,
  Title,
  ContentText,
  CastInfoContainer,
  CastContainer,
  CastSlide,
  CastCard,
  CastImage,
  CastDetails,
  CastName,
  CastRole
} from './index.styles';

interface CastMember {
  name: string;
  role: string;
  image: string;
}

interface MovieInfoProps {
  content: string;
  castData: CastMember[];
}

const MovieInfo: React.FC<MovieInfoProps> = ({ content, castData }) => {
  const groupedCast = castData.reduce<CastMember[][]>((acc, cast, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(cast);
    return acc;
  }, []);

  return (
    <MovieInfoContainer>
      <AdBannerContainer />
      <InfoContainer>
        <Title>기본정보</Title>
        <ContentText>{content}</ContentText>
      </InfoContainer>
      <CastInfoContainer>
        <Title>출연/제작</Title>
        <CastContainer>
          {groupedCast.map((group, index) => (
            <CastSlide key={index}>
              {group.map((cast, idx) => (
                <CastCard key={idx}>
                  <CastImage src={cast.image} alt={cast.name} />
                  <CastDetails>
                    <CastName>{cast.name}</CastName>
                    <CastRole>{cast.role}</CastRole>
                  </CastDetails>
                </CastCard>
              ))}
            </CastSlide>
          ))}
        </CastContainer>
      </CastInfoContainer>
    </MovieInfoContainer>
  );
};

export default MovieInfo;