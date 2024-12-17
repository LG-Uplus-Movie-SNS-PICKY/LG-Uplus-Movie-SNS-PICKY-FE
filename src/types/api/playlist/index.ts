export interface PlaylistItemTypes {
  [key: string]: unknown;
  movieId: number;
  posterUrl: string;
  title: string;
  likes: number;
  totalRating: number;
  backdropUrl: string;
}

export interface PlaylistDataTypes {
  playlistId: number;
  title: string;
  getSimpleMovieResps: PlaylistItemTypes[];
}

// 알림 무한 스크롤 - 페이지 데이터 타입
export interface QueryPlaylistDataTypes {
  success: boolean;
  code: number;
  message: string;
  data: {
    content: PlaylistDataTypes[];
    pageable: any;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    sort: any;
  };
}

// 플레이리스트 무한 스크롤 데이터 타입
export interface QueryPlaylistTypes {
  pageParams: number[];
  pages: QueryPlaylistDataTypes[];
}
