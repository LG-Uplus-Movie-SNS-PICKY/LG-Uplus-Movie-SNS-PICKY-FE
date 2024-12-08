import { NavigateFunction } from "react-router-dom";
import { ReactNode } from "react";
interface HeaderConfigReturn {
    type?: "basic" | "login" | "main" | "title";
    label?: string | undefined;
    buttons?: Array<ReactNode> | undefined;
}
export declare function useHeaderConfig(path: string, isLogin: boolean, navigate: NavigateFunction): HeaderConfigReturn;
export {};
