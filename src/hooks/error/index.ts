import { isErrorState } from "@recoil/atoms/isErrorState";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function ErrorHandler() {
  const error = useRecoilValue(isErrorState);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate(error);
    }
  }, [error]);

  return null;
}

export default ErrorHandler;
