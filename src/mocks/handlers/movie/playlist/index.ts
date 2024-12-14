import { http, HttpHandler, HttpResponse } from "msw";

const MOCK_PLAYLIST_DATA = [
  {
    playlistId: 1,
    title: "인생을 바꾼 명작들",
    // 포레스트 검프, 행복을 찾아서, 인턴, 인생은 아름다워, 여인의 향기, 트루먼쇼
    getSimpleMovieResps: [
      {
        movieId: 1,
        title: "포레스트 검프",
        likes: 291,
        totalRating: 4.5,
        posterUrl: "/xdJxoq0dtkchOkUz5UVKuxn7a2V.jpg",
        backdropUrl: "/ghgfzbEV7kbpbi1O8eIILKVXEA8.jpg",
      },

      {
        movieId: 2,
        title: "행복을 찾아서",
        posterUrl: "/uRMMtYZkWyqsc4AO4aCoHBbZSwL.jpg",
        totalRating: 4.2,
        likes: 192,
        backdropUrl: "/5jhG1lTgV0MS6tDkBMQSSitttTT.jpg",
      },

      {
        movieId: 3,
        title: "인턴",
        posterUrl: "/gCmXCNfK1WU1CFjZjvfo3gBhiEa.jpg",
        totalRating: 4.7,
        likes: 419,
        backdropUrl: "/i8Q2Ei2dPliMLgPWYhRTxIDzh7r.jpg",
      },

      {
        movieId: 4,
        title: "인생은 아름다워",
        posterUrl: "/yjOqQsQHdsEZfAosZERqHiwjaty.jpg",
        totalRating: 4.4,
        likes: 392,
        backdropUrl: "/gavyCu1UaTaTNPsVaGXT6pe5u24.jpg",
      },

      {
        movieId: 5,
        title: "여인의 향기",
        posterUrl: "/7bIo8s6Qqn8OrZEyS8dqKR6fHot.jpg",
        totalRating: 4.1,
        likes: 82,
        backdropUrl: "/wwaVAZmQU2CBAJzBtahOSvqvpbc.jpg",
      },

      {
        movieId: 6,
        title: "트루먼 쇼",
        posterUrl: "/AsUv4pFf1UQuOLKf7nYUXgmgCNf.jpg",
        totalRating: 3.2,
        likes: 18,
        backdropUrl: "/aCHn2TXYJfzPXQKA6r9mKPbMlUB.jpg",
      },
    ],
  },
  {
    playlistId: 2,
    title: "마음이 따뜻해지는 영화",
    // 굿 윌 헌팅, 하울의 움직이는 성, 터미널, 미나리
    getSimpleMovieResps: [
      {
        movieId: 1,
        title: "굿 윌 헌팅",
        posterUrl: "/iHRY9YuBOyga9MHi59pt6KRGXcB.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/oLsts7ct0NVkdYpx5rZg10MG6zh.jpg",
      },
      {
        movieId: 2,
        title: "하울의 움직이는 성",
        posterUrl: "/3sVFlmzBCZpwlsosKHxyK4d9oDw.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/xqaN2WYQclQlqvKvsOcNgOx2vRn.jpg",
      },
      {
        movieId: 3,
        title: "터미널",
        posterUrl: "/6BGzYTpKGsMiFwJUUJj1sE7JoXj.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/dfGJKPaxabWaXacJ2fw6zXgA9QX.jpg",
      },
      {
        movieId: 4,
        title: "미나리",
        posterUrl: "/ltS2iKKvvBi7ZXWPRZSZBGmC9Gr.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/cpDoykGqISrjXb4SG1L18OkmWAf.jpg",
      },
    ],
  },
  {
    playlistId: 3,
    title: "세상을 꿈꾸게 하는 영화",
    // 인턴, 행복을 찾아서, 더 울프 월 스트리트, 포레스트 검프, 라따뚜이, 브루스 올마이티
    getSimpleMovieResps: [
      {
        movieId: 3,
        title: "인턴",
        posterUrl: "/gCmXCNfK1WU1CFjZjvfo3gBhiEa.jpg",
        totalRating: 4.7,
        likes: 419,
        backdropUrl: "/i8Q2Ei2dPliMLgPWYhRTxIDzh7r.jpg",
      },
      {
        movieId: 2,
        title: "행복을 찾아서",
        posterUrl: "/uRMMtYZkWyqsc4AO4aCoHBbZSwL.jpg",
        totalRating: 4.2,
        likes: 192,
        backdropUrl: "/5jhG1lTgV0MS6tDkBMQSSitttTT.jpg",
      },
      {
        movieId: 4,
        title: "더 울프 월 스트리트",
        posterUrl: "/g4WhlVecCbBNhVT67ootHe6oe4A.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/7Nwnmyzrtd0FkcRyPqmdzTPppQa.jpg",
      },
      {
        movieId: 1,
        title: "포레스트 검프",
        posterUrl: "/xdJxoq0dtkchOkUz5UVKuxn7a2V.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/ghgfzbEV7kbpbi1O8eIILKVXEA8.jpg",
      },
      {
        movieId: 5,
        title: "라따뚜이",
        posterUrl: "/zFah4LNeWw68y7RRGi20CQlGByY.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/xgDj56UWyeWQcxQ44f5A3RTWuSs.jpg",
      },
      {
        movieId: 6,
        title: "브루스 올마이티",
        posterUrl: "/bIqFRqtvE3pDSgamXGIAbVCxAKG.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/llyfug8S5O3ha3pfZpdKKmOqg4t.jpg",
      },
    ],
  },
  {
    playlistId: 4,
    title: "잊지 못할 감동의 순간",
    // 7번방의 선물, 인생은 아름다워, 그것만이 내 세상, 청춘의 증언, 레미제라블
    getSimpleMovieResps: [
      {
        movieId: 1,
        title: "7번방의 선물",
        posterUrl: "/bOth4QmNyEkalwahfPCfiXjNh1r.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/inEy3A5OPgeYW4rjRiGycfEeQzA.jpg",
      },
      {
        movieId: 4,
        title: "인생은 아름다워",
        posterUrl: "/yjOqQsQHdsEZfAosZERqHiwjaty.jpg",
        totalRating: 4.4,
        likes: 392,
        backdropUrl: "/gavyCu1UaTaTNPsVaGXT6pe5u24.jpg",
      },
      {
        movieId: 2,
        title: "그것만이 내 세상",
        posterUrl: "/sK9nfItvaOutyiSXOlcZ1lMO6yf.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/3dpOIKpInMSaKOUSmZdYF4YBdj0.jpg",
      },
      {
        movieId: 3,
        title: "청춘의 증언",
        posterUrl: "/a6UbpIZcOEXsx2dmH0l5UPkRpWY.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/sEDoomoV9h0sTVmYD57zvKQPqm8.jpg",
      },
      {
        movieId: 5,
        title: "레미제라블",
        posterUrl: "/hSjWT9LsyNJ9H3d1Tn9Hx02hnQD.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/jd3Z2sAPDavjRxFhfOak6kCrUIG.jpg",
      },
    ],
  },
  {
    playlistId: 5,
    title: "시간을 초월한 걸작",
    // 카사블랑카, 로마의 휴일, 대부, 백투더퓨처, 쇼생크 탈출, 바람과 함께 사라지다
    getSimpleMovieResps: [
      {
        movieId: 1,
        title: "카사블랑카",
        posterUrl: "/2y4FgbomoL5Aa9EGM3dqDEvvDdT.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/rrsG3xYrWifoduZtsIZ4ntoDfBY.jpg",
      },
      {
        movieId: 2,
        title: "로마의 휴일",
        posterUrl: "/u0JHcSbKdb4oTSOdnNBx8FXouWA.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/6f50k0bAekjxDvVvGC1SupJSzf4.jpg",
      },
      {
        movieId: 3,
        title: "대부 1",
        posterUrl: "/I1fkNd5CeJGv56mhrTDoOeMc2r.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
      },
      {
        movieId: 4,
        title: "빽 투 더 퓨처",
        posterUrl: "/7gGicAJdHRzaUd6qLjH5bSW4Cgi.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/5bzPWQ2dFUl2aZKkp7ILJVVkRed.jpg",
      },
      {
        movieId: 5,
        title: "쇼생크 탈출",
        posterUrl: "/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
      },
      {
        movieId: 6,
        title: "바람과 함께 사라지다",
        posterUrl: "/qJ6vUqgUbZjogqxvkvc86SkObN0.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/AfK1tyoO0i47mzKhA9BJVNGq1vg.jpg",
      },
    ],
  },
  {
    playlistId: 6,
    title: "심장을 뛰게 하는 액션",
    // 다크 나이트, 어벤져스, 브이 포 벤데타, 존 윅 3, 킬러의 보디가드, 범죄도시 1, 킹스맨 1, 글레디에이터, 탑건: 매버릭, 데드풀
    getSimpleMovieResps: [
      {
        movieId: 1,
        title: "다크 나이트",
        posterUrl: "/f6dNinWX8rBM79JXKcShkfSh2oA.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/oOv2oUXcAaNXakRqUPxYq5lJURz.jpg",
      },
      {
        movieId: 2,
        title: "어벤져스: 엔드게임",
        posterUrl: "/z7ilT5rNN9kDo8JZmgyhM6ej2xv.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
      },
      {
        movieId: 3,
        title: "브이 포 벤데타",
        posterUrl: "/XkLKkL5Cw4wWM6N4c4dP2IENmb.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/sFEYsEfzTx7hhjetlNrme8B5OUo.jpg",
      },
      {
        movieId: 4,
        title: "존 윅 3",
        posterUrl: "/8dGCWRwrMjn1jdFCI5xu5VrkGBL.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg",
      },
      {
        movieId: 5,
        title: "킬러의 보디가드",
        posterUrl: "/lktHrHZBL1ihgrd4tpM6oyNvqR3.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/7KsqfXDECZMryX1Rv4RKsT7SIjQ.jpg",
      },
      {
        movieId: 6,
        title: "범죄도시",
        posterUrl: "/ayk6y2D5v5VACFqrPfF05MARZ9n.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/xord8lZ7mK8ctki6FBgNYrbpWCO.jpg",
      },
      {
        movieId: 7,
        title: "킹스맨: 퍼스트 에이전트",
        posterUrl: "/vOai6V9hsIqZu15zDKydPmzu4EN.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/4OTYefcAlaShn6TGVK33UxLW9R7.jpg",
      },
      {
        movieId: 8,
        title: "글레디에이터",
        posterUrl: "/yemF0xxGU56Pf3JXxVr4C6kuKng.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/Ar7QuJ7sJEiC0oP3I8fKBKIQD9u.jpg",
      },
      {
        movieId: 9,
        title: "탑건: 매버릭",
        posterUrl: "/jeqXUwNilvNqNXqAHsdwm5pEfae.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
      },
      {
        movieId: 10,
        title: "데드풀",
        posterUrl: "/4Zb4Z2HjX1t5zr1qYOTdVoisJKp.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/dvBCdCohwWbsP5qAaglOXagDMtk.jpg",
      },
    ],
  },
  {
    playlistId: 7,
    title: "밤을 밝히는 로맨스",
    // 노트북, 어바웃 타임, 러브스토리, 이터널 선샤인, 미드나잇 선, 타이타닉, 나의 소녀시대
    getSimpleMovieResps: [
      {
        movieId: 1,
        title: "노트북",
        posterUrl: "/ntdgcdsmMuHd9s4oEKTvWDiUyU7.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/eEN7tsCCHppGhONHngvHKSdxi7r.jpg",
      },
      {
        movieId: 2,
        title: "어바웃 타임",
        posterUrl: "/cLfuuK1Y5FjX1xXDrrEa9ppnKuy.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/3azw5uVGlaQtELBKG6bcHJlxZOk.jpg",
      },
      {
        movieId: 3,
        title: "러브 스토리",
        posterUrl: "/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/kQBg9owfjYzwu1YIh2kno2LTU0N.jpg",
      },
      {
        movieId: 4,
        title: "이터널 선샤인",
        posterUrl: "/6HNRo7VYpvM5x5O921bEF2BG7f4.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/12imOn96zRI2EMHOjOxm2qNY2BA.jpg",
      },
      {
        movieId: 5,
        title: "미드나잇 선",
        posterUrl: "/ySMudfcxhOncsjBfwpjFhg6dx6h.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/9T8sj5io4SGCBTHsk5H8LGcfKVe.jpg",
      },
      {
        movieId: 6,
        title: "타이타닉",
        posterUrl: "/132KjhVrWUqKFVfMAKKNkherytA.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/tupgjqhWx5oieQrdyesO3aclUX9.jpg",
      },
      {
        movieId: 7,
        title: "나의 소녀시대",
        posterUrl: "/zhKnBHB3CvwfUQMXdyd2eiaSKex.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/miiVippZ9ukqUgFh8UpqOMDIGLt.jpg",
      },
    ],
  },
  {
    playlistId: 8,
    title: "웃음 가득한 코미디",
    // 극한직업, 럭키, 예스맨, 스파이, 나 홀로 집에, 세 얼간이
    getSimpleMovieResps: [
      {
        movieId: 1,
        title: "극한직업",
        posterUrl: "/jbHNkNydiZstlqhhBSvG19lm4NL.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/hn7oqr6RVqr3u6dcGoPRPi4jj1m.jpg",
      },
      {
        movieId: 2,
        title: "럭키",
        posterUrl: "/nesOkYBHXlqCJu1gMNlO6pVQYEt.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/3wy4UTqaSwP1luw14SxMO5kxq5M.jpg",
      },
      {
        movieId: 3,
        title: "예스맨",
        posterUrl: "/p9xAOBSFf8PPiD9qtYDiUATAWmt.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/kueBMnoZVmagMfP6ortvkOVuWtI.jpg",
      },
      {
        movieId: 4,
        title: "스파이",
        posterUrl: "/sgEl7IpKy3StkCnroGtDOLOHm40.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/a0jJMlI1Nw83EXaYmN0QHuccRXm.jpg",
      },
      {
        movieId: 5,
        title: "나 홀로 집에",
        posterUrl: "/oOrGMMvpe51VmlC5nwEOt211kjy.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/xKG9aVg4GvNn9puHjUPaTNkNDcC.jpg",
      },
      {
        movieId: 6,
        title: "세 얼간이",
        posterUrl: "/9zQdFVyDoXqFmGYXp4obna6FEMh.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/u7kuUaySqXBVAtqEl9vkTkAzHV9.jpg",
      },
    ],
  },
  {
    playlistId: 9,
    title: "두뇌를 자극하는 영화",
    // 이미테이션 게임, 인터스텔라, 세기의 매치, 히든 피겨스, 어메이징 메리
    getSimpleMovieResps: [
      {
        movieId: 1,
        title: "이미테이션 게임",
        posterUrl: "/wT4cHJMqWqWxY4GXDXgD10lMQWy.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/gLQoJ9P79g501oEEtrN8zMlCPpx.jpg",
      },
      {
        movieId: 2,
        title: "인터스텔라",
        posterUrl: "/evoEi8SBSvIIEveM3V6nCJ6vKj8.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
      },
      {
        movieId: 3,
        title: "세기의 매치",
        posterUrl: "/ozvwpEcHEfei5VzMwkfGFMrqJRf.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/xJkWzH5PE94KevRysjIEF14s0Ws.jpg",
      },
      {
        movieId: 4,
        title: "히든 피겨스",
        posterUrl: "/wZPcpIyZx43nXEgrc9NvQUyoxtr.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/rfkIeCaIHhN3K5wjJJqKmfUjYp8.jpg",
      },
      {
        movieId: 5,
        title: "어메이징 메리",
        posterUrl: "/rn0TQDEXJyvwX49Ht33t3N3zq6y.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/6MmYsaK6poR8f4R8jsBnJBU5tfd.jpg",
      },
    ],
  },
  {
    playlistId: 10,
    title: "혼자 보기 아까운 명작",
    // 티파니에서 아침을, 대부, 차이나타운, 록키 발보아, 타이타닉, 포레스트 검프, 센과 치히로의 행방불명, 킹스 스피치
    getSimpleMovieResps: [
      {
        movieId: 1,
        title: "티파니에서 아침을",
        posterUrl: "/ylu8Gdl7HF8qrQr9cdjOo7AvuaA.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/1HMoIkfVHckgXFWrabQS7uXPF3W.jpg",
      },
      {
        movieId: 2,
        title: "대부 1",
        posterUrl: "/I1fkNd5CeJGv56mhrTDoOeMc2r.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
      },
      {
        movieId: 3,
        title: "차이나타운",
        posterUrl: "/1Wi1dgGRDmSETi4fZGWhRhQDSRj.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/bsoAg22remHKL5O0xJH0m9DX6Pu.jpg",
      },
      {
        movieId: 4,
        title: "록키 발보아",
        posterUrl: "/jBdnYLtYd8NVCW9YMFS56BI1WCz.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/9mwMaNeeqPXJviKk2UKLxFm9vUW.jpg",
      },
      {
        movieId: 5,
        title: "타이타닉",
        posterUrl: "/132KjhVrWUqKFVfMAKKNkherytA.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/tupgjqhWx5oieQrdyesO3aclUX9.jpg",
      },
      {
        movieId: 6,
        title: "포레스트 검프",
        posterUrl: "/xdJxoq0dtkchOkUz5UVKuxn7a2V.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/ghgfzbEV7kbpbi1O8eIILKVXEA8.jpg",
      },
      {
        movieId: 7,
        title: "센과 치히로의 행방불명",
        posterUrl: "/aZuBfbR0PnCb2up7lqHDsgJlLjs.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/m4TUa2ciEWSlk37rOsjiSIvZDXE.jpg",
      },
      {
        movieId: 8,
        title: "킹스 스피치",
        posterUrl: "/pjoGWlSQdojGkUBtCfFTW2a3AKR.jpg",
        totalRating: 4.5,
        likes: 291,
        backdropUrl: "/5eb7l7AE2yU0mvb38fR5qLNhDDH.jpg",
      },
    ],
  },
];

// Movie - Playlist 관련 모킹 API(Mocking Object) 설계
const playlistHandler: HttpHandler[] = [
  // 플레이리스트를 가져오는 모킹 API
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/playlist/all`,
    ({ request }) => {
      const url = new URL(request.url); // URL 생성

      // 무한 스크롤을 위한 페이지 번호와 리미트 수
      const size = Number(url.searchParams.get("size")) || 3;
      const lastPlaylistId =
        Number(url.searchParams.get("last-playlist-id")) || 0;

      let filterPlaylists = MOCK_PLAYLIST_DATA;

      // 커서 기반 필터링
      // lastBoardId보다 높은 게시물만 필터링
      if (lastPlaylistId) {
        filterPlaylists = filterPlaylists.filter(
          (playlist) => playlist.playlistId > lastPlaylistId
        );
      }

      const paginatedPlaylists = filterPlaylists.slice(0, size);

      return HttpResponse.json(
        {
          code: 200,
          data: {
            size: size,
            content: paginatedPlaylists,
            empty: paginatedPlaylists.length === 0,
            first: !lastPlaylistId,
            last: paginatedPlaylists.length < size,
            number: 0,
            numberOfElements: paginatedPlaylists.length,
            pageable: {
              offset: 0,
              pageNumber: 0,
              pageSize: 10,
              paged: true,
              sort: {
                empty: true,
                sorted: false,
                unsorted: true,
              },
              unpaged: false,
            },
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
          },
          message: "요청이 성공적으로 처리되었습니다.",
          sucess: true,
        },
        { status: 200, statusText: "Playlist Data" }
      );
    }
  ),
];

export default playlistHandler;
