var str = 3299485722222222;
function Jard(char, str) {
    var avant = str.length;
    var str2 = str.replaceAll(char, "");
    var apres = str2.length;
    return [char, (avant - apres), str2];
}
function getSum(num) {
    var sum = 0, str = `${num}`;
    while (str != "") {
        var jr = Jard(str[0], str);
        sum += jr[0] ** jr[1];
        str = jr[2];
    }
    return sum;
}
/**
 * 
 * @param {number} nombre
 * @returns 
 */
function getsumchiffres(nombre) {
    return `${nombre}`.split('').map(e => parseInt(e)).reduce((a, b) => a + b, 0)
}
var test = 0
var ntest = 0
for (var k = 2_000; k < 10_000; k++) {
    if (getSum(k) == getsumchiffres(k)) {
        test++;
    } else {
        ntest++;
    }
}
const aa = 1234321
console.log({ test, ntest });
