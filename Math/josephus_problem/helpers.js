/**
 *
 * @param {InfoCondamne[]} list Liste
 * @returns
 */
function countAlives(list) {
    var alives = 0;
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (!item.killed) {
            alives++;
        }
    }
    return alives;
}
/**
 *
 * @param {InfoCondamne[]} list Liste
 * @param {num} num Numero Condamne
 * @returns
 */
function findNUM(list, num) {
    return list.findIndex((item) => item.num === num);
}

function findNextAlive(list, index) {
    var len = list.length,
        i = index % len;
    while (list[(i + 1) % len].killed) {
        i++;
    }
    i++;
    return i % len;
}

function findNextNAlives(list, N, index) {
    var listIndexes = [];
    var len = list.length,
        i = index % len;
    while (listIndexes.length < N) {
        while (list[(i + 1) % len].killed) {
            i++;
        }
        i++;
        listIndexes.push(i % len);
    }
    return listIndexes;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rand(Min, Max) {
    return Math.round((Max - Min) * Math.random() + Min);
}

function generate(n, desc) {
    var dsc = descendant(!!desc);
    return [...Array(n)].map((_, i) => (n + 1) * desc + dsc * (i + 1));
}

function generateListJSON(n, desc) {
    var dsc = descendant(!!desc);
    return [...Array(n)].map(function (_, i) {
        return new InfoCondamne((n + 1) * desc + dsc * (i + 1));
    });
}
class InfoCondamne {
    /**
     *
     * @param {number} numero Number
     */
    constructor(numero) {
        this.num = numero;
        this.killed = false;
        this.kills = 0;
        this.killedBy = null;
        this.killedRound = null;
    }
}

function descendant(b) {
    return 1 - 2 * b;
}

function returnAlives(list) {
    var listAlives = [];
    list.forEach(function (item, index) {
        if (!item.killed) {
            listAlives.push(item);
        }
    });
    return listAlives;
}

/**
 *
 * @param {InfoCondamne[]} list Liste
 * @param {number} num num
 * @returns
 */
function InfosNum(list, num) {
    var listOfkills = list.filter((item) => item.killedBy == num);
    var i = findNUM(list, num);
    return i < 0
        ? null
        : {
              from_function: listOfkills.length,
              from_list: list[i].kills,
              kills: listOfkills,
              killedBy: list[i].killedBy,
          };
}
/**
 * Display power m information
 * @param {number} nombe 
 * @returns {number}
 */
function powerTwo(nombe) {
    var power = 1,
        pw = 2 ** power;
    while (nombe >= pw) {
        pw *= 2;
        power++;
    }
    console.log(2 ** (power - 1) + ' < ' + nombe + ' < ' + 2 ** power);
    return power - 1;
}

/**
 * Calculate the greatest power of m less than or equal to n
 * @param {number} n 
 * @param {number} m 
 * @returns {number}
 */
function powNOld(n, m = 2) {
    var pw = 1,
        p = 0;
    while (n >= pw) {
        pw *= m;
        p++;
    }
    return p - 1;
}
/**
 * Calculate the greatest power of m less than or equal to n
 * @param {number} n 
 * @param {number} m 
 * @returns {number}
 */
function powN(n, m = 2) {
    let pw = 1;
    let p = 0;
    while (pw * m <= n) {
        pw *= m;
        p++;
    }
    return p; // Returning the power (exponent) of m that is <= n
}
/**
 * Calculate the greatest power of 2 less than or equal to n
 * @param {number} n Number of which to calculate the power
 * @returns {number} The greatest power of 2 less than or equal to n
 */
function pow2Loop(n) {
    var pw = 1,
        p = 0;
    while (n >= pw) {
        pw *= 2;
        p++;
    }
    return p - 1;
}
/**
 * Calculate the greatest power of 2 less than or equal to n
 * @param {number} n Number of which to calculate the power
 * @returns {number} The greatest power of 2 less than or equal to n
 */
function pow2(n) {
    return Math.ceil(Math.log2(n));
}
/**
 * Find p and q such that n = q * m^p + r with 0 <= r < m^p
 * @param {number} n number
 * @param {number} m base
 * @returns {Array} [p, q, nextP]
 */
function powm(n, m = 2) {
    let pw = 1,
        p = 0,
        i = 0;
    while (n >= pw) {
        pw *= m;
        p++;
        i++;
    }
    console.log(m ** (p - 1) + ' < ' + n + ' < ' + m ** p, pw, m);
    let borne_inf = m ** (p - 1);
    while (borne_inf <= n) {
        borne_inf += m ** (p - 1);
        i++;
    }
    return [p - 1, i, p];
}
function findPAndQ(n, m = 2) {
    let p = 0;
    let power = 1; // Start with m^0 = 1

    // Step 1: Find p such that m^p <= n
    while (power * m <= n) {
        power *= m;
        p++;
    }

    // Step 2: Find q such that 1 <= q < m and q * m^p <= n
    let q = Math.floor(n / power); // Max q such that q * m^p <= n

    // Ensure q is in the range [1, m)
    if (q >= m) {
        q = m - 1; // If q >= m, adjust it to be less than m
    }

    // Ensure the condition q * m^p <= n
    while (q * power > n) {
        q--; // Decrease q if it doesn't satisfy the condition
    }

    return {
        p,
        q,
        // equation: `${(q == 1 ? 1 : q - 1) * m ** p} <= ${q * m ** p} <= ${n} < ${(q + 1) * m ** p}`
    };
}
module.exports = {
    returnAlives,
    countAlives,
    findNUM,
    findNextAlive,
    findNextNAlives,
    getRandomInt,
    rand,
    generate,
    generateListJSON,
    descendant,
    InfoCondamne,
    InfosNum,
    findPAndQ,
    pow2Loop,
    powerTwo,
    powNOld,
    powN,
    pow2,
    powm,
};
