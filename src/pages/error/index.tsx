import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ButtonWrapper,
  IconWrapper,
  Message,
  Wrapper,
  Button,
} from "./index.styles";

import NotFound from "@assets/icons/error_message.svg?react";

function ErrorPage() {
  const { param } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const type = url.get("type");

    switch (type) {
      case "NotUser":
        setTitle("해당 닉네임을 가진 사용자를 찾을 수 없습니다.");
        setContext(
          "존재하지 않는 사용자를 입력하거나,\n 해당 사용자의 닉네임이 변경, 삭제되어 찾을 수 없습니다."
        );
        break;
    }
  }, [param]);

  return (
    <>
      <div css={Wrapper}>
        <div css={IconWrapper}>
          <NotFound />
        </div>
        <div css={Message}>
          <h2>죄송합니다. {title}</h2>
          <p>{context}</p>
        </div>
        <div css={ButtonWrapper}>
          <button css={Button} onClick={() => navigate("/")}>
            메인으로
          </button>
          <button css={Button} onClick={() => navigate(-2)}>
            이전페이지
          </button>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
