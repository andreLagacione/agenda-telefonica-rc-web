export const phoneValidator = (value: string) => {
    const eightDigits = /[(]\d{2}[)]\s\d{4}-\d{4}/gi;
    const nineDigits = /[(]\d{2}[)]\s\d\s\d{4}-\d{4}/gi;
    return eightDigits.test(value) || nineDigits.test(value);
}