import GlobalHeader from "@components/header";
import { Flex as MainLayout } from "./index.styles";
import { Flex as Wrapper } from "./index.styles";
import { LayoutProps } from "./type";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import GlobalNavigatorBar from "@components/navbar";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
import { routeConfig } from "@constants/routes/routeConfig";
import { HeaderProps } from "@type/navigation";
import { genresSelector } from "@recoil/selectors/genresSelector";
import { debounce, throttle } from "lodash";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function Layout({ children }: LayoutProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 주소 가져오기

  const isLoginInfo = useRecoilValue(isLogin);
  const loadable = useRecoilValueLoadable(genresSelector);

  const [headerTypes, setHeaderTypes] =
    useState<HeaderProps["headerType"]>("login");
  const [headerLabel, setHeaderLabel] = useState("");

  const [showGlobalNavbar, setShowGlobalNavbar] = useState(false);
  const [isDefaultMargin, setIsDefaultMargin] = useState("0");

  const layoutRef = useRef<HTMLDivElement | null>(null);

  // 현재 경로에 맞는 Header와 Navbar의 타입 정의
  useEffect(() => {
    const config = routeConfig.find(
      (config) =>
        config.path === matchPath(config.path, location.pathname)?.pattern.path
    );

    setHeaderTypes(config?.header || "");
    setHeaderLabel(config?.label || "");

    setShowGlobalNavbar(config?.gnb || false);

    switch (config?.path) {
      case "/":
        if (!isLoginInfo.isLoginState) {
          setIsDefaultMargin("60px 0 0 0");
        } else {
          setIsDefaultMargin(config?.margin || "0");
        }

        break;
      case "/genre/:genreId":
        const genreId = matchPath(config.path, location.pathname)?.params
          .genreId;

        if (loadable.state === "hasValue") {
          const genres = loadable.contents.data;

          setHeaderLabel(
            genres.find(
              (genre: { genreId: number }) => genre.genreId === Number(genreId)
            ).name || ""
          );
        }

        break;

      default:
        setIsDefaultMargin(config?.margin || "0");
    }
  }, [isLoginInfo, location, loadable]);

  useEffect(() => {
    const handleScrollToTop = throttle((layout) => {
      gsap.to(layout, {
        scrollTo: { y: 0 },
        duration: 0.8,
      });
    }, 100);

    const scrollPostion = layoutRef.current?.scrollTop ?? window.screenY;
    if (scrollPostion > 0) {
      handleScrollToTop(layoutRef.current || window);
    }
  }, [layoutRef, location]);

  return (
    <>
      <MainLayout
        position="relative"
        direction="column"
        align="center"
        height="100dvh"
      >
        <GlobalHeader
          headerType={headerTypes}
          label={headerLabel}
          location={location}
          navigate={navigate}
        />

        <Wrapper
          overflowY={"auto"}
          direction="column"
          justify="flex-start"
          margin={isDefaultMargin}
          height="100vh"
          ref={layoutRef}
        >
          {children}
        </Wrapper>

        <GlobalNavigatorBar
          show={showGlobalNavbar}
          location={location}
          navigate={navigate}
        />
      </MainLayout>
    </>
  );
}

export default Layout;
