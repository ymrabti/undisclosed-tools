/**
 * 
 * @param {Number} s1 
 * @param {Number} s2 
 */
function computeJoinPoint(s1, s2) {
    var max = 20_000;
    var line1 = [];
    var line2 = [];
    if (s1 < max && s2 < max) {
        while (
            !line1.includes(s2)
            && !line2.includes(s1)
            && s1 < max 
            && s2 < max
        ) {
            s1 = getChiffres(s1); line1.push(s1);
            s2 = getChiffres(s2); line2.push(s2);
        }
        return getArraysIntersection(line1, line2)[0];
    }
    else {
        return 0;
    }
}
/**
 * 
 * @param {Number[]} a1 
 * @param {Number[]} a2 
 */
function getArraysIntersection(a1, a2) {
    return a1.filter(x => a2.includes(x));
}
/**
 * 
 * @param {Number} nombre 
 */
function getChiffres(nombre) {
    return nombre.toString().split("")
        .map(v => parseInt(v))
        .reduce((a, b) => a + b, nombre);
}

function reverseChiffres(nombre) {
    var list = []; var nombrestr = nombre + "";
    list.push(nombre);
    for (var k = 0; k < nombrestr.length; k++) {
        list.push(parseInt(nombrestr[k]));
    }
    var sum = list.reduce((a, b) => a + b, 0);
    console.log(sum);
    return sum;
}

console.log(computeJoinPoint(57, 78));
console.log(computeJoinPoint(570, 489));
console.log(computeJoinPoint(489, 489));
console.log(computeJoinPoint(389, 289));

/* Ignore and do not change the code below */
// #region main
/* const s1 = parseInt(readline());
const s2 = parseInt(readline());
const oldWrite = process.stdout.write;
process.stdout.write = chunk => { console.error(chunk); return true }
const res = computeJoinPoint(s1, s2);
process.stdout.write = oldWrite;
console.log(res); */
// #endregion
