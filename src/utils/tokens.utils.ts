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

    static decimalFormatter = new Intl.NumberFormat("en-us", {
        style: "decimal",
        minimumSignificantDigits: 1,
        maximumSignificantDigits: 4,
    });

    static limitDecimals = (value: number) => TokenUtils.decimalFormatter.format(value);
}