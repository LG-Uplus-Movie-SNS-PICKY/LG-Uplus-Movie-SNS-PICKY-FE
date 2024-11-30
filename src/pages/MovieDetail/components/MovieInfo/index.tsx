// pages/MovieDetail/components/MovieInfo/index.tsx
import React from 'react';
import {
  MovieInfoContainer,
  AdBannerContainer,
  InfoContainer,
  Title,
  ContentText,
  CastInfoContainer,
  styles,
  // CastContainer,
  // CastContainer,
  CastCard,
  CastImage,
  CastDetails,
  CastName,
  CastRole
} from './index.styles';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { FreeMode, Mousewheel, Scrollbar } from 'swiper/modules';

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
        <Title>줄거리</Title>
        <ContentText>{content}</ContentText>
      </InfoContainer>
      

      {/*  최상위 부모 컴포넌트 */}
      <CastInfoContainer>

        {/* 타이틀 */}
        <Title>출연/제작</Title>
        
        {/* 슬라이더 부모 컨테이너 */}
        <Swiper 
          direction='horizontal'
          slidesPerView='auto'
          spaceBetween={16}
          freeMode={true}
          mousewheel={{
            forceToAxis: true,
          }}
          modules={[FreeMode, Mousewheel]}
          css={styles.CastContainer()}
        >

            {groupedCast.map((group, index) => {
              console.log(group)
              return (
                  <SwiperSlide key={index} >
    
                  {group.map((cast, idx) => (
                    <CastCard key={idx}>
                      <CastImage src={cast.image} alt={cast.name} />
                      <CastDetails>
                        <CastName>{cast.name}</CastName>
                        <CastRole>{cast.role}</CastRole>
                      </CastDetails>
                    </CastCard>
                  ))}
    
                  </SwiperSlide>
                )}
              )
            }

            {/*  */}

                {/* {group.map((cast, idx) => (
                      <CastCard key={idx}>
                        <CastImage src={cast.image} alt={cast.name} />
                        <CastDetails>
                          <CastName>{cast.name}</CastName>
                          <CastRole>{cast.role}</CastRole>
                        </CastDetails>
                      </CastCard>
                    ))} */}
          </Swiper>

          {/* 각 슬라이더 아이템 */}
            {/* {groupedCast.map((group, index) => (
              <SwiperSlide key={index}>
                <CastContainer>

                  {group.map((cast, idx) => (
                    <CastCard key={idx}>
                      <CastImage src={cast.image} alt={cast.name} />
                      <CastDetails>
                        <CastName>{cast.name}</CastName>
                        <CastRole>{cast.role}</CastRole>
                      </CastDetails>
                    </CastCard>
                  ))}

                </CastContainer>
              </SwiperSlide>
            ))} */}

          

        


        {/* <CastContainer>
          {groupedCast.map((group, index) => (
            
            //  각 슬라이더 아이템
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
        
        </CastContainer> */}
      </CastInfoContainer>
    
   </MovieInfoContainer>
  );
};

export default MovieInfo;