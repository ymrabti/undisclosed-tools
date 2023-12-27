var { generate, descendant, generateListJSON, countAlives, findNUM, findNextAlive, pow2, findNextNAlives, powm, powN } = require("./helpers");

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
  var desc1 = descendant(!!desc);
  // var lastAlive = (desc * nombre + (nombre - 2 ** m) * 2 * desc1 + start - 1) % nombre + 1;
  var lastAlive = ((desc ? 1 : 0) * (2 ** (p + 1) - nombre) + 2 * (nombre - 2 ** (p - 1)) + start - 1) % nombre + 1;
  return lastAlive;
}
function lastBy1MathDesc(nombre = 100, start = 1) {
  var p = pow2(nombre);
  var lastAlive = ((2 ** p - nombre) + start - 1) % nombre + 1;
  return lastAlive;
}

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
      if (index > -1) { listComn.splice(index, 1); }
    });
  }
  return { lastAlive, /* listComn */ };
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
  return { lastAlive, /* listComn */ };
}
function lastByNMath(nombre = 100, N = 1, start = 1, desc = false) {
  var deux = N + 1, pwm = powN(nombre, deux), m = pwm, i = pwm[1];
  // var mi = m*i;var mpi = mp*i;console.log(i);
  var desc1 = descendant(!!desc);
  var lastAlive = (desc * nombre + (nombre - deux ** m) * deux * desc1 + start - 1) % nombre + 1;
  return { lastAlive, m };
}

function lastByNSplicerandom(nombre = 100, M = 1) {
  var N = rand(M, 0);
  var start = rand(1, nombre); var desc = rand(1, 0);
  console.clear();
  console.log("start = " + start);
  console.log("desc = " + desc);
  console.log("Next N = " + N);
  var listComn = generate(nombre, desc);
  var lastAlive = start;
  while (listComn.length > N + 1) {
    console.log("Killer = " + lastAlive);
    var len = listComn.length;
    i = listComn.indexOf(lastAlive);
    lastAlive = listComn[(i + 1 + N) % len];
    listKills = [];
    for (let j = 0; j < N; j++) {
      listKills.push(listComn[(i + j + 1) % len]);
    }
    listKills.forEach(function (item, index) {
      var index = listComn.indexOf(item);
      console.log("\tKilled = " + item);
      if (index > -1) { listComn.splice(index, 1); }
    });
    N = rand(M, 0);
    console.log("Next N = " + N); console.log("\n\n");
  }
  return [lastAlive, listComn];
}
function lastByNJSONrandom(nombre = 100, M = 1) {
  var N = rand(M, 0);
  var start = rand(1, nombre); var desc = rand(1, 0);
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
  var kills = listComn.find(us => us.num == lastAlive).kills;
  return [lastAlive, kills];
}


function returnAlives(list) {
  var listAlives = [];
  list.forEach(function (item, index) {
    if (!item.killed) { listAlives.push(item) }
  });
  return listAlives;
}
function LastSurviverOpenAI(numberOfprisonners) {
  let iteration = 1
  let prisonner = 1
  while (prisonner <= numberOfprisonners) {
    prisonner = (2 ** (iteration - 1)) % numberOfprisonners + 1;
    iteration++;
  }
  return prisonner;
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
  return i < 0 ? null : {
    "from_function": listOfkills.length,
    "from_list": list[i].kills,
    "kills": listOfkills, "killedBy": list[i].killedBy
  };
}
function chances(nombre, num) {
  var list = [];
  for (var i = 1; i <= nombre; i++) {
    if (lastBy1Splice(nombre, i, false) == num) { list.push({ "start": i, "desc": false }) }
    if (lastBy1Splice(nombre, i, true) == num) { list.push({ "start": i, "desc": true }) }
  }
  return list;
}
function chancesStartEnd(nombre, N = 1) {
  var list = [];
  for (var i = 1; i <= nombre; i++) {
    if (lastByNMath(nombre, N, i, false).lastAlive == i) { list.push({ "start": i, "desc": false }) }
    if (lastByNMath(nombre, N, i, true).lastAlive == i) { list.push({ "start": i, "desc": true }) }
  }
  return list;
}
function Nchances(nombre = 100, num = 73, starter = false) {
  var list = [];
  if (starter) { NchnceUnitaire(nombre, num, num, list) }
  else {
    for (var i = 1; i <= nombre; i++) {
      NchnceUnitaire(nombre, i, num, list);
    }
  }
  return list;
}
function NchnceUnitaire(nombre, i, num, list) {
  for (let N = 1; N < i + 1; N++) {
    if (lastByNSplice(nombre, N, i, false)[0] == num) { list.push({ "start": i, "N": N, "desc": false }) }
    if (lastByNSplice(nombre, N, i, true)[0] == num) { list.push({ "start": i, "N": N, "desc": true }) }
  }
}
function Cumutations(nombre, desc = false) {
  for (let i = 1; i <= nombre; i++) {
    var last0 = lastBySplice(nombre, i, desc != false)[0];
    console.log(i - last0);
    // console.log(last0);
    // console.log("\n\n");
  }
}
function listLasts(nombre, N = 1, desc = false) {
  var list = [];
  for (var i = 1; i <= nombre; i++) {
    list.push(lastByNSplice(nombre, N, i, desc)[0]);
  }
  return list;
}
var nn = 223;
var start = 12;
console.log('LAST 1');
console.log(lastBy1Splice(nn, start, true));
var lastOneByJSON = lastBy1JSON(nn, start, true);
console.log(lastOneByJSON.lastAlive);
console.log(lastBy1Math(nn, start, 4));
console.log(lastBy1MathDesc(nn, start, true));
// console.log(InfosNum(lastOneByJSON.listComn, 81));
var M = 19
var Mi = M ** 2
console.log('\nLAST N\n');
console.log(lastByNSplice(nn, M, start, true));
var lastOneByJSON = lastByNJSON(nn, M, start, true);
console.log(lastOneByJSON);
console.log(lastByNMath(nn, M, start, null));
/* console.log('\nTESTS\n');
console.log(chances(nn, 1));
console.log(Nchances(nn, 1));
console.log(chancesStartEnd(Mi, M - 1).length / 2, Mi); */

// console.log(InfosNum(lastOneByJSON.listComn, start));
// 12435 A 25
/* module.exports = {
  lastBy1Splice,
  lastBy1JSON,
  lastBy1Math,
  lastBy1MathDesc,
  lastByNSplice,
  lastByNJSON,
  lastByNMath,
  lastByNSplicerandom,
  lastByNJSONrandom,
  InfosNum,
  chances,
  Nchances,
  NchnceUnitaire,
  Cumutations,
  listLasts,
} */