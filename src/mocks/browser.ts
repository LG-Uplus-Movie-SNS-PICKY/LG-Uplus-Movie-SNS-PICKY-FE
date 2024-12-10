import { setupWorker } from "msw/browser";

import boardHandlers from "./handlers/board"; // 무비로그 관련 Mocking Object
import reviewHandler from "./handlers/review"; // 한줄평 관련 Mocking Object
import movieHandelrs from "./handlers/movie/index";
// import movieHandelrs from "./handlers/movie/genre";
import playlistHandler from "./handlers/movie/playlist";
import authHandler from "./handlers/auth";

export const worker = setupWorker(
  ...boardHandlers,
  ...reviewHandler,
  ...movieHandelrs,
  ...playlistHandler,
  ...authHandler
);
