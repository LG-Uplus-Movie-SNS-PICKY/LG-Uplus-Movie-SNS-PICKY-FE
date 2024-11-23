import {
  HandleChangeTab,
  NavigaterBar as Navbar,
} from "@stories/navigater-bar";
import { NaviationProps } from "@type/navigation";
import React, { useState } from "react";

function GlobalNavigatorBar({ location, navigate }: NaviationProps) {
  const [activeTab, setActiveTab] = useState("home");

  const handleChangeTab: HandleChangeTab = (event, name) => {
    setActiveTab(name);
  };

  return <Navbar state={activeTab} onClick={handleChangeTab} />;
}

export default GlobalNavigatorBar;
