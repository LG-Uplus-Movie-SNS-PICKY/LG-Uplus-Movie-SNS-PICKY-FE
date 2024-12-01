import { setupWorker } from "msw/browser";

import movieHandelrs from "./handlers/movie/genre";

export const worker = setupWorker(...movieHandelrs);
