import { routeConfig } from "@constants/routes/routeConfig";
import { isLogin } from "@recoil/atoms/isLoginState";
import { NavigaterBar as Navbar } from "@stories/navigater-bar";
import { NaviationProps } from "@type/navigation";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { matchPath } from "react-router-dom";
import { useRecoilValue } from "recoil";

function GlobalNavigatorBar({ show, location, navigate }: NaviationProps) {
  const isLoginState = useRecoilValue(isLogin);
  const [activeTab, setActiveTab] = useState("");

  // Navbar 선택 시 해당 페이지로 이동
  const handleChangeTab = (name: string) => {
    setActiveTab(name);

    switch (name) {
      case "home":
        navigate("/");
        break;
      case "picky":
        navigate("/picky");
        break;
      case "movie":
        navigate("/movie-log");
        break;
      case "recommend":
        navigate("/recommendation");
        break;
      case "user":
        const currentUser = JSON.parse(sessionStorage.getItem("user") || "{}")
          ?.user?.nickname;
        navigate(`/user/${currentUser}`);
        break;
    }
  };

  // 현재 경로에 맞는 Navbar 활성화
  useEffect(() => {
    // console.log(isLoginState);

    const { pathname } = location;
    const routeMapping: { [key: string]: string } = {
      "/": "home",
      "/picky": "picky",
      "/movie-log": "movie",
      "/recommendation": "recommend",
    };

    let currentActiveTab = routeMapping[pathname];

    // 현재 경로에 일치하는 Navbar Option이 없을 경우
    if (!currentActiveTab) {
      // /user/ 경로 접근
      if (pathname.match(/^\/user\/[^/]+$/)) {
        const pathNickname = pathname.split("/")[2];
        const currentUser = JSON.parse(
          sessionStorage.getItem("user") || "{}"
        )?.user_nickname;

        // 접근한 사용자 프로필 경로와 로그인한 사용자와 같을 경우
        if (pathNickname === currentUser) {
          currentActiveTab = "user";
        } else {
          currentActiveTab = "home";
        }
      }

      // Navbar에서 접근할 수 없는 다른 경로 접근 시 모두 home active 활성화
      else {
        currentActiveTab = "home";
      }
    }

    setActiveTab(currentActiveTab);
  }, [location]);

  if (!isLoginState.isLoginState || !isLoginState.isAuthUser || !show)
    return null;

  return <Navbar state={activeTab} onClick={handleChangeTab} />;
}

export default GlobalNavigatorBar;
