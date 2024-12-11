export const validatePhoneNumber = (phoneNumber: string) =>
  /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phoneNumber);

export const validateNickname = (nickname: string) =>
  /^[a-zA-Zㄱ-힣0-9\s]{2,}$/.test(nickname);

export const validateYear = (year: string) => {
  return /^\d{4}$/.test(year);
};

export const validateMonth = (month: string) => {
  return /^(0[1-9]|1[0-2]|[1-9])$/.test(month);
};

export const validateDay = (day: string, month?: string, year?: string) => {
  if (!/^(0[1-9]|[1-2][0-9]|3[0-1]|[1-9])$/.test(day)) {
    return false;
  }

  if (month) {
    const monthInt = parseInt(month);
    const dayInt = parseInt(day);

    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (monthInt === 2 && year) {
      const yearInt = parseInt(year);

      const isLeapYear =
        (yearInt % 4 === 0 && yearInt % 100 !== 0) || yearInt % 400 === 0;
      if (isLeapYear) {
        daysInMonth[2] = 29;
      }
    }

    if (dayInt > daysInMonth[monthInt]) {
      return false;
    }
  }

  return true;
};

export const validateWeightWhole = (whole: string) => {
  return /^\d{0,3}$/.test(whole);
};

export const validateWeightDecimal = (decimal: string) => {
  return /^\d{0,2}$/.test(decimal);
};

export const validateAge = (birthDateStr: string): boolean => {
  const [year, month, day] = birthDateStr.split("-").map(Number);
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  let age = today.getFullYear() - birthDate.getFullYear();
  if (!hasHadBirthday) {
    age -= 1;
  }

  return age >= 14;
};

export const validateName = (name: string): boolean => {
  return typeof name === "string" && name.length >= 2 && name.length <= 10;
};

export const validateProfileImage = (
  profileImagePreview: string | undefined
): boolean => {
  return (
    typeof profileImagePreview === "string" && profileImagePreview.trim() !== ""
  );
};

export const validateNicknames = (isNicknameValid: boolean): boolean => {
  return isNicknameValid;
};

export const validateFavoriteGenres = (genres: number[]): boolean => {
  return Array.isArray(genres) && genres.length > 2 && genres.length < 6;
};

export const validateFavoriteMovies = (movies: number[]): boolean => {
  return Array.isArray(movies) && movies.length >= 5 && movies.length <= 15;
};

export const validateConsent = (consent: boolean): boolean => {
  return consent === true;
};

export const validateField = (
  field: string,
  value: string | number[] | boolean,
  extra?: { isNicknameValid?: boolean; profileImagePreview?: string | null }
): boolean => {
  switch (field) {
    case "name":
      return validateName(value as string);
    case "profileImage":
      return validateProfileImage(extra?.profileImagePreview || "");
    case "nickname":
      return validateNicknames(extra?.isNicknameValid || false);
    case "birthDate":
      return validateAge(value as string);
    case "favoriteGenres":
      return validateFavoriteGenres(value as number[]);
    case "favoriteMovie":
      return validateFavoriteMovies(value as number[]);
    case "consentAll":
    case "consentAge":
      return validateConsent(value as boolean);
    default:
      return !!value?.toString().trim();
  }
};
