var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// pages/MovieDetail/components/BehindModal/index.tsx
import { useEffect, useState } from 'react';
import YouTubePlayer from '@components/youtube-player';
import { ModalContainer, CloseButton, ContentContainer, YoutubeSection, OstSection, YoutubeLogo, Title, OstContainer, OstInfoContainer, OstImage, OstTitle, OstArtist, YoutubeContainer, BehindContainer, OstPlayist } from './index.styles';
import ModalCloseSvg from '@assets/icons/modal_close.svg?react';
import YouTubeLogoSvg from '@assets/icons/youtube.svg?react';
const dummyData = {
    youtubePlaylists: [
        {
            title: "Behind the Scenes",
            playlistId: "PLBI6wSvyxY25uSSynPJOPy9OqfBf9oFdL",
            videoIds: ["DDrPLZw3QXg", "iWrC0Rf99TY", "V8ZFIMbUNBg"], // 비디오 ID 배열 추가
        },
        // 다른 플레이리스트 추가 가능
    ],
    ostList: [
        { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
        { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    ]
};
const BehindModal = ({ onClose }) => {
    const playlist = dummyData.youtubePlaylists[0]; // 첫 번째 플레이리스트 사용
    const videoIds = playlist.videoIds; // videoIds를 가져옴
    const [isYTReady, setIsYTReady] = useState(false);
    useEffect(() => {
        function loadScript(src) {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const existingScript = document.querySelector(`script[src="${src}"]`);
                if (existingScript) {
                    // Script already exists, no need to load again
                    yield resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => __awaiter(this, void 0, void 0, function* () { return yield resolve(); });
                script.onerror = () => __awaiter(this, void 0, void 0, function* () { return yield reject(new Error(`Failed to load script: ${src}`)); });
                document.head.appendChild(script);
            }));
        }
        function initializePlayer() {
            if (window.YT && window.YT.Player) {
                setIsYTReady(true);
            }
            else {
                // Register API ready callback
                window.onYouTubeIframeAPIReady = () => {
                    setIsYTReady(true);
                };
            }
        }
        loadScript('https://www.youtube.com/iframe_api')
            .then(() => initializePlayer())
            .catch((err) => console.error(err));
    }, []);
    return (_jsx(ModalContainer, { onClick: onClose, children: _jsxs(ContentContainer, { onClick: e => e.stopPropagation(), children: [_jsx(CloseButton, { onClick: onClose, children: _jsx(ModalCloseSvg, {}) }), _jsxs(YoutubeSection, { children: [_jsxs(YoutubeLogo, { children: [_jsx(YouTubeLogoSvg, {}), _jsx(Title, { children: "\uBE44\uD558\uC778\uB4DC \uC601\uC0C1" })] }), _jsx(YoutubeContainer, { children: videoIds.map((videoId, index) => (_jsx(BehindContainer, { children: _jsx(YouTubePlayer, { isYTReady: isYTReady, videoId: videoId }) }, index))) })] }), _jsxs(OstSection, { children: [_jsx(Title, { children: "OST" }), _jsx(OstPlayist, { children: dummyData.ostList.map((ost, index) => (_jsxs(OstContainer, { children: [_jsx(OstImage, { src: ost.cover }), _jsxs(OstInfoContainer, { children: [_jsx(OstTitle, { children: ost.title }), _jsx(OstArtist, { children: ost.artist })] })] }, index))) })] })] }) }));
};
export default BehindModal;
