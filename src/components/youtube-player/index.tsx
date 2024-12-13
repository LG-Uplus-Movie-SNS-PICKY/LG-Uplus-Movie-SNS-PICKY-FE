// src/components/youtube-player.tsx
import React, { useEffect, useRef } from 'react';
interface YouTubePlayerProps {
    isYTReady: boolean;
    videoId: string;
}

const YouTubePlayer = ({ isYTReady, videoId }: YouTubePlayerProps) => {
    const playerRef = useRef<YT.Player | null>(null);

    useEffect(() => {
        console.log("Current videoId:", videoId); // videoId를 콘솔에 출력

        
        if (isYTReady) {
            playerRef.current = new YT.Player(`youtube-player-${videoId}`, {
                videoId: videoId,
                width: '280px',
                height: '220px',
                playerVars: {
                    autoplay: 0,
                    origin: window.location.origin,
                },
            });
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [isYTReady, videoId]);

    return <div id={`youtube-player-${videoId}`} />;
};

export default YouTubePlayer;