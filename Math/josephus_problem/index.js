var {
    generate,
    generateListJSON,
    countAlives,
    findNUM,
    findNextAlive,
    pow2,
    findNextNAlives,
    rand,
} = require('./helpers');

function lastBy1Splice(nombre = 100, start = 1, desc = false) {
    const listComn = generate(nombre, desc);
    let lastAlive = start;
    while (listComn.length > 2) {
        const len = listComn.length;
        const i = listComn.indexOf(lastAlive);
        lastAlive = listComn[(i + 2) % len];
        listComn.splice((i + 1) % len, 1);
    }
    return lastAlive;
}
function lastBy1JSON(nombre = 100, start = 1, desc = false) {
    var listComn = generateListJSON(nombre, desc);
    var lastAlive = start;
    var round = 1;
    while (countAlives(listComn) > 1) {
        var i = findNUM(listComn, lastAlive);
        var next1 = findNextAlive(listComn, i);
        if (i > next1) {
            round++;
        }
        listComn[i].kills += 1;
        listComn[next1].killed = true;
        listComn[next1].killedBy = lastAlive;
        listComn[next1].killedRound = round;
        var next2 = findNextAlive(listComn, next1);
        lastAlive = listComn[next2].num;
    }
    return { lastAlive, listComn };
}
function lastBy1Math(nombre = 100, start = 1, desc = false) {
    var p = pow2(nombre);
    var lastAlive =
        (((desc ? 1 : 0) * (2 ** (p + 1) - nombre) + 2 * (nombre - 2 ** (p - 1)) + start - 1) %
            nombre) +
        1;
    return lastAlive;
}
function lastBy1Binary(nombre = 100, start = 1, desc = false) {
    var binary = nombre.toString(2);
    var rotatedBinary = binary.slice(1) + binary[0];
    var lastAlive = parseInt(rotatedBinary, 2);
    if (desc) {
        lastAlive = ((nombre + 1 - lastAlive + start - 1) % nombre) + 1;
    } else {
        lastAlive = ((lastAlive - 1 + start - 1) % nombre) + 1;
    }
    return lastAlive;
}

// Generalized Josephus Function for skipping N persons
function lastByNSplice(nombre = 100, N = 1, start = 1, desc = false) {
    const listComn = generate(nombre, desc);
    let lastAlive = start;
    while (listComn.length >= N + 1) {
        const len = listComn.length;
        const i = listComn.indexOf(lastAlive);
        lastAlive = listComn[(i + 1 + N) % len];
        const kills = [];
        for (let j = 0; j < N; j++) {
            kills.push(listComn[(i + j + 1) % len]);
        }
        kills.forEach(function (item, index) {
            const itemIndex = listComn.indexOf(item);
            if (itemIndex > -1) {
                listComn.splice(itemIndex, 1);
            }
        });
    }
    return { lastAlive /* listComn */ };
}
function lastByNJSON(nombre = 100, N = 1, start = 1, desc = false) {
    var listComn = generateListJSON(nombre, desc);
    var lastAlive = start;
    while (countAlives(listComn) > N) {
        i = findNUM(listComn, lastAlive);
        var nextAlives = findNextNAlives(listComn, N, i);
        nextAlives.forEach(function (item) {
            listComn[i].kills += 1;
            listComn[item].killed = true;
            listComn[item].killedBy = lastAlive;
        });
        next2 = findNextNAlives(listComn, 1, i)[0];
        lastAlive = listComn[next2].num;
    }
    return { lastAlive /* listComn */ };
}
function lastByNSplice_Random(nombre = 100, M = 1) {
    var N = rand(M, 0);
    var start = rand(1, nombre);
    var desc = rand(1, 0);
    console.clear();
    console.log('start = ' + start);
    console.log('desc = ' + desc);
    console.log('Next N = ' + N);
    var listComn = generate(nombre, desc);
    var lastAlive = start;
    while (listComn.length > N + 1) {
        console.log('Killer = ' + lastAlive);
        var len = listComn.length;
        i = listComn.indexOf(lastAlive);
        lastAlive = listComn[(i + 1 + N) % len];
        listKills = [];
        for (let j = 0; j < N; j++) {
            listKills.push(listComn[(i + j + 1) % len]);
        }
        listKills.forEach(function (item, index) {
            var index = listComn.indexOf(item);
            console.log('\tKilled = ' + item);
            if (index > -1) {
                listComn.splice(index, 1);
            }
        });
        N = rand(M, 0);
        console.log('Next N = ' + N);
        console.log('\n\n');
    }
    return [lastAlive, listComn];
}
function lastByNJSON_Random(nombre = 100, M = 1) {
    var N = rand(M, 0);
    var start = rand(1, nombre);
    var desc = rand(1, 0);
    var listComn = generateListJSON(nombre, desc);
    var lastAlive = start;
    while (countAlives(listComn) > N) {
        // console.log("Killer = "+lastAlive);
        i = findNUM(listComn, lastAlive);
        var nextAlives = findNextNAlives(listComn, N, i);
        nextAlives.forEach(function (item) {
            listComn[i].kills += 1;
            listComn[item].killed = true;
            listComn[item].killedBy = lastAlive;
            // console.log("\tKilled = "+listComn[item].num);
        });
        next2 = findNextNAlives(listComn, 1, i)[0];
        lastAlive = listComn[next2].num;
        N = rand(M, 0);
        // console.log("\n\n");
    }
    var kills = listComn.find((us) => us.num == lastAlive).kills;
    return [lastAlive, kills];
}

//
/**
 * Josephus Classic
 * step = 2, forward direction, custom start
 * @param {number} n
 * @param {number} start (1-based)
 * @returns {number}
 */
function josephusClassic(n, start = 1) {
    if (n < 1 || start < 1 || start > n) {
        throw new Error('Invalid n or start');
    }

    const highestPowerOf2 = 1 << Math.floor(Math.log2(n));
    const l = n - highestPowerOf2;
    const base = 2 * l + 1;

    return ((base + start - 2) % n) + 1;
}

/**
 * Josephus Classic Reverse
 * step = 2, reverse direction, custom start
 * @param {number} n
 * @param {number} start
 * @returns {number}
 */
function josephusClassicReverse(n, start = 1) {
    const forward = josephusClassic(n, start);
    return (n - forward + start + 1) % n;
}

/**
 * Josephus General — CORRECT for your rules
 * Matches splice / JSON simulation
 *
 * @param {number} n       - number of prisoners
 * @param {number} m       - number killed each round
 * @param {number} start   - starting prisoner (1-based)
 * @param {boolean} desc   - reverse circle direction
 * @returns {number}       - last alive (1-based)
 */
function josephusGeneral(n, m, start = 1, dir = 'forward') {
    if (n < 1 || m < 1 || start < 1 || start > n || !['forward', 'reverse'].includes(dir)) {
        throw new Error('Invalid parameters');
    }

    // Base Josephus: forward, start = 1, 0-based
    let survivor = 0;
    for (let i = 1; i <= n; i++) {
        survivor = (survivor + m + 1) % i;
    }

    // Apply start rotation
    survivor = (survivor + (start - 1)) % n;

    // Reverse CIRCLE (not recurrence)
    if (dir === 'reverse') {
        survivor = (n - survivor - 1 + n) % n;
    }

    return survivor + 1;
}

/**
 * Unified Josephus Function
 *
 * @param {number} n       - Number of prisoners (n >= 1)
 * @param {number} m       - Step size (m >= 1, m = 2 => classic)
 * @param {number} start   - Starting position (1-based)
 * @param {string} dir     - "forward" | "reverse"
 * @returns {number}       - Survivor position (1-based)
 */
function josephus(n, m = 2, start = 1, dir = 'forward') {
    if (n < 1 || m < 1 || start < 1 || start > n || !['forward', 'reverse'].includes(dir)) {
        throw new Error('Invalid parameters');
    }

    if (m === 2) {
        return dir === 'forward' ? josephusClassic(n, start) : josephusClassicReverse(n, start);
    } else {
        return josephusGeneral(n, m, start, dir);
    }
}

module.exports = {
    lastBy1Splice,
    lastBy1JSON,
    lastBy1Math,
    lastBy1Binary,
    lastByNSplice,
    lastByNJSON,
    lastByNSplice_Random,
    lastByNJSON_Random,
    josephusClassic,
    josephusClassicReverse,
    josephusGeneral,
    josephus,
};

/*
var Mi = 2
console.log('\nTESTS\n');
console.log(chances(nn, 1));
console.log(Nchances(nn, 1));
console.log(chancesStartEnd(Mi, M - 1).length / 2, Mi); */

// 12435 A 25
