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
