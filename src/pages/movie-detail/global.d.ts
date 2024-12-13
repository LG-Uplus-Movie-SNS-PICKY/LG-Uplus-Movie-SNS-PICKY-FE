// src/global.d.ts
export {};

declare global {
  namespace YT {
    interface PlayerVars {
      autoplay: number;
      cc_lang_pref?: string;
      color?: string;
      controls?: number;
      disablekb?: number;
      enablejsapi?: number;
      end?: number;
      fs?: number;
      hl?: string;
      iv_load_policy?: number;
      list?: string;
      listType?: string;
      loop?: number;
      modestbranding?: number;
      origin: string;
      playlist?: string;
      playsinline?: number;
      rel?: number;
      showinfo?: number;
      start?: number;
      widget_referrer?: string;
      index?: number;  // 'index' 속성 추가
      
    }

    interface PlayerOptions {
      height: string;
      width: string;
      videoId?: string;
      playerVars: PlayerVars;
      events?: { // 'events' 속성 추가
        onReady?: () => void;
        onStateChange?: (event: OnStateChangeEvent) => void;
        onPlaybackQualityChange?: (event: any) => void;
        onPlaybackRateChange?: (event: any) => void;
        onError?: (event: any) => void;
        onApiChange?: () => void;
      };
    }

    interface OnStateChangeEvent {
      data: number; // YouTube player state (e.g., 1 for playing, 2 for paused)
    }

    class Player {
      constructor(id: string, options: PlayerOptions);
      destroy(): void;
      nextVideo(): void;
      previousVideo(): void;
      playVideo(): void;
      pauseVideo(): void;
      stopVideo(): void;
      seekTo(seconds: number, allowSeekAhead: boolean): void;
      getPlaylist(): Array<string>;
      getPlaylistIndex(): number;
      // 추가적으로 필요한 메소드 정의...
    }
  }

  interface Window {
    onYouTubeIframeAPIReady: (() => void) | null;
  }
}