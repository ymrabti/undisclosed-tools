var {
    generate,
    descendant,
    generateListJSON,
    countAlives,
    findNUM,
    findNextAlive,
    pow2,
    findNextNAlives,
    powm,
    powN,
    pow2Loop,
    getRandomInt,
    findPAndQ,
} = require('./helpers');

function lastBy1Splice(nombre = 100, start = 1, desc = false) {
    var listComn = generate(nombre, desc);
    var lastAlive = start;
    while (listComn.length > 2) {
        var len = listComn.length;
        i = listComn.indexOf(lastAlive);
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

// Generalized Josephus Function for skipping N persons
function lastByNSplice(nombre = 100, N = 1, start = 1, desc = false) {
    var listComn = generate(nombre, desc);
    var lastAlive = start;
    while (listComn.length > N + 1) {
        var len = listComn.length;
        i = listComn.indexOf(lastAlive);
        lastAlive = listComn[(i + 1 + N) % len];
        listKills = [];
        for (let j = 0; j < N; j++) {
            listKills.push(listComn[(i + j + 1) % len]);
        }
        listKills.forEach(function (item, index) {
            var index = listComn.indexOf(item);
            if (index > -1) {
                listComn.splice(index, 1);
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
        nextAlives.forEach(function (item, index) {
            listComn[i].kills += 1;
            listComn[item].killed = true;
            listComn[item].killedBy = lastAlive;
        });
        next2 = findNextNAlives(listComn, 1, i)[0];
        lastAlive = listComn[next2].num;
    }
    return { lastAlive /* listComn */ };
}
function lastByNMath(nombre = 100, N = 1, start = 1, desc = false) {
    const m = powN(nombre, N + 1); // Calculate the exponent for the largest power of (N + 1)
    const desc1 = descendant(!!desc); // Convert desc to either 1 (descending) or -1 (ascending)

    // Generalized formula for finding the last person standing
    const deux = N + 1;
    const lastAlive =
        ((desc1 * nombre + (nombre - Math.pow(deux, m)) * deux + start - 1) % nombre) + 1;

    return { lastAlive, m }; // Return the last person and the power exponent
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
    var listComn = generate1(nombre, desc);
    var lastAlive = start;
    while (countAlives(listComn) > N) {
        // console.log("Killer = "+lastAlive);
        i = findNUM(listComn, lastAlive);
        var nextAlives = findNextNAlives(listComn, N, i);
        nextAlives.forEach(function (item, index) {
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

function josephus(n, m) {
    let survivor = 0; // Base case: when there's 1 person, the survivor is at position 0

    // Calculate the position for n people iteratively
    for (let i = 2; i <= n; i++) {
        survivor = (survivor + m) % i;
    }

    // Convert from 0-based index to 1-based index
    return survivor + 1;
}

var n = getRandomInt(102, 3_000);
// var n = 3 ** 4;
var Skip = 4;
var start = 1;

const obj = {
    last_1: {
        math: lastBy1Math(n, start),
        splice: lastBy1Splice(n, start),
        jSON: lastBy1JSON(n, start).lastAlive,
    },
    last_n: {
        math: lastByNMath(n, Skip, start).lastAlive,
        // math: josephus(n, Skip, start),
        // math: josephusBinary(n, Skip + 1, start),
        splice: lastByNSplice(n, Skip, start).lastAlive,
        jSON: lastByNJSON(n, Skip, start).lastAlive,
    },
};
obj[`${n}, ${Skip + 1}`] = findPAndQ(n, Skip + 1);
console.table(obj);

module.exports = {
    lastBy1Splice,
    lastBy1JSON,
    lastBy1Math,
    lastByNSplice,
    lastByNJSON,
    lastByNMath,
    InfosNum,
    returnAlives,
    josephus,
    lastByNSplice_Random,
    lastByNJSON_Random,
};

/*
console.log(lastByNMath(n, M, start));
var Mi = 2
console.log('\nTESTS\n');
console.log(chances(nn, 1));
console.log(Nchances(nn, 1));
console.log(chancesStartEnd(Mi, M - 1).length / 2, Mi); */

// 12435 A 25
