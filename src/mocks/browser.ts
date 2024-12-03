import { setupWorker } from "msw/browser";

import movieHandelrs from "./handlers/movie/genre";
import playlistHandler from "./handlers/movie/playlist";

export const worker = setupWorker(...movieHandelrs, ...playlistHandler);
