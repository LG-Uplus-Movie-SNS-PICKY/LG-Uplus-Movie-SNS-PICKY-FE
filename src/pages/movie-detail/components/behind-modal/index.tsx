// pages/movie-detail/components/behind-modal/index.tsx
import React, { useEffect, useState } from 'react';
import YouTubePlayer from '@components/youtube-player';
import { Skeleton, SkeletonImage, SkeletonTitle, SkeletonArtist } from '../skeleton';
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
import { useMovieDetailQuery } from '@hooks/movie';
import { fetchBehindVideos, fetchOstVideos } from "@/api/youtube";

const BehindModal = ({ onClose }: { onClose: () => void }) => {
    const { id } = useParams<{ id: string }>(); // useParams로 movieId 가져오기
    const { data: movieDetail, isLoading: movieDetailIsLoading } =
        useMovieDetailQuery(Number(id));
    const [ostVideos, setOstVideos] = useState<any[]>([]);
    const [behindVideos, setBehindVideos] = useState<string[]>([]);
    const [ostPlaylistId, setOstPlaylistId] = useState<string | null>(null);
    const [behindPlaylistId, setBehindPlaylistId] = useState<string | null>(null); // 비하인드 영상 Playlist ID 저장
    const [isYTReady, setIsYTReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

    useEffect(() => {
        if (!movieDetailIsLoading) {
            // API 응답 데이터 구조 검증
            if (!movieDetail.data) {
                throw new Error("Invalid API response: Missing data");
            }

            const { ost, movie_behind_videos } = movieDetail.data;

            if (!ost || !movie_behind_videos) {
                throw new Error("Invalid API response: Missing movie_info");
            }

            // 상태 업데이트
            setOstPlaylistId(ost || null);
            setBehindPlaylistId(movie_behind_videos?.[0] || null);

            // 콘솔에 데이터 출력
            console.log('apiClient OST Playlist ID:', ost);
            console.log('apiClient Behind Videos Playlist ID:', movie_behind_videos);
        }
    }, [movieDetailIsLoading]);

    // 비하인드 영상 데이터 가져오기
    useEffect(() => {
        if (!behindPlaylistId) return;

        const loadBehindVideos = async () => {
            setIsLoading(true);
            try {
                const videoIds = await fetchBehindVideos(behindPlaylistId, YOUTUBE_API_KEY!);
                setBehindVideos(videoIds);
            } catch (error) {
                console.error('비하인드 영상 가져오기 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadBehindVideos();
    }, [behindPlaylistId]);

    // OST 데이터 가져오기
    useEffect(() => {
        if (!ostPlaylistId) return;

        const loadOstVideos = async () => {
            setIsLoading(true);
            try {
                const items = await fetchOstVideos(ostPlaylistId, YOUTUBE_API_KEY!);
                setOstVideos(items || []);
            } catch (error) {
                console.error('OST 동영상 가져오기 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadOstVideos();
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
