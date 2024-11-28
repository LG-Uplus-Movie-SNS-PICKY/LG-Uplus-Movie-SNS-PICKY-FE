// pages/MovieDetail/components/MovieHeader/index.tsx
import { useNavigate } from 'react-router-dom';
import BackSvg from '../../../../assets/icons/back.svg?react';
import ShareSvg from '../../../../assets/icons/share.svg?react';
import { MovieHeaderContainer, HeaderIconContainer } from './index.styles';

const MovieHeader = () => {
  const navigate = useNavigate();
  
  return (
    <MovieHeaderContainer>
      <HeaderIconContainer>
      <BackSvg onClick={() => navigate(-1)} />
        <ShareSvg />
      </HeaderIconContainer>
    </MovieHeaderContainer>
  );
}

export default MovieHeader;