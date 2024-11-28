import { NavigaterBar as Navbar } from "@stories/navigater-bar";
import { NaviationProps } from "@type/navigation";
import { useState } from "react";

function GlobalNavigatorBar({
  location,
  navigate,
  isLoginTestValue,
}: NaviationProps) {
  const [activeTab, setActiveTab] = useState("home");

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
        navigate("/movie");
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

  return <Navbar state={activeTab} onClick={handleChangeTab} />;
}

export default GlobalNavigatorBar;
