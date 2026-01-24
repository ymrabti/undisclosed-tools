const {
    lastByNJSON,
    lastByNSplice,
    lastByNMath,
    lastBy1Splice,
    lastBy1Math,
    lastBy1JSON,
    lastByNJSON_Random,
    josephus,
} = require('./index');
const {
    powm,
    powN,
    findPAndQ,
    pow2Loop,
    powerTwo,
    powNOld,
    pow2,
    getRandomInt,
} = require('./helpers');

// Tests Functions
/**
 * Test the equality between lastByNJSON and lastByNSplice functions
 * @param {number} limit Test limit
 * @param {boolean} desc direction
 * @returns {void}
 */
function TestNByJSONtoSplit(limit = 25, desc = false) {
    var countGlobal = 0;
    for (let i = 1; i <= limit; i++) {
        var count = 0;
        for (let j = 1; j <= i; j++) {
            var count_InN = 0;
            for (let N = 1; N < i + 1; N++) {
                var leeft = lastByNJSON(i, N, j, desc);
                var right = lastByNSplice(i, N, j, desc);
                if (leeft[0] == right[0]) {
                    count_InN++;
                }
            }
            if (count_InN == i) {
                count++;
            }
        }
        if (count == i) {
            countGlobal++;
        }
    }
    console.log('Total égalité JSON to Splice for N function: ' + countGlobal + ' over ' + limit);
}
/**
 * Test the equality for all starts for lastByNJSON function
 * @param {number} limit Test limit
 * @param {number} N Step size
 * @param {boolean} desc direction
 */
function TestEgaliteN(limit = 25, N = 1, desc = false) {
    for (let i = 1; i <= limit; i++) {
        var count = 0;
        for (let j = 1; j <= i; j++) {
            var l1 = lastByNJSON(i, N, j, desc);
            if (l1.lastAlive == j) {
                count++;
            }
        }
        if (count == i) {
            Encadrement(i, N + 1);
        }
    }
    console.log('temps exec lastByJSON');
}

function Encadrement(n = 257, m = 2) {
    var txtLog = '';
    var txtLog1 = '\t';
    var egSup = ' < ';
    var egSup1 = ' < ';
    var pwm = powm(n, m);
    var p = pwm[0];
    var i = pwm[1];
    var mp = m ** p;
    var mpi = mp * i;
    if (n == mp) {
        egSup = ' = ';
        txtLog += mp + egSup + n + ' < ' + m * mp;
        console.log(txtLog);
    } else {
        if (n == mpi) {
            egSup1 = ' = ';
        } else {
            txtLog1 += '\t';
        }
        txtLog1 += mpi + egSup1 + n + ' < ' + (mpi + mp);
        console.log(txtLog1);
    }
}
/**
 * Calculate the chances to be the last alive
 * @param {*} nombre
 * @param {*} num
 */
function chances(nombre, num) {
    var list = [];
    for (var i = 1; i <= nombre; i++) {
        if (lastBy1Splice(nombre, i, false) == num) {
            list.push({ start: i, desc: false });
        }
        if (lastBy1Splice(nombre, i, true) == num) {
            list.push({ start: i, desc: true });
        }
    }
    console.table(list);
}
/**
 * Calculate the chances to be the last alive, starting and ending alive, multiple directions
 * @param {*} nombre
 * @param {*} N
 */
function chancesStartEnd(nombre, N = 1) {
    var list = [];
    for (var i = 1; i <= nombre; i++) {
        if (lastByNMath(nombre, N, i, false).lastAlive == i) {
            list.push({ start: i, desc: false });
        }
        if (lastByNMath(nombre, N, i, true).lastAlive == i) {
            list.push({ start: i, desc: true });
        }
    }
    console.table(list);
}

/**
 * Find the angel position that kills the minimum number of people
 * @param {*} minkills
 * @param {*} n
 * @param {*} M
 */
function findAngel(minkills, n = 100, M = 1) {
    var start = lastByNJSON_Random(n, M)[1];
    var etape = 0;
    while (start > Math.max(1, minkills) || etape < 100) {
        const randomPosition = lastByNJSON_Random(n, M);
        start = randomPosition[1];
        etape++;
    }
    console.log('end = ' + start);
    console.log('etape   = ' + etape);
    console.log('minkills   = ' + minkills);
}

function testClassic() {
    var n = getRandomInt(102, 3_000);
    // var n = 3 ** 4;
    var Skip = 4;
    var start = 1;

    const obj = {
        last_1: {
            math: lastBy1Math(n, start),
            josephus: josephus(n, 2, start),
            splice: lastBy1Splice(n, start),
            jSON: lastBy1JSON(n, start).lastAlive,
        },
        last_n: {
            math: lastByNMath(n, Skip, start).lastAlive,
            josephus: josephus(n, Skip, start),
            splice: lastByNSplice(n, Skip, start).lastAlive,
            jSON: lastByNJSON(n, Skip, start).lastAlive,
        },
    };
    obj[`${n}, ${Skip + 1}`] = findPAndQ(n, Skip + 1);
    console.table(obj);
}

function testPowers(n = 1000, m = 2) {
    const obj = {
        n,
        m,
        native: 1 << Math.ceil(Math.log2(n)),
        pow2Loop: pow2Loop(n) + 1,
        powerTwo: powerTwo(n) + 1,
        pow2: pow2(n),
        powM: powNOld(n, m) + 1,
        powN: powN(n, m) + 1,
        powm: powm(n, m)[0] + 1,
        // powm_log: findPAndQ(n, m),
    };
    console.table(obj);
}

testPowers(3000, 3);
testClassic();

module.exports = {
    TestNByJSONtoSplit,
    TestEgaliteN,
    Encadrement,
    chances,
    chancesStartEnd,
    findAngel,
    testClassic,
};
