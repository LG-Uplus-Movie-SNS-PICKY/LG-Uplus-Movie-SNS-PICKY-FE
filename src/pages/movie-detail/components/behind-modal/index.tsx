// pages/MovieDetail/components/BehindModal/index.tsx
import React, { useEffect, useState } from 'react';
import YouTubePlayer from '@components/youtube-player';
import axios from 'axios';
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
import ModalCloseSvg from '@assets/icons/modal_close.svg?react';
import YouTubeLogoSvg from '@assets/icons/youtube.svg?react';
import { useParams } from 'react-router-dom';

interface YouTubePlaylist {
    title: string;
    playlistId: string;
}

interface OST {
    title: string;
    artist: string;
    cover: string;
}

const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube Data API Key

const dummyData = {
    youtubePlaylists: [
        {
            title: "Behind the Scenes",
            playlistId: "PLBI6wSvyxY25uSSynPJOPy9OqfBf9oFdL",
            videoIds: ["DDrPLZw3QXg", "iWrC0Rf99TY", "V8ZFIMbUNBg"], // 비디오 ID 배열 추가
        },
        // 다른 플레이리스트 추가 가능
    ],
    // ostList: [
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    //     { title: "Tunnel Chase", artist: "앨런 실베스트리앨런 실베스트리", cover: "https://i.namu.wiki/i/4cH4TrwV7cm172wfXImUxv9tn9eoWweNOP3baUElNNAZk_20YVgjETo4K1j1fzUtvcSb7qoaCg-h5Vj6AMRgbA.webp" },
    // ]
};

const BehindModal = ({ onClose }: { onClose: () => void }) => {
    const { id } = useParams<{ id: string }>(); // useParams로 movieId 가져오기
    const [ostList, setOstList] = useState<OST[]>([]);
    const [isYTReady, setIsYTReady] = useState(false);
    const playlist = dummyData.youtubePlaylists[0]; // 첫 번째 플레이리스트 사용
    const videoIds = playlist.videoIds; // videoIds를 가져옴
    const [ostVideos, setOstVideos] = useState<any[]>([]);
    const [ostPlaylistId, setOstPlaylistId] = useState<string | null>(null);

    // 영화 ID로 OST Playlist ID 가져오기
    useEffect(() => {
        const fetchOstPlaylistId = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${id}`,
                    { headers: { Authorization: "123" } }
                );

                const playlistId = response.data.ost; // OST Playlist ID
                setOstPlaylistId(playlistId);
            } catch (error) {
                console.error("OST Playlist ID 가져오기 실패", error);
            }
        };

        fetchOstPlaylistId();
    }, [id]);

    // YouTube API를 통해 OST 플레이리스트 정보 가져오기
    useEffect(() => {
        const fetchOstVideos = async () => {
            if (!ostPlaylistId) return;

            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems`,
                    {
                        params: {
                            part: "snippet",
                            playlistId: ostPlaylistId,
                            key: "YOUR_YOUTUBE_API_KEY",
                            maxResults: 10, // 필요한 개수만큼 설정
                        },
                    }
                );

                setOstVideos(response.data.items || []); // 재생목록 동영상 데이터 저장
            } catch (err) {
                console.error("OST 동영상 데이터 불러오기 실패", err);
            }
        };

        fetchOstVideos();
    }, [ostPlaylistId]);

    // YouTube Player 컴포넌트 (비하인드 영상)
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

    // // 동영상 제목에서 아티스트와 제목 추출
    // const extractArtistAndTitle = (title: string) => {
    //     const parts = title.split(" - ");
    //     return {
    //         artist: parts[0] || "Unknown Artist",
    //         songTitle: parts[1] || "Unknown Title",
    //     };
    // };

    return (
        <ModalContainer onClick={onClose}>
            <ContentContainer onClick={e => e.stopPropagation()}>
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
                        {ostVideos.map((video, index) => {
                            // 동영상 제목에서 아티스트와 곡명 추출
                            const extractArtistAndTitle = (title: string) => {
                                const parts = title.split(" - ");
                                return {
                                    artist: parts[0]?.trim() || "아티스트 알 수 없음",
                                    songTitle: parts[1]?.trim() || "제목 알 수 없음",
                                };
                            };

                            const { artist, songTitle } = extractArtistAndTitle(video.snippet.title);

                            return (
                                <OstContainer key={index}>
                                    <OstImage
                                        src={video.snippet.thumbnails.default.url}
                                        alt={songTitle}
                                    />
                                    <OstInfoContainer>
                                        <OstTitle>{songTitle}</OstTitle>
                                        <OstArtist>{artist}</OstArtist>
                                    </OstInfoContainer>
                                </OstContainer>
                            );
                        })}
                    </OstPlayist>
                </OstSection>
            </ContentContainer>
        </ModalContainer>
    );
};

export default BehindModal;
