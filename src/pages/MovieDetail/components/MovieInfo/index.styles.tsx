// pages/MovieDetail/components/MovieInfo/index.styles.tsx
import styled from '@emotion/styled';
import AdBanner from '../../../../assets/images/movie_detail_ad_banner.png';

export const MovieInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 16px;
    align-items: center;
    background-color: #FFFFFF;
    margin-bottom: 8px;
`;

export const AdBannerContainer = styled.div`
  width: calc(100% - 32px);
  height: 80px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${AdBanner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const AdBannerImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 12px;
    align-items: flex-start;
    width: 100%;
`;

export const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
  text-align: left;
`;

export const ContentText = styled.span`
    font-size: 16px;
    font-weight: 400;
`;

export const CastInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 0 0 16px;
    gap: 12px;
    align-items: flex-start;
    width: 100%;
`;

export const CastContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  width: 100%;
`;

export const CastSlide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: 16px;
`;

export const CastCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 4px;
  margin-bottom: 16px;
`;

export const CastImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 2px;
`;

export const CastDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 4px;
  gap: 4px;
  height: 48px;
  width: 188px;
  border-bottom: 1px solid #C8C8C8;
`;

export const CastName = styled.span`
  font-size: 12px;
`;

export const CastRole = styled.span`
  font-size: 12px;
  color: #9D9D9D;
`;