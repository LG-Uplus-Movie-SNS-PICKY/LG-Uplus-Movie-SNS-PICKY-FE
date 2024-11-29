// pages/MovieDetail/components/BehindModal/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import YouTubePlayer from '@components/YouTubePlayer/YouTubePlayer';
import {
    ModalContainer,
    CloseButton,
    ContentContainer,
    YoutubeSection,
    OstSection,
    YoutubeLogo,
    Title,
    OstContainer,
    OstInfoContainer,
    OstImage,
    OstTitle,
    OstArtist,
    YoutubeContainer,
    BehindContainer,
    OstPlayist
} from './index.styles';
import ModalCloseSvg from '../../../../assets/icons/modal_close.svg?react';
import YouTubeLogoSvg from '../../../../assets/icons/youtube.svg?react';

interface YouTubePlaylist {
    title: string;
    playlistId: string;
}

interface OST {
    title: string;
    artist: string;
    cover: string;
}

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

const BehindModal = ({ onClose }: { onClose: () => void }) => {
    const playlist = dummyData.youtubePlaylists[0]; // 첫 번째 플레이리스트 사용
    const videoIds = playlist.videoIds; // videoIds를 가져옴

    const [isYTReady, setIsYTReady] = useState(false);

    useEffect(() => {

        function loadScript(src: string): Promise<void> {
            return new Promise(async (resolve, reject) => {
                const existingScript = document.querySelector(`script[src="${src}"]`);
                if (existingScript) {
                    // Script already exists, no need to load again
                    await resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = async () => await resolve();
                script.onerror = async () => await reject(new Error(`Failed to load script: ${src}`));
                document.head.appendChild(script);
            });
        }

        function initializePlayer() {
            if (window.YT && window.YT.Player) {
                setIsYTReady(true);
            } else {
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


    return (
        <ModalContainer>
            <ContentContainer>
                <CloseButton onClick={onClose}>
                    <ModalCloseSvg />
                </CloseButton>
                <YoutubeSection>
                    <YoutubeLogo>
                        <YouTubeLogoSvg />
                        <Title>비하인드 영상</Title>
                    </YoutubeLogo>
                    <YoutubeContainer>
                        {videoIds.map((videoId, index) => (
                            <BehindContainer key={index}>
                                <YouTubePlayer isYTReady={isYTReady} videoId={videoId} />
                            </BehindContainer>
                        ))}
                    </YoutubeContainer>
                </YoutubeSection>
                <OstSection>
                    <Title>OST</Title>
                    <OstPlayist>
                        {dummyData.ostList.map((ost, index) => (
                            <OstContainer key={index}>
                                <OstImage src={ost.cover} />
                                <OstInfoContainer>
                                    <OstTitle>{ost.title}</OstTitle>
                                    <OstArtist>{ost.artist}</OstArtist>
                                </OstInfoContainer>
                            </OstContainer>
                        ))}
                    </OstPlayist>
                </OstSection>
            </ContentContainer>
        </ModalContainer>
    );
};

export default BehindModal;
