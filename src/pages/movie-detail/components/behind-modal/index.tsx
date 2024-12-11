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

const YOUTUBE_API_KEY = 'AIzaSyDb5ViShQWptvuz5_IGmCZV0p2IvAEuhKk'; // YouTube Data API Key 넣기

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
    // const [ostList, setOstList] = useState<OST[]>([]);
    const playlist = dummyData.youtubePlaylists[0]; // 첫 번째 플레이리스트 사용
    const videoIds = playlist.videoIds; // videoIds를 가져옴
    const [ostVideos, setOstVideos] = useState<any[]>([]);
    const [ostPlaylistId, setOstPlaylistId] = useState<string | null>(null);

    const [isYTReady, setIsYTReady] = useState(false);

     // YouTube Data API Key 확인
    console.log("YouTube Data API Key (전역):", YOUTUBE_API_KEY);

    // 영화 ID로 OST Playlist ID 가져오기
    useEffect(() => {
        console.log("useEffect 실행됨 (OST Playlist ID 요청)");
        const fetchOstPlaylistId = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${id}`,
                    { headers: { Authorization: "123" } }
                );

                const ostPlaylistId = response.data.ost; // OST Playlist ID
                setOstPlaylistId(ostPlaylistId);
                console.log("OST Playlist ID:", ostPlaylistId); // 확인용 로그
            } catch (error) {
                console.error("OST Playlist ID 가져오기 실패", error);
            }
        };

        fetchOstPlaylistId();
    }, [id]);

    // OST Playlist ID를 이용해 YouTube 데이터 가져오기
    useEffect(() => {
        console.log("useEffect 실행됨 (OST 동영상 데이터 요청)", ostPlaylistId);
        if (!ostPlaylistId) {
            console.warn("OST Playlist ID가 없습니다.");
            return;
        }

        const fetchOstVideos = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems`,
                    {
                        params: {
                            part: "snippet",
                            playlistId: ostPlaylistId,
                            key: YOUTUBE_API_KEY,
                            maxResults: 10,
                        },
                    }
                );

                if (response.data.items) {
                    console.log("OST 동영상 데이터:", response.data.items); // 확인용 로그
                    setOstVideos(response.data.items);
                } else {
                    console.warn("OST 동영상 데이터를 찾을 수 없습니다.");
                }
            } catch (error: any) {
                console.error("OST 데이터 요청 중 오류 발생:", error.response?.data || error.message);
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
