import { Location, NavigateFunction } from "react-router-dom";

type IsLoginUser = {
  state: boolean;
  role: string;
};

export interface HeaderProps {
  headerType: string;
  label?: string;
  location: Location;
  navigate: NavigateFunction;
}

export interface NaviationProps {
  show: boolean | string;
  location: Location;
  navigate: NavigateFunction;
}
