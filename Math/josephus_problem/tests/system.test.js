const assert = require('assert');
const {
    countAlives,
    InfosNum,
} = require('../helpers');
const { lastBy1JSON, lastBy1Binary } = require('../index');

function logPass(name) {
    console.log(`PASS: ${name}`);
}
function logFail(name, err) {
    console.error(`❌ FAIL: ${name} -> ${err.message}`);
}
function test(name, fn) {
    try {
        fn();
        logPass(name);
    } catch (e) {
        logFail(name, e);
    }
}

// System-level: simulate whole execution and validate invariants

test('System invariant: total kills = n - survivors', () => {
    const n = 30,
        start = 1;
    const { listComn } = lastBy1JSON(n, start, false);
    const totalKills = listComn.reduce((s, x) => s + x.kills, 0);
    const survivors = countAlives(listComn);
    assert.strictEqual(totalKills, n - survivors);
});


test('System property: winner appears in list and has kills >= 0', () => {
    const n = 40,
        start = 1;
    const { lastAlive, listComn } = lastBy1JSON(n, start, false);
    const info = InfosNum(listComn, lastAlive);
    assert.ok(info);
    assert.ok(info.from_list >= 0);
});

test('System property: binary winner matches simulation winner', () => {
    for (let n = 2; n <= 50; n += 3) {
        const start = 1 + (n % Math.min(5, n));
        const { lastAlive } = lastBy1JSON(n, start, false);
        const binary = lastBy1Binary(n, start, false);
        assert.strictEqual(binary, lastAlive, `Failed for n=${n}, start=${start}`);
    }
});

console.log('\nSystem tests completed.');
