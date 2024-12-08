interface Movie {
    movie_id: number;
    movie_tile: string;
}
interface MovieLog {
    movie_log_id: number;
    movie_image: string;
}
export interface Notification {
    id: number;
    req_user_id: number;
    req_user_profile: string;
    req_user_nickname: string;
    req_user_movie: Movie;
    req_user_movie_log: MovieLog;
    created_at: string;
}
export declare const notificationDummyData: Array<Notification>;
export {};
