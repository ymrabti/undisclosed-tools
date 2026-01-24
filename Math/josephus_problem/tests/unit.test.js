const assert = require('assert');
const {
  countAlives,
  findNUM,
  findNextAlive,
  findNextNAlives,
  generate,
  generateListJSON,
  powN,
  pow2,
  descendant,
} = require('../helpers');
const {
  josephusClassic,
  josephusClassicReverse,
  josephusGeneral,
  josephus,
  lastBy1Splice,
  lastBy1JSON,
  lastBy1Math,
} = require('../index');

function logPass(name) { console.log(`PASS: ${name}`); }
function logFail(name, err) { console.error(`FAIL: ${name} -> ${err.message}`); }

function test(name, fn) {
  try { fn(); logPass(name); } catch (err) { logFail(name, err); }
}

// Helpers

test('generate forward produces 1..n', () => {
  const list = generate(5, false);
  assert.deepStrictEqual(list, [1,2,3,4,5]);
});

test('generate reverse produces n..1', () => {
  const list = generate(5, true);
  assert.deepStrictEqual(list, [6,5,4,3,2].map(x => x - 1)); // [5,4,3,2,1]
});

test('generateListJSON returns InfoCondamne array', () => {
  const list = generateListJSON(3, false);
  assert.strictEqual(list.length, 3);
  assert.strictEqual(list.every(x => typeof x.num === 'number'), true);
  assert.strictEqual(list.every(x => x.killed === false), true);
});

test('countAlives counts only not-killed', () => {
  const list = generateListJSON(4, false);
  list[1].killed = true; list[3].killed = true;
  assert.strictEqual(countAlives(list), 2);
});

test('findNUM finds index by num', () => {
  const list = generateListJSON(4, false);
  assert.strictEqual(findNUM(list, 3), 2);
});

test('findNextAlive skips killed entries', () => {
  const list = generateListJSON(4, false);
  list[1].killed = true; // num 2
  const i = findNextAlive(list, 0);
  assert.strictEqual(i, 2); // next alive after index 0 is index 2
});

test('findNextNAlives returns N following alive indexes', () => {
  const list = generateListJSON(5, false);
  list[1].killed = true; list[3].killed = true; // kill 2 and 4
  const idxs = findNextNAlives(list, 2, 0);
  assert.deepStrictEqual(idxs, [2,4].map(i => i));
});

test('descendant(true) yields -1, descendant(false) yields 1', () => {
  assert.strictEqual(descendant(true), -1);
  assert.strictEqual(descendant(false), 1);
});

test('powN computes largest exponent p with m^p <= n', () => {
  assert.strictEqual(powN(32, 2), 5);
  assert.strictEqual(powN(33, 2), 5);
  assert.strictEqual(powN(35, 3), 3); // 3^3=27 <= 35 < 81
});

test('pow2 matches ceil(log2(n)) for n>=1', () => {
  assert.strictEqual(pow2(1), 0);
  assert.strictEqual(pow2(2), 1);
  assert.strictEqual(pow2(3), 2);
  assert.strictEqual(pow2(8), 3);
});

// Core josephus

test('josephusClassic n=7 start=1 -> 7', () => {
  assert.strictEqual(josephusClassic(7, 1), 7);
});

test('josephusClassic rotation by start works', () => {
  // base for n=7 is 7; start=3 should yield 2
  assert.strictEqual(josephusClassic(7, 3), 2);
});

test('josephusClassicReverse returns valid 1..n and differs from forward', () => {
  const n = 10;
  const forward = josephusClassic(n, 1);
  const reverse = josephusClassicReverse(n, 1);
  assert.ok(Number.isInteger(reverse) && reverse >= 1 && reverse <= n);
  assert.ok(reverse !== forward);
});

test('lastBy1Math equals lastBy1Splice for small n', () => {
  for (let n = 2; n <= 20; n++) {
    const a = lastBy1Splice(n, 1, false);
    const b = lastBy1Math(n, 1, false);
    assert.strictEqual(a, b);
  }
});

test('josephus (m=2) equals classical for various starts', () => {
  for (let n = 2; n <= 20; n++) {
    for (let s = 1; s <= n; s++) {
      assert.strictEqual(josephus(n, 2, s, 'forward'), josephusClassic(n, s));
      assert.strictEqual(josephus(n, 2, s, 'reverse'), josephusClassicReverse(n, s));
    }
  }
});

test('josephusGeneral matches splice N for selected cases', () => {
  const cases = [
    { n: 8, m: 2, start: 1 },
    { n: 10, m: 3, start: 1 },
    { n: 12, m: 2, start: 1 },
  ];
  for (const c of cases) {
    const expected = require('../index').lastByNSplice(c.n, c.m, c.start, false).lastAlive;
    const got = josephusGeneral(c.n, c.m, c.start, 'forward');
    assert.strictEqual(got, expected);
  }
});

console.log('\nUnit tests completed.');
