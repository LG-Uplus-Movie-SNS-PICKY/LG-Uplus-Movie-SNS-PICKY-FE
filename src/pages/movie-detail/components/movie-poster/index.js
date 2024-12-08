import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// pages/MovieDetail/components/MoviePoster/index.tsx
import { PosterContainer, PosterImage, MovieInfoContainer, InfoTextWrapper, Title, InfoTextContainer, Year, Nation, Genre, OttWrapper, Ott, OttContainer, } from './index.styles';
// OTT 서비스 URL 매핑 객체
const ottLogos = {
    "Netflix": "https://yt3.googleusercontent.com/SXKyE4XgHJtX4qLS-9FKDuZt9EpBfeFPlGmNQdqsfxW2FDaKOjE53Mb20E43QuQfNDritLK1aw=s900-c-k-c0x00ffffff-no-rj",
    "DisneyPlus": "https://yt3.googleusercontent.com/y8xDKfp1aHjwej33BIhVNcaJnHgKke2jB6bHkrrpckJO7SxyFvvDpPRbIwO0kxGcZOnAOHkCfQ=s900-c-k-c0x00ffffff-no-rj",
    "Watcha": "https://yt3.googleusercontent.com/pCcTLy8Zj7gIuo3yfYkB6cT2f0jz2beWJC5E4-B4ju9VBLdfrVDi6yc0B0313N8EVLY1UBaxxA=s900-c-k-c0x00ffffff-no-rj",
    "Wavve": "https://yt3.googleusercontent.com/AwhuiDrnSIKzxLyp48jc5dyxj7YVdpwrj42s11o0slC0_sAOVQDDASFU9q3fDwan8UKEJP0Wew=s900-c-k-c0x00ffffff-no-rj",
    "Tving": "https://www.tving.com/img/tving-favicon-160@3x.png",
    "CoupangPlay": "https://play-lh.googleusercontent.com/IPu4haF4Jl9sMQ8TUEYJ4zUtN9pHJuxLOZzGHQcRPeT5ud07Y4sgUlB6ITaaxtbsPVA"
};
// OTT 서비스 URL 매핑 객체
const ottUrls = {
    "Netflix": "https://www.netflix.com",
    "DisneyPlus": "https://www.disneyplus.com",
    "Watcha": "https://www.watcha.com",
    "Wavve": "https://www.wavve.com",
    "Tving": "https://www.tving.com",
    "CoupangPlay": "https://www.coupangplay.com"
};
const MoviePoster = ({ imageUrl, title, year, nation, genre, ott }) => {
    const navigateToOtt = (ottName) => {
        const url = ottUrls[ottName];
        if (url) {
            window.open(url, '_blank');
        }
    };
    return (_jsxs(PosterContainer, { children: [_jsx(PosterImage, { src: imageUrl }), _jsxs(MovieInfoContainer, { children: [_jsxs(InfoTextWrapper, { children: [_jsx(Title, { children: title }), _jsxs(InfoTextContainer, { children: [_jsx(Year, { children: year }), "|", _jsx(Nation, { children: nation }), "|", _jsx(Genre, { children: genre })] })] }), _jsxs(OttWrapper, { children: [_jsx(Ott, { children: "\uAC10\uC0C1 \uAC00\uB2A5\uD55C \uACF3" }), _jsx(OttContainer, { children: ott.map((service, index) => (_jsx("img", { src: ottLogos[service], alt: service, onClick: () => navigateToOtt(service), style: { cursor: 'pointer' } }, index))) })] })] })] }));
};
export default MoviePoster;
