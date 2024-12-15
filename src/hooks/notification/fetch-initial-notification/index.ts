import { isLogin } from "@recoil/atoms/isLoginState";
import { notificationsState } from "@recoil/atoms/isNotificationState";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

function FetchInitialNotifications() {
  const setNotifications = useSetRecoilState(notificationsState);
  const isLoginState = useRecoilValue(isLogin);

  useEffect(() => {
    const fetchNotifications = async () => {};

    fetchNotifications();

    console.log(isLoginState);
  }, [isLoginState, setNotifications]);

  return null;
}

export default FetchInitialNotifications;
