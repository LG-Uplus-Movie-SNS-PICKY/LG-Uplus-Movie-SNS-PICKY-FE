"use strict";
// import { useRecoilState } from "recoil";
// import { inputState } from "../../../../review/atoms";
// import { Text, Input } from "../ui";
// import useFocus from "../../../../components/hooks/useFocus";
// import { emailContainer, textWrapper } from "./index.styles";
// export default function InputEmail() {
//   const [inputData, setInputData] = useRecoilState(inputState);
//   const { isFocused, handleFocus, handleBlur } = useFocus();
//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newEmail = e.target.value;
//     setInputData((prev) => ({ ...prev, email: newEmail }));
//   };
//   return (
//     <>
//       <div css={emailContainer}>
//         <Text.TitleMenu300>당신의 이메일을 적어주세요</Text.TitleMenu300>
//         <div css={textWrapper}>
//           <Text.FocusedMenu $isFocused={isFocused}>이메일</Text.FocusedMenu>
//         </div>
//         <Input.InfoBox
//           type="email"
//           value={inputData.email || ""}
//           placeholder="이메일을 입력해주세요"
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           onChange={handleEmailChange}
//         />
//         <div css={textWrapper}>
//           <Text.FocusedWarning $isFocused={isFocused}>
//             올바른 이메일 주소를 입력해주세요
//           </Text.FocusedWarning>
//         </div>
//       </div>
//     </>
//   );
// }
