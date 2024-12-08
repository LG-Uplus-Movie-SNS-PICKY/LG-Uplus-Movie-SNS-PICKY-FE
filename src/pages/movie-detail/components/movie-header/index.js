import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
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
    return (_jsxs(MovieHeaderContainer, { children: [_jsxs(HeaderIconContainer, { children: [_jsx(BackSvg, { onClick: () => navigate(-1) }), _jsx(ShareSvg, { onClick: handleShareClick })] }), showModal && (_jsx(ShareModal, { url: window.location.href, onClose: handleCloseModal }))] }));
};
export default MovieHeader;
