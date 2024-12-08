import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { notificationDummyData } from "./constants";
import NotificationRander from "./components/notification-rander";
import SEO from "@components/seo";
// DB에서 가져온 알림의 날짜를 '오늘', '7일', '30일', '이후' 별로 나누는 함수
function groupNotificationsByDate(notifications) {
    // 오늘 날짜를 가져온다.
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 일주일 전 날짜를 계산
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30일 전 날짜를 계산
    // 배열 객체 reduce 메서드를 활용하여 알림 데이터의 날짜를 계산한다.
    return notifications.reduce((acc, notification) => {
        const createdAt = new Date(notification.created_at);
        if (createdAt >= today)
            acc.today.push(notification);
        else if (createdAt >= sevenDaysAgo)
            acc.last7days.push(notification);
        else if (createdAt >= thirtyDaysAgo)
            acc.last30days.push(notification);
        else
            acc.older.push(notification);
        return acc;
    }, { today: [], last7days: [], last30days: [], older: [] });
}
function NotificationPage() {
    // 더미데이터로 알림 데이터를 가져왔지만 이후 API로 수정
    const groupedNotifications = groupNotificationsByDate(notificationDummyData);
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "PICKY: NOTIFICATION" }), groupedNotifications.today.length > 0 && (_jsx(NotificationRander, { title: "\uC624\uB298", section: groupedNotifications.today })), groupedNotifications.last7days.length > 0 && (_jsx(NotificationRander, { title: "\uCD5C\uADFC 7\uC77C", section: groupedNotifications.last7days })), groupedNotifications.last30days.length > 0 && (_jsx(NotificationRander, { title: "\uCD5C\uADFC 30\uC77C", section: groupedNotifications.last30days })), groupedNotifications.older.length > 0 && (_jsx(NotificationRander, { title: "\uC774\uC804\uD65C\uB3D9", section: groupedNotifications.older }))] }));
}
export default NotificationPage;
