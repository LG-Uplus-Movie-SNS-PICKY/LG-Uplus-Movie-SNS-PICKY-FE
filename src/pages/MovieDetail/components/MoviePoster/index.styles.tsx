// pages/MovieDetail/components/MoviePoster/index.styles.tsx
import styled from '@emotion/styled';

export const PosterContainer = styled.div`
  position: relative;
  width: 393px;
  height: 340px;
  overflow: hidden;
`;

export const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: 25% 25%;
  opacity: 0.8;
`;

export const MovieInfoContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 48px 16px 32px 16px;
    background: linear-gradient(
        rgba(0, 0, 0, 0) 0%, 
        rgba(0, 0, 0, 0.15) 16%, 
        rgba(0, 0, 0, 0.38) 24%, 
        rgba(0, 0, 0, 0.8) 100%
    );
    color: white;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;
`;

export const InfoTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 4px;
`;

export const Title = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
`;

export const InfoTextContainer = styled.div`
    font-size: 12px;
    font-weight: 400;
    text-align: left;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

export const Year = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #FFFFFF;
`;

export const Nation = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #FFFFFF;
`;

export const Genre = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #FFFFFF;
`;

export const OttWrapper = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Ott = styled.span`
    font-size: 8px;
    font-weight: 400;
    color: #7E7E7E;
`;

export const OttContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        overflow: hidden;
    }
`;