const { getSumchiffres } = require("../other/sum_is_numb");
const { getNumberDijits } = require("./_helpers");

/**
 * @param {number} x
 * @return {number}
 */
var magic_numbers = function (x) {
    const parsed = getNumberDijits(x)
    let sum = getSumchiffres(x)
    while (sum > 10) {
        sum = getSumchiffres(sum)
    }
    return parsed.includes(sum)
};

function test() {
    var test = 0
    for (var k = 0; k <= 10_000; k++) {
        const magic = magic_numbers(k);
        if (magic) {
            // console.log('magic_numbers of ', k, ' is ', magic);
            test++;
        }
    }
    console.log({ test });
}

test()
