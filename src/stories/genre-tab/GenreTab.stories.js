import { GenreTabButton } from "./";
const meta = {
    title: "GlobalComponent/GenreTabButton", // title -> Storybook Directory
    component: GenreTabButton, // Storybook props -> 컴포넌트 Props
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        backgroundColor: { control: "color" },
    },
};
export default meta;
// GenreTabButton 컴포넌트의 스토리북(Storybook) 종류 선언
export const Rectangle = {
    args: {
        primary: true,
        label: "GenreTab",
        btnType: "Rectangle",
    },
};
export const Round = {
    args: {
        primary: true,
        label: "GenreTab",
        btnType: "Round",
    },
};
