const { lastByNJSON, lastByNSplice, lastByNMath } = require("./index");
const { powm } = require("./helpers");

function TestNByJSONtoSplit(limit = 25, desc = false) {
    var temps1 = 0; var temps2 = 0;
    var countGlobal = 0;
    for (let i = 1; i <= limit; i++) {
        var count = 0;
        for (let j = 1; j <= i; j++) {
            var count_InN = 0;
            for (let N = 1; N < i + 1; N++) {
                var leeft = lastByNJSON(i, N, j, desc);
                var right = lastByNSplice(i, N, j, desc);
                temps1 += leeft[1]; temps2 += right[1];
                if (leeft[0] == right[0]) {
                    count_InN++;
                }
            }
            if (count_InN == i) { count++; }
        }
        if (count == i) {
            countGlobal++;
        }
    }
    console.log("temps exec lastByJSON    = " + temps1 + " secs");
    console.log("temps exec lastByNSplice = " + temps2 + " secs");
    return countGlobal;
}
function TestEgaliteN(limit = 257, N = 1, desc = false) {
    var temps1 = 0;
    for (let i = 1; i <= limit; i++) {
        var count = 0;
        for (let j = 1; j <= i; j++) {
            var l1 = lastByNJSON(i, N, j, desc);
            temps1 += l1[1];
            if (l1[0] == j) {
                count++;
            }
        }
        if (count == i) {
            Encadrement(i, N + 1);
        }
    }
    console.log("temps exec lastByJSON = " + temps1 + " secs");
}
function TestPowm(plimit, m = 2, desc = false) {
    var temps1 = 0;
    for (let i = 1; i <= m ** plimit; i *= m) {
        var count = 0;
        for (let j = 1; j < m; j += 1) {
            Encadrement(i * j, m);
        }
    }
    console.log("temps exec lastByJSON = " + temps1 + " secs");
}
function Encadrement(n = 257, m = 2) {
    var txtLog = ""; var txtLog1 = "\t";
    var egSup = " < "; var egSup1 = " < ";
    var pwm = powm(n, m); var p = pwm[0]; var i = pwm[1];
    var mp = m ** p; var mpi = mp * i;
    if (n == mp) {
        egSup = " = ";
        txtLog += mp + egSup + n + " < " + m * mp;
        console.log(txtLog);
    }
    else {
        if (n == mpi) { egSup1 = " = "; } else { txtLog1 += "\t"; }
        txtLog1 += mpi + egSup1 + n + " < " + (mpi + mp);
        console.log(txtLog1);
    }
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

function TestUnitaire(i, N, show) {
    var count = 0;
    for (let j = 1; j < i + 1; j++) {
        var lbm = lastByNMath(i, N, j);
        var lef = lastByNJSON(i, N, j)[0];
        var rig = lbm[0];/*var m=lbm[1];*/
        if (lef == rig) {
            if (show) {
                console.log("i = " + i); console.log("j = " + j);
                console.log("lef = " + lef);
                console.log("rig = " + rig);
                console.log("\n\n");
                // console.log(lef +" == "+rig);
            }
            count++;
        }
    }
    return count;
}
function TestEg(limit = 257, N = 1, show = false) {
    if (limit > 257) {
        TestUnitaire(limit, N, show);
    }
    var countGlobal = 0;
    for (let i = 1; i < limit + 1; i++) {
        if (TestUnitaire(i, N, show) == i) {
            countGlobal++;
            Encadrement(i, N + 1);
        }
    }
    console.log(countGlobal);
}




function TestReversePw3(plimit = 8) {
    var temps1 = 0; var temps2 = 0;
    for (let i = 2; i <= 2 ** plimit; i *= 2) {
        var count = 0;
        for (let j = 1; j <= i; j++) {
            var l1 = lastBySplice(i, j, true);
            var l2 = lastBySplice(i, j, false);
            temps1 += l1[1]; temps2 += l2[1];
            if (l1[0] == l2[0]) {
                count++;
            }
        }
        if (count != 0) {
            console.log("===== NEW ====");
            console.log("i = " + i);
            console.log("count = " + count);
            console.log("==============\n\n\n");
        }
    }
    console.log("temps exec lastByJSON = " + temps1 + " secs");
    console.log("temps exec last2 = " + temps2 + " secs");
}
function TestEgalite(plimit = 8, desc = false) {
    var temps1 = 0;
    for (let i = 2; i <= 2 ** plimit; i *= 2) {
        var count = 0;
        for (let j = 1; j <= i; j++) {
            var l1 = lastBySplice(i, j, desc);
            temps1 += l1[1];
            if (l1[0] == j) {
                count++;
            }
        }
        if (count != 0) {
            console.log("===== NEW ====");
            console.log("i = " + i + " " + desc);
            console.log("count = " + count);
            console.log("==============\n\n\n");
        }
    }
    console.log("temps exec lastByJSON = " + temps1 + " secs");
}
function TestReverse3(limit = 257) {
    var temps1 = 0; var temps2 = 0;
    for (let i = 1; i <= limit; i++) {
        var count = 0;
        for (let j = 1; j <= i; j++) {
            var l1 = lastBySplice(i, j, true);
            var l2 = lastBySplice(i, j, false);
            temps1 += l1[1]; temps2 += l2[1];
            if (l1[0] == l2[0]) {
                count++;
            }
        }
        if (count != 0) {
            console.log("===== NEW ====");
            console.log("i = " + i);
            console.log("count = " + count);
            console.log("==============\n\n\n");
        }
    }
    console.log("temps exec lastByJSON = " + temps1 + " secs");
    console.log("temps exec last2 = " + temps2 + " secs");
}

function MathToOthers() {
    console.clear(); var limit = 2021;
    var n = rand(1, limit); var s = rand(1, n);
    var c = Math.round(Math.sqrt(rand(1, limit)));
    var desc = rand(1, 0); var desc1 = rand(1, 0);
    console.log("n = " + n); console.log("s = " + s);
    console.log("desc = " + desc);
    console.log("\t1_Math   = " + lastBy1Math(n, s, desc)[0]);
    console.log("\t1_Splice = " + lastBy1Splice(n, s, desc)[0]);
    console.log("\t1_JSON   = " + lastBy1JSON(n, s, desc)[0]);
    console.log("N   = " + c); console.log("desc1 = " + desc1);
    console.log("\t" + c + "_Splice = " + lastByNSplice(n, c, s, desc1)[0]);
    console.log("\t" + c + "_JSON   = " + lastByNJSON(n, c, s, desc1)[0]);
}
function compNSp(N = 2, limit = 100) {
    console.clear();
    for (let i = 1; i < limit + 1; i++) {
        console.log("last = " + lastByNSplice(i, N, 1)[0] + " \t\ti = " + i + " \tN = " + N);
    }
}
function TestMath(limit = 100, N = 1) {
    console.clear();
    for (let i = 1; i <= limit; i++) {
        // console.log(lastBy1MathDesc(limit,i)[0]==lastBy1Splice(limit,i)[0]);
        if (lastByNSplice(i, N, 1)[0] == lastByNMath(i, N, 1)[0]) {
            // console.log("i = "+i+" \tN = "+N);
            Encadrement(i, N + 1)
        }
        // console.log(lastByNMath(i,N,1)[0]);
        // console.log(lastByNSplice(i,N,1)[0]);
    }
}
function findAngel(minkills, n = 100, M = 1) {
    var start = lastByNJSONrandom(n, M)[2];
    var etape = 0;
    while (start > Math.max(1, minkills) || etape < 100) {
        start = lastByNJSONrandom(n, M)[2]; etape++;
        console.log("etape = " + etape);
    }
    console.log("end = " + start);
    console.log("etape   = " + etape);
}


TestNByJSONtoSplit();
TestEgaliteN(100, 2);
TestPowm(10, 2);
Encadrement(100, 3);
TestUnitaire(100, 2, false);
TestEg(100, 2, false);

module.exports = {
    TestNByJSONtoSplit,
    TestEgaliteN,
    TestPowm,
    Encadrement,
    TestUnitaire,
    TestEg,
    TestReversePw3,
    TestEgalite,
    TestReverse3,
    MathToOthers,
    compNSp,
    TestMath,
    findAngel,
}