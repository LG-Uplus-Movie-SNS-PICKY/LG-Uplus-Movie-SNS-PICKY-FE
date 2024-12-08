export const validatePhoneNumber = (phoneNumber) => /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phoneNumber);
export const validateNickname = (nickname) => /^[a-zA-Zㄱ-힣0-9\s]{2,}$/.test(nickname);
export const validateYear = (year) => {
    return /^\d{4}$/.test(year);
};
export const validateMonth = (month) => {
    return /^(0[1-9]|1[0-2]|[1-9])$/.test(month);
};
export const validateDay = (day, month, year) => {
    if (!/^(0[1-9]|[1-2][0-9]|3[0-1]|[1-9])$/.test(day)) {
        return false;
    }
    if (month) {
        const monthInt = parseInt(month);
        const dayInt = parseInt(day);
        const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (monthInt === 2 && year) {
            const yearInt = parseInt(year);
            const isLeapYear = (yearInt % 4 === 0 && yearInt % 100 !== 0) || yearInt % 400 === 0;
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
export const validateWeightWhole = (whole) => {
    return /^\d{0,3}$/.test(whole);
};
export const validateWeightDecimal = (decimal) => {
    return /^\d{0,2}$/.test(decimal);
};
