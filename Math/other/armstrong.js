/**
 * armstrong
 * @param {number} num num
 * @returns {boolean} is Armstrong
 */
function armstrong(num) {
    var str = `${num}`;
    const list = str.split('');
    const powers = list.map(e => parseInt(e) ** str.length);
    const sum = powers.reduce((acc, curr) => acc + curr, 0);
    return sum === num && num > 9
}

/**
 * younesstrong
 * @param {number} num num
 * @returns {boolean} is Armstrong
 */
function younestrong(num) {
    var str = `${num}`;
    const list = str.split('').map((e) => parseInt(e));

    const powers = list.map((e, i) => e ** (str.length - i));
    const sum = powers.reduce((acc, curr) => acc + curr, 0);

    const digits = list.map((e) => e ** str.length);
    const sum2 = digits.reduce((acc, curr) => acc + curr, 0);

    const prod = digits.reduce((acc, curr) => acc * curr, 1);

    return { isYounes: sum === prod && num > 9, sum }
}

function younestrongtest(num) {
    var str = `${num}`;
    const list = str.split('');
    const powers = list.map((e, i) => ({ digit: parseInt(e), index: str.length - i, power: parseInt(e) ** (str.length - i) }));
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