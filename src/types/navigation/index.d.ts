import { Location, NavigateFunction } from "react-router-dom";

type IsLoginUser = {
  state: boolean;
  role: string;
};

export interface NaviationProps {
  location: Location;
  navigate: NavigateFunction;
}
