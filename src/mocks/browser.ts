import { setupWorker } from "msw/browser";

import boardHandlers from "./handlers/board"; // 무비로그 관련 Mocking Object
import reviewHandler from "./handlers/review"; // 한줄평 관련 Mocking Object
import movieHandelrs from "./handlers/movie/genre";
import playlistHandler from "./handlers/movie/playlist";

export const worker = setupWorker(
  ...boardHandlers,
  ...reviewHandler,
  ...movieHandelrs,
  ...playlistHandler
);
