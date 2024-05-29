/**
 * JavaScript function that accepts two parameters: a numerator (p) and a denominator (q), both of which are integers. The function should then determine whether removing common characters from the numerator (as a string, denoted as np) and the denominator (as a string, denoted as nq) results in the same fraction np/nq as the original p/q.
 * @param {number} p  numerator 
 * @param {number} q denominator
 * @returns {boolean}
 */
function checkFractionEquality(p, q, explain = true) {
    let np = `${p}`;
    let nq = `${q}`;

    for (let i = 0; i < np.length; i++) {
        const char = np[i];
        if (nq.includes(char)) {
            np = np.replace(char, '');
            nq = nq.replace(char, '');
            i--;
        }
    }
    const newP = parseInt(np, 10);
    const newQ = parseInt(nq, 10);

    if (explain) {
        console.log({
            p_q: p / q,
            np_nq: newP / newQ,
            p: p.toLocaleString('fr'), q: q.toLocaleString('fr'),
            newP: newP.toLocaleString('fr'), newQ: newQ.toLocaleString('fr'),
        });
    }
    return newP / newQ === p / q //
        && newP !== p && newQ !== q //
        && newP >= newQ //
        && p % 1000 !== q % 1000 //
        && p % 100 !== q % 100 //
        && p % 10 !== q % 10 //
        && !`${p / q}`.includes('.') //
    // && `${newP}`.length <= 3;
}

var oldResult = [
    { i: 106216, j: 102595 },
    { i: 107210, j: 102680 },
    { i: 108030, j: 100828 },
    { i: 108090, j: 100884 },
    { i: 108300, j: 102885 },
    { i: 108408, j: 103891 },
    { i: 108510, j: 104893 },
    { i: 108600, j: 105885 },
    { i: 108800, j: 107984 },
    { i: 109252, j: 102949 },
    { i: 115240, j: 112359 },
    { i: 116116, j: 111592 },
    { i: 117050, j: 114709 },
    { i: 117221, j: 112268 },
    { i: 117400, j: 113878 },
    { i: 120020, j: 102017 },
    { i: 120060, j: 102051 },
    { i: 120200, j: 102170 },
    { i: 120220, j: 102187 },
    { i: 120300, j: 102255 },
    { i: 120340, j: 102289 },
    { i: 120420, j: 102357 },
    { i: 120460, j: 102391 },
    { i: 120580, j: 102493 },
    { i: 120600, j: 102510 },
    { i: 120660, j: 102561 },
    { i: 120667, j: 106259 },
    { i: 120690, j: 108621 },
    { i: 120700, j: 102595 },
    { i: 120700, j: 106216 },
    { i: 120725, j: 106238 },
    { i: 120740, j: 102629 },
    { i: 120750, j: 106260 },
    { i: 120775, j: 106282 },
    { i: 120780, j: 102663 },
    { i: 120800, j: 107210 },
    { i: 120820, j: 102697 },
    { i: 120860, j: 102731 },
    { i: 120880, j: 107281 },
    { i: 120900, j: 102765 },
    { i: 120931, j: 109228 },
    { i: 120993, j: 109284 },
    { i: 121055, j: 101246 },
    { i: 121506, j: 101255 },
    { i: 121550, j: 114257 },
    { i: 121581, j: 112575 },
    { i: 121916, j: 102998 },
    { i: 122000, j: 112850 },
    { i: 122174, j: 112268 },
    { i: 123205, j: 112387 },
    { i: 123806, j: 118397 },
    { i: 124215, j: 112385 },
    { i: 124800, j: 119184 },
    { i: 125008, j: 101569 },
    { i: 125008, j: 105175 },
    { i: 125040, j: 101595 },
    { i: 125050, j: 102541 },
    { i: 125081, j: 102476 },
    { i: 125170, j: 112653 },
    { i: 125300, j: 119035 },
    { i: 125840, j: 119548 },
    { i: 126022, j: 110695 },
    { i: 126027, j: 102510 },
    { i: 126070, j: 106259 },
    { i: 126150, j: 105125 },
    { i: 126200, j: 118628 },
    { i: 126600, j: 125967 },
    { i: 126930, j: 122699 },
];
function brutalTest1() {
    for (let i = 1; i < 10_000; i++) {
        for (let j = 11; j < 10_000; j++) {
            const test = checkFractionEquality(i, j, false);
            if (test) {
                console.log({ i, j });
            }
        }
    }
}

function brutalTest2() {
    const j = Math.round(Math.random() * 140_000) + 100_000
    for (let i = 100_000; i < 240_000; i++) {
        const test = checkFractionEquality(i, j, false);
        if (test) {
            console.log({ i, j });
        }
    }
}
function testIJ() {
    const obj = { i: 9985, j: 1997 };
    console.log(checkFractionEquality(obj.i, obj.j, true));
}

testIJ()
// brutalTest1()