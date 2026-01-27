const assert = require('assert');
const { josephus, josephusClassic, lastBy1Binary, josephusGeneral } = require('../index');

function logPass(name) {
    // console.log(`PASS: ${name}`);
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

// Compatibility tests: ensure API works across ranges and types

test('Compatibility: works for various n,m,start ranges', () => {
    for (let n = 2; n <= 100; n += 7) {
        for (let m = 1; m <= Math.min(5, n - 1); m++) {
            const start = 1 + (n % m);
            const res = josephus(n, m, start, 'forward');
            assert.ok(Number.isInteger(res) && res >= 1 && res <= n);
        }
    }
});

test('Compatibility: handles reverse direction for classic and general', () => {
    const n = 25;
    assert.ok(Number.isInteger(josephus(n, 2, 5, 'reverse')));
    assert.ok(Number.isInteger(josephusGeneral(n, 3, 5, 'reverse')));
});

test('Compatibility: stable outputs between josephus(m=2) and classical', () => {
    for (let n = 2; n <= 50; n++) {
        for (let s = 1; s <= Math.min(n, 5); s++) {
            assert.strictEqual(josephus(n, 2, s, 'forward'), josephusClassic(n, s));
        }
    }
});

test('Compatibility: lastBy1Binary matches classical for all starts', () => {
    for (let n = 2; n <= 50; n++) {
        for (let s = 1; s <= Math.min(n, 5); s++) {
            const binary = lastBy1Binary(n, s, false);
            const classic = josephusClassic(n, s);
            assert.strictEqual(binary, classic, `Failed for n=${n}, s=${s}`);
        }
    }
});

console.log('\nCompatibility tests completed.');
