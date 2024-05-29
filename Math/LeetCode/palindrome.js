/**
 * 
 * @param {number} nombre 
 * @returns {boolean}
 */
function Palindrome(nombre) {
    return `${nombre}` == `${nombre}`.split('').reverse().join('');
}
/**
 * 
 * @param {number} nombre 
 * @returns {boolean}
 */
function PalindromeWithoutString(nombre) {
    var a = nombre, b = 0;
    if (x < 0 || (x % 10 == 0 && x >= 10)) return false;
    while (a > 0) {
        const r = a % 10
        b = 10 * b + r
        a = Math.round((a - r) / 10)
        console.log({ a, b });
    }
    return nombre === b
}
function palimite(start = 10000, limit = 3000) {
    var palindromes = [];
    for (var k = start; k < limit; k++) {
        if (Palindrome(k)) {
            palindromes.push(k);
        }
    }
    return palindromes;
}

console.log({ test: PalindromeWithoutString(1234321) });