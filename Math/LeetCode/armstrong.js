const { getNumberDijits } = require("./_helpers");

/**
 * armstrong
 * @param {number} num num
 * @returns {boolean} is Armstrong
 */
function armstrong(num) {
    const list = getNumberDijits(num);
    const powers = list.map(e => e ** list.length);
    const sum = powers.reduce((acc, curr) => acc + curr, 0);
    return sum === num && num > 9
}

/**
 * younesstrong
 * @param {number} num num
 * @returns {boolean} is Armstrong
 */
function younestrong(num) {
    const list = getNumberDijits(num);

    const powers = list.map((e, i) => e ** (list.length - i));
    const sum = powers.reduce((acc, curr) => acc + curr, 0);

    const digits = list.map((e) => e ** list.length);
    const sum2 = digits.reduce((acc, curr) => acc + curr, 0);

    const prod = digits.reduce((acc, curr) => acc * curr, 1);

    return { isYounes: sum === prod && num > 9, sum, sum2 }
}

function younestrongtest(num) {
    const list = getNumberDijits(num);
    const powers = list.map((e, i, str) => ({ digit: e, index: str.length - i, power: e ** (str.length - i) }));
    const sum = powers.reduce((acc, curr) => acc + curr.power, 0);
    return console.log({ powers, sum })
}

function TestArmstrong(max) {
    const arr = [...Array(max)];
    const results = arr.map((e, i) => {
        const arms = armstrong(i);
        return ({ i, armstrong: arms });
    });
    console.log(results.filter(e => e.armstrong).map(e => e))
}

function TestYounesTrong(max) {
    const arr = [...Array(max)];
    const results = arr.map((e, i) => {
        const ynstrng = younestrong(i);
        return ({ i, younestrong: ynstrng.isYounes, sum: ynstrng.sum });
    });
    console.log(results.filter(e => e.younestrong).map(e => e.i))
}

TestArmstrong(10000)
TestYounesTrong(10000)