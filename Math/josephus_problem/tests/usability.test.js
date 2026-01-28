const assert = require('assert');
const { josephus, josephusGeneral, josephusClassic, lastBy1Binary } = require('../index');

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

// Usability: clear errors & defaults

test('Usability: josephus invalid args throw descriptive error', () => {
    assert.throws(() => josephus(0, 2, 1, 'forward'), /Invalid parameters|Invalid n/);
    assert.throws(() => josephus(5, 0, 1, 'forward'), /Invalid parameters/);
    assert.throws(() => josephus(5, 2, 0, 'forward'), /Invalid parameters|Invalid n/);
    assert.throws(() => josephus(5, 2, 6, 'forward'), /Invalid parameters|Invalid n/);
    assert.throws(() => josephus(5, 2, 1, 'invalid'), /Invalid parameters/);
});

test('Usability: reasonable defaults work', () => {
    assert.strictEqual(josephus(7), josephusClassic(7, 1));
});

test('Usability: lastBy1Binary returns valid result within range', () => {
    for (let n = 2; n <= 20; n++) {
        const result = lastBy1Binary(n, 1, false);
        assert.ok(Number.isInteger(result), `Result should be integer for n=${n}`);
        assert.ok(result >= 1 && result <= n, `Result ${result} should be in range [1, ${n}]`);
    }
});

test('Usability: lastBy1Binary handles all valid start positions', () => {
    const n = 15;
    for (let start = 1; start <= n; start++) {
        const result = lastBy1Binary(n, start, false);
        assert.ok(result >= 1 && result <= n);
    }
});

test('Usability: josephusGeneral supports forward/reverse', () => {
    const n = 13,
        m = 3;
    const fwd = josephusGeneral(n, m, 1, 'forward');
    const rev = josephusGeneral(n, m, 1, 'reverse');
    assert.ok(Number.isInteger(fwd));
    assert.ok(Number.isInteger(rev));
    assert.ok(fwd !== rev, 'Forward and reverse should differ in general');
});

console.log('\nUsability tests completed.');
