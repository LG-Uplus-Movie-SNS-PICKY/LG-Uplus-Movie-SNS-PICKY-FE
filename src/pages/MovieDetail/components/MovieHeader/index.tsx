// pages/MovieDetail/components/MovieHeader/index.tsx
import BackSvg from '../../../../assets/icons/back.svg?react';
import ShareSvg from '../../../../assets/icons/share.svg?react';
import { MovieHeaderContainer, HeaderIconContainer } from './index.styles';

const MovieHeader = () => {
  return (
    <MovieHeaderContainer>
      <HeaderIconContainer>
        <BackSvg />
        <ShareSvg />
      </HeaderIconContainer>
    </MovieHeaderContainer>
  );
}

export default MovieHeader;