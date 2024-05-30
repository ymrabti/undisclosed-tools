const { getNumberDijits } = require("../LeetCode/_helpers");

var str = 23400222115167;

function getSum(num) {
    const map = getNumberDijits(num).reduce((p, c) => {
        if (p.hasOwnProperty(c)) { p[c]++ } else { (p[c] = 1); }
        return p;
    }, {});
    return {
        sumOfpowers: Object.keys(map).reduce((p, c) => p + parseInt(c) ** map[c], 0),
        max: Math.max(...Object.keys(map).filter(e => !["0", "1"].includes(e)).map(e => map[e])),
        countTwoes: map['2']
    }
}

// console.log(getSum(str));

/**
 * 
 * @param {number} nombre
 * @returns {number}
 */
function getSumchiffres(nombre) {
    return getNumberDijits(nombre).reduce((a, b) => a + b, 0)
}


function test() {
    var test = 0
    for (var k = 0; k < 10_000; k++) {
        const sumPowers = getSum(k);
        const sumDigits = getSumchiffres(k);
        if (sumPowers.max > 1 && sumPowers.sumOfpowers === sumDigits) {
            // console.log(k);
            test++;
        }
    }
    console.log({ test });
}

// test()

module.exports = {
    getSumchiffres
}
