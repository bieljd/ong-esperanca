export function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
export function isValidCpf(value) {
    const digits = value.replace(/\D/g, "");
    if (digits.length !== 11 || /^(\d)\1+$/.test(digits))
        return false;
    const calculateDigit = (length) => {
        let sum = 0;
        for (let index = 0; index < length; index += 1) {
            sum += Number(digits[index]) * (length + 1 - index);
        }
        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };
    return calculateDigit(9) === Number(digits[9]) && calculateDigit(10) === Number(digits[10]);
}
