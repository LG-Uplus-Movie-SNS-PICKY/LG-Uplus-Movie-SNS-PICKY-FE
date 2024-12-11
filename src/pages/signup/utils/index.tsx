// export const validateAge = (birthDateStr: string): boolean => {

//     const [year, month, day] = birthDateStr.split("-").map(Number);
//     const today = new Date();
//     const birthDate = new Date(year, month - 1, day);
  
//     const hasHadBirthday =
//       today.getMonth() > birthDate.getMonth() ||
//       (today.getMonth() === birthDate.getMonth() &&
//         today.getDate() >= birthDate.getDate());
  
//     let age = today.getFullYear() - birthDate.getFullYear();
//     if (!hasHadBirthday) {
//       age -= 1;
//     }
  
//     return age >= 14;
//   };