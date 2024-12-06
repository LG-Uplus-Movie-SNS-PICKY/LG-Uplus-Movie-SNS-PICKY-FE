import { setupWorker } from "msw/browser";

import boardHandlers from "./handlers/board";
import movieHandelrs from "./handlers/movie/genre";
import playlistHandler from "./handlers/movie/playlist";

export const worker = setupWorker(
  ...boardHandlers,
  ...movieHandelrs,
  ...playlistHandler
);
