// import { http, HttpHandler, HttpResponse } from "msw";

// import user from "@constants/json/user.json";
// import movie from "@constants/json/movie/movie.json";
// import board from "@constants/json/board/board.json";
// import boardComment from "@constants/json/board/board_comments.json";
// import boardContent from "@constants/json/board/board_contents.json";
// import boardLike from "@constants/json/board/board_likes.json";

// import { isEmpty } from "lodash";
// import { getCookie } from "@util/cookie";

// interface MovieLogContentsTypes {
//   contentUrl: "string";
//   type: "string";
// }

// interface MovieLogPostTypes {
//   boardContext: "string";
//   movieId: number;
//   contents: MovieLogContentsTypes[];
//   isSpoiler: true;
// }

// // Movie 관련 모킹 API(Mocking Object) 설계
// const boardHandlers: HttpHandler[] = [
//   // 무비로그 생성 API(Mocking Object)
//   http.post(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1/board`,
//     async ({ request }) => {
//       // 권환 확인
//       const authorization = request.headers.get("Authorization");

//       // 권환이 없을 경우 403 에러 발생
//       if (!authorization) {
//         return HttpResponse.json(
//           {
//             message:
//               "권한이 없습니다. Request Headers에 Authorization를 추가해주세요. (임시로 아무값이나 넣어도 무관)",
//           },
//           { status: 403 }
//         );
//       }

//       const body = (await request.json()) as MovieLogPostTypes;

//       // Request Body를 보내지 않은 경우
//       if (isEmpty(body)) {
//         return HttpResponse.json(
//           {
//             message:
//               "Body를 올바른 형식으로 작성해주세요. (SwaggerAPI - board-controlle 보고 참고)",
//             errorCode: "ERR_EMPTY_BODY",
//           },
//           { status: 400, statusText: "Bad Request" }
//         );
//       }

//       // 사용자가 로그인하지 않은 경우
//       const userString = getCookie("user") || {};

//       if (isEmpty(userString)) {
//         return HttpResponse.json(
//           {
//             message: "로그인이 필요합니다. 로그인 후 다시 시도해주세요.",
//             errorCode: "ERR_UNAUTHORIZED",
//           },
//           { status: 401, statusText: "Unauthorized" }
//         );
//       }

//       // 게시물 등록
//       board.push({
//         board_id: board.length + 1,
//         board_context: body.boardContext,
//         movie_id: body.movieId,
//         user_id: userString.localJwtDto.accessToken,
//         is_spoiler: body.isSpoiler,
//         writer_nickname: userString.user.nickname,
//         is_deleted: false,
//         createdDate: new Date().toISOString(),
//         updatedDate: new Date().toISOString(),
//       });

//       // 사진을 올렸을 경우
//       if (body.contents.length) {
//         body.contents.forEach((content) => {
//           boardContent.push({
//             board_content_id: boardContent.length,
//             board_content_type: content.type,
//             board_content_url: content.contentUrl,
//             board_id: board.length,
//           });
//         });
//       }

//       return HttpResponse.json(
//         { message: "REQUEST_FRONT_SUCCESS" },
//         { status: 200 }
//       );
//     }
//   ),

//   // 무비로그 수정 API(Mocking Object)
//   http.post(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId`,
//     async ({ params, request }) => {
//       // 권환 확인
//       const authorization = request.headers.get("Authorization");
//       const { boardId } = params;

//       // 권환이 없을 경우 403 에러 발생
//       if (!authorization) {
//         return HttpResponse.json(
//           {
//             message:
//               "권한이 없습니다. Request Headers에 Authorization를 추가해주세요. (임시로 아무값이나 넣어도 무관)",
//           },
//           { status: 403 }
//         );
//       }

//       const body = (await request.json()) as MovieLogPostTypes;

//       // Request Body를 보내지 않은 경우
//       if (isEmpty(body)) {
//         return HttpResponse.json(
//           {
//             message:
//               "Body를 올바른 형식으로 작성해주세요. (SwaggerAPI - board-controlle 보고 참고)",
//             errorCode: "ERR_EMPTY_BODY",
//           },
//           { status: 400, statusText: "Bad Request" }
//         );
//       }

//       // 이진 탐색(Binary Search)으로 변경할 값의 위치를 찾는다.
//       //  - 할 수 있는 이유 : id는 1 ~ N 까지 순차적으로 증가하기 때문
//       //  - target -> 쿼리 스트링으로 넘어오는 boardId가 됨
//       //  - left는 board[0], right는 board.length - 1
//       const target = Number(boardId);
//       let left = 0;
//       let right = board.length - 1;

//       while (left <= right) {
//         const mid = Math.floor((left + right) / 2);

//         if (board[mid].board_id === target) {
//           board[mid].board_context = body.boardContext;
//           board[mid].is_spoiler = body.isSpoiler;
//           return HttpResponse.json(
//             {
//               message: "REQUEST_FRONT_SUCCESS",
//             },
//             { status: 200 }
//           );
//         }

//         if (board[mid].board_id < target) {
//           left = mid + 1;
//         } else {
//           right = mid - 1;
//         }
//       }

//       return HttpResponse.json(
//         {
//           message: "해당 게시물은 존재하지 않습니다.",
//         },
//         {
//           status: 403,
//         }
//       );
//     }
//   ),

//   // 무비로그 삭제 API(Mocking Object)
//   http.delete(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId`,
//     ({ params, request }) => {
//       // 권환 확인
//       const authorization = request.headers.get("Authorization");
//       const { boardId } = params;

//       // 권환이 없을 경우 403 에러 발생
//       if (!authorization || !boardId) {
//         return HttpResponse.json(
//           {
//             message:
//               "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 boardId를 추가했는지 확인해주세요.",
//           },
//           { status: 403 }
//         );
//       }

//       for (let i = 0; i < board.length; i++) {
//         if (board[i].board_id === Number(boardId)) {
//           board.splice(i, 1); // board는 import이기 때문에 할당이 안되므로 원본 배열의 값을 수정한다.
//           break;
//         }
//       }

//       return HttpResponse.json(
//         {
//           message: "REQUEST_FRONT_SUCCESS",
//         },
//         { status: 200 }
//       );
//     }
//   ),

//   // 무비로그 조회 API(Mocking Object) - 무비로그 탭 최신순 목록 조회
//   http.get(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1/board/all`,
//     ({ request }) => {
//       const authorization = request?.headers?.get("Authorization");

//       // 권한이 없을 경우 403에러 발생
//       // 권한이 있을 경우 게시물을 반환한다.
//       if (!authorization) {
//         return HttpResponse.json(
//           {
//             message: "권한이 없습니다.",
//           },
//           { status: 403 }
//         );
//       }

//       const url = new URL(request.url);
//       const loginUser = getCookie("user") || {};

//       // 무한 스크롤을 위한 size와 lastBoardId을 현재 주소에서 Param 값을 가져온다.
//       const size = Number(url.searchParams.get("size")) || 10;
//       const lastBoardId = Number(url.searchParams.get("lastBoardId")) || 0;

//       let filterBoard = board.map((boardItem) => {
//         const boardId = boardItem.board_id; // board_id 가져오기

//         // 관련 데이터 필터링
//         const movieInfo = movie.find(
//           (movie) => movie.movie_id === boardItem.movie_id
//         );
//         const userInfo = user.find(
//           (info) => info.user_id === boardItem.user_id
//         );
//         const comments = boardComment.filter(
//           (comment) => comment.board_id === boardId
//         );
//         const contents = boardContent.filter(
//           (content) => content.board_id === boardId
//         );
//         const likes = boardLike.filter((like) => like.board_id === boardId);

//         return {
//           boardId,
//           writerId: userInfo?.user_id,
//           writerNickname: userInfo?.user_nickname,
//           writerProfileUrl: userInfo?.user_profile_url,
//           context: boardItem.board_context,
//           isSpoiler: boardItem.is_spoiler,
//           createdDate: boardItem.createdDate,
//           updatedDate: boardItem.updatedDate,
//           likesCount: likes.length,
//           commentsCount: comments.length,
//           contents: contents.map((content) => ({
//             contentUrl: content.board_content_url,
//             boardContentType: content.board_content_type,
//           })),
//           movieId: movieInfo?.movie_id,
//           movieTitle: movieInfo?.movie_title,
//           isLike: loginUser.localJwtDto.accessToken === userInfo?.user_id,
//           isAuthor: loginUser.localJwtDto.accessToken === userInfo?.user_id,
//         };
//       });

//       // 커서 기반 필터링
//       // lastBoardId보다 높은 게시물만 필터링
//       if (lastBoardId) {
//         filterBoard = filterBoard.filter(
//           (board) => board.boardId > lastBoardId
//         );
//       }

//       const paginatedBoards = filterBoard.slice(0, size);

//       return HttpResponse.json(
//         {
//           code: 200,
//           data: {
//             size: size,
//             content: paginatedBoards,
//             empty: paginatedBoards.length === 0,
//             first: !lastBoardId,
//             last: paginatedBoards.length < size,
//             number: 0,
//             numberOfElements: paginatedBoards.length,
//             pageable: {
//               offset: 0,
//               pageNumber: 0,
//               pageSize: 10,
//               paged: true,
//               sort: {
//                 empty: true,
//                 sorted: false,
//                 unsorted: true,
//               },
//               unpaged: false,
//             },
//             sort: {
//               empty: true,
//               sorted: false,
//               unsorted: true,
//             },
//           },
//           message: "요청이 성공적으로 처리되었습니다.",
//           sucess: true,
//         },
//         { status: 200 }
//       );
//     }
//   ),

//   // 영화 디테일 페이지에서 무비로그 버튼을 클릭할 경우 -> 해당 영화와 관련된 무비로그만 조회 API(Mocking Object)
//   http.get(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:movieId`,
//     ({ params, request }) => {
//       const authorization = request?.headers?.get("Authorization");
//       const { movieId } = params;

//       // 권한이 없을 경우 403에러 발생
//       if (!authorization || !movieId) {
//         return HttpResponse.json(
//           {
//             message: "권한이 없습니다.",
//           },
//           { status: 403 }
//         );
//       }

//       const url = new URL(request.url);
//       const loginUser = getCookie("user") || {};

//       // 무한 스크롤을 위한 size와 lastBoardId을 현재 주소에서 Param 값을 가져온다.
//       const size = Number(url.searchParams.get("size")) || 10;
//       const lastBoardId = Number(url.searchParams.get("lastBoardId")) || 0;

//       let filterBoard = board
//         .filter((boardItem) => boardItem.movie_id === Number(movieId))
//         .map((boardItem) => {
//           const boardId = boardItem.board_id; // board_id 가져오기

//           // 관련 데이터 필터링
//           const movieInfo = movie.find(
//             (movie) => movie.movie_id === boardItem.movie_id
//           );
//           const userInfo = user.find(
//             (info) => info.user_id === boardItem.user_id
//           );
//           const contents = boardContent.filter(
//             (content) => content.board_id === boardId
//           );

//           const likes = boardLike.filter((like) => like.board_id === boardId);

//           const comments = boardComment.filter(
//             (comment) => comment.board_id === boardId
//           );

//           return {
//             boardId,
//             writerId: userInfo?.user_id,
//             writerNickname: userInfo?.user_nickname,
//             writerProfileUrl: userInfo?.user_profile_url,
//             context: boardItem.board_context,
//             isSpoiler: boardItem.is_spoiler,
//             createdDate: boardItem.createdDate,
//             updatedDate: boardItem.updatedDate,
//             likesCount: likes.length,
//             commentsCount: comments.length,
//             contents: contents.map((content) => ({
//               contentUrl: content.board_content_url,
//               boardContentType: content.board_content_type,
//             })),
//             movieTitle: movieInfo?.movie_title,
//             isLike: loginUser.localJwtDto.accessToken === userInfo?.user_id,
//             isAuthor: loginUser.localJwtDto.accessToken === userInfo?.user_id,
//           };
//         });

//       // 커서 기반 필터링
//       // lastBoardId보다 높은 게시물만 필터링
//       if (lastBoardId) {
//         filterBoard = filterBoard.filter(
//           (board) => board.boardId > lastBoardId
//         );
//       }

//       const paginatedBoards = filterBoard.slice(0, size);

//       return HttpResponse.json(
//         {
//           code: 200,
//           data: {
//             size: size,
//             content: paginatedBoards,
//             empty: paginatedBoards.length === 0,
//             first: !lastBoardId,
//             last: paginatedBoards.length < size,
//             number: 0,
//             numberOfElements: paginatedBoards.length,
//             pageable: {
//               offset: 0,
//               pageNumber: 0,
//               pageSize: 10,
//               paged: true,
//               sort: {
//                 empty: true,
//                 sorted: false,
//                 unsorted: true,
//               },
//               unpaged: false,
//             },
//             sort: {
//               empty: true,
//               sorted: false,
//               unsorted: true,
//             },
//           },
//           message: "요청이 성공적으로 처리되었습니다.",
//           sucess: true,
//         },
//         { status: 200 }
//       );
//     }
//   ),

//   // 무비로그 조회 API(Mocking Object) - 프로필 페이지에서 사용자가 작성한 목록 조회
//   http.get(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1/board/user/:nickname`,
//     ({ params, request }) => {
//       const authorization = request.headers.get("Authorization");

//       const url = new URL(request.url);
//       const { nickname } = params;

//       // 권환이 없을 경우 403 에러 발생
//       if (!authorization || !nickname) {
//         return HttpResponse.json(
//           {
//             message:
//               "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 Query String에 nickname를 추가했는지 확인해주세요.",
//           },
//           { status: 403 }
//         );
//       }

//       // Query String으로 넘겨받은 정보를 통해 유저의 정보를 찾는다.
//       const userInfo = user.find(
//         (element) => element.user_nickname === nickname
//       );

//       const loginUser = getCookie("user") || {};

//       // 무한 스크롤을 위한 page와 limit을 현재 주소에서 Param 값을 가져온다.
//       const size = Number(url.searchParams.get("size") || 1);
//       const lastBoardId = Number(url.searchParams.get("lastBoardId") || 10);

//       // 해당 유저가 등록한 무비로그만 추출한다.
//       let filterBoardUser = board
//         .filter((element) => element.user_id === userInfo?.user_id)
//         .map((boardItem) => {
//           const boardId = boardItem.board_id; // board_id 가져오기

//           // 관련 데이터 필터링
//           const contents = boardContent.filter(
//             (content) => content.board_id === boardId
//           );

//           const movieInfo = movie.find(
//             (movie) => movie.movie_id === boardItem.movie_id
//           );

//           const likes = boardLike.filter((like) => like.board_id === boardId);

//           const comments = boardComment.filter(
//             (comment) => comment.board_id === boardId
//           );

//           return {
//             boardId,
//             writerId: userInfo?.user_id,
//             writerNickname: userInfo?.user_nickname,
//             writerProfileUrl: userInfo?.user_profile_url,
//             context: boardItem.board_context,
//             isSpoiler: boardItem.is_spoiler,
//             createdDate: boardItem.createdDate,
//             updatedDate: boardItem.updatedDate,
//             likesCount: likes.length,
//             commentsCount: comments.length,
//             contents: contents.map((content) => ({
//               contentUrl: content.board_content_url,
//               boardContentType: content.board_content_type,
//             })),
//             movieTitle: movieInfo?.movie_title,
//             isLike: loginUser.localJwtDto.accessToken === userInfo?.user_id,
//             isAuthor: loginUser.localJwtDto.accessToken === userInfo?.user_id,
//           };
//         });

//       // 커서 기반 필터링
//       // lastBoardId보다 높은 게시물만 필터링
//       if (lastBoardId) {
//         filterBoardUser = filterBoardUser.filter(
//           (board) => board.boardId > lastBoardId
//         );
//       }

//       const paginatedBoards = filterBoardUser.slice(0, size);

//       return HttpResponse.json(
//         {
//           code: 200,
//           data: {
//             size: size,
//             content: paginatedBoards,
//             empty: paginatedBoards.length === 0,
//             first: !lastBoardId,
//             last: paginatedBoards.length < size,
//             number: 0,
//             numberOfElements: paginatedBoards.length,
//             pageable: {
//               offset: 0,
//               pageNumber: 0,
//               pageSize: 10,
//               paged: true,
//               sort: {
//                 empty: true,
//                 sorted: false,
//                 unsorted: true,
//               },
//               unpaged: false,
//             },
//             sort: {
//               empty: true,
//               sorted: false,
//               unsorted: true,
//             },
//           },
//           message: "요청이 성공적으로 처리되었습니다.",
//           sucess: true,
//         },
//         { status: 200 }
//       );
//     }
//   ),

//   // 무비로그 좋아요 API(Mocking Object)
//   http.post(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId/likes`,
//     async ({ params, request }) => {
//       const authorization = request.headers.get("Authorization");
//       const { boardId } = params;

//       const userInfo = getCookie("user") || {};

//       // 권환이 없을 경우 403 에러 발생
//       if (!authorization || !boardId || isEmpty(userInfo)) {
//         return HttpResponse.json(
//           {
//             message:
//               "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 Path Validation에 boardId를 추가했는지 또는 로그인을 하셨는지 확인해주세요.",
//           },
//           { status: 403 }
//         );
//       }

//       const boardLikeInfo = boardLike.find(
//         (like) =>
//           like.board_id === Number(boardId) &&
//           like.user_id === userInfo.localJwtDto.accessToken
//       );

//       // 사용자가 해당 게시물에 좋아요를 누르지 않은 경우
//       if (isEmpty(boardLikeInfo)) {
//         boardLike.push({
//           board_id: Number(boardId),
//           board_like_id: boardLike.length + 1,
//           user_id: userInfo.localJwtDto.accessToken,
//         });

//         return HttpResponse.json(
//           {
//             message: "REQUEST_FRONT_SUCCESS(좋아요 누름)",
//           },
//           { status: 200 }
//         );
//       } else {
//         // 사용자가 이미 게시물에 좋아요를 누른 경우
//         for (let i = 0; i < boardLike.length; i++) {
//           if (
//             boardLike[i].board_id === Number(boardId) &&
//             boardLike[i].user_id === userInfo.localJwtDto.accessToken
//           ) {
//             boardLike.splice(i, 1);
//           }
//         }

//         return HttpResponse.json(
//           {
//             message: "REQUEST_FRONT_SUCCESS(좋아요 취소)",
//           },
//           { status: 200 }
//         );
//       }
//     }
//   ),

//   // 특정 게시물 댓글 생성 API(Mocking Object)
//   http.post(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId/comment`,
//     async ({ params, request }) => {
//       const authorization = request.headers.get("Authorization");
//       const { boardId } = params;

//       const userInfo = getCookie("user") || {};
//       const { content } = (await request.json()) as { content: string };

//       // 권환이 없을 경우 403 에러 발생
//       if (!authorization || !boardId || isEmpty(userInfo) || !content) {
//         return HttpResponse.json(
//           {
//             message:
//               "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 Path Validation에 boardId를 추가했는지 또는 로그인을 하셨는지 또는 body 값을 제대로 보내고 있는지 확인해주세요.",
//           },
//           { status: 403 }
//         );
//       }

//       // 유효한 게시물이 있는지 확인
//       const writerBoardComment = board.find(
//         (board) => board.board_id === Number(boardId)
//       );

//       // 해당 게시물이 없을 경우
//       if (isEmpty(writerBoardComment)) {
//         return HttpResponse.json(
//           {
//             message: "유효하지 않은 게시물 ID입니다.",
//             errorCode: "ERR_INVALID_BOARD_ID",
//           },
//           { status: 400, statusText: "Invalid Board ID" }
//         );
//       }

//       // 해당 게시물이 있을 경우 값 추가
//       boardComment.push({
//         board_id: writerBoardComment.board_id,
//         commend_id: boardComment.length + 1,
//         comment_context: content,
//         user_id: userInfo.localJwtDto.accessToken,
//         writer_nickname: userInfo.user.nickname,
//         createdDate: new Date().toISOString(),
//         updatedDate: new Date().toISOString(),
//       });

//       return HttpResponse.json(
//         {
//           message: "REQUEST_FRONT_SUCCESS",
//         },
//         { status: 200 }
//       );
//     }
//   ),

//   // 특정 게시물 댓글 조회 API(Mocking Object)
//   http.get(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId/comments`,
//     ({ params, request }) => {
//       const authorization = request.headers.get("Authorization");
//       const { boardId } = params;

//       const userInfo = getCookie("user") || {};

//       // 권환이 없을 경우 403 에러 발생
//       if (!authorization || !boardId || isEmpty(userInfo)) {
//         return HttpResponse.json(
//           {
//             message:
//               "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 Path Validation에 boardId를 추가했는지 또는 로그인을 하셨는지 확인해주세요.",
//           },
//           { status: 403 }
//         );
//       }

//       const url = new URL(request.url);

//       // 무한 스크롤을 위한 page와 limit을 현재 주소에서 Param 값을 가져온다.
//       const size = Number(url.searchParams.get("size") || 1);
//       const lastCommentId = Number(url.searchParams.get("lastCommentId") || 10);

//       // 해당 무비로그에 속한 댓글 필터링
//       let filterBoardComment = boardComment
//         .filter((comment) => comment.board_id === Number(boardId))
//         .map((comment) => {
//           const writerUser = user.find(
//             (user) => user.user_id === comment.user_id
//           );

//           return {
//             commentId: comment.commend_id,
//             writerId: writerUser?.user_id,
//             writerNickname: writerUser?.user_nickname,
//             writerProfileUrl: writerUser?.user_profile_url,
//             context: comment.comment_context,
//             createdDate: comment.createdDate,
//             updatedDate: comment.updatedDate,
//             isAuthor: userInfo.localJwtDto.accessToken === writerUser?.user_id,
//           };
//         });

//       // 커서 기반 필터링
//       // lastBoardId보다 높은 게시물만 필터링
//       if (lastCommentId) {
//         filterBoardComment = filterBoardComment.filter(
//           (board) => board.commentId > lastCommentId
//         );
//       }

//       const paginatedBoards = filterBoardComment.slice(0, size);

//       return HttpResponse.json(
//         {
//           code: 200,
//           data: {
//             size: size,
//             content: paginatedBoards,
//             empty: paginatedBoards.length === 0,
//             first: !lastCommentId,
//             last: paginatedBoards.length < size,
//             number: 0,
//             numberOfElements: paginatedBoards.length,
//             pageable: {
//               offset: 0,
//               pageNumber: 0,
//               pageSize: 10,
//               paged: true,
//               sort: {
//                 empty: true,
//                 sorted: false,
//                 unsorted: true,
//               },
//               unpaged: false,
//             },
//             sort: {
//               empty: true,
//               sorted: false,
//               unsorted: true,
//             },
//           },
//           message: "요청이 성공적으로 처리되었습니다.",
//           sucess: true,
//         },
//         { status: 200 }
//       );
//     }
//   ),

//   // 특정 댓글 삭제 API(Mocking Object)
//   http.delete(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId/comments`,
//     ({ params, request }) => {
//       const authorization = request.headers.get("Authorization");
//       const { boardId } = params;

//       // 권환이 없을 경우 403 에러 발생
//       if (!authorization || !boardId) {
//         return HttpResponse.json(
//           {
//             message:
//               "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 boardId를 추가했는지 확인해주세요.",
//           },
//           { status: 403 }
//         );
//       }

//       const url = new URL(request.url);
//       const commentId = Number(url.searchParams.get("commentId"));

//       // 존재하지 않는 코멘트일 경우
//       const comment = boardComment.find(
//         (comment) => comment.commend_id === commentId
//       );

//       if (isEmpty(comment)) {
//         return HttpResponse.json(
//           {
//             message: "유효하지 않은 댓글 ID입니다.",
//             errorCode: "ERR_INVALID_BOARD_COMMENT_ID",
//           },
//           { status: 400, statusText: "Invalid Board Comment ID" }
//         );
//       }

//       // 존재하는 코멘트일 경우
//       for (let i = 0; i < boardComment.length; i++) {
//         if (boardComment[i].commend_id === commentId) {
//           boardComment.splice(i, 1); // board는 import이기 때문에 할당이 안되므로 원본 배열의 값을 수정한다.
//           break;
//         }
//       }

//       return HttpResponse.json(
//         {
//           message: "REQUEST_FRONT_SUCCESS",
//         },
//         { status: 200 }
//       );
//     }
//   ),
// ];

// export default boardHandlers;
