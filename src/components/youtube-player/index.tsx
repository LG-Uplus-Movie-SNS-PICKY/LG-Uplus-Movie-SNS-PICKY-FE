// src/components/YouTubePlayer.tsx
import React, { useEffect, useRef } from 'react';

interface YouTubePlayerProps {
    isYTReady: boolean;
    videoId: string;
}

const YouTubePlayer = ({ isYTReady, videoId }: YouTubePlayerProps) => {
    const playerRef = useRef<YT.Player | null>(null);
    
    useEffect(() => {
        if(isYTReady) {

            playerRef.current = new YT.Player(`youtube-player-${videoId}`, {
                    videoId: videoId,
                width: '280px',
                height: '220px',
                playerVars: {
                    autoplay: 0,
                    origin: window.location.origin,
                },
            });

            // const test = new YT.Player(`youtube-player-${videoId}`, {
            
            // });
        }
    }, [isYTReady]);
    
    // const playerContainerId = ;
    

    // useEffect(() => {
    //     

        

    //     loadScript('https://www.youtube.com/iframe_api')
    //         .then(() => initializePlayer())
    //         .catch((err) => console.error(err));

    //     return () => {
    //         if (playerRef.current) {
    //             playerRef.current.destroy();
    //         }
    //     };
    // }, []);

    // useEffect(() => {

    //     function loadScript(src: string): Promise<void> {
    //         return new Promise(async (resolve, reject) => {
    //             const existingScript = document.querySelector(`script[src="${src}"]`);
    //             if (existingScript) {
    //                 // Script already exists, no need to load again
    //                 await resolve();
    //                 return;
    //             }
    //             const script = document.createElement('script');
    //             script.src = src;
    //             script.onload = async () => await resolve();
    //             script.onerror = async () => await reject(new Error(`Failed to load script: ${src}`));
    //             document.head.appendChild(script);
    //         });
    //     }

        
        
    //     if(isYTReady && (playerRef && videoId)) {
    //         console.log(videoId);

    //         // if(YT) {
    //         //     console.log("YT is ready");
    //         // }
            
    //         // const test = new YT.Player(playerContainerId, {
    //         //     videoId: videoId,
    //         //     width: '180px',
    //         //     height: '120px',
    //         //     playerVars: {
    //         //         autoplay: 1,
    //         //         origin: window.location.origin,
    //         //     },
    //         // });
            
    //         // console.log("Hello")
    //     }
        
    //     // if (isYTReady && videoId) {
    //     //     playerRef.current = new YT.Player(playerContainerId, {
    //     //         videoId: videoId,
    //     //         width: '180px',
    //     //         height: '120px',
    //     //         playerVars: {
    //     //             autoplay: 1,
    //     //             origin: window.location.origin,
    //     //         },
    //     //     });
    //     // }
    // }, [videoId]);

    return <div id={`youtube-player-${videoId}`} />;
};

export default YouTubePlayer;