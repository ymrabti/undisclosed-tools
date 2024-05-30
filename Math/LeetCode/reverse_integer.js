const { getNumberDijits } = require("./_helpers");

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    if (x === 0) return x
    if (x >= 2 ** 31) return 0
    if (x < -1 * (2 ** 31 + 1)) return 0
    var a = Math.abs(x), b = 0
    while (a > 0) {
        const r = a % 10
        b = b * 10 + r
        a = (a - r) / 10
    }
    if (b >= 2 ** 31) return 0
    if (b < -1 * (2 ** 31 + 1)) return 0
    return b * Math.sign(x)
};
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    const parsed = getNumberDijits(Math.abs(x)).map((e, i) => e * 10 ** i)
    const b = Math.sign(x) * parsed.reduce((p, c) => p + c, 0)
    if (b >= 2 ** 31) return 0
    if (b < -1 * (2 ** 31 + 1)) return 0
    return b
};
console.log(reverse(-1236));
