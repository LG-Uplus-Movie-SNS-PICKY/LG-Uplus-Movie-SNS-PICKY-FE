export interface HeaderProps {
    type?: "basic" | "login" | "main" | "title";
    label?: string;
    activeBtn?: Array<React.ReactNode>;
}
export declare function Header({ type, label, activeBtn, }: HeaderProps): JSX.Element | null;
