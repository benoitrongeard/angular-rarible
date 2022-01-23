export class TokenUtils {
    static tokenValue = (value: number, decimals: number): (number | null) => {
        if (value == null || decimals == null) {
            return null;
        }
        return value / Math.pow(10, decimals);
    }

    static decimalToHexString(decimal: number) {
        return "0x" + decimal.toString(16);
    }
}