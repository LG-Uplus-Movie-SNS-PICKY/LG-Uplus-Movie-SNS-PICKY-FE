// pages/MovieDetail/components/MovieHeader/index.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BackSvg from '@assets/icons/back.svg?react';
import ShareSvg from '@assets/icons/share.svg?react';
import { MovieHeaderContainer, HeaderIconContainer } from './index.styles';
import ShareModal from '../share-modal';

const MovieHeader = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShareClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <MovieHeaderContainer>
      <HeaderIconContainer>
      <BackSvg onClick={() => navigate(-1)} />
        <ShareSvg onClick={handleShareClick}/>
      </HeaderIconContainer>
      {showModal && (
        <ShareModal url={window.location.href} onClose={handleCloseModal} />
      )}
    </MovieHeaderContainer>
  );
}

export default MovieHeader;