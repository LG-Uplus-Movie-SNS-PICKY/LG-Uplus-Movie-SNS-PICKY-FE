import ClawMachine from "@assets/icons/claw_machine.svg";
import backButton from "@assets/icons/backButton.svg";
import searchButton from "@assets/icons/searchButton.svg";
import {
  containerStyle,
  headerStyle,
  backButtonStyle,
  searchButtonStyle,
  searchInputContainerStyle,
  searchInputStyle,
  recentSearchHeaderStyle,
  titleStyle,
  clearAllButtonStyle,
  emptyStateContainerStyle,
  emptyIconStyle,
  emptyTextStyle,
} from "@pages/search/index.styles";

export default function SearchPage() {
  return (
    <>
      <div css={containerStyle}>
        <div css={headerStyle}>
          <button css={backButtonStyle}>
            <img src={backButton} alt="backButton" width="12" height="25" />
          </button>
          <div css={searchInputContainerStyle}>
            <input
              css={searchInputStyle}
              placeholder="콘텐츠, 인물, 유저를 검색해보세요."
            />
            <button css={searchButtonStyle}>
              <img
                src={searchButton}
                alt="searchButton"
                width="16"
                height="16"
              />
            </button>
          </div>
        </div>
        <div css={recentSearchHeaderStyle}>
          <div css={titleStyle}>최근검색어</div>
          <button css={clearAllButtonStyle}>전체 삭제</button>
        </div>
        <div css={emptyStateContainerStyle}>
          <div css={emptyIconStyle}>
            <img
              src={ClawMachine}
              alt="Claw Machine"
              width="100"
              height="100"
            />
          </div>
          <p css={emptyTextStyle}>최근 검색어가 없습니다.</p>
        </div>
      </div>
    </>
  );
}
