// pages/movie-detail/components/behind-modal/index.tsx
import React, { useEffect, useState } from 'react';
import YouTubePlayer from '@components/youtube-player';
import { Skeleton, SkeletonImage, SkeletonTitle, SkeletonArtist } from '../skeleton';
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

const BehindModal = ({ onClose }: { onClose: () => void }) => {
    const { id } = useParams<{ id: string }>(); // useParams로 movieId 가져오기
    // const [ostList, setOstList] = useState<OST[]>([]);
    const [movieData, setMovieData] = useState<any>(null);
    const [ostVideos, setOstVideos] = useState<any[]>([]);
    const [behindVideos, setBehindVideos] = useState<string[]>([]);
    const [ostPlaylistId, setOstPlaylistId] = useState<string | null>(null);
    const [behindPlaylistId, setBehindPlaylistId] = useState<string | null>(null); // 비하인드 영상 Playlist ID 저장
    const [isYTReady, setIsYTReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    // const accessToken = localStorage.getItem("accessToken");
    const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzM0MDYyMzcwLCJleHAiOjE3MzQxNDg3NzB9.2vo7JzzTxzq8rK69JBmc6lBA2zQL_Yc3GbzbGoTGBGY"

    // YouTube Data API Key 확인
    console.log("YouTube Data API Key (전역):", YOUTUBE_API_KEY);

    // API 호출을 통해 데이터 가져오기
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${id}`,
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                console.log('영화 API 응답 데이터:', response.data);

                // OST와 비하인드 영상 ID 추출
                const { ost, movie_behind_videos } = response.data.data || {};

                // 콘솔에 데이터 출력
                console.log('OST Playlist ID:', ost);
                console.log('Behind Videos Playlist ID:', movie_behind_videos);

                // 상태 업데이트
                setOstPlaylistId(ost || null);
                setBehindPlaylistId(movie_behind_videos?.[0] || null);
            } catch (error) {
                console.error('영화 데이터 가져오기 실패:', error);
            } finally {
                setIsLoading(false); // 로딩 상태 해제
            }
        };

        fetchMovieData();
    }, [id]);

    // 비하인드 영상 Playlist 동영상 가져오기
    useEffect(() => {
        if (!behindPlaylistId) return;

        const fetchBehindVideos = async () => {
            try {
                setIsLoading(true); // 로딩 시작
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems`,
                    {
                        params: {
                            part: 'snippet',
                            playlistId: behindPlaylistId,
                            key: YOUTUBE_API_KEY,
                            maxResults: 50,
                        },
                    }
                );
                // response에서 videoId 추출
                const videoIds = response.data.items.map(
                    (item: any) => item.snippet.resourceId.videoId
                );

                console.log('비하인드 영상 videoIds:', videoIds); // 가져온 비디오 ID를 콘솔에 출력

                setBehindVideos(videoIds); // 상태에 저장
            } catch (error) {
                console.error('비하인드 영상 가져오기 실패:', error);
            } finally {
                setIsLoading(false); // 로딩 종료
            }
        };

        fetchBehindVideos();
    }, [behindPlaylistId]);

    // OST Playlist 동영상 가져오기
    useEffect(() => {
        if (!ostPlaylistId) return;

        const fetchOstVideos = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems`,
                    {
                        params: {
                            part: 'snippet',
                            playlistId: ostPlaylistId,
                            key: YOUTUBE_API_KEY,
                            maxResults: 50,
                        },
                    }
                );
                console.log('OST 동영상 데이터:', response.data.items);
                setOstVideos(response.data.items || []);
            } catch (error) {
                console.error('OST 동영상 가져오기 실패:', error);
            }
        };

        fetchOstVideos();
    }, [ostPlaylistId]);

    // YouTube Player (YouTube 비하인드 영상)
    useEffect(() => {
        function loadScript(src: string): Promise<void> {
            return new Promise((resolve, reject) => {
                const existingScript = document.querySelector(`script[src="${src}"]`);
                if (existingScript) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
                document.head.appendChild(script);
            });
        }

        function initializePlayer() {
            if (window.YT && window.YT.Player) {
                setIsYTReady(true);
            } else {
                window.onYouTubeIframeAPIReady = () => setIsYTReady(true);
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
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <BehindContainer key={index}>
                                    <Skeleton /> {/* Skeleton 자리 고정 */}
                                </BehindContainer>
                            ))
                        ) : behindVideos.length > 0 ? (
                            behindVideos.map((videoId, index) => (
                                <BehindContainer key={index}>
                                    <YouTubePlayer isYTReady={isYTReady} videoId={videoId} />
                                </BehindContainer>
                            ))
                        ) : (
                            <p>비하인드 영상이 없습니다.</p>
                        )}
                    </YoutubeContainer>
                </YoutubeSection>
                <OstSection>
                    <Title>OST</Title>
                    <OstPlayist>
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <OstContainer key={index}>
                                    {/* 이미지 Skeleton */}
                                    <SkeletonImage />
                                    {/* 제목 및 아티스트 Skeleton */}
                                    <OstInfoContainer>
                                        <SkeletonTitle />
                                        <SkeletonArtist />
                                    </OstInfoContainer>
                                </OstContainer>
                            ))
                            : ostVideos.map((video, index) => {
                                const songTitle = video.snippet.title; // 곡명
                                const artist = video.snippet.channelTitle; // 아티스트
                                const videoUrl = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`; // 유튜브 링크

                                return (
                                    <OstContainer key={index} onClick={() => window.open(videoUrl, '_blank')}>
                                        {/* 이미지 */}
                                        <OstImage
                                            src={video.snippet.thumbnails.default.url}
                                            alt={songTitle}
                                        />
                                        {/* 제목 및 아티스트 */}
                                        <OstInfoContainer>
                                            <OstTitle title={songTitle}>{songTitle}</OstTitle>
                                            <OstArtist title={artist}>{artist}</OstArtist>
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
