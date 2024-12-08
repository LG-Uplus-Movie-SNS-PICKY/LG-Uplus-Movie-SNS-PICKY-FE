import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { NavigaterBar as Navbar } from "@stories/navigater-bar";
import { useState } from "react";
function GlobalNavigatorBar({ location, navigate, isLoginTestValue, }) {
    const [activeTab, setActiveTab] = useState("home");
    const handleChangeTab = (name) => {
        setActiveTab(name);
        switch (name) {
            case "home":
                navigate("/");
                break;
            case "picky":
                navigate("/picky");
                break;
            case "movie":
                navigate("/feed-list");
                break;
            case "recommend":
                navigate("/recommend");
                break;
            case "user":
                navigate("/my-page");
                break;
        }
    };
    // if (!isLoginTestValue.state || isLoginTestValue.role === "admin") {
    //   return null;
    // }
    return _jsx(Navbar, { state: activeTab, onClick: handleChangeTab });
}
export default GlobalNavigatorBar;
