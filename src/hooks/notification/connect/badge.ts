import { unreadCountState } from "@recoil/atoms/isNotificationState";
import React from "react";
import { useSetRecoilState } from "recoil";

function NotificationBadge() {
  const setUnreadCount = useSetRecoilState(unreadCountState);

  return null;
}

export default NotificationBadge;
