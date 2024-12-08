import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { MovieInfoContainer, AdBannerContainer, InfoContainer, Title, ContentText, CastInfoContainer, styles, 
// CastContainer,
// CastContainer,
CastCard, CastImage, CastDetails, CastName, CastRole } from './index.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { FreeMode, Mousewheel } from 'swiper/modules';
const MovieInfo = ({ content, castData }) => {
    const groupedCast = castData.reduce((acc, cast, index) => {
        const groupIndex = Math.floor(index / 3);
        if (!acc[groupIndex]) {
            acc[groupIndex] = [];
        }
        acc[groupIndex].push(cast);
        return acc;
    }, []);
    return (_jsxs(MovieInfoContainer, { children: [_jsx(AdBannerContainer, {}), _jsxs(InfoContainer, { children: [_jsx(Title, { children: "\uC904\uAC70\uB9AC" }), _jsx(ContentText, { children: content })] }), _jsxs(CastInfoContainer, { children: [_jsx(Title, { children: "\uCD9C\uC5F0/\uC81C\uC791" }), _jsx(Swiper, { direction: 'horizontal', slidesPerView: 'auto', spaceBetween: 16, freeMode: true, mousewheel: {
                            forceToAxis: true,
                        }, modules: [FreeMode, Mousewheel], css: styles.CastContainer(), children: groupedCast.map((group, index) => {
                            console.log(group);
                            return (_jsx(SwiperSlide, { children: group.map((cast, idx) => (_jsxs(CastCard, { children: [_jsx(CastImage, { src: cast.image, alt: cast.name }), _jsxs(CastDetails, { children: [_jsx(CastName, { children: cast.name }), _jsx(CastRole, { children: cast.role })] })] }, idx))) }, index));
                        }) })] })] }));
};
export default MovieInfo;
